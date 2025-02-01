import React from "react";
import "./ProductGrid.css";

const products = [
  {
    title: "Web Development",
    image: "Assets",
    price: "$199",
  },
  {
    title: "Mobile Development",
    image: "https://via.placeholder.com/150",
    price: "$249",
  },
  {
    title: "AI/ML Development",
    image: "https://via.placeholder.com/150",
    price: "$299",
  },

];

export default function ProductGrid() {
  return (
    <div className="product-page_container">
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
            <div className="button-group">
              <button className="buy-now">Buy Now</button>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
