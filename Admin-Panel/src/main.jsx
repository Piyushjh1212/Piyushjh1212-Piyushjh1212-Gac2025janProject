import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import GacContextProvider  from "./Context_Handling/GacContext.jsx";
import { ImageProvider } from "./Context_Handling/ImageContext.jsx";
import { VideoProvider } from "./Context_Handling/VedioContext.jsx";


createRoot(document.getElementById("root")).render(
  <ImageProvider>
    <VideoProvider>
      <GacContextProvider>
        <App />
      </GacContextProvider>
    </VideoProvider>
  </ImageProvider>
);
