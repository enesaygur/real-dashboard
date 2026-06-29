import { getDashboardStats } from "../api/dashboardApi";

export async function fetchDashboardStats() {
  return await getDashboardStats();
}
