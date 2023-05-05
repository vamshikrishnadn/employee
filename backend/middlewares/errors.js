const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };

    error.message = err.message;
    // Wrong Mongoose object error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose Validation ErrorHandler
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'JSON web token is invalid. Try again.';
      error = new ErrorHandler(message, 400);
    }

    // Handling expired JWT errors
    if (err.name === 'TokenExpiredError') {
      const message = 'JSON web token is expired. Try again.';
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};
