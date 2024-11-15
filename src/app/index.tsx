import { createRoot } from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Loader } from "../shared/loader/loader";
import { AuthProvider } from "../shared/auth-provider/auth-provider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} fallbackElement={<Loader />} />
  </AuthProvider>
);
