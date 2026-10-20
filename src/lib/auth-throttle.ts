import "server-only";
import { createHmac } from "node:crypto";
import { db } from "@/db/client";
import { env } from "@/lib/env";

/** auth.api server-side calls bypass Better Auth's HTTP rate limiter. */
export async function throttleAuthPhone(
  kind: "sign-in" | "sign-up",
  phone: string,
) {
  const secret = env.BETTER_AUTH_SECRET;
  const windowMs = kind === "sign-in" ? 15 * 60_000 : 24 * 3600_000;
  const limit = kind === "sign-in" ? 10 : 3;
  const key = createHmac("sha256", secret)
    .update(`${kind}:${phone}:${Math.floor(Date.now() / windowMs)}`)
    .digest("hex");
  const record = await db
    .collection<{ key: string; count: number }>("limits")
    .findOneAndUpdate(
      { key },
      {
        $inc: { count: 1 },
        $setOnInsert: { expiresAt: new Date(Date.now() + windowMs * 2) },
      },
      { upsert: true, returnDocument: "after" },
    );
  if (record && record.count > limit)
    throw new Error("Too many authentication attempts");
}
