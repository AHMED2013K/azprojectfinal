import express from 'express';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import UserSession from '../models/UserSession.js';
import PasswordResetToken from '../models/PasswordResetToken.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/auth.js';
import { sanitizeUser } from '../utils/serializers.js';
import { getRefreshCookieOptions } from '../utils/cookies.js';
import { changePasswordSchema, loginSchema, passwordResetConfirmSchema, passwordResetRequestSchema, sessionActionSchema, twoFactorSetupSchema, twoFactorVerifySchema } from '../validators/auth.validators.js';
import { createAuditLog } from '../utils/audit.js';
import { createCsrfToken, getCsrfCookieOptions } from '../utils/csrf.js';
import { logAppEvent } from '../utils/logger.js';
import { getEnv } from '../config/env.js';
import { buildOtpAuthUri, generateTwoFactorSecret, verifyTotpCode } from '../utils/twoFactor.js';
import { consumeRecoveryCode, generateRecoveryCodes } from '../utils/recoveryCodes.js';

const router = express.Router();

function logAuthFailure(req, reason, email = '') {
  logAppEvent('auth.failure', {
    requestId: req.requestId || '',
    email,
    ip: req.ip,
    reason,
  }, 'warn');
}

async function recordAuthFailure(req, { reason, email = '', actor = null }) {
  logAuthFailure(req, reason, email);
  await createAuditLog({
    actor,
    action: 'auth.failure',
    targetType: 'user',
    details: {
      email,
      reason,
      ip: req.ip,
      requestId: req.requestId || '',
    },
  });
}

function getDeviceLabel(req) {
  const userAgent = String(req.headers['user-agent'] || '').slice(0, 240);
  if (!userAgent) {
    return 'Unknown device';
  }
  return userAgent;
}

function serializeSession(session, currentSessionId = '') {
  return {
    id: session._id.toString(),
    ipAddress: session.ipAddress || '',
    userAgent: session.userAgent || '',
    deviceLabel: session.deviceLabel || 'Unknown device',
    lastSeenAt: session.lastSeenAt,
    createdAt: session.createdAt,
    revokedAt: session.revokedAt || null,
    current: currentSessionId ? session._id.toString() === currentSessionId : false,
  };
}

async function syncOnlinePresence(userId) {
  const activeCount = await UserSession.countDocuments({ user: userId, revokedAt: null });
  await User.findByIdAndUpdate(userId, {
    isOnline: activeCount > 0,
    lastSeenAt: new Date(),
  });
}

