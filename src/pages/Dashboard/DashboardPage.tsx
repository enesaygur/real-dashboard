import StatCard from "../../components/dashboard/StatCard/StatCard";
import styles from "./DashboardPage.module.css";
import { useDashboard } from "../../hooks/useDashboard";
import RevenueChart from "../../components/dashboard/StatCard/charts/RevenueChart/RevenueChart";
import BookingStatusChart from "../../components/dashboard/StatCard/charts/BookingStatusChart/BookingStatusChart";
function DashboardPage() {
  const { stats, loading, isError } = useDashboard();
  const dashboard = stats ?? {
    users: 0,
    rooms: 0,
    bookings: 0,
    revenue: 0,
    monthlyRevenue: [],
    bookingsByStatus: [],
  };
  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (isError) {
    return (
      <div>
        <h1>Dashboard</h1> <p>Failed to load dashboard.</p>{" "}
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <StatCard title="Users" value={dashboard.users} />
        <StatCard title="Rooms" value={dashboard.rooms} />
        <StatCard title="Bookings" value={dashboard.bookings} />
        <StatCard
          title="Revenue"
          value={`$${(dashboard.revenue ?? 0).toLocaleString()}`}
        />
      </div>
      <div className={styles.chartGrid}>
        <RevenueChart data={stats?.monthlyRevenue ?? []} />
        <BookingStatusChart data={stats?.bookingsByStatus ?? []} />
      </div>
    </div>
  );
}

export default DashboardPage;
