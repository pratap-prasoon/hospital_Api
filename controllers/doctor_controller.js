const jwt = require('jsonwebtoken');
const User = require('../models/doctor');
const catchAsync = require('../config/catchAsync');
const AppError = require('../config/ApiError');

// TO GENERATE TOKEN
const signToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//TO HANDLE RESPONSE WHILE LOGIN
const createSendToken = (user, statusCode, req, res) => {
  //token created
  const token = signToken(user.toJSON());

  //send response
  res.status(statusCode).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
};

//TO CREATE USER
exports.create = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;

  //create data
  const user = await User.create({ email, password, name });

  //send response
  res.status(201).json({
    status: 'success',
    message: 'Successfully Registered...',
  });
});

//LOG IN TO USER
exports.createSession = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //find user
  const user = await User.findOne({ email }).select('+password');

  // if user is not found or incrrect password then throw an error
  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }

  //call function
  createSendToken(user, 200, req, res);
});