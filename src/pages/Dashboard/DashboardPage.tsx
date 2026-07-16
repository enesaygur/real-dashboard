import StatCard from "../../components/dashboard/StatCard/StatCard";
import styles from "./DashboardPage.module.css";
import { useDashboard } from "../../hooks/useDashboard";
import RevenueChart from "../../components/dashboard/StatCard/charts/RevenueChart/RevenueChart";
import BookingStatusChart from "../../components/dashboard/StatCard/charts/BookingStatusChart/BookingStatusChart";
import type { DashboardFilter } from "../../types/dashboard";
import { useState } from "react";
function DashboardPage() {
  const [filter, setFilter] = useState<DashboardFilter>("all");
  const { stats, loading, isError } = useDashboard(filter);
  const dashboard = stats ?? {
    users: 0,
    rooms: 0,
    bookings: 0,
    revenue: 0,

    monthlyRevenue: [],
    bookingsByStatus: [],

    recentUsers: [],
    recentReservations: [],
    availableRooms: [],
    activities: [],
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
      <div className={styles.filters}>
        <button
          className={filter === "today" ? styles.active : ""}
          onClick={() => {setFilter("today")}}
        >
          Today
        </button>
        <button
          className={filter === "week" ? styles.active : ""}
          onClick={() => setFilter("week")}
        >
          Last 7 days
        </button>
        <button
          className={filter === "month" ? styles.active : ""}
          onClick={() => setFilter("month")}
        >
          Last 30 days
        </button>
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
      </div>
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
      <div className={styles.lists}>
        <div className={styles.listCard}>
          <h2>Recent Users</h2>

          {dashboard.recentUsers.map((user) => (
            <p key={user.name}>{user.email}</p>
          ))}
        </div>

        <div className={styles.listCard}>
          <h2>Recent Reservations</h2>

          {dashboard.recentReservations.map((reservation) => (
            <p key={reservation.id}>
              {reservation.guestName} - Room{reservation.roomNumber}
            </p>
          ))}
        </div>

        <div className={styles.listCard}>
          <h2>Available Rooms</h2>

          {dashboard.availableRooms.map((room) => (
            <p key={room.id}>
              Room {room.number} - {room.type}
            </p>
          ))}
        </div>
        <div className={styles.listCard}>
          <h2>Latest Activities</h2>
          {dashboard.activities.map((activity) => (
            <p key={activity.id}>{activity.message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
