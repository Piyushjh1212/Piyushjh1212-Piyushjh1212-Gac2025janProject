import React from "react";
import "./HomePage.css"; // Make sure the filename matches

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-container-2">
        <h1 className="home-title">
          Welcome to <span className="brand-name">GrowAllCoaching</span>, an
          Online Learning Platform
        </h1>
        <p className="home-description">
          Unlock your potential with expert-led courses, interactive lessons,
          and a supportive community to help you achieve your learning goals.
        </p>
        <button className="home-explore-btn">Explore Courses</button>
      </div>
    </div>
  );
}
