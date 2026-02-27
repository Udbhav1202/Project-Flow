const asyncHandler = require('../utils/asyncHandler');
const {
  registerUserService,
  loginUserService
} = require('../services/userService');

const registerUser = asyncHandler(async (req, res) => {
  const userData = await registerUserService({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).json(userData);
});

const loginUser = asyncHandler(async (req, res) => {
  const userData = await loginUserService({
    email: req.body.email,
    password: req.body.password,
  });

  res.json(userData);
});

module.exports = { registerUser, loginUser };
