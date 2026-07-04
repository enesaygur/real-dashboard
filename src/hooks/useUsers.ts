import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { fetchUsers } from "../services/userService";

export function useUsers(page: number, limit: number) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  async function loadUsers() {
    setLoading(true);
    const response = await fetchUsers(page, limit);
    setUsers(response.data);
    setTotal(response.total);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, [page]);

  return { users, loading, loadUsers, total };
}
