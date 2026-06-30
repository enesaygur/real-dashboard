import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/userService";
import type { User } from "../../types/user";
import UserTable from "../../components/users/UserTable";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const limit = 3;

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      const res = await fetchUsers(page, limit);
      setUsers(res.data);
      setTotal(res.total);
      setLoading(false);
    }
    loadUsers();
  }, [page]);
  const totalPages = Math.ceil(total / limit);
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortField].toLocaleLowerCase();
    const valueB = b[sortField].toLocaleLowerCase();
    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    }
    return valueB.localeCompare(valueA);
  });
  if (loading) {
    return <p>Loading users...</p>;
  }
  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <UserTable
        users={sortedUsers}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={(field) => {
          if (field === sortField) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
          } else {
            setSortField(field);
            setSortDirection("asc");
          }
        }}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersPage;
