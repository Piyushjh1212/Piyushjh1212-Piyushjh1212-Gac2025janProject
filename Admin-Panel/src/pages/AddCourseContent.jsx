import React, { useState } from "react";
import "./Styles/Add_CourseContent.css";

const CourseVideoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "Beginner",
    type: "Video",
    videoUrl: "",
    thumbnail: "",
    studentsCount: "",
    rating: 0,
    estimatedTime: "",
    nextLesson: "",
    keyPoints: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("keyPoints")) {
      const index = parseInt(name.split("-")[1]);
      const updatedKeyPoints = [...formData.keyPoints];
      updatedKeyPoints[index] = value;
      setFormData({ ...formData, keyPoints: updatedKeyPoints });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addKeyPoint = () => {
    setFormData({ ...formData, keyPoints: [...formData.keyPoints, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/course-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save course video");

      alert("Course video submitted successfully!");
      setFormData({
        title: "",
        description: "",
        duration: "",
        difficulty: "Beginner",
        type: "Video",
        videoUrl: "",
        thumbnail: "",
        studentsCount: "",
        rating: 0,
        estimatedTime: "",
        nextLesson: "",
        keyPoints: [""],
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-form-container">
      <h2>Add Course Video</h2>

      {[
        "title",
        "description",
        "duration",
        "videoUrl",
        "thumbnail",
        "studentsCount",
        "estimatedTime",
        "nextLesson",
      ].map((field) => (
        <div className="course-form-group" key={field}>
          <label className="course-form-label">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="course-form-input"
            required
          />
        </div>
      ))}

      <div className="course-form-group">
        <label className="course-form-label">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="course-form-select"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="course-form-group">
        <label className="course-form-label">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="course-form-select"
        >
          <option value="Video">Video</option>
          <option value="Article">Article</option>
          <option value="Quiz">Quiz</option>
        </select>
      </div>

      <div className="course-form-group">
        <label className="course-form-label">Rating</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          className="course-form-input"
          required
        />
      </div>

      <div className="course-form-group">
        <label className="course-form-label">Key Points</label>
        {formData.keyPoints.map((point, index) => (
          <input
            key={index}
            type="text"
            name={`keyPoints-${index}`}
            value={point}
            onChange={handleChange}
            className="key-point-input"
            required
          />
        ))}
        <button
          type="button"
          onClick={addKeyPoint}
          className="add-key-point-btn"
        >
          + Add Key Point
        </button>
      </div>

      <button type="submit" className="course-form-submit">
        Submit
      </button>
    </form>
  );
};

export default CourseVideoForm;
