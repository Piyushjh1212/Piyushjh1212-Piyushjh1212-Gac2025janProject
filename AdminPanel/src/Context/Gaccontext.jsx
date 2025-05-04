import React, { createContext, useEffect, useState } from "react";

// Create the context
export const GacContext = createContext(null);

const GacContextProvider = (props) => {
  const [adminUser, setAdminUser] = useState([]);
  const [fetchV, setFetchV] = useState([]);
  const [renderVideo, setRenderVideo] = useState([]);
  const [clientUser, setClientUser] = useState([]);

  // Token is read once on mount
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  // Fetch all users for admin
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:10011/api/v1/user/get-all-users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setAdminUser(data.allUsers);
    } catch (error) {
      console.error("Error fetching users:", error.message || error);
    }
  };

  // Fetch once on mount or when token changes
  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, [token]);

  // Format date function
  const readDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  // Context value
  const contextValue = {
    adminUser,
    fetchV,
    setFetchV,
    renderVideo,
    setRenderVideo,
    token,
    setToken,
    clientUser,
    setClientUser,
    readDate,
  };

  return (
    <GacContext.Provider value={contextValue}>
      {props.children}
    </GacContext.Provider>
  );
};

export default GacContextProvider;
