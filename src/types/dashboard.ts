import type { Activity } from "./activity";
import type { Reservation } from "./reservation";
import type { Room } from "./rooms";
import type { User } from "./user";

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface BookingStatus {
  name: string;
  value: number;
}

export type DashboardFilter = "today" | "week" | "month" | "all";

export interface DashboardStats {
  users: number;
  rooms: number;
  bookings: number;
  revenue: number;
  monthlyRevenue: MonthlyRevenue[];
  bookingsByStatus: BookingStatus[];

  recentUsers: User[];
  recentReservations: Reservation[];
  availableRooms: Room[];

  activities: Activity[];
  lastUpdated: string;
}
