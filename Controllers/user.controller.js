import User from "../Model/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register user
export const registerUser=async(req,res)=>{
    const {userName,email,password,role}=req.body;
    const hashPassword=await bcrypt.hash(password,12);
    try{
        const newUser=new User({
            userName,email,password:hashPassword,role
        });
        await newUser.save();
        res.status(201).json({message:"User registered successfully",data:newUser});
    }catch(err){
        res.status(500).json({message:"Failed to register user"});
    }
}


// Login user
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Please Check Your Password"});
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"2hr"});
        user.token=token;
        res.status(200).json({message:"User Logged In Successfully",token:token});
    }catch(err){
        res.status(500).json({message:"Login Server Error"});
    }
}


// Get User
export const getUser=async(req,res)=>{
    try{
        const userId=req.user._id;
        const user=await User.findOne({_id:userId});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json({message:"User found",user});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
}