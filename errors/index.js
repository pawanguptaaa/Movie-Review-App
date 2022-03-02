const BadRequest = require('./BadRequest');
const CustomError = require('./CustomError');
const STATUS_CODES = require('./StatusCodes');
const UnAuthenticatedError = require('./UnAuthenticatedError');
const UnAuthorisedError = require('./UnAuthorisedError');
const ResourceNotFoundError = require('./ResourceNotFoundError');
const ServerError = require('./ServerError');

module.exports = {
  BadRequest,
  CustomError,
  STATUS_CODES,
  UnAuthenticatedError,
  UnAuthorisedError,
  ResourceNotFoundError,
  ServerError,
};
