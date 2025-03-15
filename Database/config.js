import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();
const MONGODB_URI=process.env.MONGODB;
const connectDB=async()=>{
    try{
        const connection=await mongoose.connect(MONGODB_URI);
        console.log("Database connected");
        
    }catch(err){
        console.log(err);
    }
}

export default connectDB;