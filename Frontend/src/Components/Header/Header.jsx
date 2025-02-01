import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Refs for dropdowns and profile icon
  const cartDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  // Get current location from react-router
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    setToken(null);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    // Handle clicks outside the dropdowns and profile icon to close them
    const handleClickOutside = (event) => {
      // If click is outside of profile dropdown or profile icon
      if (
        profileDropdownRef.current && !profileDropdownRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      // If click is outside of cart dropdown
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("click", handleClickOutside);
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);

  // Close dropdowns when location changes (e.g., when navigating to home page)
  useEffect(() => {
    setShowCart(false);
    setShowProfileMenu(false);
  }, [location]);

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const toggleCartVisibility = () => setShowCart((prev) => !prev);

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
            <Link to="/EditProfile">About</Link>
          </li>
          <li>
            <Link to="/Products">Courses</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/Progress">IIT-JEE</Link>
          </li>
        </ul>
      </nav>

      <div className="login-cart">
        <div className="profile-container">
          {token ? (
            <div
              className="profile-icon"
              role="button"
              aria-label="Toggle profile menu"
              aria-expanded={showProfileMenu}
              onClick={toggleProfileMenu}
              ref={profileIconRef}
            >
              <img src="Assets/profile.webp" alt="Profile" width={50} height={50} />
            </div>
          ) : (
            <Link to="/login"><h1 className="login-btn">Login</h1></Link>
          )}
          {showProfileMenu && (
            <div className="profile-dropdown show" ref={profileDropdownRef}>
              <Link to="/my-profile" className="profile-option profile_1">My Profile</Link>
              <Link to="/my-courses" className="profile-option profile_1">My Courses</Link>
              <button  onClick={handleLogout} className="profile-option">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
