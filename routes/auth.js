const router = require('express').Router();
const { User } = require('../model/User');
const { BadRequest, ResourceNotFoundError } = require('../errors');
const auth = require('../middleware/auth');
const { loginValidation, registerValidation } = require('../validation');

// REGISTER

router.post('/signup', (req, res, next) => {
  const user = new User(req.body);
  const { error } = registerValidation(req.body);
  if (error) throw new BadRequest('User Registeration failed');
  const token = user.generateToken();
  user.token = token;
  user
    .save()
    .then((result) => {
      res.json({ user: result, token });
    })

    .catch((e) => {
      next(e);
    });
});

// LOGIN

router.post('/login', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) throw new BadRequest('User login failed');
  User.findOne({ email })
    .then((result) => {
      user = result;
      if (!user) throw new ResourceNotFoundError('User not found');
      return user.comparePassword(password);
    })
    .then((isMatch) => {
      if (!isMatch) throw new BadRequest('wrong password');
      return user.generateToken();
    })
    .then((token) => {
      delete user.password;
      res.json({ user, token });
    })
    .catch((e) => {
      next(e);
    });
});

// LOGOUT

router.get('/logout', auth, (req, res, next) => {
  const { userId } = req;
  User.findOneAndUpdate({ _id: userId }, { token: '' })
    .then((result) => {
      res.json({ message: 'successfully logged out' });
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
