import { z } from "zod";

export const signUpSchema = z.object({
  userName: z.string().min(7).max(15),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be 8+ chars, include uppercase, lowercase and number",
    ),
  email: z.string().email(),
});
