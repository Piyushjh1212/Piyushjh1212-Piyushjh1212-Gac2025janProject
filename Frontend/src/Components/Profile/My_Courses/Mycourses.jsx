import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyCourses.css"; // Import CSS for the page

const MyCourses = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error

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
      console.log(courseData);
      setCourses(courseData.userProduct || []); // Update the state with fetched courses
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the fetch operation
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []); // Only run once when the component mounts

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="my-courses-container">
      <h2>Your Courses</h2>

      <div className="courses-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <img
                src={
                  course.images && course.images.length > 0
                    ? course.images[0].url
                    : "Assets/default-image.jpg"
                } // Fallback to default image if no course image
                alt={course.title}
                className="course-image"
              />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link
                to={`/MyCourse/${course._id}`} // Use slug or ID for dynamic routing
                className="course-button"
              >
                Go to Course
              </Link>
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
