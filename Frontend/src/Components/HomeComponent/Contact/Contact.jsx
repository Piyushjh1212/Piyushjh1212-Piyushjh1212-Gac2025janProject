import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa"; // React Icons
import styles from "./Contact.module.css"; // Import CSS Module

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid.";
    }
    if (!formData.message.trim()) formErrors.message = "Message is required.";
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form Submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" }); // Reset the form
      setTimeout(() => setIsSubmitted(false), 3000); // Hide success message after 3s
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactContent}>
        {/* Left Column: Contact Form */}
        <div className={styles.contactFormContainer}>
          <h2 className="Contact-Heading">Contact Us</h2>
          {isSubmitted && <p className={styles.successMessage}>Message sent successfully!</p>}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">
                <FaUser className={styles.icon} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">
                <FaEnvelope className={styles.icon} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">
                <FaComment className={styles.icon} /> Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}
            </div>
            <button type="submit" className={styles.sendMessageBtn}>
              Send Message
            </button>
          </form>
        </div>

        {/* Right Column: Image */}
        <div className={styles.contactImageContainer}>
          <img src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719797/mern-uploads/dow2gro2sikhce2axxao.webp" alt="Contact Us Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
