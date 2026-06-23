const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: {}
  });
};

module.exports = { errorHandler };
