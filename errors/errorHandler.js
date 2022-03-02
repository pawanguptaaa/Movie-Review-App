const { BadRequest, ServerError, UnAuthenticatedError } = require('.');

const errorHandler = (error) => {
  console.log(
    'error handler => ',
    error.code,
    error.name,
    error.message,
    error,
  );
  if (error.code && error.code === 11000) {
    if (error.message.includes('email')) {
      return new BadRequest('Duplicate email');
    } if (error.message.includes('username')) {
      return new BadRequest('Duplicate username');
    } if (error.code === 11000) {
      return new BadRequest('Duplicate id');
    }
  } else if (error.name === 'JsonWebTokenError') {
    return new UnAuthenticatedError('Invalid token');
  } else {
    return new ServerError('Something went wrong!', error.code);
  }
};
module.exports = errorHandler;
