import type React from "react";
import type { User } from "../../../types/user";
import { useState } from "react";

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: Omit<User, "id">) => void;
}

function UserForm({ initialValues, onSubmit }: UserFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [email, setEmail] = useState(initialValues?.email || "");
  const [role, setRole] = useState<"Admin" | "User">(
    initialValues?.role || "User",
  );
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({ name, email, role });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "Admin" | "User")}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default UserForm;
