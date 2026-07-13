import { useForm } from "react-hook-form";
import type { Reservation } from "../../types/reservation";
import {
  reservationSchema,
  type ReservationFormData,
} from "../../validation/reservationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../common/Form/FormInput";
import FormSelect from "../common/Form/FormSelect";

interface ReservationFormProps {
  initialValues?: Reservation;
  onSubmit: (values: Omit<Reservation, "id">) => void;
}
const formatDateForInput = (dateInput: Date | string | undefined): string => {
  if (!dateInput) return new Date().toISOString().slice(0, 10);
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};
function ReservationForm({
  initialValues,
  onSubmit: submitReservation,
}: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: initialValues?.guestName ?? "",
      roomNumber: initialValues?.roomNumber ?? "",
      checkIn: formatDateForInput(initialValues?.checkIn),
      checkOut: formatDateForInput(initialValues?.checkOut),
      status: initialValues?.status ?? "Pending",
    },
  });
  return (
    <form onSubmit={handleSubmit(submitReservation)}>
      <FormInput
        id="guestName"
        label="Guest Name"
        type="text"
        register={register("guestName")}
        error={errors.guestName}
      />
      <FormInput
        id="roomNumber"
        label="Room Number"
        type="text"
        register={register("roomNumber")}
        error={errors.roomNumber}
      />
      <FormInput
        id="checkIn"
        label="Check In"
        type="date"
        register={register("checkIn")}
        error={errors.checkIn}
      />
      <FormInput
        id="checkOut"
        label="Check Out"
        type="date"
        register={register("checkOut")}
        error={errors.checkOut}
      />
      <FormSelect
        id="status"
        label="Status"
        register={register("status")}
        options={[
          { value: "Pending", label: "Pending" },
          { value: "Confirmed", label: "Confirmed" },
          { value: "Cancelled", label: "Cancelled" },
        ]}
        error={errors.status}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default ReservationForm;
