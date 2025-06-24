import React, { useState, useEffect } from "react";
import "./Styles/create_Add_image.css";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    NewPrice: "",
    description: "",
    mainProductId: "",
    imageLinks: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      price: formData.price,
      NewPrice: formData.NewPrice,
      description: formData.description,
      mainProductId: formData.mainProductId,
      images: formData.imageLinks.split(",").map((link) => link.trim()),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/my_courses/Create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(" Product Created:", result);
      } else {
        console.error(" Error creating product:", result);
      }
    } catch (error) {
      console.error(" Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/V1/Course/getMyCourses"
        );
        const data = await res.json();
        setData(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          "Something went wrong while fetching products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  return (
    <div className="create-product-container">
      <h2 className="create-product-title">Create New Product</h2>
      <form className="create-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>New Price:</label>
          <input
            type="number"
            name="NewPrice"
            value={formData.NewPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Main Product:</label>
          <select
            name="mainProductId"
            value={formData.mainProductId}
            onChange={handleChange}
            required
          >
            <option value="">Select Main Product</option>
            {Array.isArray(data) &&
              data.map((item, i) => (
                <option key={i} value={item._id}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Image URLs (comma-separated):</label>
          <textarea
            name="imageLinks"
            value={formData.imageLinks}
            onChange={handleChange}
            placeholder="Paste image links separated by commas"
            required
          />
        </div>

        <button className="create-product-submit" type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