router.post('/login', validate(loginSchema), asyncHandler(async (req, res) => {
  const email = String(req.validated.body.email || '').trim().toLowerCase();
  const { password, otpCode, recoveryCode } = req.validated.body;
  const env = getEnv();

  const user = await User.findOne({ email });
  if (!user) {
    await recordAuthFailure(req, { reason: 'user_not_found', email });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    await recordAuthFailure(req, { reason: 'user_locked', email, actor: user._id });
    return res.status(429).json({ message: `Account locked until ${user.lockUntil.toISOString()}` });
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    user.failedLoginCount = (user.failedLoginCount || 0) + 1;
    user.lastFailedLoginAt = new Date();
    if (user.failedLoginCount >= env.LOGIN_MAX_FAILURES) {
      user.lockUntil = new Date(Date.now() + env.LOGIN_LOCKOUT_MINUTES * 60 * 1000);
    }
    await user.save();
    await recordAuthFailure(req, { reason: 'invalid_password', email, actor: user._id });
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (user.twoFactorEnabled) {
    if (!otpCode && !recoveryCode) {
      await recordAuthFailure(req, { reason: 'missing_two_factor_code', email, actor: user._id });
      return res.status(401).json({ message: 'Two-factor code or recovery code is required' });
    }

    let recoveryCodeUsed = false;
    if (otpCode) {
      if (!verifyTotpCode(user.twoFactorSecret, otpCode)) {
        await recordAuthFailure(req, { reason: 'invalid_two_factor_code', email, actor: user._id });
        return res.status(401).json({ message: 'Invalid two-factor code' });
      }
    } else {
      const recoveryResult = await consumeRecoveryCode(user.twoFactorRecoveryCodeHashes || [], recoveryCode);
      if (!recoveryResult.matched) {
        await recordAuthFailure(req, { reason: 'invalid_recovery_code', email, actor: user._id });
        return res.status(401).json({ message: 'Invalid recovery code' });
      }
      user.twoFactorRecoveryCodeHashes = recoveryResult.remainingHashes;
      recoveryCodeUsed = true;
      await createAuditLog({
        actor: user._id,
        action: 'auth.recovery_code_used',
        targetType: 'user',
        targetId: user._id.toString(),
      });
    }

    if (recoveryCodeUsed && user.twoFactorRecoveryCodeHashes.length === 0) {
      const generated = await generateRecoveryCodes();
      user.twoFactorRecoveryCodeHashes = generated.hashes;
    }
  }

  user.isOnline = true;
  user.lastSeenAt = new Date();
  user.failedLoginCount = 0;
  user.lastFailedLoginAt = null;
  user.lockUntil = null;
  const session = await UserSession.create({
    user: user._id,
    refreshTokenHash: 'pending',
    ipAddress: req.ip,
    userAgent: String(req.headers['user-agent'] || ''),
    deviceLabel: getDeviceLabel(req),
    lastSeenAt: new Date(),
  });
  const refreshToken = signRefreshToken({ _id: user._id, sessionId: session._id.toString() });
  const csrfToken = createCsrfToken();
  session.refreshTokenHash = await bcrypt.hash(refreshToken, 12);
  await session.save();
  await user.save();
  await createAuditLog({
    actor: user._id,
    action: 'auth.login',
    targetType: 'user',
    targetId: user._id.toString(),
  });

  res.cookie('crm_refresh_token', refreshToken, getRefreshCookieOptions());
  res.cookie('crm_csrf_token', csrfToken, getCsrfCookieOptions());

  res.json({
    token: signAccessToken({ _id: user._id, role: user.role, sessionId: session._id.toString() }),
    user: sanitizeUser(user),
    csrfToken,
  });
}));

router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
}));

