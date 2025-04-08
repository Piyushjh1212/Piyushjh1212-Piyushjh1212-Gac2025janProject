import React, { useEffect, useState } from "react";
import "./ProgressLayout.css";

const ProgressLayout = () => {
  const progressData = [
    { stage: "Started", description: "Kickstarted the journey", date: "Jan 2024" },
    { stage: "Learning Phase", description: "Gaining skills and knowledge", date: "Feb 2024" },
    { stage: "Project Development", description: "Building real-world projects", date: "Mar 2024" },
    { stage: "Achievements", description: "Completed major milestones", date: "Apr 2024" },
    { stage: "Advanced Learning", description: "Mastering complex topics", date: "May 2024" },
    { stage: "Networking", description: "Connecting with professionals", date: "Jun 2024" },
    { stage: "Internship", description: "Gaining industry experience", date: "Jul 2024" },
    { stage: "Final Project", description: "Developing a capstone project", date: "Aug 2024" },
    { stage: "Job Search", description: "Applying for relevant roles", date: "Sep 2024" },
    { stage: "First Job", description: "Starting a professional career", date: "Oct 2024" },
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulating progress completion over time
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 1000); // Update progress every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-container">
      <h2 className="progress-title">My Progress Journey</h2>
      <div className="progress-timeline">
        {progressData.map((item, index) => {
          const stageCompletion = (index + 1) * 10;
          const isCompleted = progress >= stageCompletion;

          return (
            <div key={index} className="progress-item">
              <div className={`progress-circle ${isCompleted ? "completed" : "incomplete"}`}>
                {stageCompletion}%
              </div>
              <div className="progress-content">
                <h3>{item.stage}</h3>
                <p>{item.description}</p>
                <span className="progress-date">{item.date}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${isCompleted ? 100 : progress - (stageCompletion - 10)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressLayout;
