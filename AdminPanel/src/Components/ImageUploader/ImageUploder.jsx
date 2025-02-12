import React, { useState, useEffect, useContext } from "react";
import "./ImageUploder.css";
import { toast } from "react-toastify";
import { ImageContext } from "../Context/ImageContext";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const { selectedImages, setSelectedImages } = useContext(ImageContext);

  // Save selected image globally
  const saveImage = (url) => {
    setSelectedImages([...selectedImages, url]);
    toast.success("Image added successfully!");
  };

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:10011/api/v1/images/image");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type (optional)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show image preview
  };

  // Handle Image Upload
  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:10011/api/v1/images/upload", {
        method: "POST",
        body: formData,
      });
      console.log("http://localhost:10011/api/v1/images/upload")

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      toast.success(data.message);
      fetchImages(); // Refresh images
      setImage(null); // Reset input
      setPreview(null); // Remove preview
    } catch (error) {
      toast.error("Upload error: " + error.message);
    }
  };

  // Handle Image Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch("http://localhost:10011/api/v1/images/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete image");

      toast.success("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="image-uploader">
      <div className="inputs">
        <input
          type="file"
          accept="image/*"
          className="image-input"
          onChange={handleImageChange}
        />
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="preview-container">
          <p className="preview-text">Preview:</p>
          <img src={preview} alt="Selected" className="preview-image" width="150px" />
        </div>
      )}

      {/* Display Uploaded Images */}
      <div id="grid" className="outputs">
        {images.length === 0 ? (
          <p className="no-images-text">No images uploaded</p>
        ) : (
          <div className="image-grid">
            {images.map((img) => (
              <div className="single-image-grid" key={img._id}>
                <img
                  onClick={() => saveImage(img.imageUrl)}
                  src={img.imageUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                  width="150px"
                />
                <div className="buttons">
                  <button className="delete-button" onClick={() => handleDelete(img._id)}>
                    Delete
                  </button>
                  <button className="use-button" onClick={() => saveImage(img.imageUrl)}>
                    Use
                  </button>
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
