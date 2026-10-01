import { z } from "zod";
import { images } from "../content/images.ts";
import { appointmentStates, publicationStates, reviewStates, serviceKeys, topics } from "./constants.ts";

const imageKeys = Object.keys(images) as (keyof typeof images)[];
const topicKeys = Object.keys(topics) as (keyof typeof topics)[];
export const idSchema = z.string().regex(/^[a-f\d]{24}$/i, "شناسه معتبر نیست.");
export const slugSchema = z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "نشانی باید کوتاه، لاتین و با خط تیره باشد.");
export const phoneSchema = z.string().trim().regex(/^(?:|09\d{9}|\+989\d{9})$/, "شمارهٔ همراه را با ۰۹ یا ‎+۹۸ و رقم انگلیسی بنویسید.");
const headingSchema = z.string().trim().min(2).max(160);
const paragraphSchema = z.string().trim().min(1).max(4000);
const webSchema = z.url({ protocol: /^https$/ }).max(500).refine((value) => {
  const url = new URL(value);
  return !url.username && !url.password;
});
const publicationSchema = z.object({
  slug: slugSchema,
  title: headingSchema,
  description: z.string().trim().min(10).max(320),
  category: z.enum(topicKeys),
  image: z.enum(imageKeys),
  status: z.enum(publicationStates),
  isReviewed: z.boolean(),
  author: z.string().trim().max(100),
});

export const articleSchema = publicationSchema.extend({
  social: z.enum(imageKeys),
  introduction: paragraphSchema,
  sections: z.array(z.object({
    key: slugSchema, title: headingSchema,
    paragraphs: z.array(paragraphSchema).min(1).max(20),
    points: z.array(paragraphSchema).max(20).optional(),
  })).min(1).max(30).refine((sections) => new Set(sections.map((section) => section.key)).size === sections.length, "شناسهٔ بخش‌ها نباید تکراری باشد."),
  takeaway: paragraphSchema,
  sources: z.array(z.object({ title: headingSchema, href: webSchema })).max(20),
}).refine((value) => value.status !== publicationStates.published || (value.isReviewed && value.author.length >= 2), { path: ["status"], error: "پیش از انتشار، بازبینی حرفه‌ای و نام نویسندهٔ واقعی لازم است." });

export const courseSchema = publicationSchema.extend({
  audience: paragraphSchema, outline: z.array(paragraphSchema).min(1).max(30), boundary: paragraphSchema,
}).refine((value) => value.status !== publicationStates.published || (value.isReviewed && value.author.length >= 2), { path: ["status"], error: "پیش از انتشار، طرح و نام مدرس باید تأیید شوند." });

export const appointmentSchema = z.object({
  userId: idSchema, service: z.enum(serviceKeys), date: z.iso.date(),
  slot: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  startsAt: z.date(), endsAt: z.date(), status: z.enum(appointmentStates), isReserved: z.boolean(),
}).refine((value) => value.endsAt > value.startsAt, { path: ["endsAt"], error: "پایان جلسه باید پس از شروع آن باشد." })
  .refine((value) => value.isReserved === (value.status !== appointmentStates.cancelled), { path: ["isReserved"], error: "وضعیت زمان رزروشده سازگار نیست." });

export const testimonialSchema = z.object({
  name: z.string().trim().min(1).max(60), quote: z.string().trim().min(20).max(1000),
  image: z.enum(imageKeys).nullable(), hasConsent: z.boolean(), isSample: z.boolean(),
  status: z.enum(reviewStates),
}).refine((value) => value.status !== reviewStates.approved || (value.hasConsent && !value.isSample), { path: ["status"], error: "فقط نظر واقعی با رضایت انتشار قابل تأیید است." }).refine((value) => value.status !== reviewStates.approved || value.image === null || !images[value.image].isSample, { path: ["image"], error: "عکس نمونه را به نظر واقعی نسبت ندهید؛ فعلاً بدون عکس منتشر کنید." });

const hoursSchema = z.object({
  day: z.number().int().min(0).max(6),
  start: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  end: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
}).refine((value) => value.start < value.end, { path: ["end"], error: "پایان بازه باید پس از شروع باشد." });

export const settingsSchema = z.object({
  name: headingSchema, role: headingSchema, introduction: paragraphSchema,
  license: z.string().trim().min(1).max(100).nullable(),
  phone: phoneSchema.nullable(), whatsapp: phoneSchema.nullable(),
  instagram: webSchema.nullable(), telegram: webSchema.nullable(),
  address: z.string().trim().min(1).max(500).nullable(),
  isBookingEnabled: z.boolean(), slotMinutes: z.number().int().min(15).max(180).nullable(),
  hours: z.array(hoursSchema).max(14).refine((hours) => hours.every((a, i) => hours.every((b, j) => i === j || a.day !== b.day || a.end <= b.start || b.end <= a.start)), "بازه‌های یک روز نباید هم‌پوشانی داشته باشند."),
}).refine((value) => !value.isBookingEnabled || (value.slotMinutes !== null && value.hours.length > 0), { path: ["isBookingEnabled"], error: "مدت جلسه و ساعات تأییدشده را ابتدا تعیین کنید." });

export const querySchema = z.object({
  q: z.string().trim().max(80).default(""), page: z.coerce.number().int().min(1).max(1000).default(1),
  size: z.coerce.number().int().min(1).max(50).default(12),
});
export const rangeSchema = z.object({ from: z.iso.date(), to: z.iso.date() }).refine((value) => {
  const days = (Date.parse(value.to) - Date.parse(value.from)) / 86_400_000;
  return days >= 0 && days <= 31;
}, "بازه باید حداکثر ۳۲ روز تقویمی باشد.");
