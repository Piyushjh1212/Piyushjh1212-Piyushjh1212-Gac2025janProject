import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState('Ratibad');
  const [city, setCitiy] = useState('Bhopal');
  const [country, setCountry] = useState('India');
  const [phone, setPhone] = useState('9687457854');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // Added name field
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    if (!email || !password || !confirmPassword || !name) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const userData = { email, password, name, address, city, country,phone };

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    // Log the userData to check its values before sending
    console.log("User Data:", userData);

    fetch(`http://localhost:10011/api/v1/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log("Response Data:", data);
        if (data.success) {
          alert("Signup successful!");
          navigate("/");
        } else {
          setError(data.message || "Error during signup.");
          console.log(data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login_page">
      <div className="loginwrapper">
        <div className="login_img">
          <img src="/Assets/Login-image.webp" alt="signup" />
        </div>
        <div className="Login_container">
          <h2>Create Your Account</h2>
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={error && !email ? "error" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className={error && !password ? "error" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={error && !confirmPassword ? "error" : ""}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="signup-option">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
