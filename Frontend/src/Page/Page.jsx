import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Header from '../Components/Header/Header'
import Home from '../Components/Home/Home'
import Login from '../Components/Login_Signup/Login/Login';
import Signup from '../Components/Login_Signup/Signup/Signup';
import Profile from '../Components/Profile/Profile';
import ImageUpload from '../Components/ImageUpload';
import Product from '../Components/HomeComponent/Product/Product';

export default function Page() {
  return (
    <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />

            {/* Login and Signup routes are added here */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* my profile routes are added here */}
            <Route path="/my-profile" element={<Profile />} />
            <Route path='/upload-image' element={<ImageUpload />} />

            <Route path="/Products" element={<Product/>} />

            

        </Routes>
    </Router>
  )
}
