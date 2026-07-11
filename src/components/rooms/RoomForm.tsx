import { useForm } from "react-hook-form";
import type { Room } from "../../types/rooms";
import { roomSchema, type RoomFormData } from "../../validation/roomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../common/Form/FormInput";
import FormSelect from "../common/Form/FormSelect";
interface RoomFormProps {
  initialValues?: Room;
  onSubmit: (values: Omit<Room, "id">) => void;
}
function RoomForm({ initialValues, onSubmit: submitRoom }: RoomFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      number: initialValues?.number ?? "",
      type: initialValues?.type ?? "Single",
      price: initialValues?.price ?? 0,
      status: initialValues?.status ?? "Available",
    },
  });
  return (
    <form onSubmit={handleSubmit(submitRoom)}>
      <FormInput
        id="number"
        label="Number"
        type="text"
        register={register("number")}
        error={errors.number}
      />
      <FormSelect
        id="type"
        label="Type"
        register={register("type")}
        error={errors.type}
        options={[
          { value: "Suite", label: "Suite" },
          { value: "Single", label: "Single" },
          { value: "Double", label: "Double" },
        ]}
      />
      <FormInput
        id="price"
        label="Price"
        type="number"
        register={register("price")}
        error={errors.price}
      />
      <FormSelect
        id="status"
        label="Status"
        register={register("status")}
        error={errors.status}
        options={[
          { value: "Available", label: "Available" },
          { value: "Occupied", label: "Occupied" },
        ]}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default RoomForm;
