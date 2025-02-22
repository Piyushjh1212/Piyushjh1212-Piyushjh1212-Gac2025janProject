import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Vediolecture.css";

const VideoLecture = () => {
  const { courseId, subtopicId } = useParams();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:10011/api/v1/course-video/get/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch video");

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const video = data.data.find((item) => item.subTopic === subtopicId);
          setVideoUrl(video?.videoUrl || "");
        }
      } catch (error) {
        console.error("Error fetching video:", error.message);
      }
    };

    fetchVideo();
  }, [courseId, subtopicId]);

  return (
    <div className="video-lecture-container">
      <h2>Video Lecture: {subtopicId}</h2>
      {videoUrl ? (
        <div className="video-player">
          <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p className="video-error">Video not available. Please check back later.</p>
      )}
    </div>
  );
};

export default VideoLecture;
