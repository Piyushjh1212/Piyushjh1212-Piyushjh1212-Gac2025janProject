import React, { useState, useEffect } from "react";
import "./Styles/AddCourse.css";

const Add_Courses = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });


  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title || formData.title.length < 3)
      newErrors.title = "Title must be at least 3 characters.";
    if (!formData.description || formData.description.length < 10)
      newErrors.description = "Description must be at least 10 characters.";
    if (!formData.image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log(import.meta.env.VITE_API_BASE_URL);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          title: "",
          description: "",
          image: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  // Optional: Auto-hide message after 3 sec
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => setSubmitStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <div>
      <h1 className="Add_Course">Add Course</h1>
      <form onSubmit={handleSubmit} className="course-item-form">
        <h2>Add Course Item</h2>

        {submitStatus === "success" && (
          <p className="success-msg">✅ Submitted successfully!</p>
        )}
        {submitStatus === "error" && (
          <p className="error-msg">❌ Failed to submit. Please try again.</p>
        )}

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <button type="submit">Add Course Item</button>
      </form>
    </div>
  );
};

export default Add_Courses;
