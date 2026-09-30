import { z } from "zod";

export const envSchema = z.object({
  MONGODB_URI: z.url({ protocol: /^mongodb(?:\+srv)?$/ }),
  MONGODB_DB: z.string().trim().min(1).max(63).regex(/^[a-zA-Z0-9_-]+$/),
  NEXT_PUBLIC_SITE_URL: z
    .url({ protocol: /^https$/ })
    .refine((value) => {
      const url = new URL(value);
      return (
        url.pathname === "/" &&
        !url.search &&
        !url.hash &&
        !url.username &&
        !url.password
      );
    }, "Use an HTTPS origin without a path, credentials, query, or fragment.")
    .transform((value) => new URL(value).origin),
  GOOGLE_SITE_VERIFICATION: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().min(1).optional(),
  ),
});

export function getEnv() {
  const result = envSchema.safeParse({
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  });

  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => issue.path.join(".")))];
    throw new Error(`Invalid environment configuration: ${fields.join(", ")}`);
  }

  return result.data;
}
