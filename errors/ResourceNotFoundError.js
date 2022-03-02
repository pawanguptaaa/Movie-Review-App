const StatusCodes = require('./StatusCodes');
const CustomError = require('./CustomError');

class ResourceNotFoundError extends CustomError {
  constructor(message, statusCode = StatusCodes.NOT_FOUND, meta = {}) {
    super(message, statusCode, meta);
    Error.captureStackTrace(this, ResourceNotFoundError);
    const proto = Object.getPrototypeOf(this);
    proto.name = meta.name || 'ResourceNotFoundError';
  }
}

module.exports = ResourceNotFoundError;
