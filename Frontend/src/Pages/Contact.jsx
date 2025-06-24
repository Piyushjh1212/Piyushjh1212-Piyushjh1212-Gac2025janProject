import { useState } from "react";
import "../Styles/ContactPage.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_1}/api/v1/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Thank you for contact us! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" }); // Reset form data after successful submission
      } else {
        setStatus("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setStatus("Error connecting to server.");
    }

    setTimeout(() => {
      setStatus("");
    }, 2000);
  };

  return (
    <div className="contact-container" >
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2 className="contact-form-title">Contact Us</h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          autoFocus
          required
          className="contact-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-input"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          className="contact-textarea"
        ></textarea>

        <button type="submit" className="contact-button">
          Send Message
        </button>
        {status && <p className="contact-status">{status}</p>}
      </form>

      <img
        src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719797/mern-uploads/dow2gro2sikhce2axxao.webp"
        alt="image"
      />
    </div>
  );
};

export default ContactForm;


