import {
  addUser,
  editUser,
  fetchUsers,
  removeUser,
} from "../services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";
import { queryKeys } from "../lib/queryKeys";

export function useUsers(page: number, limit: number) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: queryKeys.users.list(page, limit),
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
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dasboard.stats });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: Omit<User, "id"> }) =>
      editUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dasboard.stats });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: removeUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.all });

      const previousUsers = queryClient.getQueriesData({
        queryKey: queryKeys.users.all,
      });

      queryClient.setQueriesData(
        { queryKey: queryKeys.users.all },
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter((user: User) => user.id !== userId),
            total: oldData.total - 1,
          };
        },
      );

      return { previousUsers };
    },

    onError: (_error, _userId, context) => {
      if (!context) return;
      console.log("Previous Users:", context.previousUsers);

      context.previousUsers.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dasboard.stats });
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
