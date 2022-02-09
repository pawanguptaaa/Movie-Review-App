const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');
const res = require('express/lib/response');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/register',async(req,res) => {
       
    
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

       const user = {
       name: req.body.name, 
       email: req.body.email,
       password: hashedPassword

    };

    try{
         const savedUser = await User.create(user);
         console.log(savedUser);
          res.send(savedUser);
       }
       catch(err){
        res.status(400).send(err);
        
    }
});



 router.post('/login', async(req,res) => {
       
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');
    
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    
     
     const token =jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
     res.header('auth-token', token).send(token);

 });



module.exports = router;