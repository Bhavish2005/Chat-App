import mongoose from "mongoose";
export const connectDB= async()=>{
  try{
    const conn=await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongo DB Database is Connected: ${conn.connection.host}`);
  }
  catch(error){
        console.log("MongoDB connection Error", error);
  }

}
