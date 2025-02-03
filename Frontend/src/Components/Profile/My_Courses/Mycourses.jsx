import React, { useState, useEffect } from "react";
import "./MyCourses.css"; // Import CSS for the page

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Replace this URL with the actual endpoint where courses are fetched
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses"); // Fetch from backend
        const data = await response.json();

        if (data.message) {
          setMessage(data.message); // Show no courses message
        } else {
          setCourses(data); // Set courses data
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setMessage("An error occurred while fetching your courses.");
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>

      {message && <p className="no-courses-message">{message}</p>}

      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
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
