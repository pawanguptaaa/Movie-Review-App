const jwt = require("jsonwebtoken");
 module.exports=function(req,res,next){
    const token=req.header("auth-token");
    if(!token)
    return res.status(401).send("you do not have access");
    try{
       const verified=jwt.verify(token,"apappapjjgdoehjdgjgshgfd");
       req.user=verified;
       next();
    }
    catch(error){
       res.status(400).send("Invalid token");
    }
 }
