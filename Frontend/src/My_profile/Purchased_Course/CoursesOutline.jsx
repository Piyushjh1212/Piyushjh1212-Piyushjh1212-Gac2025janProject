import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./CourseOutline.css";
import { useContext } from "react";
import { GacContext } from "../../GacContext/GacContext";

const CourseOutline = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const { courseId } = useParams();
  const [topics, setTopics] = useState([]);
  const { showVideo, setShowVideo } = useContext(GacContext);

  const navigate = useNavigate();

  const fetchVideoTopic = async () => {
    try {
      const response = await fetch(
        `http://localhost:10011/api/v1/course-render/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong while fetching topics");
      }

      const responseData = await response.json();
      setTopics(responseData.allrenderedVideo || []);

      if (!responseData.success) {
        alert(responseData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchVideoTopic();
  }, []);

  useEffect(() => {
    console.log(showVideo); // Debugging or remove after use
  }, [showVideo]);

  return (
    <div className="html-css-course-container">
      <h2 className="html-css-course-title">HTML & CSS Course Outline</h2>
      <p className="html-css-course-subtitle">
        Master the fundamentals of web development with structured lessons.
      </p>

      <div className="html-css-course-grid">
        {topics.map((topic) => (
          <div className="html-css-course-card" key={topic._id}>
            <h1>{topic.title}</h1>
            <p className="html-css-course-card-desc">{topic?.description}</p>
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
                className={`arrow ${expandedLesson === topic._id ? "up" : "down"}`}
              >
                {expandedLesson === topic._id ? "▲" : "▼"}
              </span>
            </button>

            {expandedLesson === topic._id && (
              <div className="html-css-course-content">
                <h3 className="html-css-course-card-title">{topic?.subTopic}</h3>
                <div className="html-css-subtopics-container">
                  {topic.subTitle.map((item) => (
                    <React.Fragment key={item._id}>
                      <button
                        onClick={() => {
                          setShowVideo(item.vUrl); // Set video first
                          navigate("/Vedio-watch"); // Navigate afterward
                        }}
                        className="html-css-subtopic-item"
                      >
                        {item.videoTopic}
                      </button>
                    </React.Fragment>
                  ))}
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
