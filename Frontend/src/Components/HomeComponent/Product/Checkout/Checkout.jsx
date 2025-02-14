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
    amount: product.price,
  });

  // Load Razorpay Script Once
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
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        alert("User authentication required. Please log in.");
        return;
      }

      // **Create Order**
      const orderResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to create order.");
      }

      const orderData = await orderResponse.json();
      console.log(orderData);
      if (!orderData.success || !orderData.id) {
        alert(`Order creation failed: ${orderData.message || "Unknown error"}`);
        return;
      }

      // **Show Razorpay Modal**
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

          // **Verify Payment**
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
      console.log(error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
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
          <input
            className="input-last-name"
            value={data.lastName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, lastName: e.target.value }))
            }
            placeholder="Last name"
            type="text"
          />
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
          <input
            className="input-phone"
            value={data.phone}
            onChange={(e) =>
              setData((prev) => ({ ...prev, phone: e.target.value }))
            }
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
