import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { fetchRooms } from "../services/roomService";

export function useRooms(page: number, limit: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.rooms.list(page, limit),
    queryFn: () => fetchRooms(page, limit),
  });

  return {
    rooms: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    isError,
  };
}
