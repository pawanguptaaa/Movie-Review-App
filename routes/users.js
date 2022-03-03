const router = require('express').Router();
const mongoose = require('mongoose');
const { User } = require('../model/User');
const auth = require('../middleware/auth');
const Errors = require('../errors');


const {
  ResourceNotFoundError,
} = Errors;

router.get('/favorites', auth, (req, res, next) => {
  const { userId } = req;
  User.findById({ _id: userId }).populate('favorites', 'title overview').then((result) => {
    // console.log('result', result);
    res.json(result);
  });
});
// UPDATE

router.patch('/:userId', auth, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send('Invalid User Id');
  }
  User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No user found to update');
      res.json(result);
    })
    .catch((e) => next(e));
});

// DELETE
router.delete('/:userId', auth, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send('Invalid User Id');
  }
  User.findByIdAndDelete(req.params.userId)
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No user found to delete');
      res.json(result);
    })
    .catch((e) => next(e));
});

router.get('/me', auth, (req, res, next) => {
  const { userId } = req;
  User.findById(userId).then((user) => {
    res.json(user);
  })
    .catch((e) => next(e));
});
// GET

router.get('/:userId', auth, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).send('Invalid User Id');
  }
  User.findById(req.params.userId)
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No user found ');
      res.json(result);
    })
    .catch((e) => next(e));
});

// GET ALL

router.get('/', auth, (req, res, next) => {
  User.find()
    .then((result) => {
      if (!result.length) throw new ResourceNotFoundError('No users found ');
      res.json(result);
    })
    .catch((e) => next(e));
});

// users favorite...
router.post('/favorites', auth, (req, res, next) => {
  const { userId } = req;
  const { movieId } = req.body;

  User.findById({ _id: userId })
    .then((user) => {
      const isFavorite = user.favorites.includes(movieId);
      return isFavorite;
    })
    .then((isFavorite) => {
      if (isFavorite) {
        return User.updateOne(
          { _id: userId },
          { $pull: { favorites: movieId } },
        );
      }
      return User.updateOne(
        { _id: userId },
        { $push: { favorites: movieId } },
      );
    })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => next(e));
});

module.exports = router;
