import React, { useContext, useEffect, useState } from "react";
import VideoUpload from "./VUpload/VUpload";
import { GacContext } from "../../Components/Context/GacContext";
import "./VideoUploader.css"; // Ensure you have a CSS file
import CourseRendering from "../../AdminDashboard/CoursesRendering";

const VideoUploader = () => {
  const { fetchV = [] } = useContext(GacContext); // Ensure fetchV is an array
  const { renderVideo, setRenderVideo } = useContext(GacContext);

  const [data, setData] = useState({
    title: "",
    videoTopic: "",
    vUrl: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]); // Now tracks state updates

  const fetchVideoTopic = async () => {
    try {
      const response = await fetch(
        `http://localhost:10011/api/v1/course-render/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong while fetching topics");
      }

      const responseData = await response.json();
      console.log(responseData);
      setRenderVideo(responseData.allrenderedVideo || []);

      if (!responseData.success) {
        alert(responseData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchVideoTopic();
  }, []);

  const updateVideoRender = async () => {
    try {
      const response = await fetch(
        `http://localhost:10011/api/v1/course-render/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating video data");
      }

      const result = await response.json();
      console.log(result);
      alert("Course data updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="video-uploader-container">
      <div className="selected-video-container">
        {data.vUrl ? (
          <video className="selected-video" src={data.vUrl} controls />
        ) : (
          <p className="no-video-text">No video selected</p>
        )}
      </div>

      {/* Input for Video Title */}
      <input
        className="subtitle-input"
        value={data.videoTopic}
        onChange={(e) =>
          setData((prev) => ({ ...prev, videoTopic: e.target.value }))
        }
        type="text"
        placeholder="Enter title"
      />

      {/* Video Topic Selection */}
      <div className="video-topic-container">
        <div className="video-topic-container-2">
          <select
            className="topic-select"
            value={data.title}
            onChange={(e) =>
              setData((prev) => ({ ...prev, title: e.target.value }))
            }
          >
            <option value="" disabled>
              Select Video Topic
            </option>
            {renderVideo.map((item) => (
              <option key={item._id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <button className="upload-btn" onClick={updateVideoRender}>
          Submit Course Data
        </button>
      </div>

      <br />
      <hr />
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
                  onClick={() =>
                    setData((prev) => ({ ...prev, vUrl: item.url }))
                  }
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

      
      <hr />
      <div className="create-new-topic">
        <CourseRendering/>
      </div>
    </div>
  );
};

export default VideoUploader;
