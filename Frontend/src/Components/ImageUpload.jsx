import React, { useState } from "react";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:10011/api/v1/image/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Image uploaded successfully!");
      } else {
        setMessage(result.message || "Error uploading image");
      }
    } catch (error) {
      setMessage("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="image" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
