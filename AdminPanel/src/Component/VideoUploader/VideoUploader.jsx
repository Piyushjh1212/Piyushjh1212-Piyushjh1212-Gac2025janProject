import React, { useContext, useEffect, useState } from "react";
import VideoUpload from "./VUpload/VUpload";
import { GacContext } from "../../Components/Context/GacContext";
import { videoTopic } from "../../assets/assets";
import "./VideoUploader.css"; // Ensure you have a CSS file

const VideoUploader = () => {
  const { fetchV = [] } = useContext(GacContext); // Ensure fetchV is an array
  const [selectedTopic, setSelectedTopic] = useState(""); // State to manage selected topic
  const [selectedSubTopic, setSelectedSubTopic] = useState(""); // Subcategory
  const [selectedVideo, setSelectedVideo] = useState(""); // Video URL state
  const [subTitle, setSubTitle] = useState(""); // Subtitle for video

  // Function to handle video upload
  const uploadCourseVideo = async () => {
    try {
      const response = await fetch(
        `http://localhost:10011/api/v1/course-video/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedTopic,
            selectedSubTopic,
            selectedVideo,
            subTitle,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Something went wrong while uploading the course video."
        );
      }

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
      } else {
        alert("Video uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the video.");
    }
  };

  // Find the selected topic object
  const selectedTopicObj = videoTopic.find(
    (topic) => topic.name === selectedTopic
  );

  return (
    <div className="video-uploader-container">
      {/* Selected Video Display */}
      <div className="selected-video-container">
        {selectedVideo ? (
          <video className="selected-video" src={selectedVideo} controls />
        ) : (
          <p className="no-video-text">No video selected</p>
        )}
      </div>

      {/* Subtitle Input */}
      <input
        className="subtitle-input"
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        type="text"
        placeholder="Enter subtitle"
      />

      {/* Video Topic and Subcategory Selection */}
      <div className="video-topic-container">
        <div className="video-topic-container-2">
          <select
            className="topic-select"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="" disabled>
              Select Video Topic
            </option>
            {videoTopic.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Subcategory Selection (Visible only if subcategories exist) */}
          {selectedTopicObj?.subCategory && (
            <select
              className="subtopic-select"
              value={selectedSubTopic}
              onChange={(e) => setSelectedSubTopic(e.target.value)}
            >
              <option value="" disabled>
                Select Subcategory
              </option>
              {selectedTopicObj.subCategory.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Upload Course Video Button */}
        <button className="upload-btn" onClick={uploadCourseVideo}>
          Submit Course Data
        </button>
      </div>

      {/* Video Upload Component */}
      <VideoUpload />

      {/* Show Uploaded Videos */}
      <div className="uploaded-videos-container">
        {fetchV.length > 0 ? (
          fetchV.map((item) => (
            <div className="uploaded-video-card" key={item._id || item.url}>
              <video className="uploaded-video" src={item.url} controls />
              <div className="video-buttons">
                <button
                  className="use-video-btn"
                  onClick={() => setSelectedVideo(item.url)}
                >
                  Use
                </button>
                <button className="delete-video-btn">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-videos-text">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
