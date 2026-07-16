import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import {
  addRoom,
  editRoom,
  fetchRooms,
  removeRoom,
} from "../services/roomService";
import type { Room } from "../types/rooms";

export function useRooms(page: number, limit: number) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: queryKeys.rooms.list(page, limit),
    queryFn: () => fetchRooms(page, limit),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const createRoomMutation = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rooms.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats,
      });
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: ({ id, room }: { id: number; room: Omit<Room, "id"> }) =>
      editRoom(id, room),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rooms.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats,
      });
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: removeRoom,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rooms.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats,
      });
    },
  });

  return {
    rooms: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    isError,
    error,
    isFetching,
    createRoom: createRoomMutation.mutateAsync,
    updateRoom: updateRoomMutation.mutateAsync,
    deleteRoom: deleteRoomMutation.mutateAsync,
  };
}
