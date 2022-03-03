const router = require('express').Router();
const mongoose = require('mongoose');
const { Movie } = require('../model/Movie');
// const auth = require('../middleware/auth');
const auth = require('../middleware/authAdmin');
const Errors = require('../errors');
const { User } = require('../model/User');

const { ResourceNotFoundError, BadRequest } = Errors;

// CREATE....

router.post('/', auth, (req, res, next) => {
  const newMovie = new Movie({ ...req.body });
  newMovie
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => next(e));
});

// UPDATE

router.patch('/:movieId', auth, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    return res.status(400).send('Invalid Movie Id');
  }
  Movie.findByIdAndUpdate(
    { _id: req.params.movieId },
    { $set: req.body },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        throw new ResourceNotFoundError('No movie found for the given id');
      }
      res.json(result);
    })
    .catch((e) => next(e));
});

// DELETE

router.delete('/:movieId', auth, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    return res.status(400).send('Invalid Movie Id');
  }
  Movie.findByIdAndDelete(req.params.movieId)
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No movie found to delete');
      res.json({ message: ' Movie Deleted Successfully' });
    })
    .catch((e) => next(e));
});

// GET

router.get('/:movieId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    return res.status(400).send('Invalid Movie Id');
  }
  Movie.findById(req.params.movieId)
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No movie found');
      res.json(result);
    })
    .catch((e) => next(e));
});

// GET ALL

router.get('/', (req, res, next) => {
  Movie.find()
    .then((result) => {
      if (!result.length) throw new ResourceNotFoundError('No movie found');
      res.json({ data: { movies: result } });
    })
    .catch((e) => next(e));
});

module.exports = router;
