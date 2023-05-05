const jwt = require('jsonwebtoken');

const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }
  const decoder = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoder);
  req.user = await User.findById(decoder.id);
  // console.log('userrrrrrrrrrr', req.user);
  next();
});

// Handling user roles
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Your role '${req.user.role}' is  not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
