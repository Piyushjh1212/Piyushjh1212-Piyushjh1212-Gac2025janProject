import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Component/Header";
import Home from "../HomePage/Home";
import Login from "../Component/Login_Signup/Login";
import Product from "../HomeComponent/CoursesPage/Productpage/Product";
import CheckoutPage from "../HomeComponent/CoursesPage/CheckoutPage/CheckoutPage";
import Aboutsecond from "../HomeComponent/About/About_2/About_2";
import Footer from "../Component/Footer";
import Contact from "../HomeComponent/Contact/Contact";
import ProductPage from "../HomeComponent/CoursesPage/Courses";
import MyCourses from "../MyProfilepage/MyCourses";
import PrivacyPolicy from "../HomeComponent/PrivacyPolicy/Privacy";
import Signup from "../Component/Login_Signup/Signup";
import Profile from "../My_profile/Main_profile/Profile";
import MainProduct from "../HomeComponent/CoursesPage/Productpage/Product";
import CourseOutline from "../My_profile/Purchased_Course/CoursesOutline";
import ProductDetailPage from "../HomeComponent/CoursesPage/Productpage/product2";
import ScrollToTop from "../Component/ScrollTotop";
import ProductDetailPages from "../HomeComponent/CoursesPage/Productpage/Productdetail"




function Page() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/About" element={<Aboutsecond />} />
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Courses" element={<ProductPage/>}/>
        
        {/* Login_Signup */}
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/show-products" element={<Product/>} />
        <Route path="/products/checkout" element={<CheckoutPage/>}/>

        {/* product_Page_seperate */}
        {/* <Route path="/productss" element={<MainProduct/>} /> */}

        {/* courses */}
        <Route path="/course/:id" element={<MainProduct />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/product/:dbCategory/:id" element={<ProductDetailPages />} />



        {/* profilehere */}
        <Route path="/My_Profile" element={<Profile/>}/>
        <Route path="/MyCourse" element={<MyCourses/>}/>

        <Route path="/MyCourse/:courseId" element={<CourseOutline/>}/>
        <Route path="/growallcoaching/Privacy-Policy" element= {<PrivacyPolicy/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Page;
