import { useEffect, useState, useRef, useContext } from "react";
import { GacContext } from "../../../Components/Context/GacContext";

const VideoUpload = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const { fetchV, setFetchV } = useContext(GacContext);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!title || !video) {
      setMessage("Please enter a title and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);

    setUploading(true);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:10011/api/v1/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Video uploaded successfully!");
        setTitle("");
        setVideo(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onUploadSuccess();
        fetchVideos(); // Fetch videos after successful upload
      } else {
        setMessage(data.error || "Upload failed.");
      }
    } catch (error) {
      setMessage("Error uploading video.");
    }

    setUploading(false);
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `http://localhost:10011/api/v1/video/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setFetchV(data.videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Upload Video</h2>
      <input
        type="text"
        placeholder="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file" 
        accept="video/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VideoUpload;
