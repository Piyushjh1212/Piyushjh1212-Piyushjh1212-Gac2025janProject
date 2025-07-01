import React, { useContext, useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/Header.css";
import { GacContext } from "../Pages/GacContext/GacContext";
import { Link } from "react-router-dom";

export default function Header() {
  const [IsOpen, SetIsOpen] = useState(false);
  const { user, setUser } = useContext(GacContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const HandleRedirect = (path) => {
    window.location.href = path;
    SetIsOpen(false); // close menu on nav click
  };

  const HandleBars = () => {
    SetIsOpen(!IsOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profileDropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  useEffect(() => {
    const HandleClickOutside = (e) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target) &&
        !profileIconRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", HandleClickOutside);
    return () => document.removeEventListener("click", HandleClickOutside);
  }, []);

  const HandleLogin = () => {
    window.location.href = "/Login";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className={`Top_Header ${isScrolled ? "scrolled" : ""}`}>
      <div className="Second_Top_Container">
        <div>
          <img
            src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719838/mern-uploads/ejrkwcxdmqfjdxwyieo9.jpg"
            alt="image"
            width={50}
            height={50}
          />
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className={`menu_list ${IsOpen ? "open" : ""}`}>
            <li onClick={() => HandleRedirect("/")}>Home</li>
            <li onClick={() => HandleRedirect("/About")}>About</li>
            <li onClick={() => HandleRedirect("/Courses")}>Courses</li>
            <li onClick={() => HandleRedirect("/contact")}>Contact</li>
            <li onClick={() => HandleRedirect("/iit-jee")}>IIT JEE</li>
            {user && (
              <li onClick={() => HandleRedirect("/My_Courses")}>My Courses</li>
            )}
          </ul>
        </nav>

        {/* Right side buttons */}
        <div className="Headers_Bars">
          {!user ? (
            <button className="Login_button" onClick={HandleLogin}>
              Login
            </button>
          ) : (
            <div
              className="Header_ProfileIcon"
              role="button"
              aria-label="Toggle profile menu"
              aria-expanded={showProfileMenu}
              onClick={() => setShowProfileMenu((prev) => !prev)}
              ref={profileIconRef}
            >
              <img
                src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719843/mern-uploads/atrbtbitbymngbjrldsn.webp"
                alt="Profile"
                width={50}
                height={50}
              />
            </div>
          )}

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="profileDropdown show" ref={profileDropdownRef}>
              <Link to="/My_Profile" className="profileOption">
                My Profile
              </Link>
              <Link to="/MyCourse" className="profileOption">
                My Courses
              </Link>
              <button onClick={handleLogout} className="profileOption">
                Logout
              </button>
            </div>
          )}

          {/* Hamburger Icon */}
          <div className="menu-icon" onClick={HandleBars}>
            {IsOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
}
