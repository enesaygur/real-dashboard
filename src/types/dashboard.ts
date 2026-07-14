export interface DashboardStats {
  users: number;
  rooms: number;
  bookings: number;
  revenue: number;
  monthlyRevenue: { month: string; revenue: number }[];
  bookingsByStatus: { name: string; value: number }[];
}
