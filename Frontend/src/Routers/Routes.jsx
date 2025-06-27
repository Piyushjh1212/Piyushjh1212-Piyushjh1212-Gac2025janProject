import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Courses from "../Pages/Courses";
import Contact from "../Pages/Contact";
import Login from "../Component/Login_Page/Login";
import SignupForm from "../Component/Login_Page/Signup";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import My_Courses from "../Pages/My_Courses.jsx/My_Courses";
import CheckoutPage from "../Pages/My_Courses.jsx/CheckoutPage";
import MyCourses from "../Pages/My_Courses.jsx/CoursePurchased";
// import MyCourse_ListPage from "../Pages/My_Courses.jsx/MyCourse_List/My_CourseList";
// import CoursesPage from "../Pages/Courses";
import PurchaseLectureCourse from "../components/CoursesPage";

export default function RoutesPage() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/My_Courses" element = {<MyCourses/>}/>
        {/* <Route path="/My_Courses_Leacture" element= {<MyCourse_ListPage/>}/> */}

        <Route path="/product/:id" element={<My_Courses />} />
        <Route path="/Checkout" element={<CheckoutPage />} />

          <Route path="/my-purchased-course-list" element={<PurchaseLectureCourse />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignupForm />} />
        <Route path="/Privacy_policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </Router>
  );
}
