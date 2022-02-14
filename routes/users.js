const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const jwt = require("jsonwebtoken");
//UPDATE

router.put("/:id", verify, async (req, res) => {
  const token =req.body.token || req.query.token || req.headers["auth-token"];
  const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
  const user = await User.findById({ _id: decode._id });
  if (user.isAdmin) {
    

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  const token =req.body.token || req.query.token || req.headers["auth-token"];
  const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
  const user = await User.findById({ _id: decode._id });
  if (user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const token =req.body.token || req.query.token || req.headers["auth-token"];
  const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
  const user = await User.findById({ _id: decode._id });
 
    try {
      const users = token
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;