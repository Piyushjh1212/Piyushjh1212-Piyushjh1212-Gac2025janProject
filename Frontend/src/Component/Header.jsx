import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css"; // CSS Module

export default function Header() {
  const [showCart, setShowCart] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglemenu = () => setIsOpen(!isOpen);

  // Refs for dropdowns and profile icon
  const cartDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  const location = useLocation();

 const isContactPage =
  location.pathname === "/checkout" ||
  location.pathname === "/contact" ||
  location.pathname === "/Courses" ||
  location.pathname === "/My_Profile"||
  location.pathname === "/MyCourse"||
  matchPath("/product/:dbCategory/:id", location.pathname) !== null;
  



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null); // Optional: state reset
    navigate("/"); // Go to login page
    window.location.reload(); // Reset the UI
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target)
      ) {
        setShowCart(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowCart(false);
    setShowProfileMenu(false);
    setIsOpen(false); // Close menu on route change
  }, [location]);

  const LogoinHandlepage = () => {
    window.location.href = "/login";
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <img
          src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719838/mern-uploads/ejrkwcxdmqfjdxwyieo9.jpg"
          alt="image"
          width={50}
          height={50}
        />
      </div>

      {/* Nav Links */}
      <nav className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""} ${isContactPage ? "navbar-contact" : "navbar-default"}`}>
        <ul className={isContactPage ? styles.checkoutUl : ""}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/Courses">Courses</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <a href="https://www.google.com/" rel="noopener noreferrer">
              IIT/JEE
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.loginCart}>
        <div className={styles.profileContainer}>
          {token ? (
            <div
              className={styles.profileIcon}
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
          ) : (
            <h1 className={styles.LoginButton} onClick={LogoinHandlepage}>
              Login
            </h1>
          )}
          {showProfileMenu && (
            <div
              className={`${styles.profileDropdown} ${styles.show}`}
              ref={profileDropdownRef}
            >
              <Link to="/My_Profile" className={styles.profileOption}>
                My Profile
              </Link>
              <Link to="/MyCourse" className={styles.profileOption}>
                My Courses
              </Link>
              <button onClick={handleLogout} className={styles.profileOption}>
                Logout
              </button>
            </div>
          )}

          {/* Hamburger Icon */}
          <div className={styles.menuIcon} onClick={togglemenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
}
