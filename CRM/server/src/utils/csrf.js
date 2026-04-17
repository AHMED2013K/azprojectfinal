import crypto from 'node:crypto';
import { getEnv } from '../config/env.js';

export function createCsrfToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function getCsrfCookieOptions() {
  const env = getEnv();
  return {
    httpOnly: false,
    sameSite: env.COOKIE_SAME_SITE_EFFECTIVE,
    secure: env.NODE_ENV === 'production',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 14,
  };
}
