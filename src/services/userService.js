const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "dovetailsolutions";

exports.registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('User with this email already exists');
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword
  });
  await user.save();
  return user;
};



exports.loginUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (!existingUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
  { id: existingUser._id, email: existingUser.email },
  JWT_SECRET,
  { expiresIn: '1d' }
);

return { user: existingUser, token };
};


