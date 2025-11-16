import { initThemeMode } from "flowbite-react";
import { ReactNode, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeInit } from "../.flowbite-react/init";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import App from "./App.tsx";
import "./index.css";
import Product from "./pages/Product.tsx";
import store from "../../redux/store/store.tsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:slug" element={<Product />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);

initThemeMode();
