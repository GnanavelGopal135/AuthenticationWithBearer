import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../Model/user.schema.js';


dotenv.config();

export const authMiddleware=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(404).json({message:"Token is Missing"});
    }
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        console.log(req.user);
        const user=await User.findById(req.user._id);
        if(user.role != 'admin'){
            return res.status(401).json({message:"You are not Admin User"});
        }
        next();
    } catch (error) {
        return res.status(500).json({message:"Auth Middleware Server Error"});
    }
}