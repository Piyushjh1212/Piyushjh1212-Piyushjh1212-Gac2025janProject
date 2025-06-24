import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import GacContextProvider from "./Pages/GacContext/GacContext.jsx";
// import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
    <GacContextProvider>
      <App />
    </GacContextProvider>
  // </BrowserRouter>
);
