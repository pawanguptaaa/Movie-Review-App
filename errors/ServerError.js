const StatusCodes = require('./StatusCodes');
const CustomError = require('./CustomError');

class ServerError extends CustomError {
  constructor(message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, meta = {}) {
    super(message, statusCode, meta);
    Error.captureStackTrace(this, ServerError);
    const proto = Object.getPrototypeOf(this);
    proto.name = meta.name || 'Internal Server Error';
  }
}

module.exports = ServerError;
