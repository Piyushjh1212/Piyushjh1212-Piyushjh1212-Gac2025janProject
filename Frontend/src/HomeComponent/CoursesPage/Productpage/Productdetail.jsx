import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Productdetail.css';

const ProductDetailPage = () => {
  const { dbCategory, id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:10011/api/v1/Different_Database_Modle/${dbCategory}/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data.products);  // 👈 Update to "products"
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [dbCategory, id]);

    const HandleClick = (product) => {
     navigate("/checkout", { state: { product } });
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
 <section className="product-detail-container">
  {products.map((product) => (
    <div key={product._id} className="product-detail-card">
      {/* Product Image */}
      {product.images[0].url? (
        <img
          src={product.images[0].url}
          alt={product.name || "Product image"}
          className="product-image"
          loading="lazy"
        />
      ) : (
        <div className="image-placeholder">No Image Available</div>
      )}

      {/* Product Info */}
      <div className="product-info">
        <h2 className="product-title">{product.name || "Unnamed Product"}</h2>
        {/* Pricing */}
        <div className="price-section_courses">
          <p className="old-price">₹{product.price ?? "N/A"}</p>
          <p className="new-price">₹{product.NewPrice ?? "N/A"}</p>
          <p className="discount">{product.discounted ?? "N/A"}% off</p>
        </div>

        {/* CTA Button */}
        <button
          className="enroll-button"
          onClick={() => HandleClick(product)}
        >
          Enroll Now
        </button>
      </div>
    </div>
  ))}
</section>

  );
};

export default ProductDetailPage;
