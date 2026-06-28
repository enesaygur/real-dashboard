import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import styles from "./DashboardLayout.module.css";
import Header from "../components/common/Header";

function DashboardLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
