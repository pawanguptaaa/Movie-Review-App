const errorHandler = require('../errors/errorHandler');

async function errorController(err, req, res, next) {
  if (!err.statusCode) {
    const error = errorHandler(err);

    res
      .status(error.statusCode)
      .json({ code: error.statusCode, message: error.message });
    return;
  }
  res
    .status(err.statusCode)
    .json({ code: err.statusCode, message: err.message });
}
module.exports = errorController;
