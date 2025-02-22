import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data });

        } catch (error) {
            console>log("erorr in Check Auth:",error);
            set({authUser:null});

        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup: async(data)=>{
        set({isSigningUp:true});
        try {
            const response=await axiosInstance.post("/auth/signup",data);
            set({authUser:response.data});
            toast.success("Account Created");
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }
    },
    logout: async()=>{
       
        try{
            await axiosInstance.post("/auth/logout");
             set({authUser:null});
            toast.success("User Logged Out Successfully");

        }catch(error){
            toast.error(error.response.data.message)
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try{
            const response=await axiosInstance.post('/auth/signin',data);
            set({authUser:response.data});
            toast.success(" User Logged In Successfully");

        }
        catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    }


})
)