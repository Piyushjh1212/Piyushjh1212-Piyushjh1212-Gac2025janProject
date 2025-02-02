import React, { useState, useEffect, useContext } from "react";
import "./ImageUploder.css";
import { toast } from "react-toastify";
import { ImageContext } from "../ImageContext/ImageContext";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Image preview before upload
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
      const response = await fetch("http://localhost:10011/api/images/image");
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

  // Handle Image Upload
  const handleUpload = async () => {
    if (!image) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:10011/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      toast.success(data.message);
      fetchImages(); // Refresh images without full page reload
      setImage(null); // Reset input
      setPreview(null); // Remove preview
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Image Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const response = await fetch(`http://localhost:10011/api/images/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete image");

      toast.success("Image deleted successfully!");
      fetchImages(); // Refresh images
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="image-uploader">
      <div className="inputs">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      {/* Image Preview Before Upload */}
      {preview && (
        <div className="preview">
          <p>Preview:</p>
          <img src={preview} alt="Selected" width="150px" />
        </div>
      )}

      {/* Display Uploaded Images */}
      <div className="outputs">
        {images.length === 0 ? (
          <p>No images uploaded</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {images.map((img) => (
              <div className="single-image-grid" key={img._id} style={{ margin: "10px" }}>
                <img
                  onClick={() => saveImage(img.imageUrl)} // Fixes incorrect reference
                  src={img.imageUrl}
                  alt="Uploaded"
                  width="150px"
                />
                <div className="buttons">
                  <button onClick={() => handleDelete(img._id)}>Delete</button>
                  <button onClick={() => saveImage(img.imageUrl)}>Use</button>
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
