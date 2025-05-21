import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GacContextProvider from "./Context/Gaccontext.jsx"; // 👈 path sahi rakho
import ImageProvider from "./Context/ImageContext.jsx"; // 👈 path sahi rakho
import { VideoProvider } from "./Context/Videocontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImageProvider>
      <VideoProvider>
      <GacContextProvider>
        {" "}
        {/* 👈 Yeh zaroori hai */}
        <App />
      </GacContextProvider>
      </VideoProvider>
    </ImageProvider>
  </StrictMode>
);
