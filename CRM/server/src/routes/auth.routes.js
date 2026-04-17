import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/auth.js';
import { sanitizeUser } from '../utils/serializers.js';
import { getRefreshCookieOptions } from '../utils/cookies.js';
import { changePasswordSchema, loginSchema, twoFactorSetupSchema, twoFactorVerifySchema } from '../validators/auth.validators.js';
import { createAuditLog } from '../utils/audit.js';
import { createCsrfToken, getCsrfCookieOptions } from '../utils/csrf.js';
import { logAppEvent } from '../utils/logger.js';
import { getEnv } from '../config/env.js';
import { buildOtpAuthUri, generateTwoFactorSecret, verifyTotpCode } from '../utils/twoFactor.js';

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

router.post('/login', validate(loginSchema), asyncHandler(async (req, res) => {
  const email = String(req.validated.body.email || '').trim().toLowerCase();
  const { password, otpCode } = req.validated.body;
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
    if (!otpCode) {
      await recordAuthFailure(req, { reason: 'missing_two_factor_code', email, actor: user._id });
      return res.status(401).json({ message: 'Two-factor code is required' });
    }
    if (!verifyTotpCode(user.twoFactorSecret, otpCode)) {
      await recordAuthFailure(req, { reason: 'invalid_two_factor_code', email, actor: user._id });
      return res.status(401).json({ message: 'Invalid two-factor code' });
    }
  }

  user.isOnline = true;
  user.lastSeenAt = new Date();
  user.failedLoginCount = 0;
  user.lastFailedLoginAt = null;
  user.lockUntil = null;
  const refreshToken = signRefreshToken(user);
  const csrfToken = createCsrfToken();
  user.refreshTokenHash = await bcrypt.hash(refreshToken, 12);
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
    token: signAccessToken(user),
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
  if (!user?.refreshTokenHash) {
    await recordAuthFailure(req, { reason: 'missing_refresh_hash' });
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
  if (!matches) {
    await recordAuthFailure(req, { reason: 'refresh_hash_mismatch', email: user.email, actor: user._id });
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const nextRefreshToken = signRefreshToken(user);
  const csrfToken = createCsrfToken();
  user.refreshTokenHash = await bcrypt.hash(nextRefreshToken, 12);
  await user.save();
  res.cookie('crm_refresh_token', nextRefreshToken, getRefreshCookieOptions());
  res.cookie('crm_csrf_token', csrfToken, getCsrfCookieOptions());
  res.json({
    token: signAccessToken(user),
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
  await req.user.save();
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
  await req.user.save();
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.two_factor_enabled',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });

  res.json({ message: 'Two-factor authentication enabled', user: sanitizeUser(req.user) });
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
  await req.user.save();
  await createAuditLog({
    actor: req.user._id,
    action: 'auth.two_factor_disabled',
    targetType: 'user',
    targetId: req.user._id.toString(),
  });

  res.json({ message: 'Two-factor authentication disabled', user: sanitizeUser(req.user) });
}));

router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  req.user.isOnline = false;
  req.user.lastSeenAt = new Date();
  req.user.refreshTokenHash = null;
  await req.user.save();
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
