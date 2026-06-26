import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <header>Header</header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
