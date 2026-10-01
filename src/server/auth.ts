import "server-only";
import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { signInSchema, signUpSchema, profileSchema, passwordChangeSchema } from "../lib/auth";
import { authPaths, collections, liveTopics, roles, routes } from "../lib/constants.ts";
import { publishChange } from "./live";
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

function readConfig() {
  return authEnvSchema.safeParse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || getEnv().NEXT_PUBLIC_SITE_URL,
  });
}

export function canAuthenticate() { return readConfig().success; }

function createAuth() {
  const parsed = readConfig();
  if (!parsed.success) throw new Error("Authentication environment is incomplete; configure the secret and origin locally.");
  const env = parsed.data;
  return betterAuth({
    appName: "دکتر کیانا خرسند",
    secret: env.BETTER_AUTH_SECRET, baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [new URL(env.BETTER_AUTH_URL).origin],
    // Omit client: the user's standalone MongoDB must not require transactions.
    database: mongodbAdapter(getDb()),
    hooks: {
      before: createAuthMiddleware(async (ctx) => {
        if (ctx.path === authPaths.signOut && ctx.headers) {
          // Native sign-out does not populate context.session itself. Capture
          // the verified identity before deletion so the after hook can notify.
          ctx.context.session = await getAuth().api.getSession({ headers: ctx.headers, query: { disableCookieCache: true, disableRefresh: true } });
          return { context: ctx };
        }
        const schema = ctx.path === authPaths.signIn ? signInSchema : ctx.path === authPaths.signUp ? signUpSchema : ctx.path === authPaths.profile ? profileSchema : ctx.path === authPaths.password ? passwordChangeSchema : null;
        if (!schema) return;
        const parsed = schema.safeParse(ctx.body);
        if (!parsed.success) throw new APIError("BAD_REQUEST", { code: "INVALID_FIELDS", message: "اطلاعات واردشده معتبر نیست." });
        return { context: { ...ctx, body: { ...parsed.data, ...(ctx.path === authPaths.password ? { revokeOtherSessions: true } : {}) } } };
      }),
      after: createAuthMiddleware(async (ctx) => {
        if (ctx.context.returned instanceof Error || (ctx.context.returned instanceof Response && !ctx.context.returned.ok)) return;
        if (![authPaths.signIn, authPaths.signUp, authPaths.profile, authPaths.password, authPaths.signOut].some((path) => path === ctx.path)) return;
        const userId = ctx.context.newSession?.user.id ?? ctx.context.session?.user.id;
        if (!userId) return;
        // A successful native mutation must not be reported as failed if a
        // best-effort UI invalidation fails after the database committed.
        try {
          publishChange({ topic: liveTopics.account, id: userId, audience: `user:${userId}` });
          if (ctx.path === authPaths.signUp || ctx.path === authPaths.profile) publishChange({ topic: liveTopics.admin, id: userId, audience: "admin" });
          revalidatePath(routes.home, "layout");
        } catch { /* Reconnect refresh is the recovery path; no sensitive logs. */ }
      }),
    },
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
        [authPaths.signIn]: { window: 60, max: 5 },
        [authPaths.signUp]: { window: 60, max: 3 },
        [authPaths.password]: { window: 60, max: 5 },
      },
    },
  });
}

const scope = globalThis as typeof globalThis & { kianaAuth?: ReturnType<typeof createAuth> };
export function getAuth() {
  scope.kianaAuth ??= createAuth();
  return scope.kianaAuth;
}
