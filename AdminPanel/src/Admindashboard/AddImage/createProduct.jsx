import React, { useState, useEffect } from "react";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    NewPrice: "",
    discounted: "",
    description: "",
    Category: "",
    dbCategory: "",
    mainProductId: "",
    imageLinks: "",
  });
  const [data, setData] = useState([]);

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
      discounted: formData.discounted,
      description: formData.description,
      Category: formData.Category,
      dbCategory: formData.dbCategory,
      mainProductId: formData.mainProductId,
      images: formData.imageLinks.split(",").map((link) => link.trim()),
    };

    try {
      const response = await fetch(
        "http://localhost:10011/api/v1/Different_Database_Modle/create",
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
        console.log("✅ Product Created:", result);
      } else {
        console.error("❌ Error creating product:", result);
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  const fetchMainProduct = async () => {
    try {
      const res = await fetch("http://localhost:10011/api/v1/course/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        alert("❌ Response not OK");
        return;
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      alert("❌ " + error.name + ": " + error.message);
    }
  };

  useEffect(() => {
    fetchMainProduct();
  }, []);

  return (
    <div>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Price:</label>
          <input
            type="number"
            name="NewPrice"
            value={formData.NewPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Discounted:</label>
          <input
            type="text"
            name="discounted"
            value={formData.discounted}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Database Category:</label>
          <select
            name="dbCategory"
            value={formData.dbCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select DB</option>
            <option value="db1">DB1</option>
            <option value="db2">DB2</option>
            <option value="db3">DB3</option>
          </select>
        </div>
        <div>
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
        <div>
          <label>Image URLs (comma-separated):</label>
          <textarea
            name="imageLinks"
            value={formData.imageLinks}
            onChange={handleChange}
            placeholder="Paste image links separated by commas"
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
