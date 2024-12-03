import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import AddCredentials from "./pages/addCredentials/addCredentials.jsx";
import Vault from "./pages/vault/vault.jsx";

// import monitorAccessJWT from "./utilities/monitorAccessJWT.js";
import { userIdContext } from "./context/userId.context";
import { SubmitStatusProvider } from "./context/submitStatus.context";
import { accessStatusContext } from "./context/accessStatus.context";

// `|| {}` is used to provide a default value in case the function returns `null` or `undefined` providing fallback safety
// const { accessStatus =false, userId =null } = monitorAccessJWT?.() || {};
// console.log(`the access status is:`,accessStatus)

const userId = "674c94ad5ad85e9f181143b9";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login"></Navigate>,
    // element: accessStatus  ? (
    //   <Navigate to="/signup"></Navigate>
    // ) : (
    //   <Navigate to="/login"></Navigate>
    // ),
  },
  {
    path: "/login",
    element: (
      <App>
        <Login />
      </App>
    ),
    //using App component because it provides the background and navbar
    // element: accessStatus ? <Navigate to='/addcredentials'></Navigate> : <App><Login/></App>,
  },
  {
    path: "/signup",
    element: (
      <App>
        <Signup />
      </App>
    ),
  },
  // {
  //   path: "/logout",
  //   element: accessStatus ? <App></App> : <Navigate to="/login"></Navigate>,
  // },
  {
    path: "/addcredentials",
    element: <AddCredentials />,
    // element: accessStatus ? (<AddCredentials />) : (<App><Signup /></App>),
  },
  {
    path: "/vault",
    element: <Vault />,
    // element: accessStatus ? <Vault /> : <Navigate to="/vault"></Navigate>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <userIdContext.Provider value={userId}>
      {/* <accessStatusContext.Provider value= {}> */}
      <SubmitStatusProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </SubmitStatusProvider>
      {/* </accessStatusContext.Provider> */}
    </userIdContext.Provider>
  </StrictMode>,
);
