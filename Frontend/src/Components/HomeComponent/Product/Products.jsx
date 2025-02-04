import React from "react";
import {Link} from "react-router-dom"
import "./Products.css";

const ProductPage = () => {
  const categories = [
    {
      id: 1,
      title: "Web Development",
      description: "Master frontend and backend technologies to build stunning websites.",
      image: "/Assets/Backend.webp",
      link: "/web-development"
    },
    {
      id: 3,
      title: "App Development",
      description: "Build mobile applications for Android and iOS with modern frameworks.",
      image: "/Assets/Backend.webp",
      link: "/app-development"
    },
    {
      id: 2,
      title: "AI Development",
      description: "Learn AI, Machine Learning, and Deep Learning to create smart applications.",
      image: "/Assets/Backend.webp",
      link: "ai-development"
    }
  ];

  return (
    <section className="products-page">
      <h2 className="products-header">Explore Our Courses</h2>
      <div className="products-grid">
        {categories.map((category) => (
          <div key={category.id} className="products-card">
            <div className="products-image">
              <img src={category.image} alt={category.title} />
            </div>
            <h3 className="products-title">{category.title}</h3>
            <p className="products-description">{category.description}</p>
            <Link to={"/show-products"}><a href={category.link} className="products-explore-btn">Explore</a></Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
