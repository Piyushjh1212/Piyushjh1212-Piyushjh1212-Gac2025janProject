import React from "react";

export default function Header() {
  return (
    <header>
      <div>
        <img src="GAC.jpg" alt="" />
      </div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label
        htmlFor="menu-toggle"
        className="hamburger"
        aria-label="Toggle menu"
      >
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
          <div
            className="profile-icon"
            role="button"
            aria-label="Toggle profile menu"
            aria-expanded={showProfileMenu}
            onClick={toggleProfileMenu}
            ref={profileIconRef}
          >
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
