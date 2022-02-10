const router = require("express").Router();
const Movie = require("../model/Movie");
const verifyy = require("../verifyToken");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//CREATE

router.post("/",verifyy,async(req,res)=>{
  const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
    const user = await User.findById({ _id: decode._id });
    if(user.isAdmin)
    {
       const newMovie = new Movie(req.body);
       try {
          const savedMovie = await newMovie.save();
          res.status(201).json(savedMovie);
       } catch (err) {
          res.status(500).json(err);
       }
    }
    else{
       res.status(403).json("You are not allowed!");
    }
  });

//UPDATE

router.put("/:id", verifyy, async (req, res) => {
  const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
    const user = await User.findById({ _id: decode._id });
  if (user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verifyy, async (req, res) => {
  const token =req.body.token || req.query.token || req.headers["auth-token"];
    const decode = jwt.verify(token, "apappapjjgdoehjdgjgshgfd");
    const user = await User.findById({ _id: decode._id });
  if (user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", verifyy, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;