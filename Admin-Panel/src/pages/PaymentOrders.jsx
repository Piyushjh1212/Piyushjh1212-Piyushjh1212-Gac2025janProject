import React, { useEffect, useState } from "react";
import './Styles/PaymentOrders.css'

export default function PaymentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/razorpay/Get-All-Orders", {
          method: "GET",
          credentials: "include", // for cookies if you're using them
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Order fetch failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="payment-orders-container">
      <h2>My Payment Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p><strong>Amount:</strong> ₹{order.amount / 100}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment ID:</strong> {order.paymentId || "N/A"}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
