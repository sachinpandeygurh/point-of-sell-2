const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Plese Enter Your Name"],
    maxLength: [30, "Name can't exceed 30 characters"],
    minLength: [4, "Name should be more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid Email']
  },
  password: {
    type: String,
    require: [true, "Please Enter your password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false, //this will hide the password in response to client side
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
})

const result = dotenv.config({ path: "backend/config/config.env" });
if (result.error) {
  console.error("Error loading environment variables:", result.error);
}
// JWD token
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || 'default_secret', {
      expiresIn: process.env.JWT_EXPIRE || '2d', 
    }
  );
};

// compare password
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password , this.password)
}
// Generate password token
userSchema.methods.getResetPasswordToken= function(){
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")
  console.log(this.resetPasswordToken)

  this.resetPasswordToken = Date.now() + 15*60*1000

  return resetToken;
}


// mongoose.export = mongoose.model("Users", userSchema);

const User = mongoose.model("User", userSchema); 

module.exports = User;