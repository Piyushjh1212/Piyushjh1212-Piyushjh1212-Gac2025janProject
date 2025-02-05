import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Checkout.css";

const OrderForm = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [token, setToken] = useState(localStorage.getItem("token") || "");
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

  const handleSubmit = async () => {
    const response = fetch(`url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const respResult = (await response).json();
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
        <div className="input-group">
          <input
            className="input-first-name"
            value={data.firstName}
            onChange={(e) => {
              setData((prev) => ({ ...prev, firstName: e.target.value }));
            }}
            placeholder="First name"
            type="text"
          />
          <input
            className="input-last-name"
            value={data.lastName}
            onChange={(e) => {
              setData((prev) => ({ ...prev, lastName: e.target.value }));
            }}
            placeholder="Last name"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            className="input-email"
            value={data.email}
            onChange={(e) => {
              setData((prev) => ({ ...prev, email: e.target.value }));
            }}
            placeholder="Email"
            type="email"
          />
          <input
            className="input-street"
            value={data.street}
            onChange={(e) => {
              setData((prev) => ({ ...prev, street: e.target.value }));
            }}
            placeholder="Street"
            type="text"
          />  
        </div>

        <div className="input-group">
          <input
            className="input-city"
            value={data.city}
            onChange={(e) => {
              setData((prev) => ({ ...prev, city: e.target.value }));
            }}
            placeholder="City"
            type="text"
          />
          <input
            className="input-state"
            value={data.state}
            onChange={(e) => {
              setData((prev) => ({ ...prev, state: e.target.value }));
            }}
            placeholder="State"
            type="text"
          />
        </div>
        <div className="input-group">
          <input
            className="input-zipcode"
            value={data.zipcode}
            onChange={(e) => {
              setData((prev) => ({ ...prev, zipcode: e.target.value }));
            }}
            placeholder="Zipcode"
            type="text"
          />
          <input
            className="input-country"
            value={data.country}
            onChange={(e) => {
              setData((prev) => ({ ...prev, country: e.target.value }));
            }}
            placeholder="Country"
            type="text"
          />
        </div>

        <div className="input-group">
          <input
            className="input-phone"
            value={data.phone}
            onChange={(e) => {
              setData((prev) => ({ ...prev, phone: e.target.value }));
            }}
            placeholder="Contact number"
            type="text"
          />
        </div>

        <button className="checkout-button">CHECKOUT</button>
      </div>
      <div className="course-details">
        {/* Ensure unique images */}
        {Array.from(
          new Set(product.images.map((img) => img.url.split("?")[0]))
        ).map((url, i) => (
          <img key={i} className="course-image" src={url} alt="Course" />
        ))}
        <p className="course-name">{product.name}</p>
        <p className="course-price">INR {product.price}</p>
      </div>
    </div>
  );
};

export default OrderForm;
