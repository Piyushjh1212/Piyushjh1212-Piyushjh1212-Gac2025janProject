import React, { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:10011/api/v1/admin/products") // Replace with API
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="products-container">
      <h2 className="products-heading">Manage Products</h2>
      <ul className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price}</span>
            </li>
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </ul>
    </div>
  );
}
