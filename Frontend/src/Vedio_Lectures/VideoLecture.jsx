import React from "react";
import { useParams } from "react-router-dom";
import "./Vediolecture.css";

const VideoLecture = () => {
  const { lessonId, subtopicId } = useParams();

  // Define video files based on lesson and subtopic
  const videoUrls = {
    1: {
      1: "/videos/recoed.mp4", // Correct path for the video in public/videos
      2: "/videos/basic-syntax.mp4",
      3: "/videos/tags-attributes.mp4",
      4: "/videos/selectors-styling.mp4",
      5: "/videos/practical-examples.mp4",
    },
    2: {
      1: "/videos/introduction-to-html-elements.mp4",
      2: "/videos/basic-tags.mp4",
      3: "/videos/html-forms.mp4",
      4: "/videos/html-lists.mp4",
      5: "/videos/html-tables.mp4",
    },
    3: {
      1: "/videos/css-selectors.mp4",
      2: "/videos/class-selectors.mp4",
      3: "/videos/id-selectors.mp4",
      4: "/videos/element-selectors.mp4",
      5: "/videos/css-box-model.mp4",
    },
    // Add other lessons as needed
  };

  // Get the correct video URL based on lessonId and subtopicId
  const videoUrl = videoUrls[lessonId] && videoUrls[lessonId][subtopicId];

  return (
    <div className="video-lecture-container">
      <h2>Video Lecture: Lesson {lessonId} - Subtopic {subtopicId}</h2>
      {videoUrl ? (
        <div className="video-player">
          <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <p className="video-error">
          Sorry, the video is not available for this subtopic. Please check back later.
        </p>
      )}
    </div>
  );
};

export default VideoLecture;
