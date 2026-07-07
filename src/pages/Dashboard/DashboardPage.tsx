import StatCard from "../../components/dashboard/StatCard/StatCard";
import styles from "./DashboardPage.module.css";
import { useDashboard } from "../../hooks/useDashboard";

function DashboardPage() {
  const { stats, loading, isError } = useDashboard();

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (isError) {
    return <p>Dashboard could not be loaded.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <StatCard title="Users" value={stats?.users ?? 0} />
        <StatCard title="Rooms" value={stats?.rooms ?? 0} />
        <StatCard title="Bookings" value={stats?.bookings ?? 0} />
        <StatCard
          title="Revenue"
          value={`$${(stats?.revenue ?? 0).toLocaleString()}`}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
