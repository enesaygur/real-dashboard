import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import AuthProvider from "./context/auth/AuthContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ErrorBoundary from "./components/common/ErrorBoundary/ErrorBoundary.tsx";
import { ThemeProvider } from "./context/theme/ThemeContext.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

const queryClient = new QueryClient();
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <App />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                pauseOnHover
                closeOnClick
              />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
