import "server-only";
import { MutationError } from "./result";
import { resultCodes } from "../lib/constants";

type Bucket = { count: number; expiresAt: number };
const scope = globalThis as typeof globalThis & { kianaRates?: Map<string, Bucket> };

export function consumeRate(key: string, limit: number) {
  const now = Date.now();
  const buckets = scope.kianaRates ??= new Map();
  for (const [name, bucket] of buckets) if (bucket.expiresAt <= now) buckets.delete(name);
  const current = buckets.get(key);
  if ((current && current.count >= limit) || (!current && buckets.size >= 512)) {
    throw new MutationError(resultCodes.limited, "تلاش‌ها زیاد شده است؛ یک دقیقه صبر کنید و دوباره تلاش کنید.");
  }
  if (current) current.count += 1;
  else buckets.set(key, { count: 1, expiresAt: now + 60_000 });
}
