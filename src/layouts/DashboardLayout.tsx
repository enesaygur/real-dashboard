import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <header>Header</header>
        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
