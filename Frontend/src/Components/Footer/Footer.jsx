import React, { useEffect, useState } from "react";
import "./Footer.css";  // Ensure CSS is imported

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // Show the button when scrolling down 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll smoothly to the top
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          {/* Contact Section */}
          <div className="footer-column contact-section">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-text">
              Email: <a className="footer-link" href="mailto:growallcoaching@gmail.com">growallcoaching@gmail.com</a>
            </p>
            <p className="footer-text">Phone: <span className="footer-phone">+123456789</span></p>
            <p className="footer-text">Address: <span className="footer-address">GrowallCoaching, Bhopal | India.</span></p>
          </div>

          {/* Quick Links Section */}
          <div className="footer-column quick-links-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-list">
              <li className="footer-list-item"><a className="footer-link" href="#home">Home</a></li>
              <li className="footer-list-item"><a className="footer-link" href="#about">About</a></li>
              <li className="footer-list-item"><a className="footer-link" href="#courses">Courses</a></li>
              <li className="footer-list-item"><a className="footer-link" href="#contact">Contact Us</a></li>
              <li className="footer-list-item"><a className="footer-link" href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="footer-column social-links-section">
            <h3 className="footer-title">Follow Us</h3>
            <div className="social-icons">
              <a className="social-icon" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="social-icon" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="social-icon" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="social-icon" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2025 <span className="footer-brand">GrowallCoaching</span>. All rights reserved.</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className="scroll-to-top-button" onClick={scrollToTop} aria-label="Scroll to top">
          &#8679;
        </button>
      )}
    </footer>
  );
}
