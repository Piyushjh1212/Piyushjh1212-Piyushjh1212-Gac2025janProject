import React, { useEffect, useState } from "react";
import "../../Styles/signup.css";

export default function SignupForm() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    newpassword: "",
  });

  const [message, setMessage] = useState({ status: false, type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message.status) {
      const timer = setTimeout(() => {
        setMessage({ status: false, type: "", text: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUserSignUp = async () => {
    const { name, email, password, newpassword } = userData;

    if (!name || !email || !password || !newpassword) {
      return setMessage({
        status: true,
        type: "error",
        text: "Please fill in all fields",
      });
    }

    if (password !== newpassword) {
      return setMessage({
        status: true,
        type: "error",
        text: "Passwords do not match",
      });
    }

    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/api/v1/users/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (!data.success) {
        setMessage({
          status: true,
          type: "error",
          text: data.message || "Signup successful!",
        });
        return;
      }

      setMessage({
        status: true,
        type: "success",
        text: data.message || "Signup successful!",
      });

      setUserData({ name: "", email: "", password: "", newpassword: "" });
    } catch (error) {
      setMessage({
        status: true,
        type: "error",
        text: error.message || "Signup failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <section className="vh-100 signup-section">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded-4">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <h2 className="text-center fw-bold mb-5">Sign Up</h2>

                    {message.status && (
                      <div
                        style={{
                          color: message.type === "error" ? "red" : "green",
                          textAlign: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        {message.text}
                      </div>
                    )}

                    <form className="mx-1 mx-md-4">
                      {[
                        { label: "Your Name", name: "name", type: "text" },
                        { label: "Your Email", name: "email", type: "email" },
                        {
                          label: "Password",
                          name: "password",
                          type: "password",
                        },
                        {
                          label: "Repeat your password",
                          name: "newpassword",
                          type: "password",
                        },
                      ].map((input) => (
                        <div
                          className="d-flex flex-row align-items-center mb-4"
                          key={input.name}
                        >
                          <i className="fas fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type={input.type}
                              name={input.name}
                              value={userData[input.name]}
                              className="form-control"
                              onChange={handleInputChange}
                            />
                            <label className="form-label" htmlFor={input.name}>
                              {input.label}
                            </label>
                          </div>
                        </div>
                      ))}

                      <div className="form-check d-flex justify-content-center mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="terms"
                          required
                        />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the <a href="#!">Terms of Service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleUserSignUp}
                          disabled={loading}
                        >
                          {loading ? "Registering..." : "Register"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Signup"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
