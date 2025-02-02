import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <p className="error-message">
        No product found! Please select a product to buy.
      </p>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "upi",
  });

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      alert("Failed to load Razorpay SDK");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const { name, email, address } = formData;

    if (!name || !email || !address) {
      alert("All fields are required!");
      return;
    }

    try {
      // Create an order on the server
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price * 100, // Convert to paisa (₹1 = 100 paisa)
          currency: "INR",
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        alert(`Failed to create order: ${orderData.message}`);
        return;
      }

      const options = {
        key: "your_razorpay_key_id", // Replace with your Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: `Purchase of ${product.name}`,
        image: "/assets/logo.png", // Optional: your company logo
        order_id: orderData.id, // Order ID from server
        handler: async function (response) {
          // After payment, verify it on the server
          const verifyResponse = await fetch(
            "http://localhost:5000/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyResponse.json();
          console.log(verifyData);

          if (verifyResponse.ok) {
            alert("Payment successful!");
          } else {
            alert(`Payment verification failed: ${verifyData.message}`);
          }
        },
        prefill: {
          name,
          email,
          contact: "1234567890", // Optional: Replace with user's contact
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your payment. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="product-details-card">
          <h2 className="product-title">Product: {product.name}</h2>
          <div className="product-image">
            <img
              src={product.image}
              alt={product.name}
              className="product-image-img"
              onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
            />
          </div>
          <p className="product-description">
            <strong>Description:</strong>{" "}
            {product.Description || "No description available."}
          </p>
          <p className="product-price">
            <strong>Price:</strong> ₹{product.price} INR
          </p>
        </div>
        <div className="checkout-form-card">
          <h1 className="checkout-form-title">Checkout</h1>
          <form onSubmit={handlePayment} className="checkout-form">
            <div className="form-field">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Pay with Razorpay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
