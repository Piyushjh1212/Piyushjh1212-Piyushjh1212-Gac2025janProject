import React, { useEffect, useState } from "react";
import "../Styles/Coursesstyle.css";
import ProductCard from "./ProductPage/ProductCard";


const CoursesPage = ({innerRef}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchAllProducts = async () => {
      try { 
    const res = await fetch("http://localhost:5000/api/v1/course/getMyCourses");
    const data = await res.json();
    setProducts(data.data);
  } catch (error) {
    console.error("Fetch error:", error);
    setError("Something went wrong while fetching products. Please try again later.");
  } finally {
    setLoading(false);
  }
};
    fetchAllProducts();
  }, []);

 useEffect(() => {
    window.scrollTo(0,0); // 👈 Scrolls to top on mount
  }, []);


  return (
    <div ref={innerRef} className="products-container">
      <h2>Explore Our Top Courses</h2>

      {loading ? (
        <p>Loading courses...</p>
      ) : products.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="products-grid-wrapper">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              dbCategory={product.category || "defaultCategory"}// Pass the default category here (can be dynamic as per requirement)
            />
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
