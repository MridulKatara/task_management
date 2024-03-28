const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.send({msg:"login first"})
    }
    jwt.verify(token,process.env.jwt_secret, function(err, decoded) {
        if(decoded){
            const userId=decoded.userId
            req.userId=userId
            next();
        }
    });
}
module.exports=auth