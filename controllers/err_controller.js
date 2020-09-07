const ApiError = require('../config/ApiError');

//HANDLE VALIDATION ERROR
const handleValidationErrorDB = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);
  message = `Invalid input data ${error.join(', ')}`;
  return new ApiError(message, 400);
};

//HANDLE MONGO ERROR
const handleMongoErrorDB = (err) => {
  message = `Email Allready Registerd..`;
  return new ApiError(message, 400);
};
//TO SEND AN ERROR
const sendError = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'ERROR',
    message: 'Something went wrong',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.code === 11000) err = handleMongoErrorDB(err);
  if (err.name == 'ValidationError') err = handleValidationErrorDB(err);
  sendError(err, req, res);
};