import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name cannot exceed 50 characters."),
  email: z.string().email("Please enter a valid email address."),
  role: z.enum(["User", "Admin"], {
    error: "Please select a valid role",
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
