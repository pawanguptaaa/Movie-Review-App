const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Errors = require("../errors");

const { UnAuthorisedError, BadRequest, STATUS_CODES, ErrorCodes } = Errors;
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "apappapjjgdoehjdgjgshgfd"
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.send(user);
  } catch (err) {
    throw new BadRequest("server error !", STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.send("Wrong password or username!");
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      "apappapjjgdoehjdgjgshgfd"
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.send("Wrong password or username!");

    const token = jwt.sign({ _id: user._id }, "apappapjjgdoehjdgjgshgfd");

    res.header("auth-token", token).send(token).toString();
  } catch (err) {
    throw new BadRequest("server error !", STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
