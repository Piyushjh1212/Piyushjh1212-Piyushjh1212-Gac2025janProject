import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ImageProvider } from "./Components/Context/ImageContext.jsx"; // Correct ImageProvider import
import { VideoProvider } from "./Components/Context/VedioContext.jsx"; // Correct VideoProvider import
import GacContextProvider from "./Components/Context/GacContext.jsx";

createRoot(document.getElementById("root")).render(
  <ImageProvider>
    <VideoProvider>
      <GacContextProvider>
        <App />
      </GacContextProvider>
    </VideoProvider>
  </ImageProvider>
);
