import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../Components/Header/Header";
import Home from "../Components/Home/Home";
import Login from "../Components/Login_Signup/Login/Login";
import Signup from "../Components/Login_Signup/Signup/Signup";
import Profile from "../Components/Profile/Profile";
import Product from "../Components/HomeComponent/Product/Product";
import ImageUploader from "../Components/ImageUploader/ImageUploder";
import ProgressCard from "../Components/test/test";
import ProductGrid from "../Components/HomeComponent/Product/Products";
import EditProfile from "../Components/Profile/Edit_Profile/Editprofile";
import Footer from "../Components/Footer/Footer";

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
        <Route path="/products" element={<Product />} />
        <Route path="/upload-image" element={<ImageUploader />} />
        <Route path="/progress" element={<ProgressCard />} />
        <Route path="/product-grid" element={<ProductGrid />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>

      {/* Footer should always be visible */}
      <Footer />
    </Router>
  );
}
