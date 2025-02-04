import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css"; // Import CSS Module

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
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        !profileIconRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowCart(false);
    setShowProfileMenu(false);
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/Assets/GAC.jpg" alt="image" width={50} height={50} />
      </div>
      <input type="checkbox" id="menu-toggle" className={styles.menuToggle} />
      <label htmlFor="menu-toggle" className={styles.Bars} aria-label="Toggle menu">
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </label>
      <nav className={styles.navLinks}>
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
            <Link to="/IIT-JEE">IIT-JEE</Link>
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
              <img src="Assets/profile.webp" alt="Profile" width={50} height={50} />
            </div>
          ) : (
            <Link to="/login">
              <h1 className={styles.loginBtn}>Login</h1>
            </Link>
          )}
          {showProfileMenu && (
            <div className={`${styles.profileDropdown} ${styles.show}`} ref={profileDropdownRef}>
              <Link to="/my-profile" className={styles.profileOption}>My Profile</Link>
              <Link to="/my-courses" className={styles.profileOption}>My Courses</Link>
              <button onClick={handleLogout} className={styles.profileOption}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
