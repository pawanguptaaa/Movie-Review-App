const jwt = require('jsonwebtoken');
const Errors = require('../errors');
const { User } = require('../model/User');

const { UnAuthenticatedError, STATUS_CODES } = Errors;

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw new UnAuthenticatedError('Token not found');
  const token = req.header('Authorization').replace('Bearer ', '');
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) throw new UnAuthenticatedError('Authentication required');
      req.userId = userId;
      next();
    })
    .catch((e) => next(e));
};

module.exports = auth;
