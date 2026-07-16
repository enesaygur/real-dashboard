import { apiClient } from "../api/client";
import type { DashboardStats } from "../types/dashboard";

export async function fetchDashboardStats(
  filter: string,
): Promise<DashboardStats> {
  const response = await apiClient.get("/dashboard/stats", {
    params: {
      filter,
    },
  });
  return response.data;
}
