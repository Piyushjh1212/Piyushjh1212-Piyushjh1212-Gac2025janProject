import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:10011/api/v1/product/${id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.product);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <img
        src={product.images?.[0]?.url}
        alt={product.name}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <p>Offer Price: ₹{product.NewPrice}</p>
      <p>Discount: {product.discounted}% Off</p>
      <button className="enroll-btn">Enroll Now</button>
    </div>
  );
};

export default ProductDetailPage;
