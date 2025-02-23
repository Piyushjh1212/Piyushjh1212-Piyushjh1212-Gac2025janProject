import React, { createContext, useState } from "react";

export const GacContext = createContext(null);

const GacContextProvider = ({ children }) => {
  const [showVideo, setShowVideo] = useState('');

  const contextValue = {
    showVideo,
    setShowVideo
  };

  return (
    <GacContext.Provider value={contextValue}>
      {children}
    </GacContext.Provider>
  );
};

export default GacContextProvider;
