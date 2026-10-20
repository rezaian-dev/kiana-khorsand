import { z } from "zod";

export const envSchema = z.object({
  MONGODB_URI: z
    .string()
    .min(1)
    .refine(
      (value) =>
        /^mongodb(?:\+srv)?:\/\//.test(value) &&
        !/YOUR-CLUSTER|USER:PASSWORD|<[^>]+>/i.test(value),
      "Invalid MongoDB URI",
    ),
  // Never write to a legacy database: normalize any misconfigured name to the canonical one.
  MONGODB_DB: z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim() === "kiana-khorsand") return value;
      return "kiana-khorsand";
    },
    z.literal("kiana-khorsand").default("kiana-khorsand"),
  ),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32)
    .refine((value) => !value.startsWith("REPLACE_WITH_")),
  BETTER_AUTH_URL: z.url().default("http://localhost:3000"),
  SITE_URL: z.url().default("https://kianakhorsand.ir"),
  AUTH_PREVIEW_ORIGIN: z.url().optional(),
});
