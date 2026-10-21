import "server-only";
import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { createHmac } from "node:crypto";
import { db, mongoClient } from "@/db/client";
import { env } from "@/lib/env";

const authURL = env.BETTER_AUTH_URL;

export const auth = betterAuth({
  baseURL: authURL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    authURL,
    env.SITE_URL,
    ...(env.AUTH_PREVIEW_ORIGIN ? [env.AUTH_PREVIEW_ORIGIN] : []),
  ],
  database: mongodbAdapter(db, { client: mongoClient }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const phone = user.username;
          if (
            typeof phone !== "string" ||
            !/^09\d{9}$/.test(phone) ||
            user.email !== `${phone}@accounts.kianakhorsand.invalid`
          )
            throw new APIError("BAD_REQUEST", {
              message: "A valid phone-based account is required.",
            });
          return { data: { ...user, role: "user" } };
        },
      },
    },
  },
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  // Vercel overwrites x-forwarded-for to the client IP per https://vercel.com/docs/headers/request-headers
  // so we trust x-real-ip first, then the last x-forwarded-for hop (not the first client-controllable one).
  // See Better Auth rate-limit docs https://better-auth.com/docs/concepts/rate-limit#connecting-ip-address
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-real-ip", "x-forwarded-for"],
    },
  },
  disabledPaths: ["/sign-in/email"],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Per-phone+IP limit covering both HTTP and Server Action paths (F2, OWASP Authentication Cheat Sheet)
      // key = phone+IP prevents victim lockout from different IP.
      if (ctx.path === "/sign-in/username" || ctx.path === "/sign-up/email") {
        const body = ctx.body as Record<string, unknown> | undefined;
        const rawPhone =
          (body?.["username"] as string | undefined) ||
          ((body?.["email"] as string | undefined)?.split("@")[0] ?? "");
        if (!rawPhone || !/^09\d{9}$/.test(rawPhone)) return;
        const headers = ctx.headers as unknown as Headers | undefined;
        const ip =
          headers?.get("x-real-ip")?.trim() ||
          headers?.get("x-forwarded-for")?.split(",").pop()?.trim() ||
          headers?.get("x-vercel-forwarded-for")?.split(",").pop()?.trim() ||
          "anonymous";
        const kind = ctx.path === "/sign-in/username" ? "sign-in" : "sign-up";
        const windowMs = kind === "sign-in" ? 15 * 60_000 : 24 * 3600_000;
        const limit = kind === "sign-in" ? 10 : 3;
        const key = createHmac("sha256", env.BETTER_AUTH_SECRET)
          .update(`${kind}:${rawPhone}:${ip}:${Math.floor(Date.now() / windowMs)}`)
          .digest("hex");
        const col = db.collection<{ key: string; count: number }>("limits");
        const record = await col.findOneAndUpdate(
          { key },
          {
            $inc: { count: 1 },
            $setOnInsert: { expiresAt: new Date(Date.now() + windowMs * 2) },
          },
          { upsert: true, returnDocument: "after" },
        );
        if (record && record.count > limit) {
          throw new APIError("TOO_MANY_REQUESTS", {
            message: "Too many authentication attempts. Please try later.",
          });
        }
      }
    }),
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    modelName: "limits",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/username": { window: 60, max: 6 },
      "/sign-up/email": { window: 60, max: 5 },
    },
  },
  user: {
    modelName: "users",
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
    },
  },
  session: { modelName: "sessions" },
  account: { modelName: "accounts" },
  verification: { modelName: "verifications" },
  plugins: [
    username({
      minUsernameLength: 11,
      maxUsernameLength: 11,
      usernameValidator: (value) => /^09\d{9}$/.test(value),
      immutableUsername: true,
    }),
    nextCookies(), // Must be last: Server Actions can then set Better Auth cookies.
  ],
});
