const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Please enter your first name'],
    maxlength: [30, 'Your name cannot extends 30 characters'],
  },
  lname: {
    type: String,
    maxlength: [30, 'Your name cannot extends 30 characters'],
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: [true, 'Please enter your Gender'],
    enum: ['Male', 'Female'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password must be at least 8 characters'],
    maxlength: [20, 'Password cannot extends 20 characters'],
    select: false,
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['employee', 'manager'],
  },
  createdAt: { type: Date, default: Date.now },
});

// Encrypting password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// 2nd step Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 1st step Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  // Set token expire time
  this.resetPasswordExpire = Date.now() + 3600000;
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
