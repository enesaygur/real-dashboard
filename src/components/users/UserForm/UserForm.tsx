import type { User } from "../../../types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormData } from "../../../validation/userSchema";
import FormInput from "../../common/Form/FormInput";
import FormSelect from "../../common/Form/FormSelect";

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
      <FormInput
        id="name"
        label="Name"
        type="text"
        register={register("name")}
        error={errors.name}
      />
      <FormInput
        id="email"
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <FormSelect
        id="role"
        label="Role"
        register={register("role")}
        error={errors.role}
        options={[
          { value: "User", label: "User" },
          { value: "Admin", label: "Admin" },
        ]}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
export default UserForm;
