const jwt = require("jsonwebtoken");
const User = require("./model/User")
 module.exports=async function(req,res,next){
    const token=req.header("auth-token");
    if(!token)
    return res.status(401).send("you do not have access");
    try{
       const verified=jwt.verify(token,"apappapjjgdoehjdgjgshgfd");
       req.user=verified;
       const token = req.cookies['auth-token']
       const decoded=jwt.verify(token,'apappapjjgdoehjdgjgshgfd')
       const user=await User.findOne({id:decoded._id,'token':token})
       req.user=user
       req.token=token
       next();
    }
    catch(error){
       res.status(400).send("Invalid token");
    }
    
 }
