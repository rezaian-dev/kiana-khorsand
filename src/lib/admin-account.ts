import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { username } from "better-auth/plugins";
import { db, mongoClient } from "@/db/client";
import { env } from "@/lib/env";

/* Internal Better Auth instance without nextCookies: admin-created sign-ups must
   never replace the administrator's browser session with the new user's session. */
export const accountProvisioning = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client: mongoClient }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
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
  ],
});
