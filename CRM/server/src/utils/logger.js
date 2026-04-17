export function requestLogger(req, res, next) {
  const startedAt = Date.now();
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const entry = {
      level: res.statusCode >= 500 ? 'error' : durationMs >= 2000 ? 'warn' : res.statusCode >= 400 ? 'warn' : 'info',
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip,
      requestId,
      userId: req.user?._id?.toString?.() || '',
      memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
      userAgent: req.headers['user-agent'] || '',
      at: new Date().toISOString(),
    };

    console.log(JSON.stringify(entry));
  });

  next();
}

import crypto from 'node:crypto';

export function logAppEvent(event, details = {}, level = 'info') {
  console.log(JSON.stringify({
    level,
    event,
    at: new Date().toISOString(),
    ...details,
  }));
}
