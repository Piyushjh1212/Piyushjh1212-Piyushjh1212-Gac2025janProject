import React, { useState, useEffect, useContext } from "react";
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
import { GacContext } from "../../Context_Handling/GacContext";

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
  const [totalRequests, setTotalRequests] = useState(0);
  const [doubtQueries, setDoubtQueries] = useState(0);
  const [certifiedStudents, setCertifiedStudents] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  const { token, clientUser, setClientUser } = useContext(GacContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:10011/api/v1/user/get-all-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await res.json();
        setClientUser(result.allUsers);
        setUserCount(result.allUsers.length);

        // Set other example static values for now
        setTotalPayments(85000);
        setTotalRequests(500);
        setDoubtQueries(120);
        setCertifiedStudents(80);
        setReviews(45);

      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, setClientUser]);

  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Users",
        data: [50, 70, 100, 150, 200, 250, 300],
        borderColor: "#4c6ef5",
        backgroundColor: "rgba(76, 110, 245, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const paymentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Payment Collection (₹)",
        data: [5000, 7000, 10000, 15000, 20000, 25000, 30000],
        borderColor: "#ff6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  if (loading) {
    return <p style={{ padding: "2rem", textAlign: "center" }}>Loading dashboard...</p>;
  }

  return (
    <div className="users-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="stats-container">
        <Link to={"/admin/UserdataDisplay"} aria-label="View user details">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
        </Link>

        <Link to={"/admin/PaymentDisplay"} aria-label="View payment details">
          <div className="stat-card">
            <h3>Total Payment Collection</h3>
            <p>₹{totalPayments}</p>
          </div>
        </Link>

        <div className="stat-card">
          <h3>Total Form Requests</h3>
          <p>{totalRequests}</p>
        </div>

        <div className="stat-card">
          <h3>Total Doubt Queries</h3>
          <p>{doubtQueries}</p>
        </div>

        <div className="stat-card">
          <h3>Total Certified Students</h3>
          <p>{certifiedStudents}</p>
        </div>

        <div className="stat-card">
          <h3>Total Reviews</h3>
          <p>{reviews}</p>
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
