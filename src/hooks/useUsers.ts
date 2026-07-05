import { fetchUsers } from "../services/userService";
import { useQuery } from "@tanstack/react-query";

export function useUsers(page: number, limit: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers(page, limit),
  });

  return {
    users: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    loadUsers: refetch,
  };
}
