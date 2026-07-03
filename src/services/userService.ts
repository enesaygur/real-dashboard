import { deleteUser, getUser } from "../api/userApi";

export async function fetchUsers(page: number, limit: number) {
  return getUser(page, limit);
}

export async function removeUser(id: number) {
  await deleteUser(id);
}
