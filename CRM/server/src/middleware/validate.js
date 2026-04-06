export function validate(schema) {
  return async (req, _res, next) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      });

      req.validated = parsed;
      next();
    } catch (error) {
      next({
        status: 400,
        message: error.issues?.[0]?.message || 'Validation failed',
        details: error.issues || [],
      });
    }
  };
}
