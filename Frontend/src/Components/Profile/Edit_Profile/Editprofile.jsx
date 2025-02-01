import React, { useState } from "react";
import "./EditProfile.css";

export default function EditProfile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }
  
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedFile);
  
    try {
      const response = await fetch("http://localhost:10011/api/v1/user/user-profile-pic", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in headers
        }
      });

      console.log(response);
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="upload-image">
      <input type="file" name="image" id="image" onChange={handleFileChange} />
      <label htmlFor="image">Upload Image</label>
      <button onClick={uploadImage}>Submit</button>
    </div>
  );
}
