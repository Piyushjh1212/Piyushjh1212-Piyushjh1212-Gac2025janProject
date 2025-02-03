import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    adminUserName: "",
    adminPassword: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:10011/api/admin-user/login-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const fetchedData = await response.json();
      localStorage.setItem('adminToken', fetchedData.adminToken);
      console.log(fetchedData.adminToken);
      navigate('/admin/users')
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={data.adminUserName}
          onChange={(e) =>
            setData((prev) => ({ ...prev, adminUserName: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={data.adminPassword}
          onChange={(e) =>
            setData((prev) => ({ ...prev, adminPassword: e.target.value }))
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
