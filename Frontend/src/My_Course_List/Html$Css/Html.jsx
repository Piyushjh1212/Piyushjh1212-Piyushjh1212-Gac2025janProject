import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CourseOutline.css";

const CourseOutline = () => {
  const [expandedLesson, setExpandedLesson] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    console.log(courseId);
  }, []);

  const topics = [
    {
      id: 1,
      title: "Introduction to HTML & CSS",
      desc: "Learn the basics of HTML structure and CSS styling.",
      subtopics: [
        "Introduction",
        "Basic Syntax",
        "Tags & Attributes",
        "Selectors & Styling",
        "Practical Examples",
      ],
    },
    {
      id: 2,
      title: "HTML Elements & Attributes",
      desc: "Explore different HTML tags, attributes, and their usage.",
      subtopics: [
        "Introduction",
        "Basic Tags",
        "HTML Forms",
        "HTML Lists",
        "HTML Tables",
      ],
    },
    {
      id: 3,
      title: "CSS Selectors & Properties",
      desc: "Understand how to style elements using various CSS properties.",
      subtopics: [
        "Introduction",
        "Class Selectors",
        "ID Selectors",
        "Element Selectors",
        "CSS Box Model",
      ],
    },
    {
      id: 4,
      title: "Advanced CSS Techniques",
      desc: "Learn advanced CSS for modern web design.",
      subtopics: [
        "Flexbox",
        "Grid Layout",
        "Responsive Design",
        "CSS Variables",
      ],
    },
  ];

  return (
    <div className="html-css-course-container">
      <h2 className="html-css-course-title">HTML & CSS Course Outline</h2>
      <p className="html-css-course-subtitle">
        Master the fundamentals of web development with structured lessons.
      </p>

      <div className="html-css-course-grid">
        {topics.map((topic) => (
          <div className="html-css-course-card" key={topic.id}>
            <h3 className="html-css-course-card-title">{topic.title}</h3>
            <p className="html-css-course-card-desc">{topic.desc}</p>
            <button
              className="html-css-course-button"
              onClick={() =>
                setExpandedLesson(expandedLesson === topic.id ? null : topic.id)
              }
              aria-expanded={expandedLesson === topic.id}
            >
              {expandedLesson === topic.id ? "Collapse Lesson" : "Start Lesson"}
              <span
                className={`arrow ${
                  expandedLesson === topic.id ? "up" : "down"
                }`}
              >
                ↓
              </span>
            </button>

            {/* Show subtopics if lesson is expanded */}
            {expandedLesson === topic.id && (
              <div className="html-css-subtopics-container">
                {topic.subtopics.map((subtopic, index) => (
                  <Link
                    key={index}
                    to={`/watch-video`} // Dynamic route to each subtopic
                    className="html-css-subtopic-item"
                  >
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
