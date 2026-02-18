import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import App from "./App.tsx";
import "./index.css";
import Product from "./pages/Product.tsx";
import store from "../redux/store/store.tsx";
import { Provider } from "react-redux";
import Signup from "./pages/Signup.tsx";
import Signin from "./pages/Signin.tsx";
import AddProduct from "./pages/AddProduct.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import UpdateProduct from "./pages/UpdateProduct.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:slug" element={<Product />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/product/create" element={<AddProduct />} />
          <Route path="/product/update" element={<UpdateProduct />} />

          {/* Catch all Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
);

initThemeMode();
