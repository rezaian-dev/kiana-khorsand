import { z } from "zod";
export const changePasswordInput = z
  .object({
    currentPassword: z.string().min(1).max(128),
    newPassword: z
      .string()
      .min(8)
      .max(128)
      .regex(/\d/)
      .regex(/[A-Za-z\u0600-\u06ff]/),
    confirm: z.string(),
  })
  .refine((data) => data.newPassword === data.confirm, { path: ["confirm"] });
