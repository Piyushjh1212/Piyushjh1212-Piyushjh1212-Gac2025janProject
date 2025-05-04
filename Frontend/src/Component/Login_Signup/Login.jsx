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

  // ✅ Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // ✅ Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("⚠ Please fill out all fields.");
    }

    if (!validateEmail(email)) {
      return setError("⚠ Invalid email format.");
    }

    setLoading(true);

    const LoginData = { email, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginData),
      });

      const data = await response.json();
      setLoading(false);

    if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        window.location.reload(); // refresh to reflect login state
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      setError("⚠ Something went wrong. Try again later.");
    }
  };

  const handleQuickLogin = (platform) => {
    alert(`Login with ${platform} is under development.`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login_page">
      <div className="loginwrapper">
        <div className="login_img">
          <img
            src="https://res.cloudinary.com/dieboinjz/image/upload/v1739719828/mern-uploads/b7qlpwc8uletquxjeljv.webp"
            alt="login"
          />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={error && !email ? "error" : ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={error && !password ? "error" : ""}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="social-login">
            <p>Or login with</p>
            <div className="social-buttons">
              <button onClick={() => handleQuickLogin("Google")}>
                <FaGoogle /> Google
              </button>
              <button onClick={() => handleQuickLogin("Facebook")}>
                <FaFacebookF /> Facebook
              </button>
              <button onClick={() => handleQuickLogin("Twitter")}>
                <FaTwitter /> Twitter
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
