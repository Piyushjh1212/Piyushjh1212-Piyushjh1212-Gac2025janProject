import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeOption, setActiveOption] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const options = [
    { name: "Your Courses", content: "Here are your courses!" },
    { name: "Your Progress", content: "Track your progress here!" },
    { name: "Achievements", content: "View your achievements!" },
    { name: "Targets", content: "Your targets are displayed here." },
    { name: "Settings", content: "Adjust your settings here." },
  ];

  // ✅ Fetch User Function
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:10011/api/v1/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user");
      }

      // Set user data
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // ✅ Fetch user data when component mounts
  useEffect(() => {
    console.log(user);
    fetchUser();
  }, []);

  const handleOptionClick = (content, index) => {
    setActiveOption(content);
    setActiveIndex(index);
  };

  return (
    <div className="Profile">
      {/* Profile Column */}
      <div className="profile-column">
        <div className="My-profile">
          <div className="profile-card">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : user ? (
              <>
                <h1>{user.name}</h1>
                <div className="profile_icon">
                  <img src={user.profilePic.url} alt="" />
                </div>
                <Link to={"/EditProfile"}>
                  <button>Edit Your Profile</button>
                </Link>
                <p>
                  Email: <span>{user.email}</span>
                </p>
                <p>
                  Enroll Id: <span>{user._id}</span>
                </p>
              </>
            ) : (
              <p>User data not available</p>
            )}
          </div>
        </div>
      </div>

      {/* Options Column */}
      <div className="options-column">
        <div className="options-container">
          <ul>
            {options.map((option, index) => (
              <li
                key={option.name}
                className={activeIndex === index ? "active" : ""}
                onClick={() => handleOptionClick(option.content, index)}
              >
                <a href="#">{option.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Section */}
        {activeOption && (
          <div className="content">
            <p>{activeOption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
