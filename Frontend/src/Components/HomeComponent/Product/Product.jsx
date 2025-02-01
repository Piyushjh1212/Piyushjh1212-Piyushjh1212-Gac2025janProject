import React from "react";
import {Link} from "react-router-dom";

import "./Product.css";

const products = [
  {
    title: "Web Development",
    frontend: { name: "React.js, Angular, Html, Css, Javascript", description: "Modern UI with React" },
    backend: { name: "Node.js", description: "Scalable backend with Node.js" },
  },
  {
    title: "Mobile Development",
    frontend: { name: "Flutter", description: "Cross-platform mobile UI" },
    backend: { name: "Firebase", description: "Serverless backend with Firebase" },
  },
  {
    title: "AI/ML Development",
    frontend: { name: "Flutter", description: "Cross-platform mobile UI" },
    backend: { name: "Firebase", description: "Serverless backend with Firebase" },
  },
];

export default function Product() {
  return (
    
    <div className="product-page">
    {products.map((product, index) => (
      <div className="product-card" key={index}>
        <h2 className="product-title">{product.title}</h2>
        <div className="product-details">
          <div className="frontend">
            <h3>Frontend</h3>
            <p><strong>{product.frontend.name}</strong></p>
            <p>{product.frontend.description}</p>
          </div>
          <div className="backend">
            <h3>Backend</h3>
            <p><strong>{product.backend.name}</strong></p>
            <p>{product.backend.description}</p>
          </div>
        </div>
        <Link to="/Productgrid"> <button className="explore-btn">🚀 Explore</button></Link>
        
      </div>
    ))}
  </div>
  );
}
