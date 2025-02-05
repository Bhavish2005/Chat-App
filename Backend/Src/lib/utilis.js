import jwt from "jsonwebtoken"
export const generatetoken=(userId,res)=>{
const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"7d",
});
res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000,//MS
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV!=="development",// this means cookoie will be sent on not only HTTPs but if you want for HTTPS then change the !== to ===..
});
return token;
};