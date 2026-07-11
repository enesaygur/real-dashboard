import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fectReservations } from "../services/reservationService";
import { queryKeys } from "../lib/queryKeys";

export function useReserations(page: number, limit: number) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: queryKeys.reservations.list(page, limit),
    queryFn: () => fectReservations(page, limit),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    reservations: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    isError,
    error,
    isFetching,
  };
}
