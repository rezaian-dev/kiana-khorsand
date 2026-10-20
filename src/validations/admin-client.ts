import { z } from "zod";
import { normalizePhone } from "@/validations/auth";
export const createClientInput = z
  .object({
    name: z.string().trim().min(3).max(120),
    phone: z.string().regex(/^09\d{9}$/),
    password: z
      .string()
      .min(12)
      .max(128)
      .regex(/\d/)
      .regex(/[A-Za-z\u0600-\u06ff]/),
    confirm: z.string(),
    permission: z.literal("on"),
  })
  .refine((data) => data.password === data.confirm, { path: ["confirm"] });
export function parseNewClient(form: FormData) {
  return createClientInput.safeParse({
    name: form.get("name"),
    phone: normalizePhone(String(form.get("phone") ?? "")),
    password: form.get("password"),
    confirm: form.get("confirm"),
    permission: form.get("permission"),
  });
}
