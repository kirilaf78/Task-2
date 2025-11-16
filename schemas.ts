import { z } from "zod";
export const RegisterSuccessSchema = z.object({
  id: z.number().int().positive(),
  token: z.string().min(1),
});
