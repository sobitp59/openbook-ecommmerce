import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./contexts/authentication/AuthContext";
import { ProductCategoryContextProvider } from "./contexts/product-category-context/ProductCategoryContext";
import { ProductsContextProvider } from "./contexts/products-context/ProductsContext";
import "./index.css";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <AuthContextProvider>
      <ProductsContextProvider>
      <ProductCategoryContextProvider>
            <App /> 
      </ProductCategoryContextProvider>
      </ProductsContextProvider>
        </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
