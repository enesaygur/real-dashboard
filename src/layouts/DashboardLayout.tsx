import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <aside>Sidebar</aside>
      <div>
        <header>Header</header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
