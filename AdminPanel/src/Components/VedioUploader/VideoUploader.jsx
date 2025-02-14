import React, { useState, useEffect, useContext } from "react";
import "./VideoUploader.css";
import { toast } from "react-toastify";
import { VideoContext } from "../Context/VedioContext";

const VideoUploader = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [videos, setVideos] = useState([]);
  const [topics, setTopics] = useState([]); // List of available topics
  const [selectedTopic, setSelectedTopic] = useState(""); // Selected topic for upload

  const { selectedVideos, setSelectedVideos } = useContext(VideoContext);

  // Fetch topics from backend
  const fetchTopics = async () => {
    try {
      const response = await fetch("http://localhost:10011/api/topics");
      if (!response.ok) throw new Error("Failed to fetch topics");
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  // Fetch videos for the selected topic
  const fetchVideos = async () => {
    if (!selectedTopic) return;
    try {
      const response = await fetch(
        `http://localhost:10011/api/videos/video?topic=${selectedTopic}`
      );
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [selectedTopic]);

  // Handle Video Upload
  const handleUpload = async () => {
    if (!video) return toast.error("Please select a video");
    if (!selectedTopic) return toast.error("Please select a topic");

    const formData = new FormData();
    formData.append("video", video);
    formData.append("topic", selectedTopic); // Send topic name

    try {
      const response = await fetch("http://localhost:10011/api/videos/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      toast.success(data.message);
      fetchVideos();
      setVideo(null);
      setPreview(null);
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
      fetchVideos();
    } catch (error) {
      toast.error("Failed to delete video");
    }
  };

  // Handle file selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="video-uploader">
      <div className="inputs">
        {/* Topic Selection */}
        <select
          className="topic-select"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">Select a Topic</option>
          {topics.map((topic) => (
            <option key={topic._id} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>

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

      {/* Video Preview */}
      {preview && (
        <div className="preview-container">
          <p className="preview-text">Preview:</p>
          <video className="preview-video" width="250" controls>
            <source src={preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Display Videos */}
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
                    onClick={() => setSelectedVideos([...selectedVideos, videoItem.videoUrl])}
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
