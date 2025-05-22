import React, { useContext, useEffect, useState } from "react";
// import VideoUpload from "../Component/VideoUploader/VUpload/VUpload";
import { GacContext } from "../../Context/Gaccontext";

const CourseRendering = () => {
  const { renderVideo } = useContext(GacContext);
  const [data, setData] = useState({
    title: "",
    description: "",
    vsubTitle: "",
    vUrl: "",
  });

  const [fetchData, setFetchData] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:10011/api/v1/course-render/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const newData = await response.json();

      if (!newData.success) {
        alert("Data not fetched");
        return;
      }
      alert("Data submitted successfully!");
      setData({ title: "", description: "", vsubTitle: "", vUrl: "" }); // Reset form
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await fetch(
        "http://localhost:10011/api/v1/course-render/get-all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setFetchData(result.allrenderedVideo || []);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(()=> {
    console.log(renderVideo);
  },[])

  return (
    <>
      <div className="course-rendering">
        <input
          value={data.title}
          onChange={(e) =>
            setData((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          placeholder="Enter video title"
        />
        <input
          value={data.description}
          onChange={(e) =>
            setData((prev) => ({ ...prev, description: e.target.value }))
          }
          type="text"
          placeholder="Enter video description"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <hr />

      <div className="subtopic-adding">
        <label htmlFor="title">Select a Video</label>
        <select name="title" id="title">
          <option value="">Select an option</option>
          {renderVideo.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title || item._id}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default CourseRendering;
