import { createRoot } from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Loader } from "../shared/loader/loader";
import { AuthProvider } from "../shared/auth-provider/auth-provider";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Доступна новая версия приложения. Обновить?")) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} fallbackElement={<Loader />} />
  </AuthProvider>
);
