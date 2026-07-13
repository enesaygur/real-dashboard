import { z } from "zod";

export const reservationSchema = z
  .object({
    guestName: z
      .string()
      .min(3, "Guest name must be at least 3 characters.")
      .max(50, "Guest name cannot exceed 50 characters."),
    roomNumber: z
      .string()
      .min(3, "Room number must be at least 3 characters.")
      .max(4, "Room number cannot exceed 4 characters."),
    checkIn: z.string().min(3, "Check-in date must be at least 3 characters."),
    checkOut: z
      .string()
      .min(3, "Check-out date must be at least 3 characters."),
    status: z.enum(["Confirmed", "Pending", "Cancelled"], {
      error: "Please select a valid status",
    }),
  })
  .refine(
    (data) => {
      const checkInData = new Date(data.checkIn);
      const checkOutData = new Date(data.checkOut);
      return checkOutData >= checkInData;
    },
    {
      message: "Check-out date must be after check-in date.",
      path: ["checkOut"],
    },
  );

export type ReservationFormData = z.infer<typeof reservationSchema>;
