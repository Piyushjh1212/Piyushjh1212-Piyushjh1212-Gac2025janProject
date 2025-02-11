import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Components/Header/Header";
import Home from "../Components/Home/Home";
import Login from "../Components/Login_Signup/Login/Login";
import Signup from "../Components/Login_Signup/Signup/Signup";
import Profile from "../Components/Profile/Profile";
import ProgressCard from "../Components/Profile/KeyTopics/M_Courses/ProgressCard";
import EditProfile from "../Components/Profile/Edit_Profile/Editprofile";
import Footer from "../Components/Footer/Footer";
import Product from "../Components/HomeComponent/Product/Product";
import Contact from "../Components/HomeComponent/Contact/Contact";
import ProductPage from "../Components/HomeComponent/Product/Products";
import Checkout from "../Components/HomeComponent/Product/Checkout/Checkout";
import MyCourses from "../Components/Profile/My_Courses/Mycourses";
import CourseOutline from "../Components/Profile/My_Courses/CourseOutline/Courseoutline";

export default function Page() {
  return (
    <Router>
      {/* Header should always be visible */}
      <Header />

      {/* Route Handling */}
      <Routes>
        <Route path="/" element={<Home />} />


        {/* Login and Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MyCourse" element={<MyCourses />} />

        {/* Profile and Product Pages */}
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Products" element={<ProductPage/>}/>
        
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/progress" element={<ProgressCard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/show-products" element={<Product />} />
        <Route path="/products/checkout" element={<Checkout/>}/>
        <Route path="/MyCourse/Outline" element={<CourseOutline/>}/>
        



        

      </Routes>

      {/* Footer should always be visible */}
      <Footer />
    </Router>
  );
}
