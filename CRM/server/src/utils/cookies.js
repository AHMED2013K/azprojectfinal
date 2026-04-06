import { getEnv } from '../config/env.js';

export function getRefreshCookieOptions() {
  const env = getEnv();
  return {
    httpOnly: true,
    sameSite: env.COOKIE_SAME_SITE,
    secure: env.NODE_ENV === 'production',
    path: '/api/auth',
    maxAge: 1000 * 60 * 60 * 24 * 14,
  };
}
