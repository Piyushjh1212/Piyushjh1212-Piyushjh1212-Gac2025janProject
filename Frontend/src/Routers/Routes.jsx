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

export default function RoutesPage() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/product/:dbCategory/:id" element={<My_Courses />} />

        <Route path="/Login" element={< Login/>} />
        <Route path="/Signup" element={<SignupForm/>}/>
        <Route path="/Privacy_policy" element={<PrivacyPolicy/>}/>
        
      </Routes>

      <Footer />
    </Router>
  );
}
