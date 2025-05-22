import React, { createContext, useState } from "react";

// Create the context
export const VideoContext = createContext();

// VideoProvider component
export const VideoProvider = ({ children }) => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  
  return (
    <VideoContext.Provider value={{ selectedVideos, setSelectedVideos }}>
      {children}
    </VideoContext.Provider>
  );
};
