import React from "react";
import { Link } from "react-router-dom";
import "./AddCourseStats.css";

export default function AddCourseStats() {
  const Dataupdate = [
    {
      name: "HTML and CSS",
      action: "Add",
      link: "/Piyush"
    },
    {
      name: "Javascript",
      action: "Add"
    },
    {
      name: "Frontend Master Course",
      action: "Add"
    },
    {
      name: "Total Doubt Queries",
      action: "Add"
    },
    {
      name: "Total Certified Students",
      action: "Add"
    },
    {
      name: "Total Reviews",
      action: "Add"
    }
  ];

  return (
    <div className="course-stats-container">
      {Dataupdate.map((course, index) => (
        <div key={index} className="course-stat-card">
          <h3>{course.name}</h3>
          {course.link ? (
            <Link to={course.link}>
              <p className="Updatecourse_para">{course.action}</p>
            </Link>
          ) : (
            <p className="Updatecourse_para">{course.action}</p>
          )}
        </div>
      ))}
    </div>
  );
}
