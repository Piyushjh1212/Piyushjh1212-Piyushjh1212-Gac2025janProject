import React, { createContext, useEffect, useState } from "react";

export const GacContext = createContext(null); // Corrected context creation

const GacContextProvider = (props) => {
  const [adminUser, setAdminUser] = useState([]);
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

  const contextValue = {
    adminUser,
  }; // You can add state or functions here

  return (
    <GacContext.Provider value={contextValue}>
      {props.children}
    </GacContext.Provider>
  );
};

export default GacContextProvider;
