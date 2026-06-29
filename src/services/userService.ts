import { getUser } from "../api/userApi";

export async function fetchUsers() {
  return getUser();
}
