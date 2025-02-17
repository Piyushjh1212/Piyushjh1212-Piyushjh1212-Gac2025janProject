import React, { useState, useContext, useEffect } from "react";
import "./Addvidio.css";
import { ImageContext } from "../../Context/ImageContext";
import VideoUploader from "../../VedioUploader/VideoUploader";
import { GacContext } from "../../Context/GacContext";

const CreateVideoAndSave = () => {
  const { selectedImages, setSelectedImages } = useContext(ImageContext);
  const { fetchV } = useContext(GacContext);

  // State to store selected videos
  const [selectedVideos, setSelectedVideos] = useState([]);

  const [data, setData] = useState({
    videoDataName: "",
    description: "",
    video: selectedVideos,
  });

  const [loading, setLoading] = useState(false);

  // Update video data when selectedVideos change
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      video: selectedVideos,
    }));
  }, [selectedVideos]);

  // Handle input change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedVideos.length === 0) {
      alert("Please select at least one video.");
      return;
    }

    setLoading(true);
    console.log(data);

    try {
      const response = await fetch(
        "http://localhost:10011/api/v1/product/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        alert("Product created successfully");
        // Reset form and selected videos after successful submission
        setData({
          videoDataName: "",
          description: "",
          video: [],
        });
        setSelectedVideos([]); // Clear selected videos
      } else {
        alert(responseData.message || "Error saving videos");
      }
    } catch (error) {
      alert("Error saving video product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="product-container">
        <div className="product-container-2">
          <h1>Create Videos</h1>
          <form onSubmit={handleSubmit} className="Product-container-form-add">
            <div>
              <label htmlFor="videoDataName">Lecture Name:</label>
              <input
                type="text"
                id="videoDataName"
                name="videoDataName"
                value={data.videoDataName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>

        {/* Video Preview Section */}
        <div style={{ width: "55%" }} className="gallery-videos">
          <h1>Product Videos</h1>
          <div
            style={{
              border: "1px solid gray",
              height: "50%",
              width: "80%",
              overflow: "hidden",
            }}
            className="videos-container"
          >
            {selectedVideos.length > 0 ? (
              <video
                style={{ width: "65%" }}
                src={selectedVideos[selectedVideos.length - 1]?.url || ""}
                controls
              />
            ) : (
              <p>No video selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Video Uploader Component */}
      <div>
        <VideoUploader setSelectedVideos={setSelectedVideos} />
      </div>

      {/* Uploaded Videos Section */}
      <div className="show-videos">
        {fetchV.length > 0 ? (
          fetchV.map((item, i) => (
            <div className="single-video" key={i} style={{ margin: "10px" }}>
              <video style={{ width: "320px" }} src={item.url} controls />
              <div className="buttons">
                <button>Use</button>
                <button>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </>
  );
};

export default CreateVideoAndSave;
