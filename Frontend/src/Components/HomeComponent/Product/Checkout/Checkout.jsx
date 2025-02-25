import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { countries } from ".././../../../../public/Assets/countries"; // Import countries data
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
    country: "IN", // default country set to India
    phone: "",
    amount: product.price,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

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
    return country ? country.phoneLength : 10; // Default to 10 if not found
  };

  const getPhoneCode = () => {
    const country = countries.find((c) => c.code === data.country);
    return country ? country.phoneCode : "+91"; // Default to India code if not found
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
  
    console.log("📌 Sending payment request with data:", data);
  
    try {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        alert("User authentication required. Please log in.");
        return;
      }
      console.log("📌 Token Sent:", token);
  
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/create-Order`;
      console.log("📌 API Request URL:", apiUrl);
  
      const orderResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      console.log("📌 API Response Status:", orderResponse.status);
  
      const responseText = await orderResponse.text(); // Get full response text
      console.log("📌 Raw API Response:", responseText);
  
      if (!orderResponse.ok) {
        throw new Error(`Failed to create order. Server responded with: ${responseText}`);
      }
  
      const orderData = JSON.parse(responseText); // Convert response text to JSON
      console.log("📌 Parsed API Response:", orderData);
  
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

          if (!verifyResponse.ok) {
            throw new Error("Payment verification failed.");
          }

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
    <div className="order-form-container">
      <div className="course-details-container">
        <div className="course-details">
          {Array.from(
            new Set(product.images.map((img) => img.url.split("?")[0]))
          ).map((url, i) => (
            <img key={i} className="course-image" src={url} alt="Course" />
          ))}
          <p className="course-name">{product.name}</p>
          <p className="course-price">INR {product.price}</p>
        </div>

        <div className="course-order-heading">
          <h2>What you get in this course</h2>
        </div>
        <div className="course-order-heading-1">
          <ul>
            <li>Complete Frontend Development (HTML, CSS, JavaScript, and frameworks)</li>
            <li>Complete Backend Development (Node.js, Express.js)</li>
            <li>Complete Database (SQL & MongoDB), MERN Stack</li>
            <li>Real Life and Industry Grade Projects</li>
            <li>Complete Java Language</li>
            <li>Complete Data Structures & Algorithms</li>
            <li>Library of DSA Qs with Video Solutions from Top Companies</li>
          </ul>
        </div>
      </div>
      <div className="order-form">
        <div className="Payment-container-1">
          <div className="input-group">
            <input
              className="input-first-name"
              value={data.firstName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              placeholder="First name"
              type="text"
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            <input
              className="input-last-name"
              value={data.lastName}
              onChange={(e) =>
                setData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              placeholder="Last name"
              type="text"
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
          <div className="input-group">
            <input
              className="input-email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
              type="email"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
            <input
              className="input-street"
              value={data.street}
              onChange={(e) =>
                setData((prev) => ({ ...prev, street: e.target.value }))
              }
              placeholder="Street"
              type="text"
            />
          </div>
          <div className="input-group">
            <select
              value={data.country}
              onChange={(e) =>
                setData((prev) => ({ ...prev, country: e.target.value }))
              }
              className="input-country"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <input
              className="input-phone"
              value={data.phone}
              onChange={(e) =>
                setData((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Contact number"
              type="text"
              maxLength={getPhoneLength()}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
          <button onClick={handlePayment} className="checkout-button">
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
