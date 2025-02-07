import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

const OrderForm = () => {
  const location = useLocation();
  const product = location.state?.product;
  
  if (!product) {
    return <p>Product details not found.</p>;
  }

  const [data, setData] = useState({
    courseId: product._id,
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";

      // Step 1: Load Razorpay script
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      // Step 2: Create an order on the backend
      const orderResponse = await fetch("http://localhost:10011/api/v1/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: product.price * 100, currency: "INR" }),
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        alert("Failed to create order.");
        return;
      }

      // Step 3: Open Razorpay payment modal
      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Growall Coaching",
        description: product.name,
        order_id: orderData.id,
        handler: async function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

          // Step 4: Verify payment on the backend
          const verifyResponse = await fetch("http://localhost:10011/api/v1/payment/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("Payment verified and order placed successfully!");
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment process failed:", error);
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
        <div className="input-group">
          <input
            className="input-first-name"
            value={data.firstName}
            onChange={(e) => setData((prev) => ({ ...prev, firstName: e.target.value }))}
            placeholder="First name"
            type="text"
          />
          <input
            className="input-last-name"
            value={data.lastName}
            onChange={(e) => setData((prev) => ({ ...prev, lastName: e.target.value }))}
            placeholder="Last name"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            className="input-email"
            value={data.email}
            onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Email"
            type="email"
          />
          <input
            className="input-street"
            value={data.street}
            onChange={(e) => setData((prev) => ({ ...prev, street: e.target.value }))}
            placeholder="Street"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            className="input-city"
            value={data.city}
            onChange={(e) => setData((prev) => ({ ...prev, city: e.target.value }))}
            placeholder="City"
            type="text"
          />
          <input
            className="input-state"
            value={data.state}
            onChange={(e) => setData((prev) => ({ ...prev, state: e.target.value }))}
            placeholder="State"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            className="input-zipcode"
            value={data.zipcode}
            onChange={(e) => setData((prev) => ({ ...prev, zipcode: e.target.value }))}
            placeholder="Zipcode"
            type="text"
          />
          <input
            className="input-country"
            value={data.country}
            onChange={(e) => setData((prev) => ({ ...prev, country: e.target.value }))}
            placeholder="Country"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            className="input-phone"
            value={data.phone}
            onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Contact number"
            type="text"
          />
        </div>
        <button onClick={handlePayment} className="checkout-button">
          PAY WITH RAZORPAY
        </button>
      </div>
      <div className="course-details">
        {Array.from(new Set(product.images.map((img) => img.url.split("?")[0]))).map((url, i) => (
          <img key={i} className="course-image" src={url} alt="Course" />
        ))}
        <p className="course-name">{product.name}</p>
        <p className="course-price">INR {product.price}</p>
      </div>
    </div>
  );
};

export default OrderForm;
