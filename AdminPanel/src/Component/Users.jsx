import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./User.css";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Users() {
  const [userCount, setUserCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalRequest, setTotalRequest] = useState(0);

  useEffect(() => {
    // Fetch data for user count and total payments here if you have APIs (skipped for now)
    setUserCount(120); // Example static data
    setTotalPayments(85000); // Example static data
    setTotalRequest(500);
  }, []);

  // Example static data for the graph
  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months for x-axis
    datasets: [
      {
        label: "Total Users",
        data: [50, 70, 100, 150, 200, 250, 300], // Example users count
        borderColor: "#4c6ef5",
        backgroundColor: "rgba(76, 110, 245, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const paymentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Months for x-axis
    datasets: [
      {
        label: "Payment Collection (₹)",
        data: [5000, 7000, 10000, 15000, 20000, 25000, 30000], // Example payment data
        borderColor: "#ff6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="users-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <Link to={"/admin/UserdataDisplay"} aria-label="View user details">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </Link>
        </div>

        <div className="stat-card">
          <h3>Total Payment Collection</h3>
          <p>₹{totalPayments}</p>
        </div>

        <div className="stat-card">
          <h3>Total Form Requests</h3>
          <p>{totalRequest}</p>
        </div>

        <div className="stat-card">
          <h3>Total Doubt Queries</h3>
          <p>{totalRequest}</p>
        </div>
        <div className="stat-card">
          <h3>Total Certified students</h3>
          <p>{totalRequest}</p>
        </div>
        <div className="stat-card">
          <h3>Total Reviews</h3>
          <p>{totalRequest}</p>
        </div>
      </div>

      <div className="graphs-container">
        <div className="graph-card">
          <h3>User Growth Over Time</h3>
          <Line data={userData} />
        </div>

        <div className="graph-card">
          <h3>Payment Collection Over Time</h3>
          <Line data={paymentData} />
        </div>
        
      </div>
    </div>
  );
}
