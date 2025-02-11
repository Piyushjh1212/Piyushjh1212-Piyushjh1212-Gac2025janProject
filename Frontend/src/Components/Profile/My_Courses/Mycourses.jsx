import React from "react";
import {Link} from "react-router-dom"
import "./MyCourses.css"; // Import CSS for the page

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript.",
      image: "Assets/java.webp", // Replace with actual image path
      link: "/courses/javascript", // Course URL
    },
    {
      id: 2,
      title: "React Mastery",
      description: "Dive deep into React and build amazing apps.",
      image: "Assets/react.png", // Replace with actual image path
      link: "/courses/react", // Course URL
    },
  ]; // Static course data

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>

      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link to = {"/MyCourse/Outline"}><a href={course.link} className="course-button">Go to Course</a></Link>
            </div>
          ))
        ) : (
          <p>No courses available. Please purchase a course to get started.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
