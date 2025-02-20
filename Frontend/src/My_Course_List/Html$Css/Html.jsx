import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseOutline.css";

const CourseOutline = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    console.log(courseId);
  }, [courseId]);

  const fetchCourseVideo = async () => {
    try {
      const response = await fetch(`http://localhost:10011/api/v1/course-video/get`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      if (!data.success) {
        console.error(data.message);
        return;
      }

      setTopics(data.data);
    } catch (error) {
      console.error("Error fetching course videos:", error.message);
    }
  };

  useEffect(() => {
    fetchCourseVideo();
  }, []);

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
            <h3 className="html-css-course-card-title">{topic.subTopic}</h3>
            <p className="html-css-course-card-desc">{topic.description}</p>
            <button
              className="html-css-course-button"
              onClick={() =>
                setExpandedLesson(expandedLesson === topic.id ? null : topic.id)
              }
              aria-expanded={expandedLesson === topic.id}
            >
              {expandedLesson === topic.id ? "Collapse Lesson" : "Start Lesson"}
              <span className={`arrow ${expandedLesson === topic.id ? "up" : "down"}`}>
                {expandedLesson === topic.id ? "↑" : "↓"}
              </span>
            </button>

            {expandedLesson === topic.id && (
              <div className="html-css-subtopics-container">
                {topic.subtopics.map((subtopic, index) => (
                  <Link key={index} to={`/watch-video`} className="html-css-subtopic-item">
                    {subtopic}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOutline;
