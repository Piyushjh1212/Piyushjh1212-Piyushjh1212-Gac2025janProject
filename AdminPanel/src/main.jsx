import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ImageContextProvider } from "./Components/ImageContext/ImageContext.jsx";

createRoot(document.getElementById("root")).render(
  <ImageContextProvider>
    <App />
  </ImageContextProvider>
);
