import { z } from "zod";

export const roomSchema = z.object({
  number: z
    .string()
    .min(3, "Room number must be at least 3 characters.")
    .max(4, "Room number cannot exceed 4 characters."),
  type: z.enum(["Single", "Double", "Suite"], {
    error: "Please select a valid room type",
  }),
  price: z.number().min(1, "Room price must be at least 1."),
  status: z.enum(["Available", "Occupied"], {
    error: "Please select a valid room status",
  }),
});

export type RoomFormData = z.infer<typeof roomSchema>;
