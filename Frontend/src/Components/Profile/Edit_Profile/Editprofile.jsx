import React, { useState, useEffect } from "react";
import "./EditProfile.css";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    // Fetch current user details
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }

      try {
        const response = await fetch("http://localhost:10011/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setEmail(data.email);
          setProfilePic(data.profilePic); // Assuming backend returns image URL
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    // Preview image before upload
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const token = localStorage.getItem("token");
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
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePic(data.imageUrl); // Assuming backend returns new image URL
        alert("Profile picture updated successfully!");
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:10011/api/v1/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Your Profile</h2>

      <div className="profile-picture">
        {profilePic && <img src={profilePic} alt="Profile" />}
        <input type="file" name="image" id="image" onChange={handleFileChange} />
        <button onClick={uploadImage}>Upload Image</button>
      </div>

      <form onSubmit={updateProfile}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
