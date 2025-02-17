import React, { useState, useEffect, useContext } from "react";
import "./ImageUploder.css";
import { toast } from "react-toastify";
import { ImageContext } from "../Context/ImageContext";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const backend_url = "http://localhost:10011";
  const { selectedImages, setSelectedImages } = useContext(ImageContext);

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await fetch(`${backend_url}/api/v1/images/image`);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      toast.error("Failed to load images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle Image Upload
  const handleUpload = async () => {
    if (!image) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${backend_url}/api/v1/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      toast.success(data.message);
      fetchImages(); // Refresh images after upload
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Image Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${backend_url}/api/v1/images/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      toast.success("Image deleted successfully!");
      fetchImages(); // Refresh images after deletion
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete image");
    }
  };

  // Handle selecting an image
  const handleSelectImage = (img) => {
    setSelectedImages((prev) => [...prev, img.imageUrl]); // Append new image URL
  };

  return (
    <div className="image-uploader">
      <div className="inputs">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="outputs">
        {images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map((img) => (
              <div
                className="single-image-grid"
                key={img._id}
                style={{ margin: "10px" }}
              >
                <img src={img.imageUrl} alt="Uploaded" width="150px" />
                <div className="buttons">
                  <button onClick={() => handleDelete(img._id)}>Delete</button>
                  <button onClick={() => handleSelectImage(img)}>Use</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
