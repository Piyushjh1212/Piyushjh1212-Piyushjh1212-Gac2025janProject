import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Products from "../Component/Products";
import Settings from "../Component/Settings";
import Login from "../Component/Login";
import Users from "../Component/Users";
import Sidebar from "../Component/Sidebar";
import UserDisplay from "../Component/UserDataDisplay/UserDisplay/UserDisplay";
import FormDisplay from "../Component/UserDataDisplay/PaymentDisplay/FormDisplay";
import CreateProduct from "../Components/Add_Vedio_Image/ImageAdd/AddNewProduct";
import CreateVideoAndSave from "../Components/Add_Vedio_Image/VedioAdd/Addvedio";
// import VideoUploader from "../Components/VedioUploader/VideoUploader";
import VideoUpload from "./videoUploader";
import ImageUploader from "../Components/ImageUploader/ImageUploader";
import VideoUploader from "../Component/VideoUploader/VideoUploader";
import CourseRendering from "./CoursesRendering";

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
              <Route
                path="/admin/add-new-product"
                element={<CreateProduct />}
              />
              <Route
                path="/admin/add-new-Vedio"
                element={<CreateVideoAndSave />}
              />
              <Route path="/admin/UserdataDisplay" element={<UserDisplay />} />
              <Route path="/admin/FormdataDisplay" element={<FormDisplay />} />
             
              {/* Fallback route for unknown paths */}
              <Route path="*" element={<Navigate to="/admin/users" />} />
              <Route path="/Piyush" element={<CreateVideoAndSave />} />
              <Route path="/upload-video" element={<VideoUpload />} />

              <Route path="/Upload-image" element={<ImageUploader />} />
              <Route path="/admin/video-upload" element={<VideoUploader />} />
              <Route path="/rendering" element={<CourseRendering/>} />
              
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
}
