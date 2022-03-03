/* eslint-disable object-shorthand */
const router = require('express').Router();
const mongoose = require('mongoose');
const { Movie } = require('../model/Movie');
const cloudinary = require('cloudinary').v2;
// const auth = require('../middleware/auth');
const auth = require('../middleware/authAdmin');
const Errors = require('../errors');
const { User } = require('../model/User');

const { ResourceNotFoundError, BadRequest } = Errors;

router.get('/cloudinary', (req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: 'movie_images',
    },
    process.env.CLOUDINARY_API_SECRET
  );
  res.json({ apiKey, cloudName, signature, timestamp });
});

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

router.patch('/:movieId', auth, (req, res, next) => {
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
