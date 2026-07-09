import type { User } from "../../../types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "../../../validation/userSchema";

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: Omit<User, "id">) => void;
}

function UserForm({ initialValues, onSubmit: submitUser }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
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
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role", { required: true })}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default UserForm;
