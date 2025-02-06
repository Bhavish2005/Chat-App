import Message from "../Models/Message.model.js";
import User from "../Models/User.model.js";

export const getAllUsers=async(req,res)=>{
try {
    const loggedinUser=req.user._id;
    const FilteredUsers=await User.find({_id:{$ne:loggedinUser}}).select("-password");
    res.status(200).json(FilteredUsers);
} catch (error) {
    console.log("error in get User Functionality ", error.message);
    res.status(500).json({message:"Internal Server Error"});
}
};
export const getMessages=async(req,res)=>{
    try {
        const{id:userToChatId}=req.params;
        const myId=req.body._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,ReceiverId:userToChatId},
                {senderId:userToChatId,ReceiverId:myId},
            ],
        });
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in get Messages Functioanlity :",error.message);
        res.status(500).json({message:"Internal Sever Error"});
    }
};
export const sendMessages=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageURL;
        if(image){
            const uploadResponse=await cloudinary.uplaoder.upload(image);
            imageURL=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageURL
        });
        await newMessage.save();
        // here Socket.io FUnctionality Will be done or Real time chatting..

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in Send message Functionality",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}