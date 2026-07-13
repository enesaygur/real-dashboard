import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReservation,
  editReservation,
  fectReservations,
  removeReservation,
} from "../services/reservationService";
import { queryKeys } from "../lib/queryKeys";
import type { Reservation } from "../types/reservation";

export function useReserations(page: number, limit: number) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: queryKeys.reservations.list(page, limit),
    queryFn: () => fectReservations(page, limit),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const createReservationMutation = useMutation({
    mutationFn: addReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservations.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dasboard.stats,
      });
    },
  });

  const updateReservationMutation = useMutation({
    mutationFn: ({
      id,
      reservation,
    }: {
      id: number;
      reservation: Omit<Reservation, "id">;
    }) => editReservation(id, reservation),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservations.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dasboard.stats,
      });
    },
  });

  const deleteReservationMutation = useMutation({
    mutationFn: removeReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reservations.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dasboard.stats,
      });
    },
  });

  return {
    reservations: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    isError,
    error,
    isFetching,
    createReservation: createReservationMutation.mutateAsync,
    updateReservation: updateReservationMutation.mutateAsync,
    deleteReservation: deleteReservationMutation.mutateAsync,
  };
}
