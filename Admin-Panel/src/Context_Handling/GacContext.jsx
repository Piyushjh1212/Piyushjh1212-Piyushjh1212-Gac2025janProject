import React, { createContext, useEffect, useState } from "react";

export const GacContext = createContext(null); // Corrected context creation

const GacContextProvider = (props) => {
  const [adminUser, setAdminUser] = useState([]);
  const [fetchV, setFetchV] = useState([]);
  const [renderVideo, setRenderVideo] = useState([]);
  const [clientUser, setClientUser] = useState([]);

  const token = localStorage.getItem('adminToken');

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
      console.log(data);
      setAdminUser(data.allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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

  const contextValue = {
    adminUser,
    fetchV,
    setFetchV,
    renderVideo,
    setRenderVideo,
    token,
    clientUser,
    setClientUser,
    readDate,
  }; // You can add state or functions here

  return (
    <GacContext.Provider value={contextValue}>
      {props.children}
    </GacContext.Provider>
  );
};

export default GacContextProvider;
