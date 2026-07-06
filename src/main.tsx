import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import AuthProvider from "./context/auth/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

const queryClient = new QueryClient();
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover
            closeOnClick
          />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
