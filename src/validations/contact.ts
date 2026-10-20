import { z } from "zod";

export function normalizeContactPhone(value: unknown) {
  return String(value || "")
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export const contactInput = z.object({
  name: z.string().trim().min(3).max(120),
  phone: z.string().regex(/^09\d{9}$/),
  email: z.union([z.literal(""), z.email()]),
  subject: z.string().min(1),
  message: z.string().trim().min(10).max(3000),
  consent: z.literal("on"),
});
