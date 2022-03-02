const jwt = require('jsonwebtoken');
const Errors = require('../errors');
const { User } = require('../model/User');

const { UnAuthenticatedError, STATUS_CODES } = Errors;

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw new UnAuthenticatedError('Token not found');
  const token = req.header('Authorization').replace('Bearer ', '');
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  await User.findOne({ _id: userId })
    .then((user) => {
      if (!user) throw new UnAuthenticatedError('Authentication required');
      req.userId = userId;
      const id = req.userId;
      let role1;
      User.findById(id).then((user) => {
        role1 = user.role;
        // console.log('role', role1);
        if (role1 === 'ADMIN') {
          next();
        } else {
          res.json({ message: 'user not allowed' });
        }
      });
    })

    .catch((e) => next(e));
};

module.exports = auth;
