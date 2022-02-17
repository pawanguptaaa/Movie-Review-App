const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const jwt = require("jsonwebtoken");
const Errors = require("../errors");

const { UnAuthorisedError, BadRequest, STATUS_CODES, ErrorCodes } = Errors;
//UPDATE

router.put("/:id", verify, async (req, res) => {
  const token = req.body.token || req.query.token || req.headers["auth-token"];
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
      res.send(updatedUser);
    } catch (err) {
      throw new BadRequest(
        "server error !",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  } else {
    throw new UnAuthorisedError(
      "Unauthorized request !",
      STATUS_CODES.UNAUTHENTICATED_REQUEST
    );
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  const token = req.body.token || req.query.token || req.headers["auth-token"];
  const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
  const user = await User.findById({ _id: decode._id });
  if (user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.send("User has been deleted...");
    } catch (err) {
      throw new BadRequest(
        "server error !",
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  } else {
    throw new UnAuthorisedError(
      "Unauthorized request !",
      STATUS_CODES.UNAUTHENTICATED_REQUEST
    );
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.send(info);
  } catch (err) {
    throw new BadRequest("server error !", STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  const token = req.body.token || req.query.token || req.headers["auth-token"];
  const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
  const user = await User.findById({ _id: decode._id });

  try {
    const users = token
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.send(users);
  } catch (err) {
    throw new BadRequest("server error !", STATUS_CODES.INTERNAL_SERVER_ERROR);
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
    res.send(data);
  } catch (err) {
    throw new BadRequest("server error !", STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;
