import "server-only";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
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
