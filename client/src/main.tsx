import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import App from "./App.tsx";
import "./index.css";
import Products from "./components/Products.tsx";
import Product from "./pages/Product.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:product" element={<Product />} />
      </Routes>
    </Router>
  </StrictMode>,
);

initThemeMode();
