import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Header from "../Components/Header/Header";
import Home from "../Components/Home/Home";
import Login from "../Components/Login_Signup/Login/Login";
import Signup from "../Components/Login_Signup/Signup/Signup";
import Profile from "../Components/Profile/MainProfile/Profile";
import ProgressCard from "../Components/Profile/KeyTopics/M_Courses/ProgressCard";
import EditProfile from "../Components/Profile/Edit_Profile/Editprofile";
import Footer from "../Components/Footer/Footer";
import Contact from "../Components/HomeComponent/Contact/Contact";
import ProductPage from "../Components/HomeComponent/Product/Products";
import Checkout from "../Components/HomeComponent/Product/Checkout/Checkout";
import MyCourses from "../Components/Profile/My_Courses/Mycourses";
import CourseOutline from "../My_Course_List/Html$Css/Html"; // Your Course Outline component
import VideoLecture from "../Vedio_Lectures/VideoLecture";
import Product from "../Components/HomeComponent/Product/Product_here/Product";
import VideoPreview from "../My_Course_List/Html$Css/Video/VideoPreview";
import PrivacyPolicy from "../Components/HomeComponent/PrivacyPolicy/PrivacyPolicy";

export default function Page() {
  return (
    <Router>
      {/* Header should always be visible */}
      <Header />

      {/* Route Handling */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile and Product Pages */}
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Products" element={<ProductPage />} />
        <Route path="/progress" element={<ProgressCard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/show-products" element={<Product />} />
        <Route path="/products/checkout" element={<Checkout />} />

        {/* My Courses Routes */}
        <Route path="/MyCourse" element={<MyCourses />} />
        <Route path="/MyCourse/:courseId" element={<CourseOutline />} /> {/* Route for HTML and CSS Course Outline */}

        {/* Dynamic Routes for Lessons and Subtopics */}
        <Route path="/course/html-css/lesson-:lessonId/subtopic-:subtopicId" element={<VideoLecture />} /> {/* Fixed route for VideoLecture */}
        <Route path="/watch-video" element={<VideoLecture/>} />

        <Route path="/Vedio-watch" element={<VideoPreview/>}/>

        {/* Privacy Policy  */}
        <Route path="/growallcoaching/Privacy-policy" element={<PrivacyPolicy/>}/>
      </Routes>

      {/* Footer should always be visible */}
      <Footer />
    </Router>
  );
}
