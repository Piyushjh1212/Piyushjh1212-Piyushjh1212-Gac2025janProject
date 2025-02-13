import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "../Component/Products";
import Settings from "../Component/Settings";
import Login from "../Component/Login";
import Users from "../Component/Users";
import Sidebar from "../Component/Sidebar";
import CreateProduct from "../Components/AddNewProduct";
import VideoUploader from "../Components/VedioUploader/VideoUploader";
import UserDisplay from "../Component/UserDataDisplay/UserDisplay/UserDisplay";
import FormDisplay from "../Component/UserDataDisplay/PaymentDisplay/FormDisplay";

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
              <Route path="/admin/add-new-product" element={<CreateProduct />} />
              <Route path="/admin/add-new-Vedio" element={<VideoUploader />} />
              <Route path="/admin/UserdataDisplay" element={<UserDisplay />} />
              <Route path="/admin/FormdataDisplay" element={<FormDisplay />} />

              {/* Fallback route for unknown paths */}
              <Route path="*" element={<Navigate to="/admin/users" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
}
