import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  sortField: "name" | "email";
  sortDirection: "asc" | "desc";
  onSort: (field: "name" | "email") => void;

  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}
function UserTable({
  users: users,
  sortField,
  sortDirection,
  onSort,
  onView,
  onEdit,
  onDelete,
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
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => onView(user)}>View</button>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
