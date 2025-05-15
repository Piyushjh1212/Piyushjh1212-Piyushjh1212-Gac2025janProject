import React, { useEffect, useState } from "react";
import "./Coursesstyle.css";
import ProductCard from "./ProductCard";

const HomeProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
    const res = await fetch("http://localhost:10011/api/v1/course/courses");
    const data = await res.json();
    setProducts(data);
  } catch (error) {
    console.error("Fetch error:", error);
    setError("Something went wrong while fetching products. Please try again later.");
  } finally {
    setLoading(false);
  }
};
    fetchAllProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Explore Our Top Courses</h2>

      {loading ? (
        <p>Loading courses...</p>
      ) : products.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              dbCategory={product.category || "defaultCategory"}// Pass the default category here (can be dynamic as per requirement)
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeProductsPage;
