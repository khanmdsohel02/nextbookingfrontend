import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import "./index.css";
import { SearchContextProvider } from "./context/SecarchContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
