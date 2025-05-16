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

    const Handleclick = () => {
    navigate("/products/checkout"); // ✅ Correct way to navigate
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

   

  return (
    <section className="product-detail-container">
      {products.map((product) => (
        <div key={product._id} className="product-detail-card">
          <h1>{product.name || "Unnamed Product"}</h1>

          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              alt={product.name || "Product image"}
              className="product-image"
              loading="lazy"
            />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}

          <p>{product.description || "No description available."}</p>
          <p><strong>Price:</strong> ₹{product.price ?? "N/A"}</p>
          <p><strong>Discounted Price:</strong> ₹{product.NewPrice ?? "N/A"}</p>
          <p><strong>Discount:</strong> {product.discounted ?? "N/A"}</p>
          <button className="enroll-button" onClick={Handleclick}>Enroll Now</button>
        </div>
      ))}
    </section>
  );
};

export default ProductDetailPage;
