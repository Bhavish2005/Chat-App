// const express=require("express")
import express from "express";//step 1// put this file under source folder
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/database.js";
import cookieParser from "cookie-parser"
dotenv.config();
const app=express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log("server is Running on Port "+(PORT))
    connectDB();
})