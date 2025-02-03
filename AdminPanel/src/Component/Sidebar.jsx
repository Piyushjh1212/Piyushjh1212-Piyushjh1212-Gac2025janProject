import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/admin/users" className="sidebar-link">Users</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/products" className="sidebar-link">Products</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/settings" className="sidebar-link">Settings</Link>
        </li>
        <li className="sidebar-item">
          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem("adminToken");
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
