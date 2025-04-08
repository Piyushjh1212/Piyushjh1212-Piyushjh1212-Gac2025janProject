import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate,} from "react-router-dom";

import Sidebar from "./Component/Sidebar";
import Users from "./UserComponent/Users/Users";
import Products from "./Component/Products";
import Settings from "./Component/Settings";
import Login from "./Component/Login";
import Addvedio from "./Component_uploader/Add_Vedio_Image/VedioAdd/Addvedio";
import VideoUploader from "./Component_uploader/VedioUploader/VideoUploader";
import ImageUploader from "./Component_uploader/ImageUploader/ImageUploader";
import CourseRendering from "./Course_Rendering/CoursesRendering";
import VideoUpload from "./Course_Rendering/videoUpload";
import CourseData from "./Course_Rendering/Course_data/CourseData";
import CreateProduct from "./Component_uploader/Add_Vedio_Image/ImageAdd/AddNewProduct";
import UserDisplay from "./UserDataDisplay/UserDisplay/UserDisplay";
import PaymentFormDisplay from "./UserDataDisplay/PaymentDisplay/FormDisplay";

// import UserDisplay from "../Component/UserDataDisplay/UserDisplay/UserDisplay";
// import FormDisplay from "../Component/UserDataDisplay/PaymentDisplay/FormDisplay";
// import CreateProduct from "../Component_uploader/Add_Vedio_Image/ImageAdd/AddNewProduct";
// import CreateVideoAndSave from "../Component_uploader/Add_Vedio_Image/VedioAdd/Addvedio";
// import VideoUploader from "../Components/VedioUploader/VideoUploader";
// import VideoUpload from "./videoUploader";
// import ImageUploader from "../Component_uploader/ImageUploader/ImageUploader";
// import VideoUploader from "../Component/VideoUploader/VideoUploader";
// import CourseData from "../Add_Coursedata/CourseData";

export default function AdminDashboard() {
  const isAdmin = true; // Example: Token for authentication or check if the user is an admin

  return (
    <Router>
      {isAdmin ? (
        <div style={{ display: "flex" }} className="admin-container">
          <Sidebar />
          <div className="content">
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/video-upload" element={<VideoUploader />} />



              {/* {login here} */}
              <Route path="Login" element={<Login/>}/>

              <Route path="/admin/add-new-product" element={<CreateProduct />}/>
             
             
              {/* Fallback route for unknown paths */}
              <Route path="*" element={<Navigate to="/admin/users" />} />

              <Route path="/Piyush" element={<Addvedio />} />
              <Route path="/upload-video" element={<VideoUpload />} />

              <Route path="/Upload-image" element={<ImageUploader />} />
              <Route path="/rendering" element={<CourseRendering/>} />
              <Route path="/Course_Data" element={<CourseData />} />
              // User Display home filter
              <Route path="/admin/UserdataDisplay" element={<UserDisplay />} />
              <Route path="/admin/PaymentDisplay" element={<PaymentFormDisplay />} />
              
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
}
