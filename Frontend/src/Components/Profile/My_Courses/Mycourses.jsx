import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyCourses.css"; // Import CSS for styling

const MyCourses = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]); // Store fetched courses
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/courses/fetch-Course`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const courseData = await response.json();
        setCourses(courseData.data || []); // Ensure no undefined values
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  if (loading) return <p className="loading">Loading courses...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>

      {courses.length > 0 ? (
        <div className="courses-list">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <img
                src={course.images?.[0]?.url || "/Assets/default-image.jpg"} 
                alt={course.name}
                className="course-image"
              />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p className="course-price">
                <span className="discounted-price">₹{course.price}</span>  
                <span className="original-price">₹{course.NewPrice}</span>  
                <span className="discount">{course.discounted}% Off</span>
              </p>
              <Link to={`/MyCourse/${course._id}`} className="course-button">
                Go to Course
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-courses">No courses available. Please purchase a course to get started.</p>
      )}
    </div>
  );
};

export default MyCourses;
