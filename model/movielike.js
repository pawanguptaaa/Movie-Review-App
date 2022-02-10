const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movielikeSchema = mongoose.Schema(
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

const MovieLike = mongoose.model("MovieLike", movielikeSchema);

module.exports = { MovieLike };