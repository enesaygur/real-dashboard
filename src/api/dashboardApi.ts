import type { DashboardStats } from "../types/dashboard";

export function getDashboardStats(): Promise<DashboardStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: 152,
        rooms: 48,
        bookings: 317,
        revenue: 24500,
      });
    }, 1000);
  });
}
