import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./FormField.module.css";

interface Option {
  value: string;
  label: string;
}
interface FormSelectProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  options: Option[];
  error?: FieldError;
}
function FormSelect({ id, label, register, options, error }: FormSelectProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...register}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
}
export default FormSelect;
