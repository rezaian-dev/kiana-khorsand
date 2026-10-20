import "server-only";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { collection } from "@/db/collections";
import { env } from "@/lib/env";

export async function throttle(kind: string, limit: number) {
  const header = await headers();
  const address =
    header.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const key = createHmac("sha256", env.BETTER_AUTH_SECRET)
    .update(`${kind}:${address}:${Math.floor(Date.now() / 86400_000)}`)
    .digest("hex");
  const entry = await collection("limits").findOneAndUpdate(
    { key },
    {
      $inc: { count: 1 },
      $setOnInsert: { expiresAt: new Date(Date.now() + 48 * 3600_000) },
    },
    { upsert: true, returnDocument: "after" },
  );
  return Boolean(entry && entry.count <= limit);
}
