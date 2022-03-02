const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    genre: { type: [String], required: true },
  },

  { timestamps: true },
);

// module.exports = mongoose.model("Movie", MovieSchema);
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = { Movie };
