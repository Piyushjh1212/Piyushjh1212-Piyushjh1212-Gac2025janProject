import { createContext, useEffect, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    console.log(selectedImages);
  }, []);

  return (
    <ImageContext.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </ImageContext.Provider>
  );
};
