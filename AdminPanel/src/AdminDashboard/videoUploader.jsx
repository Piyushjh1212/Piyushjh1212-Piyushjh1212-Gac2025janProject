import { useState } from "react";

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a video file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("video", file);
  
    // Debugging FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Check if file is correctly added
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:10011/api/v1/video/upload", true);
  
    // Track Upload Progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded * 100) / event.total));
      }
    };
  
    xhr.onload = () => {
            console.log("Server Response:", xhr.status, xhr.responseText);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setVideoUrl(response.videoUrl);
        console.log("Uploaded Successfully:", response);
      } else {
        console.error("Upload failed:", xhr.responseText);
        alert("Upload failed.");
      }
    };
  
    xhr.onerror = () => {
      console.error("Network error.");
      alert("Network error.");
    };
  
    // Send FormData
    try {
      xhr.send(formData);
    } catch (error) {
      console.error("XHR Send Error:", error);
    }
  };
  
  
  

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Upload Video</h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ width: "100%", marginBottom: "10px", padding: "5px", border: "1px solid #ddd", borderRadius: "5px" }}
      />

      <button
        onClick={handleUpload}
        style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Upload Video
      </button>

      {progress > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p>Uploading: {progress}%</p>
          <div style={{ width: "100%", backgroundColor: "#ddd", borderRadius: "5px" }}>
            <div style={{ height: "5px", backgroundColor: "#007bff", width: `${progress}%`, borderRadius: "5px" }}></div>
          </div>
        </div>
      )}

      {videoUrl && (
        <div style={{ marginTop: "10px" }}>
          <h3>Uploaded Video:</h3>
          <video src={videoUrl} controls style={{ width: "100%", borderRadius: "5px" }}></video>
          <p style={{ fontSize: "12px", wordBreak: "break-word", color: "#555" }}>{videoUrl}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
