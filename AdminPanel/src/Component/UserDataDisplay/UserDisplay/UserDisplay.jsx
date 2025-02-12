import React, { useState, useEffect } from "react";
import "./UserDisplay.css";

export default function UserDisplay() {
  const [userCount, setUserCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalRequest, setTotalRequest] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    // Example static data
    setUserCount(120);
    setTotalPayments(85000);
    setTotalRequest(500);

    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", registrationDate: "2025-01-15" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", registrationDate: "2025-01-20" },
      { id: 3, name: "Sam Wilson", email: "sam@example.com", registrationDate: "2025-02-05" },
      // Add more users as needed
    ]);
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-dashboard">
      <h1 className="dashboard-title">User Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{userCount}</p>
        </div>
      </div>

      <div className="users-list">
        <h2>User Details</h2>

        {/* Search input field */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.registrationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
