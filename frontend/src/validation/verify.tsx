import { z } from "zod";

export const signInSchema = z.object({
  otp: z.number().min(4).max(6),
});
