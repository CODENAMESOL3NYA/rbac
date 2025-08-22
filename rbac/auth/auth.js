const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password,confirm_password, role } = req.body;

    if(!username||!password||!confirm_password||!role){
        return res.status(400).json({message:"Required Fields Missing"});
    }
    if(password!=confirm_password){
        return res.status(400).json({message:"Passwords Don't Match"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if(!hashedPassword){
         return res.status(409).json({message:"Failed to Create Account"});
    }

    const user = new User({username,password:hashedPassword,role})
    const newUser = await user.save();

    if(!newUser){
        return res.status(409).json({message:"Failed to Create A User"});
    }

    const payload={
        username:newUser.username,
        role:newUser.role
    }

    res.status(200).json({message:"User Registered",data:payload})

  } catch (error) {
    res.status(500).json({error:"Internal Server Error"})  }
};

exports.login = async (req,res) => {
    try {
        const{ username, password }=req.body;
        if(!username||!password){
            return res.status(400).json({message:"Required Fields Missing"})
        }
        const user = await User.findOne({username});
        
        if(!user||!(await bcrypt.compare(password,user.password))){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET,{expiresIn:'1h'})
        res.json({token:token})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})  
    }
};
