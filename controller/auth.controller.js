const authService = require('../services/auth.service');

exports.register= async(req,res)=>{
    try{
        const user=await authService.registerUser(req.body);
        res.json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};

exports.login=async(req,res)=>{
    try{
        const result=await authService.loginUser(req.body);
        res.json(result);
    }
    catch(err){
        res.status(400).json({error:err.message});
}
finally {
    console.log("Login API called");
  }
};