/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const { Rating } = require('../model/Rating');
const { Movie } = require('../model/Movie');
const auth = require('../middleware/auth');
const Errors = require('../errors');

const router = express.Router();

const { ObjectId } = mongoose.Types;
const {
  UnAuthorisedError,
  ResourceNotFoundError,
  BadRequest,
  STATUS_CODES,
  ErrorCodes,
} = Errors;

router.post('/', auth, (req, res, next) => {
  const { movieId, value } = req.body;
  const { userId } = req;
  Rating.findOneAndUpdate(
    { movieId, userId },
    { value, movieId, userId },
    { upsert: true, new: true },
  )
    .then((result) => {
      if (!result) throw new BadRequest('Error in giving rating');
      res.json(result);
    })
    .catch((e) => next(e));
});

// get all ratings by any Id(movieId or userId)
router.get('/', (req, res, next) => {
  const { movieId, userId } = req.query;
  Rating.find()
    .or([{ movieId }, { userId }])
    .then((result) => {
      if (!result.length) {
        throw new ResourceNotFoundError('rating  not found ');
      }
      res.json(result);
    })
    .catch((e) => next(e));
});

// get single rating by movieId and userId
router.get('/:movieId', auth, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    return res.status(400).send('Invalid Movie Id');
  }
  const { movieId } = req.params;
  const { userId } = req;
  Rating.findOne({ movieId, userId })
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No rating found');
      res.json(result);
    })
    .catch((e) => next(e));
});

router.delete('/:movieId', auth, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    return res.status(400).send('Invalid Movie Id');
  }
  const { movieId } = req.params;
  const { userId } = req;
  Rating.findOneAndDelete({ movieId, userId })
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('rating already deleted');
      res.json(result);
    })
    .catch((e) => next(e));
});


module.exports = router;
