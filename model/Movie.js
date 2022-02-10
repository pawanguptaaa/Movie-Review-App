const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true, 
        unique: true 
    },
    desc: { 
        type: String 
    },
    year: { 
        type: String 
    },
    genre: { 
        type: String 
    },
    movielike: {
      type: Schema.Types.ObjectId,
      ref: "MovieLike",
    },
    moviedislike: {
      type: Schema.Types.ObjectId,
      ref: "MovieDisLike",
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);