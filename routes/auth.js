const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


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
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, "apappapjjgdoehjdgjgshgfd");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    
    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const token = jwt.sign({ _id: user._id},"apappapjjgdoehjdgjgshgfd");
    res.cookie('auth-token',token)

    
    res.header("auth-token",token).send(token).toString();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;