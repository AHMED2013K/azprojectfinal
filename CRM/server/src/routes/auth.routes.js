import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken, verifyToken } from '../utils/auth.js';
import { sanitizeUser } from '../utils/serializers.js';
import { getRefreshCookieOptions } from '../utils/cookies.js';
import { changePasswordSchema, loginSchema } from '../validators/auth.validators.js';
import { createAuditLog } from '../utils/audit.js';
import { createCsrfToken, getCsrfCookieOptions } from '../utils/csrf.js';

const router = express.Router();

router.post('/login', validate(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  user.isOnline = true;
  user.lastSeenAt = new Date();
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
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  const payload = verifyToken(refreshToken);
  if (payload.type !== 'refresh') {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const user = await User.findById(payload.sub);
  if (!user?.refreshTokenHash) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
  if (!matches) {
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
