// backend/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  console.error(err);

  const statusCode = err.statusCode || err.status || 500;
  const message =
    statusCode === 500
      ? 'Server Error'
      : err.message || 'Request error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
  });
};
