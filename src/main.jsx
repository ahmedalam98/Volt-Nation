import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="1783161629-eb8mht8nt2qiis0m5p8h8sh81u0rellh.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>

  // </React.StrictMode>
);
