import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['user','admin'],
    },
    token:{
        type:String,
        
    }

})

 const User=mongoose.model('User',userSchema);

    export default User;