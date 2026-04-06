export function escapeRegExp(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function sanitizePlainText(value = '') {
  return String(value)
    .replace(/\0/g, '')
    .replace(/\r/g, '')
    .trim();
}

export function createOriginChecker(allowedOrigins) {
  return (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Origin not allowed by CORS'));
  };
}

export function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || '';
}

export function createIpAllowlistMiddleware(allowedIps = []) {
  if (!allowedIps.length) {
    return (_req, _res, next) => next();
  }

  return (req, res, next) => {
    const ip = getClientIp(req);
    if (allowedIps.includes(ip)) {
      return next();
    }

    return res.status(403).json({ message: 'Access denied from this network' });
  };
}
