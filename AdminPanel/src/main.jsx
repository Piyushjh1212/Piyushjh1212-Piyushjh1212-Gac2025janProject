import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GacContextProvider from "./Context/Gaccontext.jsx"; // 👈 path sahi rakho
import ImageProvider from "./Context/ImageContext.jsx"; // 👈 path sahi rakho

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageProvider>
      <GacContextProvider>
        {" "}
        {/* 👈 Yeh zaroori hai */}
        <App />
      </GacContextProvider>
    </ImageProvider>
  </StrictMode>
);
