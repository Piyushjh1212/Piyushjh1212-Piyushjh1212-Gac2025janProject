import React, { useContext, useEffect, useState } from "react";
import VideoUpload from "../../Components/VUpload/VUpload";
import { GacContext } from "../../Components/Context/GacContext";
import { videoTopic } from "../../assets/assets";

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
    <div className="video-uploader">
      {/* Selected Video Display */}
      <div className="use-video-container">
        {selectedVideo ? (
          <video style={{ width: "320px" }} src={selectedVideo} controls />
        ) : (
          <p>No video selected</p>
        )}
      </div>

      {/* Subtitle Input */}
      <input
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        type="text"
        placeholder="Enter subtitle"
      />

      {/* Video Topic and Subcategory Selection */}
      <div className="video-topic">
        <select
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

        {/* Upload Course Video Button */}
        <button onClick={uploadCourseVideo}>Submit Course Data</button>
      </div>

      {/* Video Upload Component */}
      <VideoUpload />

      {/* Show Uploaded Videos */}
      <div className="show-videos">
        {fetchV.length > 0 ? (
          fetchV.map((item) => (
            <div
              className="single-video"
              key={item._id || item.url}
              style={{ margin: "10px" }}
            >
              <video style={{ width: "320px" }} src={item.url} controls />
              <div className="buttons">
                <button onClick={() => setSelectedVideo(item.url)}>Use</button>
                <button>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
