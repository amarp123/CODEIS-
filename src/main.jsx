// main.jsx

import React from "react"; // Best practice to include, though not strictly required here
import ReactDOM from "react-dom/client"; // <-- YOU MUST ADD THIS LINE
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)