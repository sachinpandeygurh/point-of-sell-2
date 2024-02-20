const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const  mongoose = require('mongoose')

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple id",
      url: "profilepicurl",
    },
  });

  const token = user.getJWTToken();

  // send back the token to client side
  sendToken(user, 201, res);
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if the user has given both email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please provide an email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//lOGOUT USER
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, status: "success", Message: "Logged out" });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const data = await User.findOne() 
  // console.log(data)
  if (!user) {
    return next(new ErrorHandler("No account with this email exists", 400));
  }

  // get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Dear User, \n\n  Follow this link to reset your Password : \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it. \n\n <b>Thanks for using our services</b> \n\n for more information please visit: ${
    req.protocol
  }://${req.get("host")}  `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully click link to recover your password has been sent to you!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating tokenhash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find the user by the reset password token and check if the token has expired.
  const user = await User.findById({
    resetPasswordToken: await User(req.body.resetPasswordToken).resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() + 10 * 60 * 60 * 1000 },
  });
  const user2 = await User.findOne({ resetPasswordToken: req.body.resetPasswordToken });
  console.log('URL Token:', req.user.token);
  console.log('Generated Token:', resetPasswordToken);
  console.log('User:', user);
  // console.log('User:', user2);

  if (!user) {
    return next(new ErrorHandler(`Invalid or expired link`, 400));
  }

  // Check if the passwords match.
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Passwords do not match`, 400));
  }

  // Update the user's password.
  user.password = req.body.password;

  // Reset the reset password token and expiration date.
  user.resetPasswordToken = undefined;
  // resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Save the user.
  await user.save();

  // Send the user a token.
  sendToken(user, 200, res);
});



// Get product details
exports.getUserDetails = catchAsyncErrors(async(req , res ,next)=>{
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Error: please login to access this resource',
      status: 401
    });
  }
const user=await User.findById(req.user.id)

res.status(200).json({
    success : true ,
    user
  })
  
})

// update User password
exports.updatePassword = catchAsyncErrors (async(req, res , next)=>{
  const user = await User.findById(req.user.id).select("+password")
  // console.log(user);

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
console.log((req.body.oldPassword));
// console.log(isPasswordMatched);
  if(!isPasswordMatched){
 return next (new ErrorHandler("Old password is incorrect", 400))
  }
  if(req.body.newPassword !== req.body.confirmPassword){
 return next (new ErrorHandler("Password does not matched", 400))
  }
  user.password = req.body.newPassword
  await user.save()

  sendToken(user, 200, res);
})


// update User profile
exports.updateProfile = catchAsyncErrors(async (req , res , next)=>{
  
const newUserData = {
  name: req.body.name,
  email: req.body.email,
  
}

// we will add cloudanarynlater
const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
  new:true,
  runValidators:true,
  userFindAndModify:false

})

res.status(200).json({
  success:true,
 newUserData
})
})
// Get all Users (admin)
// exports.getAllUsers = factory.getAll(User)
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
    })
})

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req , res , next)=>{
  const user = await User.findById(req.params.id)
  // console.log(user);

  if(!user){
    return next(new ErrorHandler(`No user found with this id: ${req.params.id}`,404))
  }
  res.status(200).json({
    success: true,
    data : user
  })
})

// update User role (admin)
exports.updateUserRole = catchAsyncErrors(async (req , res , next)=>{
  
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
    
  }
  
  // we will add cloudanarynlater
  const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
    new:true,
    runValidators:true,
    userFindAndModify:false
  
  })
  if (!user) {
    throw new Error('No user found')
    }
  
  res.status(200).json({
    success:true,
   newUserData
  })
  })

  // Delete User -- admin

exports.deleteUser = catchAsyncErrors(async (req, res , next)=>{
  const user = await User.findById(req.params.id)

  if(!user){
    return next(new ErrorHandler(`No user exist with this id: ${req.params.id}`,404))
  }
  await user.deleteOne() 
  res.status(200).json({
    success: true,
    message:'User deleted successfully'
    })
})