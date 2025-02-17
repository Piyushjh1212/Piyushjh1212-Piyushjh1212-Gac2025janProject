import React, { useState, useContext, useEffect } from "react";
import "./AddNew.css";
import { ImageContext } from "../../Context/ImageContext";
import ImageUploader from "../../ImageUploader/ImageUploader";

const CreateProduct = () => {
  const { selectedImages, setSelectedImages } = useContext(ImageContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    NewPrice: "",
    category: "",
    discounted: "",
    images: selectedImages,
  });

  const [loading, setLoading] = useState(false);

  // Update images only when selectedImages changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      images: selectedImages,
    }));
  }, [selectedImages]);

  // Handle input change
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

    setLoading(true); // Set loading to true while submitting
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
        // Reset form and selected images after successful submission
        setData({
          name: "",
          description: "",
          price: "",
          NewPrice: "",
          category: "",
          discounted: "",
          images: [],
        });
        setSelectedImages([]); // Clear selected images from context
      } else {
        alert(responseData.message || "Error creating product");
      }
    } catch (error) {
      alert("Error creating product");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <div className="product-container">
        <div className="product-container-2">
          <h1>Create Product</h1>
          <form onSubmit={handleSubmit} className="Product-container-form-add">
            <div>
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
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
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={data.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="NewPrice">New Price:</label>
              <input
                type="number"
                id="NewPrice"
                name="NewPrice"
                value={data.NewPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={data.category}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="discounted">Discounted:</label>
              <input
                type="text"
                id="discounted"
                name="discounted"
                value={data.discounted}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </form>
        </div>
        <div style={{ width: "55%" }} className="gallery-images">
          <h1>Product images</h1>
          <div
            style={{
              border: "1px solid gray",
              height: "50%",
              width: "80%",
              overflow: "hidden",
            }}
            className="images-container"
          >
            {selectedImages.length > 0 ? (
              <img
                style={{ width: "65%" }}
                src={selectedImages[selectedImages.length - 1]}
                alt=""
              />
            ) : (
              <p>No image selected</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <ImageUploader/>
      </div>
    </>
  );
};

export default CreateProduct;
