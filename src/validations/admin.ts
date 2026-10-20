import { allowedArticleCovers } from "@/lib/editorial-covers";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { status, appointmentStatus, paymentStatus } from "@/validations/models";

export { status, appointmentStatus, paymentStatus };
export const slugSchema = z.string().regex(/^[a-z0-9-]{1,80}$/);
export const contactStatusSchema = z.enum(["new", "read", "closed"]);
export const catalogKindSchema = z.enum([
  "services",
  "articles",
  "workshops",
  "testimonials",
]);
export const messageBodySchema = z.string().trim().min(2).max(2000);
/** Only actual Google Meet invitation URLs are allowed in support messages. */
export const meetInviteUrl = z.url().refine((value) => {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "meet.google.com" &&
      !url.username &&
      !url.password &&
      !url.port &&
      /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
});
export const testimonialExperienceInput = z.object({
  slug: slugSchema,
  experience: z.string().trim().min(2).max(120),
});
export const availabilityKeySchema = z.enum([
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
]);
export const availabilitySlotsSchema = z.string().max(200);
export const manualInvoiceInput = z.object({
  userId: z.string().refine((value) => ObjectId.isValid(value)),
  amount: z.coerce.number().int().min(1000).max(100000000),
  description: z.string().trim().min(3).max(180),
});
export const blockedIdSchema = z.uuid();
export const blockedRangeInput = z.object({
  from: z.iso.date(),
  to: z.iso.date(),
  reason: z.string().trim().min(3).max(120),
});

export function parseAdminId(form: FormData) {
  const value = String(form.get("id") || "");
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}
export function parseAvailability(form: FormData) {
  const key = availabilityKeySchema.safeParse(form.get("key"));
  const raw = availabilitySlotsSchema.safeParse(form.get("slots"));
  if (!key.success || !raw.success) return null;
  const slots = raw.data
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .split(/[,،\s]+/)
    .filter(Boolean);
  if (
    slots.length > 24 ||
    slots.some((slot) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(slot))
  )
    return null;
  return { key: key.data, slots: [...new Set(slots)].sort() };
}

export const settingsInput = z.object({
  phone: z.string().trim().min(7).max(30),
  email: z.email(),
  address: z.string().trim().min(3).max(350),
  instagram: z.string().trim().max(300),
  telegram: z.string().trim().max(300),
  whatsapp: z.string().trim().max(300),
  cancellation: z.string().trim().min(12).max(2000),
});
export const articleInput = z.object({
  slug: slugSchema,
  title: z.string().trim().min(3).max(160),
  excerpt: z.string().trim().min(10).max(500),
  body: z.string().trim().min(40).max(50000),
  category: z.string().trim().min(2).max(90),
  tags: z.string().trim().max(400).default(""),
  cover: z.union([
    z.literal(""),
    z
      .string()
      .regex(
        /^(?:\/assets\/images\/(?:articles\/)?[a-z0-9-]+\.(?:jpg|jpeg|png|webp|svg)|\/api\/article-covers\/[a-z0-9-]{1,80}\?v=\d+)$/,
      ),
  ]),
  seoTitle: z.string().trim().max(160),
  seoDescription: z.string().trim().max(300),
  status,
  publishedAt: z.union([z.literal(""), z.iso.date()]),
});
export function validArticleCover(
  cover: string,
  existingCover: string | null | undefined,
) {
  return (
    !cover || allowedArticleCovers.includes(cover) || cover === existingCover
  );
}
export function parsePublicationDate(value: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
    ? date
    : undefined;
}
export const serviceInput = z.object({
  slug: slugSchema,
  name: z.string().trim().min(2).max(120),
  duration: z.coerce.number().int().min(10).max(240),
  price: z.coerce.number().int().min(0).max(100000000),
  mode: z.enum(["online", "in_person"]),
  features: z.string().trim().max(2000),
});
export const workshopInput = z.object({
  slug: slugSchema,
  title: z.string().trim().min(3).max(150),
  description: z.string().trim().min(10).max(500),
  body: z.string().trim().min(20).max(50000),
  mode: z.enum(["online", "in_person"]),
  price: z.coerce.number().int().min(0).max(100000000),
  capacity: z.coerce.number().int().min(1).max(1000),
  discountPercent: z.coerce.number().int().min(0).max(90).default(0),
  discountFrom: z.string().default(""),
  discountTo: z.string().default(""),
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
