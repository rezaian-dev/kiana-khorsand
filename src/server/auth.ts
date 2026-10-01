import "server-only";
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";
import { collections, roles } from "../lib/constants.ts";
import { getEnv } from "../lib/env.ts";
import { phoneSchema } from "../lib/records.ts";
import { getDb } from "./db.ts";

const authEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32).max(1024),
  BETTER_AUTH_URL: z.url({ protocol: /^https?$/ }).refine((value) => {
    const url = new URL(value);
    return !url.username && !url.password && !url.search && !url.hash && url.pathname === "/" &&
      (url.protocol === "https:" || ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname));
  }),
});

function createAuth() {
  const parsed = authEnvSchema.safeParse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || getEnv().NEXT_PUBLIC_SITE_URL,
  });
  if (!parsed.success) throw new Error("Authentication environment is incomplete; configure the secret and origin locally.");
  const env = parsed.data;
  return betterAuth({
    appName: "دکتر کیانا خرسند",
    secret: env.BETTER_AUTH_SECRET, baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [new URL(env.BETTER_AUTH_URL).origin],
    // Omit client: the user's standalone MongoDB must not require transactions.
    database: mongodbAdapter(getDb()),
    emailAndPassword: { enabled: true, minPasswordLength: 8, maxPasswordLength: 128 },
    user: {
      modelName: collections.users,
      additionalFields: {
        role: { type: [roles.client, roles.admin], required: true, input: false, defaultValue: roles.client },
        phone: { type: "string", required: false, defaultValue: "", validator: { input: phoneSchema } },
      },
    },
    session: { modelName: collections.sessions, expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24, cookieCache: { enabled: false } },
    account: { modelName: collections.accounts },
    verification: { modelName: collections.verification },
    rateLimit: {
      enabled: true, storage: "database", modelName: collections.rateLimit, window: 60, max: 100,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 60, max: 3 },
        "/change-password": { window: 60, max: 5 },
      },
    },
  });
}

const scope = globalThis as typeof globalThis & { kianaAuth?: ReturnType<typeof createAuth> };
export function getAuth() {
  scope.kianaAuth ??= createAuth();
  return scope.kianaAuth;
}
