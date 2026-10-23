import "server-only";
import { envSchema } from "@/validations/env";

// Never include Zod's input values in exceptions or logs: a parsed issue can hold a URI.
const parsed = envSchema.safeParse(process.env);
let envData: ReturnType<(typeof envSchema)["parse"]>;
if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => issue.path.join("."))
    .join(", ");
  // Fail fast at runtime; do not fabricate secrets. VERCEL=1 is present at both build and runtime
  // per https://vercel.com/docs/environment-variables/system-environment-variables, so it cannot be used to distinguish.
  // Next.js build-phase signal is NEXT_PHASE=phase-production-build per
  // https://github.com/vercel/next.js/discussions/48736 and next/constants — we only warn in that phase
  // and still throw so invalid env never silently uses dummy values.
  if (process.env.NEXT_PHASE === "phase-production-build") {
    console.warn(
      `[env] Invalid server environment keys during build: ${issues}`,
    );
  }
  throw new Error(`Invalid server environment keys: ${issues}`);
} else {
  envData = parsed.data;
}
export const env = envData;
