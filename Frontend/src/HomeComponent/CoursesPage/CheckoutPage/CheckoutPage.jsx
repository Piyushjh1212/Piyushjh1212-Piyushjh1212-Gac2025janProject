import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { countries } from "./Countries";
import "./Checkout.css";

const Checkoutpage = () => {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return <p>Product details not found.</p>;
  }

  const basePrice = parseFloat(product.price);
  const taxRate = 0.18;
  const taxAmount = +(basePrice * taxRate).toFixed(2);
  const totalAmount = +(basePrice + taxAmount).toFixed(2);

  const [data, setData] = useState({
    courseId: product._id,
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "IN",
    phone: "",
    features: product.price,
    amount: totalAmount, // Total amount includes tax
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required.";
    if (!data.lastName) newErrors.lastName = "Last name is required.";
    if (!data.email) newErrors.email = "Email is required.";
    if (!data.phone) newErrors.phone = "Phone number is required.";
    else if (data.phone.length !== getPhoneLength()) {
      newErrors.phone = `Phone number should be ${getPhoneLength()} digits.`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPhoneLength = () => {
    const country = countries.find((c) => c.code === data.country);
    return country ? country.phoneLength : 10;
  };

  useEffect(() => {
    const scriptExists = document.querySelector(
      "script[src='https://checkout.razorpay.com/v1/checkout.js']"
    );
    if (!scriptExists) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        alert("User authentication required. Please log in.");
        return;
      }

      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/create-Order`;

      const orderResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          amount: totalAmount, // include tax in backend order request
        }),
      });

      const responseText = await orderResponse.text();

      if (!orderResponse.ok) {
        throw new Error(
          `Failed to create order. Server responded with: ${responseText}`
        );
      }

      const orderData = JSON.parse(responseText);

      if (!orderData.success || !orderData.id) {
        alert(`Order creation failed: ${orderData.message || "Unknown error"}`);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Growall Coaching",
        description: product.name,
        image: "/Assets/GAC.jpg",
        order_id: orderData.id,
        handler: async function (response) {
          alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

          const verifyResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/verifyPayments`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("✅ Payment verified successfully!");
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#243B55",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert("❌ Payment failed! " + response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("🚨 Error in handlePayment:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="order-form-container">
        <div className="course-details-container">
          <div className="course-details">
            {Array.from(
              new Set(product.images.map((img) => img.url.split("?")[0]))
            ).map((url, i) => (
              <img key={i} className="course-image" src={url} alt="Course" />
            ))}
            <p className="course-name">{product.name}</p>
            <p className="course-price">INR {basePrice}</p>
          </div>

          <div className="course-order-heading">
            <h2>What you get in this course</h2>
            <ul className="course-feature-list">
              {product.features?.map((feature, index) => (
                <li key={index}>✅ {feature}</li>
              ))}
            </ul>
          </div>

          <div className="course-guarantee">
            <p>🎯 One-time purchase</p>
            <p>⏳ 5 years full access</p>
            <p>📞 24/7 support</p>
            <p>🔒 100% secure payment</p>
          </div>
        </div>
      </div>

      <div className="order-form">
        <div className="Payment-container-1">
          <h2>Checkout</h2>
          <div className="input-group">
            <input
              placeholder="First name"
              value={data.firstName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}

            <input
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>

          <div className="input-group">
            <input
              placeholder="Email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              placeholder="Street"
              value={data.street}
              onChange={(e) =>
                setData((prev) => ({ ...prev, street: e.target.value }))
              }
            />
          </div>

          <div className="input-group">
            <select
              value={data.country}
              onChange={(e) =>
                setData((prev) => ({ ...prev, country: e.target.value }))
              }
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Contact number"
              value={data.phone}
              onChange={(e) =>
                setData((prev) => ({ ...prev, phone: e.target.value }))
              }
              maxLength={getPhoneLength()}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>INR {basePrice}</span>
            </div>
            <div className="summary-item">
              <span>Tax (18%, which is paide to the govt.)</span>
              <span>INR {taxAmount}</span>
            </div>
            <div className="summary-item total">
              <strong>Total</strong>
              <strong>INR {totalAmount}</strong>
            </div>
          </div>

          <button className="checkout-button" onClick={handlePayment}>
            PAY NOW
          </button>

          <div className="secure-payment-info">
            <p>🔒 SSL secured transaction</p>
            <p>💳 We accept Visa, MasterCard, UPI</p>
            <img src="/images/payment-methods.png" alt="payment methods" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoutpage;
