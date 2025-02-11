import React from "react";
import { Link } from "react-router-dom";
import "./CourseOutline.css"

const CourseOutline = () => {
  return (
    <div className="course-outline-container">
      <h2>Course Outline - React for Beginners</h2>
      <p>Welcome to the React for Beginners course! Here's an overview of the topics we'll cover:</p>
      
      <div className="course-topics">
        <div className="topic">
          <h3>1. Introduction to React</h3>
          <p>Understanding the fundamentals of React and how it works.</p>
          <Link to="/course/React-for-Beginners/lesson-1">Start Lesson</Link>
        </div>
        
        <div className="topic">
          <h3>2. JSX - JavaScript XML</h3>
          <p>Learn how JSX allows you to write HTML in JavaScript.</p>
          <Link to="/course/React-for-Beginners/lesson-2">Start Lesson</Link>
        </div>

        <div className="topic">
          <h3>3. React Components</h3>
          <p>Get familiar with React components and how to create reusable UI elements.</p>
          <Link to="/course/React-for-Beginners/lesson-3">Start Lesson</Link>
        </div>

        <div className="topic">
          <h3>4. State and Props</h3>
          <p>Learn about managing data and passing it between components with state and props.</p>
          <Link to="/course/React-for-Beginners/lesson-4">Start Lesson</Link>
        </div>

        <div className="topic">
          <h3>5. React Hooks</h3>
          <p>Introduction to React hooks like useState, useEffect, and custom hooks.</p>
          <Link to="/course/React-for-Beginners/lesson-5">Start Lesson</Link>
        </div>

        <div className="topic">
          <h3>6. React Router</h3>
          <p>Learn how to handle navigation and routing in your React app.</p>
          <Link to="/course/React-for-Beginners/lesson-6">Start Lesson</Link>
        </div>

        <div className="topic">
          <h3>7. Working with APIs</h3>
          <p>Learn how to fetch data from APIs and display it in your React app.</p>
          <Link to="/course/React-for-Beginners/lesson-7">Start Lesson</Link>
        </div>

        <div className="topic">
          <h3>8. Conclusion and Final Project</h3>
          <p>Wrap up your learning with a final project to apply your React knowledge.</p>
          <Link to="/course/React-for-Beginners/lesson-8">Start Lesson</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseOutline;
