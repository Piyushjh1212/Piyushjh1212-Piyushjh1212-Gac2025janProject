import React, { useState, useEffect, useContext } from "react";
import "./VideoUploader.css";
import { toast } from "react-toastify";
import { VideoContext } from "../Context/VedioContext";

const VideoUploader = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null); // Video preview before upload
  const [videos, setVideos] = useState([]);
  const { selectedVideos, setSelectedVideos } = useContext(VideoContext);

  // Save selected video globally
  const saveVideo = (url) => {
    setSelectedVideos([...selectedVideos, url]);
    toast.success("Video added successfully!");
  };

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:10011/api/videos/video");
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle Video Upload
  const handleUpload = async () => {
    if (!video) return toast.error("Please select a video");

    const formData = new FormData();
    formData.append("video", video);

    try {
      const response = await fetch("http://localhost:10011/api/videos/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      toast.success(data.message);
      fetchVideos(); // Refresh videos without full page reload
      setVideo(null); // Reset input
      setPreview(null); // Remove preview
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Video Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch(`http://localhost:10011/api/videos/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete video");

      toast.success("Video deleted successfully!");
      fetchVideos(); // Refresh videos
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete video");
    }
  };

  // Update preview video on file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      const url = URL.createObjectURL(file); // Generate a URL for previewing
      setPreview(url);
    }
  };

  return (
    <div className="video-uploader">
      <div className="inputs">
        <input
          type="file"
          className="video-input"
          onChange={handleVideoChange}
          accept="video/*"
        />
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>

      {/* Video Preview Before Upload */}
      {preview && (
        <div className="preview-container">
          <p className="preview-text">Preview:</p>
          <video className="preview-video" width="250" controls>
            <source src={preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Display Uploaded Videos */}
      <div id="grid" className="outputs">
        {videos.length === 0 ? (
          <p className="no-videos-text">No videos uploaded</p>
        ) : (
          <div className="video-grid">
            {videos.map((videoItem) => (
              <div className="single-video-grid" key={videoItem._id}>
                <video className="uploaded-video" width="150" controls>
                  <source src={videoItem.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="buttons">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(videoItem._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="use-button"
                    onClick={() => saveVideo(videoItem.videoUrl)}
                  >
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

export default VideoUploader;
