import React, { useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import axios from 'axios';
import { axiosInstance } from './lib/axios.js';
import { useAuthStore } from './store/useAuthStore.js';
const App = () => {
  const {authUser,checkAuth}=useAuthStore()// this is defined in store ..
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App;