import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/admin/users" className="sidebar-link">
            User-Data
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/products" className="sidebar-link">
            Products
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/add-new-product" className="sidebar-link">
            Add image
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/video-upload" className="sidebar-link">
            Add Vedios
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/settings" className="sidebar-link">
            Settings
          </Link>
        </li>
        <li className="sidebar-item">
          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem("adminToken");
              navigate("/");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
