import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  sortField: "name" | "email";
  sortDirection: "asc" | "desc";
  onSort: (field: "name" | "email") => void;
}
function UserTable({
  users: users,
  sortField,
  sortDirection,
  onSort,
}: UserTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort("name")}>
            Name {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>

          <th onClick={() => onSort("email")}>
            Email{" "}
            {sortField === "email" && (sortDirection === "asc" ? "▲" : "▼")}
          </th>

          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
