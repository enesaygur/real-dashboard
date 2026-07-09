import type { User } from "../../../types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "../../../validation/userSchema";
import styles from "./UserForm.module.css";

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: Omit<User, "id">) => void;
}

function UserForm({ initialValues, onSubmit: submitUser }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        <input
          className={errors.name ? styles.errorInput : ""}
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          className={errors.email ? styles.errorInput : ""}
          type="email"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select
          className={errors.role ? styles.errorInput : ""}
          id="role"
          {...register("role", { required: true })}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && (
          <p className={styles.errorMessage}>{errors.role.message}</p>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
export default UserForm;
