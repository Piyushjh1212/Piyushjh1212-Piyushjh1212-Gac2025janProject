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
import "./UserDisplay.css";
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

export default function UserDisplay() {
  const [userCount, setUserCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalRequest, setTotalRequest] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const { adminUser, readDate } = useContext(GacContext);

  useEffect(() => {
    // Fetch data for user count, total payments, and total requests
    if (adminUser) {
      setUserCount(adminUser.length); // Set actual user count
      setTotalPayments(adminUser.reduce((sum, user) => sum + user.payment, 0)); // Sum payments for total payments
      setTotalRequest(adminUser.length); // Example: Count requests, modify as needed
    }
  }, [adminUser]); // Recalculate when adminUser updates

  // Dynamic payment data for the graph based on actual data
  const paymentData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Example static months
    datasets: [
      {
        label: "Total user Count",
        data: [
          0,
          totalPayments / 7,
          totalPayments / 6,
          totalPayments / 5,
          totalPayments / 4,
          totalPayments / 3,
          totalPayments,
        ], // Adjust data dynamically
        borderColor: "#ff6347",
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Chart.js options to format the y-axis labels
  const chartOptions = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            if (value >= 1000000) return value / 1000000 + "M"; // Convert 1M+
            if (value >= 1000) return value / 1000 + "k"; // Convert 1k+
            return value;
          },
        },
      },
    },
  };

  // Filtered users based on search query
  const filteredUsers = adminUser?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">User Dashboard</h1>
      <div className="dashboard-container">
        <div className="stats-section">
          <div className="stats-box">
            <Link to={"/admin/UserdataDisplay"} aria-label="View user details">
              <h3>Total Users</h3>
              <p>{userCount || 0}</p> {/* Display actual user count */}
            </Link>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-box">
            <h3>Total Users</h3>
            <Line data={paymentData} options={chartOptions} />{" "}
            {/* Dynamically adjusted chart */}
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="search-container">
        <span className="search-user-user-f-d-b">Search User</span>
        <div>
          <input
            type="text"
            placeholder="Search Users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* User Data Section */}
      <div className="user-data-section">
        <h3>User Data</h3>
        <table className="user-data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, index, Date) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{readDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
