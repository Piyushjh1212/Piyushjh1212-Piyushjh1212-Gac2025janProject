import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/Assets/GAC.jpg" alt="image" width={50} height={50} />
      </div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="Bars" aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </label>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/Coarses">Courses</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/contact">IIT-JEE</Link>
          </li>
        </ul>
      </nav>

      <div className="login-cart">
        <div className="profile-container">
          <div className="profile-icon">
            <img
              src="assets/profile.webp"
              alt="Profile"
              width={50}
              height={50}
            />
          </div>
          <Link to="/login">
            <h1 className="login-btn">Login</h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
