import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ImageProvider } from "./Components/ImageContext/ImageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ImageProvider>
    <App />
  </ImageProvider>
);
