import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import toast, { Toaster } from 'react-hot-toast';
import App from "./App.jsx";
// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
         <Toaster position="bottom-right" />
    </HeroUIProvider>
  </StrictMode>,
);
