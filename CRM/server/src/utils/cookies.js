import { getEnv } from '../config/env.js';

export function getRefreshCookieOptions() {
  const env = getEnv();
  return {
    httpOnly: true,
    sameSite: 'strict',
    secure: env.NODE_ENV === 'production',
    path: '/api/auth',
    maxAge: 1000 * 60 * 60 * 24 * 14,
  };
}
