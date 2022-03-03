const mongoose = require('mongoose');

const { Schema } = mongoose;

// change comment to review
const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };
