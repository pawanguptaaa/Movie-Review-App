const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieDislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
    },
  },
  { timestamps: true }
);

const MovieDisLike = mongoose.model("MovieDisLike", movieDislikeSchema);

module.exports = { MovieDisLike };