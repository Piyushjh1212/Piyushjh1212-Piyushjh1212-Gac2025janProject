import React, { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const user = {
    name: "Piyush Jhariya",
    accountId: "12345",
    email: "piyush@example.com",
  };

  const options = [
    { name: "Your Courses", content: "Here are your courses!" },
    { name: "Your Progress", content: "Track your progress here!" },
    { name: "Achievements", content: "View your achievements!" },
    { name: "Targets", content: "Your targets are displayed here." },
    { name: "Settings", content: "Adjust your settings here." },
  ];

  const [activeOption, setActiveOption] = useState(null);

  const handleOptionClick = (content) => {
    setActiveOption(content);
  };

  return (
    <div className="Profile">
      {/* Profile Column */}
      <div className="profile-column">
        <div className="My-profile">
          <div className="profile-card">
            <h1>{user.name}</h1>
            <div className="profile_icon"></div>
            <button>Edit your Profile</button>
            <p>
              Email: <span>{user.email}</span>
            </p>
            <p>
              Enroll Id: <span>{user.accountId}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Options Column */}
      <div className="options-column">
        <div className="options-container">
          <ul>
            {options.map((option) => (
              <li key={option.name} onClick={() => handleOptionClick(option.content)}>
                <a href="#">{option.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        {activeOption && (
          <div className="content">
            <p>{activeOption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
