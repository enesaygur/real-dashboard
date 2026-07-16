import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../services/dashboardService";
import { queryKeys } from "../lib/queryKeys";
import type { DashboardFilter } from "../types/dashboard";

export function useDashboard(filter: DashboardFilter) {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: [...queryKeys.dashboard.stats, filter],
    queryFn: () => fetchDashboardStats(filter),
  });
  return { stats: data, loading: isLoading, isError, error, isFetching };
}
