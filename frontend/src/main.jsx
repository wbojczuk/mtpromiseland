import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/style.css";
import "./css/nav.css";
window.NODESERVER = "http://localhost:3000";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);