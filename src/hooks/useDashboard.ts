import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../services/dashboardService";

export function useDashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dasboard"],
    queryFn: fetchDashboardStats,
  });
  return { stats: data, loading: isLoading, isError };
}
