import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

// AOS Import + Global Init
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS once when app starts
AOS.init({
  duration: 800,
  easing: "ease-out-quart",
  delay: 100,
  once: true,
  offset: 80,
  anchorPlacement: "top-bottom",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
