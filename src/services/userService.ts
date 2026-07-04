import { createUser, deleteUser, getUser } from "../api/userApi";
import type { User } from "../types/user";

export async function fetchUsers(page: number, limit: number) {
  return getUser(page, limit);
}

export async function removeUser(id: number) {
  await deleteUser(id);
}

export async function addUser(user: Omit<User, "id">) {
  return createUser(user);
}
