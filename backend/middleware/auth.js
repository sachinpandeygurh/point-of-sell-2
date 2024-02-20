const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticateduser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
  console.log("decodedData:", decodedData);
});


exports.authorizeRoles = (...roles) => {
  return catchAsyncErrors(async (req, res, next) => {
   

    if (!req.user || !req.user.role) {
      return next(new ErrorHandler(`User is not authenticated`, 402));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`User role ${req.user.role} is not authorized`, 403)
      );
    }

    next();
  });
};


