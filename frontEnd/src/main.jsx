import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { SubmitStatusProvider } from "./context/submitStatus.context";
import { AccessStatusProvider } from "./context/accessStatus.context";
import { ActionStatusProvider } from "./context/actionStatus.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <ActionStatusProvider>
          <AccessStatusProvider>
        <SubmitStatusProvider>
          <App />
        </SubmitStatusProvider>
      </AccessStatusProvider>
    </ActionStatusProvider>
  </StrictMode>,
);
