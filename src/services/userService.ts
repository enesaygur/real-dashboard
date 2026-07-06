import { apiClient } from "../api/client";
import type { User } from "../types/user";

export async function fetchUsers(page: number, limit: number) {
  const response = await apiClient.get("/users", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
}
export async function addUser(user: Omit<User, "id">) {
  const response = await apiClient.post("/users", user);
  return response.data;
}

export async function editUser(id: number, user: Omit<User, "id">) {
  const response = await apiClient.put(`/users/${id}`, user);
  return response.data;
}

export async function removeUser(id: number) {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
}
