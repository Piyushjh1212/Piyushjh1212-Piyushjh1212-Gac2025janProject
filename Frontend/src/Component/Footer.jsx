import React from "react";
import "../Styles/Footer.css";

export default function Footer() {
 const HanldePrivacyPolicy = () => {
  window.location.href = "/Privacy_policy";
};

  return (
    <footer className="main_footer">
      <div className="footer_container">
        <div className="footer_section">
          <h2 className="footer_logo">Growall Coaching</h2>
          <p>Empowering learners to achieve their dreams through high-quality education.</p>
        </div>

        <div className="footer_section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer_section">
          <h3>Contact</h3>
          <p>Email: support@growall.in</p>
          <p>Phone: +91-9876543210</p>
        </div>
      </div>

      <div className="footer_bottom">
        <p>© {new Date().getFullYear()} Growall Coaching. All rights reserved. <span className="PrivacyPolicy"><a onClick={HanldePrivacyPolicy}>Privacy Policy.</a></span></p>
      </div>
    </footer>
  );
}
