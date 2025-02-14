  import React, { useState, useEffect, useContext } from "react";
  import "./ImageUploder.css";
  import { toast } from "react-toastify";
  import { ImageContext } from "../Context/ImageContext";

  const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [images, setImages] = useState([]);
    const { selectedImages, setSelectedImages } = useContext(ImageContext);

    const saveImage = (url) => {
      setSelectedImages([...selectedImages, url]);
      toast.success("Image added successfully!");
    };
    
    // fetch Image from backend
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:10011/api/v1/images/image"
        );
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

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg , image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG, webp, JPEG, and PNG files are allowed.");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
      if (!image) {
        toast.error("Please select an image first.");
        return;
      }

      const formData = new FormData();
      formData.append("file", image); // Check if your backend expects "file" instead of "image"

      try {
        const response = await fetch("http://localhost:10011/api/v1/images/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json(); // Get error response from backend
          throw new Error(errorData.message || "Upload failed");
        }

        const data = await response.json();
        toast.success(data.message || "Image uploaded successfully!");
        fetchImages(); // Refresh images list
        setImage(null);
        setPreview(null);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload error: " + error.message);
      }
    };

    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this image?")) return;

      try {
        const response = await fetch(
          "http://localhost:10011/api/v1/images/delete",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );

        if (!response.ok) throw new Error("Failed to delete image");

        toast.success("Image deleted successfully!");
        fetchImages();
      } catch (error) {
        toast.error("Failed to delete image");
      }
    };

    return (
      <div className="image-uploader-container">
        <div className="image-input-container">
          <input
            type="file"
            accept="image/*"
            className="image-input"
            onChange={handleImageChange}
          />
          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>

        {preview && (
          <div className="image-preview-container">
            <p className="preview-text">Preview:</p>
            <img src={preview} alt="Selected" className="preview-image" />
          </div>
        )}
        <div className="uploaded-images-container">
          {images.length === 0 ? (
            <p className="no-images-text">No images uploaded</p>
          ) : (
            images.map((img) => (
              <div className="uploaded-image-card" key={img._id}>
                <img
                  onClick={() => saveImage(img.imageUrl)}
                  src={img.imageUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                />
                <div className="image-buttons">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(img._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="use-btn"
                    onClick={() => saveImage(img.imageUrl)}
                  >
                    Use
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  export default ImageUploader;
