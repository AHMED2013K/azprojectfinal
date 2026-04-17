import { logAppEvent } from '../utils/logger.js';

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  logAppEvent('request.error', {
    status,
    message: error.message,
    stack: status >= 500 ? error.stack : undefined,
  }, status >= 500 ? 'error' : 'warn');
  res.status(status).json({
    message: status >= 500 ? 'Server error' : error.message || 'Server error',
    details: status >= 500 ? undefined : error.details || undefined,
  });
}
