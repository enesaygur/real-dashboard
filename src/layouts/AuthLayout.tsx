import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </main>
  );
}

export default AuthLayout;
