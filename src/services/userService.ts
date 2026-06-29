import { getUser } from "../api/userApi";

export async function fetchUsers(page: number, limit: number) {
  return getUser(page, limit);
}
