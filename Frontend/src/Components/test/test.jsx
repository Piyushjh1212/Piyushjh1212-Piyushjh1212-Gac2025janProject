import React, { useState } from "react";
import "./ProgressCard.css"; // Import CSS file
import Assets from "./Assets"; // Import image assets

const ProgressCard = () => {
  const [progress, setProgress] = useState(75); // Example progress value

  return (
    <div className="card">
      <img src="Assets/Backend.webp" alt="Profile" className="profile-img" />
      <h2>My Learning Journey</h2>
      <p>Tracking my progress and success.</p>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">{progress}% Completed</p>

      <div className="milestones">
        <p>✅ Completed React Basics</p>
        <p>✅ Built 3 Mini Projects</p>
        <p>✅ Learning Advanced Concepts</p>
      </div>
    </div>
  );
};

export default ProgressCard;
