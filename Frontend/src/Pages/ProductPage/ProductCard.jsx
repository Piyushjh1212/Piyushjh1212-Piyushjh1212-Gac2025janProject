// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, dbCategory }) => {
  if (!product || !product._id) {
    return <div className="product-card error">Invalid product data</div>;
  }

  if (!dbCategory) {
    console.error("Missing dbCategory for product:", product);
    return <div className="product-card error">Missing database category</div>;
  }

  return (
    <div className="product-card">
      {product?.image ? (
        <img src={product.image} alt={product.name || "Product image"} />
      ) : (
        <div className="image-placeholder">No Image Available</div>
      )}

      <h3>{product.title}</h3>

      <p>
        {product.description
          ? `${product.description.slice(0, 80)}...`
          : "No description available."}
      </p>

      <Link to={`/product/${product._id}`}>
        <button>Explore Now</button>
      </Link>
    </div>
  );
};

export default ProductCard;
