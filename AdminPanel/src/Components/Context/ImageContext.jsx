import React, { createContext, useState } from "react";

// Create the context
export const ImageContext = createContext();

// ImageProvider component
export const ImageProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  return (
    <ImageContext.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </ImageContext.Provider>
  );
};
