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
import { GacContext } from "../../Context/Gaccontext";

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
  const [totalMessages, setTotalMessages] = useState(0);
  const [doubtQueries, setDoubtQueries] = useState(0);
  const [certifiedStudents, setCertifiedStudents] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userLoginChartData, setUserLoginChartData] = useState([]);

  const { token, clientUser, setClientUser } = useContext(GacContext);

  const getMonthlyLoginData = (users) => {
    const monthlyLogins = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0,
      May: 0, Jun: 0, Jul: 0, Aug: 0,
      Sep: 0, Oct: 0, Nov: 0, Dec: 0,
    };

    users.forEach((user) => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString("default", { month: "short" });
      if (monthlyLogins[month] !== undefined) {
        monthlyLogins[month]++;
      }
    });

    return Object.values(monthlyLogins);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("adminToken");
        if (!token) {
          alert("No token found. Please login again.");
          window.location.href = "/Login"; // Redirect to login page if token is not found
          return;
        }

        // Fetch users
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-all-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch users: ${res.status} - ${errText}`);
        }

        const result = await res.json();
        setClientUser(result.allUsers);
        setUserCount(result.allUsers.length);

        // Monthly chart data
        const monthlyLoginData = getMonthlyLoginData(result.allUsers);
        setUserLoginChartData(monthlyLoginData);

        // Static demo values
        setTotalPayments(85000);
        setDoubtQueries(120);
        setCertifiedStudents(80);
        setReviews(45);

        // Fetch messages
        const msgRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/contact/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const msgData = await msgRes.json();
        setTotalMessages(Array.isArray(msgData) ? msgData.length : 0);

      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setClientUser]); // Removed token from dependencies as it's stored globally

  const userData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly User Logins",
        data: userLoginChartData,
        borderColor: "#4c6ef5",
        backgroundColor: "rgba(76, 110, 245, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly User Login Growth" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 10 },
      },
    },
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
        <Link to={"/admin/UserdataDisplay"}>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{userCount}</p>
          </div>
        </Link>

        <Link to={"/admin/PaymentDisplay"}>
          <div className="stat-card">
            <h3>Total Payment Collection</h3>
            <p>₹{totalPayments}</p>
          </div>
        </Link>

        <Link to={"/admin/FormDisplay"}>
          <div className="stat-card">
            <h3>Total Form Requests</h3>
            <p>{totalMessages}</p>
          </div>
        </Link>

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
          <Line data={userData} options={options} />
        </div>

        <div className="graph-card">
          <h3>Payment Collection Over Time</h3>
          <Line data={paymentData} />
        </div>
      </div>
    </div>
  );
}
