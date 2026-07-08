import type { User } from "../../../types/user";
import { useForm } from "react-hook-form";
import { userSchema } from "./../../../validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: Omit<User, "id">) => void;
}

function UserForm({ initialValues, onSubmit: submitUser }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      email: initialValues?.email ?? "",
      role: initialValues?.role ?? "User",
    },
  });
  return (
    <form onSubmit={handleSubmit(submitUser)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name")} />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role", { required: true })}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default UserForm;
