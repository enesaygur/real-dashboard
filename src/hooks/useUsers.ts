import {
  addUser,
  editUser,
  fetchUsers,
  removeUser,
} from "../services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";

export function useUsers(page: number, limit: number) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers(page, limit),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const createUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: (newUser) => {
      console.log("New user created:", newUser);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: Omit<User, "id"> }) =>
      editUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });

  return {
    users: data?.data ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    isError,
    error,
    isFetching,
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
  };
}
