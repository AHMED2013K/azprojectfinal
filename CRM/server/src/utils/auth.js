import jwt from 'jsonwebtoken';
import { getEnv } from '../config/env.js';

export function signAccessToken(user) {
  const env = getEnv();
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  );
}

export function signRefreshToken(user) {
  const env = getEnv();
  return jwt.sign(
    { sub: user._id.toString(), type: 'refresh' },
    env.JWT_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN },
  );
}

export function verifyToken(token) {
  return jwt.verify(token, getEnv().JWT_SECRET);
}
