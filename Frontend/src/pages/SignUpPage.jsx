import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { Eye, EyeOff, Loader2, LockKeyholeIcon, MailQuestionIcon, MessageSquareQuote, User } from 'lucide-react';
import {Link} from "react-router-dom"
import chatting from '../Assest/chatting .png'
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const[showPassword,setShowPassword]=useState(false);
 const[formData,setFormData]=useState({
  fullName:"",
  email:"",
  password:"",
 });
 const {signup,isSigningUp}=useAuthStore();
 const validateForm=()=>{
if(!formData.fullName.trim()) return toast.error("Name is Required Field");
  if(!formData.email.trim()) return toast.error("Email is Required Field");
  if(! /\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format");//this is because in data base the emial is of type string..
  if(!formData.password) return toast.error("Password Is Required Field");
  if(formData.password.length<6) return toast.error("Password Must of at least length 6 characters");
  return true;
 }
 const handleSubmit=(e)=>{
  e.preventDefault();
  const success=validateForm()
  if(success==true)
    signup(formData);
 }

  return (
    <div className='min-h-screen grid  lg:grid-cols-2'>
   
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center md-8'>
            <div className="flex flex-col items-center  gap-2 group">
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquareQuote className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-3'> Create An Account</h1>
              <p className='text-base-content/60'>Get Started with Easiest Setup and Interactive Chat features</p>
            </div>
          </div>
          <form  onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='size-5 text-base-content/40'/>
              </div>
              <input type='text' className={`input input-boarded w-full pl-10`} placeholder='Enter the Name' value={formData.fullName} onChange={(e)=>setFormData({...formData,fullName:e.target.value})}/>
            </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <MailQuestionIcon className='size-5 text-base-content/40'/>
              </div>
              <input type='email' className={`input input-boarded w-full pl-10`} placeholder='Enter your Email' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
            </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <LockKeyholeIcon className='size-5 text-base-content/40'/>
              </div>
              <input type={showPassword?"text":"password"} className={`input input-boarded w-full pl-10`} placeholder='Enter the Password' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
              <button type="button" className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>setShowPassword(!showPassword)}>
                {
                  showPassword?(
                    <EyeOff className='size-5 text-base-content/40'/>
                  ):(
                    <Eye className='size-5 text-base-content/40'/>
                  )
                }
              </button>
            </div>
            </div>
            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {
                isSigningUp ? (
                  <>
                    <Loader2 className='size-5 animate-spin'/>
                    It will take a Second....
                  </>
                ):(
                  "Sign Up"
                )
              }
            </button>
          
          </form>
          <div className='text-center'>
              <p className='text-base-center/60'>
                If You Have Already An Account{" "}
                <Link to="/login" className="link link-primary no-underline ">
                  Click Here
                </Link>
              </p>
            </div>
        </div> 
      </div>
      <div className=' hidden lg:flex items-center justify-center bg-base-200 p-12'>
      <div className='max-w-md text-center'>
        <img src={chatting}  className="animate-[grow-shrink_2s_infinite_ease-in-out]"></img>
      <h1 className='text-2xl font-bold mb-4'> Join Our Community </h1>
    <p class="text-base-content/60"> Connect with Friends, Share Moments and Stay in Touch with your Loved Once</p>
      </div>
      </div>
    </div>
  )
}

export default SignUpPage