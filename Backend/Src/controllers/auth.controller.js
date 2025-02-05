import { generatetoken } from "../lib/utilis.js";
import User from "../Models/User.model.js";
import bcrypt from "bcryptjs"
export const signup= async(req,res)=>{
   const {fullName,email,password}=req.body;
   try {
     if(password.length<6)
        return res.status(400).json({message:"Password must be at least of Length 6"});
     const user= await User.findOne({email})
     if( user)
        return res.status(400).json({message:"Email already Registered"})
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser=  new User({
        fullName:fullName,
        email: email,
        password:hashedPassword
    })
    if(newUser){
        //generate The JWT Token...
        generatetoken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic

        })
        
    }
    else{
        res.status(400).json({message:" Invalid user Data"})
        }
   } catch (error) {
    console.log("Error in Sign Up ",error.message);
    res.status(500).json({message:"Internal Server Error"});
   }
    
};
export const signin= async(req,res)=>{
     const{fullName,email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Wrong Credentials"});
        }
        const isPasswordCorrected=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrected){
            return res.status(400).json({message:"Wrong Password"});
        }
        generatetoken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });
    } catch (error) {
        console.log("Error in Sign in Functionality",error.message);
        res.status(500).json({message:"Internal Server Error "});
    }
};
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
   res.status(200).json({message:"Logged out Successfully"});
    } catch (error) {
        console.log("error in Logout Functionality",error.message);
    }
   
};
export const updateProfile=async(req,res)=>{
try {
    const {profilePic}=req.body;
    const userId=req.user._id;
    if(!profilePic){
        return res.status(400).json({message:"Profile Pic is Required"});
    }
    const uplaodResponse=await cloudinary.uploader.upload(profilePic);
    const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uplaodResponse.secure_url},{new:true})
    res.status(200).json(updateUser);
} catch (error) {
    console.log("error in update profile",error);
    res.status(500).json({message:"Internal Server Error"});
}
};
export const checkAuth=(req,res)=>{
try {
    res.status(200).json(req.user);
} catch (error) {
    console.log("error in check auth ",error.message);
    res.status(500).json({message:"Internal Server Error"});
}
}