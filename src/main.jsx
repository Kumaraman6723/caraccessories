import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import "./index.css";
import { AdminProvider } from "./contexts/AdminContext.jsx";

const GOOGLE_CLIENT_ID =
  "860312032073-8mfimrab6r5t9e09hj8ibl0n498tmf9g.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AdminProvider>
        <App />
      </AdminProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
