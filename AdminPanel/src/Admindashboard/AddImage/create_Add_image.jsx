import React, { useState, useContext, useEffect } from "react";
import "./CreateAddImage.css";
import ImageUploader from "../../Uploader/ImageUploader";
import { ImageContext } from "../../Context/ImageContext";

const Create_Add_Image = () => {
  const { selectedImages, setSelectedImages } = useContext(ImageContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    NewPrice: "",
    category: "",
    discounted: "",
    dbCategory: "db1", // default dropdown selection
    images: selectedImages,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      images: selectedImages,
    }));
  }, [selectedImages]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setLoading(true);
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

      const result = await response.json();

      if (response.ok) {
        alert("Product created successfully");
        setData({
          name: "",
          description: "",
          price: "",
          NewPrice: "",
          category: "",
          discounted: "",
          dbCategory: "db1",
          images: [],
        });
        setSelectedImages([]);
      } else {
        alert(result.message || "Failed to create product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-product-container">
        <div className="form-section">
          <h1>Create Product</h1>
          <form onSubmit={handleSubmit} className="create-product-form">
            {[
              { label: "Product Name", key: "name", type: "text" },
              { label: "Description", key: "description", type: "textarea" },
              { label: "Price", key: "price", type: "number" },
              { label: "New Price", key: "NewPrice", type: "number" },
              { label: "Category", key: "category", type: "text" },
              { label: "Discounted", key: "discounted", type: "text" },
            ].map((field) => (
              <div key={field.key} className="form-field">
                <label htmlFor={field.key}>{field.label}:</label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.key}
                    name={field.key}
                    value={data[field.key]}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.key}
                    name={field.key}
                    value={data[field.key]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

            {/* 👇 New dropdown added here */}
            <div className="form-field">
              <label htmlFor="dbCategory">Select Product Type:</label>
              <select
                id="dbCategory"
                name="dbCategory"
                value={data.dbCategory}
                onChange={handleChange}
                required
              >
                <option value="db1">Database1</option>
            
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>

        <div className="image-preview-section">
          <h2>Product Image Preview</h2>
          <div className="image-box">
            {selectedImages.length > 0 ? (
              <img
                src={selectedImages[selectedImages.length - 1]}
                alt="Selected"
              />
            ) : (
              <p>No image selected</p>
            )}
          </div>
        </div>
      </div>

      <div className="image-uploader-wrapper">
        <ImageUploader />
      </div>
    </>
  );
};

export default Create_Add_Image;
