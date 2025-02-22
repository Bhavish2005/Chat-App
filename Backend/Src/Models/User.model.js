import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    fullName:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    },

},{timestamps:true}// this is important for seeing the Created At and Updated At information..
);
const User=mongoose.model("User",userSchema);
export default User;