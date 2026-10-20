import "server-only";
import { envSchema } from "@/validations/env";

// Never include Zod's input values in exceptions or logs: a parsed issue can hold a URI.
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(
    `Invalid server environment keys: ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`,
  );
}
export const env = parsed.data;
