import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GacContextProvider from "./Context/GacContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GacContextProvider>
      <App />
    </GacContextProvider>
  </React.StrictMode>
);
