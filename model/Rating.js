const mongoose = require('mongoose');

const { Schema } = mongoose;

const ratingSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = { Rating };
