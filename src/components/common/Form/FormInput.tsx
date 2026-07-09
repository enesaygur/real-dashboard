import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./FormField.module.css";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}
function FormInput({
  id,
  label,
  type = "text",
  register,
  error,
}: FormInputProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        {...register}
        className={error ? styles.errorInput : ""}
      />
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
}
export default FormInput;
