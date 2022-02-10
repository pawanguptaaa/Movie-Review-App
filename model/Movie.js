const mongoose = require("mongoose");

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
  },

  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);