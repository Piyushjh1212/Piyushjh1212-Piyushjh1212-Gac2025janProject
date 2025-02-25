import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Import React Icons
import styles from "./Footer.module.css"; // Import CSS Module

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // Show button after scrolling 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          {/* Contact Section */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Contact Us</h3>
            <p className={styles.footerText}>
              Email: <a className={styles.footerLink} href="mailto:growallcoaching@gmail.com">growallcoaching@gmail.com</a>
            </p>
            <p className={styles.footerText}>Phone: +123456789</p>
            <p className={styles.footerText}>Address: GrowallCoaching, Bhopal | India.</p>
          </div>

          {/* Quick Links Section */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerList}>
              <li><a className={styles.footerLink} href="#home">Home</a></li>
              <li><a className={styles.footerLink} href="/about">About</a></li>
              <li><a className={styles.footerLink} href="/Products">Courses</a></li>
              <li><a className={styles.footerLink} href="#Contact-From">Contact Us</a></li>
              <li><a className={styles.footerLink} href="/growallcoaching/Privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Links Section */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p>&copy; 2025 <span className={styles.footerBrand}>GrowallCoaching</span>. All rights reserved.</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button className={styles.scrollToTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          &#8679;
        </button>
      )}
    </footer>
  );
}
