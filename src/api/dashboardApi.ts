import type { DashboardStats } from "../types/dashboard";

export function getDashboardStats(): Promise<DashboardStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: 152,
        rooms: 48,
        bookings: 317,
        revenue: 24500,
        monthlyRevenue: [
          { month: "Jan", revenue: 1200 },
          { month: "Feb", revenue: 1800 },
          { month: "Mar", revenue: 2400 },
          { month: "Apr", revenue: 3000 },
          { month: "May", revenue: 2700 },
          { month: "Jun", revenue: 3500 },
        ],

        bookingsByStatus: [
          { name: "Confirmed", value: 60 },
          { name: "Pending", value: 20 },
          { name: "Cancelled", value: 7 },
        ],
      });
    }, 1000);
  });
}
