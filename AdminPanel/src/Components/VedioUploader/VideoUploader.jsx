import React, { useState, useEffect, useContext, useCallback } from "react";
import "./VideoUploader.css";
import { toast } from "react-toastify";
import { VideoContext } from "../Context/VedioContext";
import VideoUpload from "../VUpload/VUpload";

const VideoUploader = () => {
  const [videos, setVideos] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { selectedVideos, setSelectedVideos } = useContext(VideoContext);

  // Fetch topics from backend
  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:10011/V1/Videos/Vedio");
      if (!response.ok) throw new Error("Failed to fetch topics");
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      toast.error("Error fetching topics.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch videos for the selected topic
  const fetchVideos = useCallback(async () => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:10011/api/videos/video?topic=${selectedTopic}`
      );
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      toast.error("Error fetching videos.");
    } finally {
      setLoading(false);
    }
  }, [selectedTopic]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Handle Video Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    setUploading(true);
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
      toast.error("Failed to delete video.");
    } finally {
      setUploading(false);
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
          disabled={loading}
        >
          <option value="">Select a Topic</option>
          {topics.map((topic) => (
            <option key={topic._id} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Videos */}
      <div id="grid" className="outputs">
        {loading ? (
          <p className="loading-text">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="no-videos-text">No videos uploaded</p>
        ) : (
          <div className="video-grid">
            {videos.map((videoItem) => (
              <div className="single-video-grid" key={videoItem._id}>
                <video className="uploaded-video" width="150" controls>
                  <source src={videoItem.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>
      <VideoUpload />
    </div>
  );
};

export default VideoUploader;