router.post('/refresh', asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.crm_refresh_token;
  if (!refreshToken) {
    await recordAuthFailure(req, { reason: 'missing_refresh_cookie' });
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  let payload;
  try {
    payload = verifyToken(refreshToken);
  } catch {
    await recordAuthFailure(req, { reason: 'invalid_refresh_token' });
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  if (payload.type !== 'refresh') {
    await recordAuthFailure(req, { reason: 'wrong_refresh_token_type' });
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await User.findById(payload.sub);
  const session = payload.sid ? await UserSession.findById(payload.sid) : null;
  if (!user || !session || session.user.toString() !== user._id.toString() || session.revokedAt) {
    await recordAuthFailure(req, { reason: 'missing_refresh_hash' });
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const matches = await bcrypt.compare(refreshToken, session.refreshTokenHash);
  if (!matches) {
    await recordAuthFailure(req, { reason: 'refresh_hash_mismatch', email: user.email, actor: user._id });
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const nextRefreshToken = signRefreshToken({ _id: user._id, sessionId: session._id.toString() });
  const csrfToken = createCsrfToken();
  session.refreshTokenHash = await bcrypt.hash(nextRefreshToken, 12);
  session.lastSeenAt = new Date();
  session.ipAddress = req.ip || session.ipAddress;
  session.userAgent = String(req.headers['user-agent'] || '') || session.userAgent;
  session.deviceLabel = getDeviceLabel(req);
  await session.save();
  await user.save();
  res.cookie('crm_refresh_token', nextRefreshToken, getRefreshCookieOptions());
  res.cookie('crm_csrf_token', csrfToken, getCsrfCookieOptions());
  res.json({
    token: signAccessToken({ _id: user._id, role: user.role, sessionId: session._id.toString() }),
    user: sanitizeUser(user),
    csrfToken,
  });
}));

router.post('/change-password', authMiddleware, validate(changePasswordSchema), asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.validated.body;

  const matches = await bcrypt.compare(currentPassword, req.user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  req.user.passwordHash = await bcrypt.hash(newPassword, 12);
  await UserSession.updateMany({ user: req.user._id, revokedAt: null }, { revokedAt: new Date() });
  await req.user.save();
  await syncOnlinePresence(req.user._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.password_changed',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });
  res.json({ message: 'Password updated successfully' });
}));

router.post('/2fa/setup', authMiddleware, validate(twoFactorSetupSchema), asyncHandler(async (req, res) => {
  const { password } = req.validated.body;
  const matches = await bcrypt.compare(password, req.user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  const secret = generateTwoFactorSecret();
  req.user.twoFactorTempSecret = secret;
  await req.user.save();

  res.json({
    secret,
    otpauthUrl: buildOtpAuthUri({ email: req.user.email, secret }),
  });
}));

router.post('/2fa/enable', authMiddleware, validate(twoFactorVerifySchema), asyncHandler(async (req, res) => {
  const { code, password } = req.validated.body;
  const matches = await bcrypt.compare(password, req.user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  if (!req.user.twoFactorTempSecret) {
    return res.status(400).json({ message: 'Start setup before enabling two-factor authentication' });
  }
  if (!verifyTotpCode(req.user.twoFactorTempSecret, code)) {
    return res.status(401).json({ message: 'Invalid two-factor code' });
  }

  req.user.twoFactorEnabled = true;
  req.user.twoFactorSecret = req.user.twoFactorTempSecret;
  req.user.twoFactorTempSecret = '';
  const recovery = await generateRecoveryCodes();
  req.user.twoFactorRecoveryCodeHashes = recovery.hashes;
  await req.user.save();
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.two_factor_enabled',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });

  res.json({ message: 'Two-factor authentication enabled', user: sanitizeUser(req.user), recoveryCodes: recovery.codes });
}));

router.post('/2fa/disable', authMiddleware, validate(twoFactorVerifySchema), asyncHandler(async (req, res) => {
  const { code, password } = req.validated.body;
  const matches = await bcrypt.compare(password, req.user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  if (!req.user.twoFactorEnabled || !req.user.twoFactorSecret) {
    return res.status(400).json({ message: 'Two-factor authentication is not enabled' });
  }
  if (!verifyTotpCode(req.user.twoFactorSecret, code)) {
    return res.status(401).json({ message: 'Invalid two-factor code' });
  }

  req.user.twoFactorEnabled = false;
  req.user.twoFactorSecret = '';
  req.user.twoFactorTempSecret = '';
  req.user.twoFactorRecoveryCodeHashes = [];
  await req.user.save();
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.two_factor_disabled',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });

  res.json({ message: 'Two-factor authentication disabled', user: sanitizeUser(req.user) });
}));

router.post('/2fa/recovery-codes/regenerate', authMiddleware, validate(twoFactorSetupSchema), asyncHandler(async (req, res) => {
  const { password } = req.validated.body;
  const matches = await bcrypt.compare(password, req.user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }
  if (!req.user.twoFactorEnabled) {
    return res.status(400).json({ message: 'Enable two-factor authentication first' });
  }

  const recovery = await generateRecoveryCodes();
  req.user.twoFactorRecoveryCodeHashes = recovery.hashes;
  await req.user.save();
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.recovery_codes_regenerated',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });

  res.json({ recoveryCodes: recovery.codes, user: sanitizeUser(req.user) });
}));

router.get('/sessions', authMiddleware, asyncHandler(async (req, res) => {
  const sessions = await UserSession.find({ user: req.user._id }).sort({ lastSeenAt: -1 });
  res.json({
    sessions: sessions.map((session) => serializeSession(session, req.sessionId)),
  });
}));

router.delete('/sessions/:sessionId', authMiddleware, validate(sessionActionSchema), asyncHandler(async (req, res) => {
  const session = await UserSession.findOne({ _id: req.validated.params.sessionId, user: req.user._id });
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  session.revokedAt = new Date();
  await session.save();
  await syncOnlinePresence(req.user._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.session_revoked',
    targetType: 'session',
    targetId: session._id.toString(),
    details: { ipAddress: session.ipAddress, deviceLabel: session.deviceLabel },
  });

  res.json({ message: 'Session revoked' });
}));

router.delete('/sessions', authMiddleware, asyncHandler(async (req, res) => {
  const query = {
    user: req.user._id,
    revokedAt: null,
    ...(req.sessionId ? { _id: { $ne: req.sessionId } } : {}),
  };
  await UserSession.updateMany(query, { revokedAt: new Date() });
  await syncOnlinePresence(req.user._id);
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.other_sessions_revoked',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });

  res.json({ message: 'Other sessions revoked' });
}));

router.post('/password-reset/request', validate(passwordResetRequestSchema), asyncHandler(async (req, res) => {
  const email = String(req.validated.body.email || '').trim().toLowerCase();
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: 'If this account exists, a reset token has been generated.' });
  }

  await PasswordResetToken.updateMany({ user: user._id, usedAt: null }, { usedAt: new Date() });
  const rawToken = crypto.randomBytes(24).toString('hex');
  await PasswordResetToken.create({
    user: user._id,
    tokenHash: await bcrypt.hash(rawToken, 12),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    requestedIp: req.ip,
    requestedUserAgent: String(req.headers['user-agent'] || ''),
  });
  await createAuditLog({
    actor: user._id,
    action: 'auth.password_reset_requested',
    targetType: 'user',
    targetId: user._id.toString(),
    details: { ipAddress: req.ip },
  });

  res.json({
    message: 'Password reset token generated. Use it within 30 minutes.',
    resetToken: rawToken,
  });
}));

router.post('/password-reset/confirm', validate(passwordResetConfirmSchema), asyncHandler(async (req, res) => {
  const { token, newPassword } = req.validated.body;
  const candidates = await PasswordResetToken.find({
    usedAt: null,
    expiresAt: { $gt: new Date() },
  }).populate('user');

  const match = await Promise.all(candidates.map(async (item) => ({
    item,
    matches: await bcrypt.compare(token, item.tokenHash),
  })));
  const found = match.find((entry) => entry.matches);

  if (!found?.item?.user) {
    return res.status(400).json({ message: 'Reset token is invalid or expired' });
  }

  found.item.usedAt = new Date();
  await found.item.save();
  found.item.user.passwordHash = await bcrypt.hash(newPassword, 12);
  await found.item.user.save();
  await UserSession.updateMany({ user: found.item.user._id, revokedAt: null }, { revokedAt: new Date() });
  await syncOnlinePresence(found.item.user._id);
  await createAuditLog({
    actor: found.item.user._id,
    action: 'auth.password_reset_completed',
    targetType: 'user',
    targetId: found.item.user._id.toString(),
  });

  res.json({ message: 'Password has been reset successfully' });
}));

router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  if (req.sessionId) {
    await UserSession.findByIdAndUpdate(req.sessionId, { revokedAt: new Date(), lastSeenAt: new Date() });
  }
  req.user.lastSeenAt = new Date();
  await req.user.save();
  await syncOnlinePresence(req.user._id);
  res.clearCookie('crm_refresh_token', getRefreshCookieOptions());
  res.clearCookie('crm_csrf_token', getCsrfCookieOptions());
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.logout',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });
  res.json({ message: 'Logged out' });
}));

export default router;
