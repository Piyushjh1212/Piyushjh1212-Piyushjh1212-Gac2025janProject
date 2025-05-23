import React from "react";
import "./HomePage.css"; // Make sure the filename matches


export default function HomePage({contactRef}) {

   const handleExploreClick = () => {
     contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 
  return (
    <div className="home-container" id="home">
      <div className="home-container-2">
        <h1 className="home-title">
          Welcome to <span className="brand-name">GrowAllCoaching</span>, an
          Online Learning Platform
        </h1>
        <p className="home-description">
          Unlock your potential with expert-led courses, interactive lessons,
          and a supportive community to help you achieve your learning goals.
        </p>
        <button className="home-explore-btn" onClick = {handleExploreClick}>Explore Courses</button>
      </div>
    </div>
  );
}
