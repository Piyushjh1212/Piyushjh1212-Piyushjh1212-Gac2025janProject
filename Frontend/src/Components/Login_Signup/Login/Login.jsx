  import React, { useState, useEffect } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
  import "./Login.css";

  export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

      if (!email || !password) {
        setError("Please fill out all fields.");
        setLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      const userData = { email, password };

      // Use import.meta.env for environment variables with Vite
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      fetch(`http://localhost:10011/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setLoading(false);
          if (data.success) {
            alert("Login successful!");

            // Store token and user data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Navigate to the desired page
            navigate("/");
            window.location.reload();
          } else {
            setError(data.message || "Error during login.");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error);
          setError("An error occurred. Please try again.");
        });
    };

    const handleQuickLogin = (platform) => {
      alert(`Quick login with ${platform}`);
    };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <div className="login_page">
        <div className="loginwrapper">
          <div className="login_img">
            <img src="/Assets/Login-image.webp" alt="login" />
          </div>
          <div className="Login_container">
            <h2>Login to Your Account</h2>
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
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

              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="social-login">
              <p>Or login with</p>
              <div className="social-buttons">
                <button
                  className="google-btn"
                  onClick={() => handleQuickLogin("Google")}
                >
                  <FaGoogle className="social-icon" /> Google
                </button>
                <button
                  className="facebook-btn"
                  onClick={() => handleQuickLogin("Facebook")}
                >
                  <FaFacebookF className="social-icon" /> Facebook
                </button>
                <button
                  className="twitter-btn"
                  onClick={() => handleQuickLogin("Twitter")}
                >
                  <FaTwitter className="social-icon" /> Twitter
                </button>
              </div>
            </div>

            <div className="signup-option">
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
