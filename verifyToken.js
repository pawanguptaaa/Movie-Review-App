const jwt = require("jsonwebtoken");
const Errors = require("./errors");
const { User } = require('./model/User');
const { UnAuthorisedError, STATUS_CODES } = Errors;


module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  //let token = req.cookies.w_auth;
  if (!token)
    throw new UnAuthorisedError(
      "Unauthorized users !",
      STATUS_CODES.UNAUTHENTICATED_REQUEST
    );
  try {
    const verified = jwt.verify(token,"apappapjjgdoehjdgjgshgfd");
    req.user = verified;
    next();
  } catch (error) {
    throw error;
    
  }
};
