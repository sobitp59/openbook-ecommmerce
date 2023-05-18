import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ProductCategoryContextProvider } from "./contexts/product-category-context/ProductCategoryContext";
import "./index.css";
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductCategoryContextProvider>
       <App />
      </ProductCategoryContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
