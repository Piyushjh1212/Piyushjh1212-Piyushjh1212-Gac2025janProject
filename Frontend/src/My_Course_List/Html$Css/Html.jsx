import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseOutline.css";

const CourseOutline = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);

  const fetchCourseVideo = async () => {
    try {
      if (!courseId) return;

      const response = await fetch(
        `http://localhost:10011/api/v1/course-video/get`
      );
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      console.log("Video data");
      setTopics(data.data);
      if (!data.success) return;

      setTopics(filteredTopics);
    } catch (error) {
      console.error("Error fetching course video:", error);
    }
  };

  useEffect(() => {
    fetchCourseVideo();
  }, [courseId]);

  useEffect(() => {
    console.log(topics);
  }, [topics]);

  return (
    <div className="html-css-course-container">
      <h2 className="html-css-course-title">HTML & CSS Course Outline</h2>
      <p className="html-css-course-subtitle">
        Master the fundamentals of web development with structured lessons.
      </p>

      <div className="html-css-course-grid">
        {topics.map((topic) => (
          <div className="html-css-course-card" key={topic._id}>
            <button
              className="html-css-course-button"
              onClick={() =>
                setExpandedLesson(
                  expandedLesson === topic._id ? null : topic._id
                )
              }
              aria-expanded={expandedLesson === topic._id}
            >
              {expandedLesson === topic._id
                ? "Collapse Lesson"
                : "Start Lesson"}
              <span
                className={`arrow ${
                  expandedLesson === topic._id ? "up" : "down"
                }`}
              >
                {expandedLesson === topic._id ? "▲" : "▼"}
              </span>
            </button>

            {expandedLesson === topic._id && (
              <div className="html-css-course-content">
                <h3 className="html-css-course-card-title">
                  {topic?.subTopic}
                </h3>
                <p className="html-css-course-card-desc">
                  {topic?.description}
                </p>
                <div className="html-css-subtopics-container">
                  <Link
                    to={`/watch-video/${courseId}/${topic?.subTopic}`}
                    className="html-css-subtopic-item"
                  >
                    Watch Video
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOutline;
