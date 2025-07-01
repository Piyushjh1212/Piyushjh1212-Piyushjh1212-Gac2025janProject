import React, { useEffect, useState } from "react";
import "./MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const HandleSubmitContinueLearning = () =>{
     window.location.href = "/my-purchased-course-list"
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/Purchased-Courses/Get-Purchased-Course`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }

        // **Here is the key fix:**
        
        const { success, data: courses } = await res.json();

        if (!success) {
          throw new Error("Failed to fetch courses");
        }

        setCourses(courses); // Set courses correctly here
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching your courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading your courses...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div className="mycourses-container">
      <div className="courses_width">
        <h2 className="mycourses-title">🎓 My Enrolled Courses</h2>
        {courses.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            You haven't purchased any courses yet.
          </p>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course._id}>
                <h1 className="Course-heading">{course.name}</h1>

                <div className="course-image">
                  <img src={course.Image} alt={course.title} />
                  
                </div>

                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p>
                    <strong>₹{course.price}</strong>
                  </p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `0%` }}></div>
                  </div>
                </div>
                <div className="button">
                  <button className="continue-btn" onClick={HandleSubmitContinueLearning}>Continue Learning</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
