export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  res.status(status).json({
    message: status >= 500 ? 'Server error' : error.message || 'Server error',
    details: status >= 500 ? undefined : error.details || undefined,
  });
}
