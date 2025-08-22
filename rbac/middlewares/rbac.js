const roles = require("../config/roles");
const jwt = require("jsonwebtoken");
const dotenv=require('dotenv');

exports.authorize =(requriedPermissions)=>{
    return(req,res,next)=>{
        const userRole = req.user.role;
        console.log(userRole)
        if(!roles[userRole] || !requriedPermissions.every(perm => roles[userRole].includes(perm))){
            return res.status(403).json({message:"Forbidden"});
        }
        next();
    }
}

exports.authenticate = (req,res,next)=>{
    try {
        const userToken = req.header("Authorization");
        if(!userToken){
            return res.status(401).json({message:'Access Denied'});
        }
        const token=userToken.split(" ");
        console.log(token)
        const verified = jwt.verify(token[1],process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({message:'Invalid Token'})
    }

}