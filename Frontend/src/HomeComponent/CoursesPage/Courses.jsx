import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Coursesstyle.css";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:10011/api/v1/courses/courses");
        const data = await response.json();
        setCategories(data);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="products-page">
      <h2 className="products-header">Explore Our Courses</h2>
      <div className="products-grid">
        {categories.map((category) => (
          <div key={category._id} className="products-card">
            <div className="products-image">
              <img src={category.image} alt={category.title} />
            </div>
            <h3 className="products-title">{category.title}</h3>
            <p className="products-description">{category.description}</p>
            <Link to={`/course/${category._id}`} className="products-explore-btn">Explore</Link>

          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
