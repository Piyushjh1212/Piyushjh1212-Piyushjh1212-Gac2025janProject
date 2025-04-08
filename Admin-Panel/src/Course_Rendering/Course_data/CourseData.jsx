import React, { useState } from "react";
import "./AddCoursedata.css";

export default function CourseData() {
  const [formData, setFormData] = useState(Array(10).fill(""));
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    const newData = [...formData];
    newData[index] = value;
    setFormData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Count how many fields are filled
    const filledFields = formData.filter((field) => field.trim() !== "").length;

    if (filledFields < 5) {
      setError("Please fill in at least 5 fields.");
      return;
    }

    setError(""); // Clear error if validation passes
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="course-data-container">
      <h2>Enter Course Details</h2>
      <form className="course-form" onSubmit={handleSubmit}>
        {formData.map((value, index) => (
          <div className="course-data" key={index}>
            <label>
              <h3>Course Point {index + 1}</h3>
              <input
                type="text"
                placeholder="Enter course point"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}
