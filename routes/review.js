const express = require('express');
const mongoose = require('mongoose');
const { Review } = require('../model/Review');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth');
const { ResourceNotFoundError } = require('../errors');

const router = express.Router();

router.post('/', auth, (req, res, next) => {
  const { userId } = req;
  const review = new Review({ ...req.body, userId });
  review
    .save()
    .then((result) => res.json(result))
    .catch((e) => next(e));
});

router.get('/', authAdmin, (req, res, next) => {
  Review.find()
    .then((result) => {
      if (!result.length) throw new ResourceNotFoundError('No review found');
      res.json(result);
    })
    .catch((e) => next(e));
});

// Get All reviews by Id(movieId or userId)
router.get('/', (req, res, next) => {
  const { movieId, userId } = req.query;
  Review.find().or([{ movieId }, { userId }])
    .then((result) => {
      if (!result.length) throw new ResourceNotFoundError('No review found');
      res.json(result);
    })
    .catch((e) => next(e));
});

// Get Review by Review Id.............

router.get('/:reviewId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.reviewId)) {
    return res.status(400).send('Invalid Review Id');
  }
  const { reviewId } = req.params;
  Review.findById(reviewId)
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No review found');
      res.json(result);
    })
    .catch((e) => next(e));
});

// update the review by movieId and userId ......

router.patch('/:movieId', auth, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    return res.status(400).send('Invalid MovieId or UserId');
  }
  const { movieId } = req.params;
  const { userId } = req;
  Review.findOneAndUpdate({ movieId, userId }, { $set: req.body }, { new: true })
    .then((result) => {
      console.log('res', result);
      if (!result) throw new ResourceNotFoundError('No review found');
      res.json(result);
    })
    .catch((e) => next(e));
});

// Delete Review by Review Id

router.delete('/:reviewId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.reviewId)) {
    return res.status(400).send('Invalid ReviewId');
  }
  const { reviewId } = req.params;
  Review.findByIdAndDelete(reviewId)
    .then((result) => {
      if (!result) throw new ResourceNotFoundError('No review found');
      res.json({ message: 'Review Deleted successfully' });
    })
    .catch((e) => next(e));
});

// router.get("/", (req, res, next) => {
//   const { movieId } = req.query;
//   Review.find({ movieId })
//     .then((result) => {
//       if (!result.length) throw new ResourceNotFoundError("No review found");
//       res.json(result);
//     })
//     .catch((e) => next(e));
// });

// Get All reviews by userId.....................TO FIXX

// router.get("/", auth, (req, res, next) => {
//   const { userId } = req.query;
//   console.log("OuteruserId", userId);
//   Review.find({ userId })
//     .then((result) => {
//       console.log("result", result);
//       console.log("userId", userId);
//       if (!result.length) throw new ResourceNotFoundError("No review found");
//       res.json(result);
//     })
//     .catch((e) => next(e));
// });

module.exports = router;
