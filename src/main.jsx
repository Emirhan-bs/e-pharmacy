import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import spriteSvg from "./assets/icons/symbol-defs.svg?raw";

const symbolDiv = document.createElement("div");
symbolDiv.style.display = "none";
symbolDiv.innerHTML = spriteSvg;
document.body.insertBefore(symbolDiv, document.body.firstChild);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);