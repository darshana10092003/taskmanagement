const jwt= require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }

    try{
        req.user=jwt.verify(token,"secretkey");
        next();
    }catch(err){
        res.status(401).json({message:"Invalid token"});
    }
};