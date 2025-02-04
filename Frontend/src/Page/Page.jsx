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
// import Products from "../Components/HomeComponent/Product/Product";

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

        {/* Profile and Product Pages */}
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/Contact" element={<Contact />} />
        
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/progress" element={<ProgressCard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/show-products" element={<Product />} />
      </Routes>

      {/* Footer should always be visible */}
      <Footer />
    </Router>
  );
}
