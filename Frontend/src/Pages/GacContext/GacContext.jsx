import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const GacContext = createContext(null);

const GacContextProvider = (props) => {
  const [SetUser, IsSetUser] = useState(null);
  const [Loading, SetLoading] = useState(null);

  const GetUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/Get-User`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log(data);
      IsSetUser(data); // ✅ Save to state
    } catch (error) {
      console.error("Error fetching user data:", error);
      IsSetUser(null); // fallback
    } finally {
      SetLoading(false);
    }
  };

  const ContextValue = {
    SetUser,
    Loading,
    refreshUser: GetUserData, // ✅ Optional: re-fetch manually
  };

  return (
    <GacContext.Provider value={ContextValue}>
      {props.children}
    </GacContext.Provider>
  );
};

export default GacContextProvider;

// import React, { createContext, useState, useEffect } from "react";

// export const GacContext = createContext(null);

// const GacContextProvider = (props) => {
//   const [user, setUser] = useState(null); // ✅ Store user data
//   const [loading, setLoading] = useState(true); // Optional: for loading state

//   // ${import.meta.env.VITE_BACKEND_URL}/api/v1/users/get-user

//   const getUserData = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/Get-User`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }

//       const data = await response.json();
//       console.log(data);
//       setUser(data); // ✅ Save to state
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setUser(null); // fallback
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserData(); // ✅ Auto-fetch on mount
//   }, []);

//   const ContextValue = {
//     user,
//     loading,
//     refreshUser: getUserData, // ✅ Optional: re-fetch manually
//   };

//   return (
//     <GacContext.Provider value={ContextValue}>
//       {props.children}
//     </GacContext.Provider>
//   );
// };

// export default GacContextProvider;
