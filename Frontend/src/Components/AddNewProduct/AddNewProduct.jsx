import React, { useState, useContext, useEffect } from 'react';
import ImageUploader from '../ImageUploader/ImageUploder';
import { ImageContext } from '../ImageContext/ImageContext';

const CreateProduct = () => {
  const { selectedImages } = useContext(ImageContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: []
  });

  // Update images only when selectedImages changes
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      images: selectedImages
    }));
  }, [selectedImages]);

  // Handle input change
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("Product Data:", data);
    console.log("Selected Images:", selectedImages);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      const response = await fetch('http://localhost:10011/api/v1/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Fix: Added missing content type
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json(); // Parse JSON response

      if (response.ok) {
        alert('Product created successfully');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      alert('Error creating product');
      console.error(error);
    }
  };

  return (
    <div>
      <ImageUploader />
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={data.stock}
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
