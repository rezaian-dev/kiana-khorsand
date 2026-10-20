import { z } from "zod";

const optionalUrl = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .max(300)
    .url()
    .refine((url) => url.startsWith("https://")),
]);
const imagePath = z.union([
  z.literal(""),
  z
    .string()
    .trim()
    .regex(
      /^\/(?:assets\/(?:images|logo)\/[a-z0-9-]+\.(?:svg|png|jpe?g|webp)|icon\.svg)$/,
    ),
]);
export const siteForm = z.object({
  profileName: z.string().trim().min(2).max(100),
  profileTitle: z.string().trim().min(2).max(130),
  profileBio: z.string().trim().min(10).max(320),
  contactPhone: z.string().regex(/^09\d{9}$/),
  contactEmail: z.email(),
  contactAddress: z.string().trim().max(350),
  instagram: optionalUrl,
  telegram: optionalUrl,
  whatsapp: optionalUrl,
  policy: z.string().trim().min(12).max(900),
  assetLogo: imagePath,
  assetFavicon: imagePath,
  assetHero: imagePath,
  assetAbout: imagePath,
  assetOg: imagePath,
});
export const hourKeys = [
  "sat",
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
] as const;
export const hoursForm = z
  .array(
    z
      .object({
        key: z.enum(hourKeys),
        on: z.boolean(),
        from: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
        to: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
      })
      .refine(
        (day) => !day.on || day.to > day.from,
        "ساعت پایان باید بعد از ساعت شروع باشد",
      ),
  )
  .length(7);
export const serviceForm = z
  .array(
    z.object({
      slug: z.string().regex(/^[a-z0-9-]{1,80}$/),
      name: z.string().trim().min(2).max(120),
      duration: z.coerce.number().int().min(15).max(240),
      price: z.coerce.number().int().min(0).max(100000000),
    }),
  )
  .max(30);

const digits = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") return value;
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return value.replace(/[۰-۹٠-٩]/g, (digit) =>
    String(fa.includes(digit) ? fa.indexOf(digit) : ar.indexOf(digit)),
  );
};

export function parseSiteForm(form: FormData, serviceSlugs: string[]) {
  const fields = siteForm.safeParse({
    ...Object.fromEntries(form),
    contactPhone: digits(form.get("contactPhone")),
  });
  const days = hoursForm.safeParse(
    hourKeys.map((key) => ({
      key,
      on: form.get(`hourOn-${key}`) === "on",
      from: form.get(`hourFrom-${key}`),
      to: form.get(`hourTo-${key}`),
    })),
  );
  const sessions = serviceForm.safeParse(
    serviceSlugs.map((slug) => ({
      slug,
      name: form.get(`sessionName-${slug}`),
      duration: digits(form.get(`sessionMin-${slug}`)),
      price: digits(form.get(`sessionFee-${slug}`)),
    })),
  );
  if (!fields.success || !days.success || !sessions.success) return null;
  if (new Set(serviceSlugs).size !== serviceSlugs.length) return null;
  return {
    ...fields.data,
    days: days.data,
    sessions: sessions.data,
    notifications: {
      email: form.get("notifyEmail") === "on",
      sms: false, // There is no SMS transport in this application.
      reminder: form.get("notifyReminder") === "on",
      weekly: form.get("notifyWeekly") === "on",
    },
  };
}
