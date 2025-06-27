import React, { useState } from "react";
import "./Styles/Add_CourseContent.css"

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

    // Special handling for keyPoints array
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save course video");
      }

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
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
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
        <div key={field} style={{ marginBottom: "12px" }}>
          <label>{field}</label><br />
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <div style={{ marginBottom: "12px" }}>
        <label>Difficulty</label><br />
        <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Type</label><br />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Video">Video</option>
          <option value="Article">Article</option>
          <option value="Quiz">Quiz</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Rating</label><br />
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Key Points</label><br />
        {formData.keyPoints.map((point, index) => (
          <input
            key={index}
            type="text"
            name={`keyPoints-${index}`}
            value={point}
            onChange={handleChange}
            required
            style={{ display: "block", marginBottom: "8px" }}
          />
        ))}
        <button type="button" onClick={addKeyPoint}>
          + Add Key Point
        </button>
      </div>

      <button type="submit" style={{ marginTop: "20px" }}>
        Submit
      </button>
    </form>
  );
};

export default CourseVideoForm;
