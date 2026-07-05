import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import AuthProvider from "./context/auth/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      pauseOnHover
      closeOnClick
    />
  </AuthProvider>,
);
