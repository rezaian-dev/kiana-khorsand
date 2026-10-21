import "server-only";
import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { collection } from "@/db/collections";
import { env } from "@/lib/env";
import { auth } from "@/lib/auth";

export async function throttle(kind: string, limit: number) {
  const header = await headers();
  // Use same trusted-IP logic as Better Auth: x-real-ip first, then last x-forwarded-for hop
  // (first hop is client-controllable per F3). See https://vercel.com/docs/headers/request-headers
  const ip =
    header.get("x-real-ip")?.trim() ||
    header.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    header.get("x-vercel-forwarded-for")?.split(",").pop()?.trim() ||
    "anonymous";
  // For authenticated actions, key by user id so IP sharing does not apply (F3)
  let subject = ip;
  try {
    const session = await auth.api.getSession({ headers: header });
    if (session?.user?.id) subject = `user:${session.user.id}`;
  } catch {
    // no session — fall back to IP
  }
  const key = createHmac("sha256", env.BETTER_AUTH_SECRET)
    .update(`${kind}:${subject}:${Math.floor(Date.now() / 86400_000)}`)
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
