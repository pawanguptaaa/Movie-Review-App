const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 250,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    token: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],

  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
  const user = this;
  return jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
module.exports = { User };
