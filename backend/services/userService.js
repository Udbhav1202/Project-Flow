const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUserService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError("Please enter all fields", 400);
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

const loginUserService = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    message: "Login Successful",
  };
};

module.exports = { registerUserService, loginUserService };
