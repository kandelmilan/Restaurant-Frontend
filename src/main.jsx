import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./assets/CartContext";
import { DarkModeProvider } from "./RequiredComponents/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </DarkModeProvider>
);