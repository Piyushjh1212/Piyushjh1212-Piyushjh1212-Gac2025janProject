import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "../Component/Products";
import Settings from "../Component/Settings";
import Login from "../Component/Login";
import Users from "../Component/Users";
import Sidebar from "../Component/Sidebar";


export default function AdminDashboard() {
  const isAdmin = localStorage.getItem("adminToken"); // Example: Token for authentication

  return (
    <Router>
      {isAdmin ? (
        <div className="admin-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/settings" element={<Settings />} />
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
