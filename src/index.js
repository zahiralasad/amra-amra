import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { LanguageProvider } from "./components/Context/LanguageContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);