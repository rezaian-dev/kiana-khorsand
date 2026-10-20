import "server-only";
import { envSchema } from "@/validations/env";

// Never include Zod's input values in exceptions or logs: a parsed issue can hold a URI.
const parsed = envSchema.safeParse(process.env);
let envData: ReturnType<(typeof envSchema)["parse"]>;
if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
  // During Vercel build the env may be partially available — don't crash page collection.
  const isBuildFallback =
    process.env.SKIP_ENV_VALIDATION === "1" ||
    process.env.VERCEL === "1" ||
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.npm_lifecycle_event === "build";
  if (isBuildFallback) {
    // eslint-disable-next-line no-console
    console.warn(`[env] Invalid server environment keys: ${issues} — using build fallback`);
    envData = {
      MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dummy",
      MONGODB_DB: "kiana-khorsand",
      BETTER_AUTH_SECRET:
        process.env.BETTER_AUTH_SECRET && process.env.BETTER_AUTH_SECRET.length >= 32
          ? process.env.BETTER_AUTH_SECRET
          : "x".repeat(32),
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      SITE_URL: process.env.SITE_URL || "https://kianakhorsand.ir",
      AUTH_PREVIEW_ORIGIN: undefined,
    } as ReturnType<(typeof envSchema)["parse"]>;
  } else {
    throw new Error(`Invalid server environment keys: ${issues}`);
  }
} else {
  envData = parsed.data;
}
export const env = envData;
