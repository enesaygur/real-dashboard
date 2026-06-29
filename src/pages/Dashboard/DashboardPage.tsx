import { useEffect, useState } from "react";
import type { DashboardStats } from "../../types/dashboard";
import { fetchDashboardStats } from "../../services/dashboardService";
import StatCard from "../../components/dashboard/StatCard/StatCard";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <StatCard title="Users" value={stats?.users ?? 0} />
        <StatCard title="Rooms" value={stats?.rooms ?? 0} />
        <StatCard title="Bookings" value={stats?.bookings ?? 0} />
        <StatCard title="Revenue" value={stats?.revenue ?? 0} />
      </div>
    </div>
  );
}

export default DashboardPage;
