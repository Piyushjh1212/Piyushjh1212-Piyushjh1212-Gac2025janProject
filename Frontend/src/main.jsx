import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./App.jsx";
import GacContextProvider from "./Pages/GacContext/GacContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById("root")).render(

  <GoogleOAuthProvider clientId="1026977444090-hnu0hl6758cd35crqodmn64i5gptdkb3.apps.googleusercontent.com">
    <GacContextProvider>
      <App />
    </GacContextProvider>
  </GoogleOAuthProvider>
);
