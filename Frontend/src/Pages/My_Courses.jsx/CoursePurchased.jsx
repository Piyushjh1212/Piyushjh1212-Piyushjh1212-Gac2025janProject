import React from "react";
import "./MyCourses.css";

const courses = [
  {
    id: 1,
    title: "HTML & CSS Mastery",
    description: "Build beautiful websites from scratch",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-5gcgRYKRTXIOA8AvkaGwkIORAx8Tt_F4Q&s",
    price: 799,
    progress: 70,
  },


  // Add more courses here
];

const MyCourses = () => {
  return (
    <div className="mycourses-container">
      <div className="courses_width">
        <h2 className="mycourses-title">🎓 My Enrolled Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <div className="course-image">
                <img src={course.image} alt={course.title} />
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  <strong>₹{course.price}</strong>
                </p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="button"><button className="continue-btn">Continue Learning</button></div>
            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
