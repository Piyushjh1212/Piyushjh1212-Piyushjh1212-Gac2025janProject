import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Product.css";

const Product = ({ handleAddToCart }) => {
    const [products, setProducts] = useState([]);

    // Fetch all products from API
    const fetchAllProduct = async () => {
        try {
            const response = await fetch("http://localhost:10011/api/v1/product/get-all", {
                method: "GET",
            });

            const newData = await response.json();

            if (newData.success) {
                setProducts(newData.products); // Assuming API response contains { success, products }
            } else {
                console.error("Failed to fetch products:", newData.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Fetch products when component mounts
    useEffect(() => {
        fetchAllProduct();
    }, []);

    return (
        <section className="product-section">
            <h2 className="product-header">Learning Path...</h2>
            <h2 className="product-second-header">Web Development Courses</h2>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-image">
                                <img
                                    src={product.images?.[0]?.url || "/assets/placeholder.jpg"} // Use first image or placeholder
                                    alt={product.name}
                                    onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
                                />
                            </div>
                            <h3>{product.name}</h3>
                            <p className="price">
                                <span className="real-price">₹{product.price}</span> INR
                            </p>
                            <div className="product-details">
                                <Link
                                    to={`/products/checkout`}
                                    state={{ product }}
                                    className="add-to-cart-btn-buy-n"
                                    aria-label={`Buy ${product.name}`}
                                >
                                    Enroll Now
                                </Link>
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => handleAddToCart(product)}
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-message">Loading products...</p>
                )}
            </div>
        </section>
    );
};

export default Product;
