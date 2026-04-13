const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerUser = async(data)=>{
    const hashed=await bcrypt.hash(data.password,10);

    const user=await User.create({
        email:data.email,
        password:hashed
    });
    return user;
};

exports.loginUser = async(data)=>{
    const user=await User.findOne({ where :{email:data.email}});

    if(!user)  {
  return res.status(404).json({ message: "User not found" });
}

const valid= await bcrypt.compare(data.password, user.password);

if(!valid) {
  return res.status(401).json({ message: "Invalid password" });
}

const token=jwt.sign({id:user.id},"secretkey",{
    expiresIn:"1h"
});

return {token};
};