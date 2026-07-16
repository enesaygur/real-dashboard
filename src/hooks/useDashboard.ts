import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../services/dashboardService";
import { queryKeys } from "../lib/queryKeys";

export function useDashboard() {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: fetchDashboardStats,
  });
  return { stats: data, loading: isLoading, isError, error, isFetching };
}
