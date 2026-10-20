import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { username } from "better-auth/plugins";
import { db, mongoClient } from "../client";
import { phone } from "@/validations/models";
import { env } from "@/lib/env";

// No nextCookies plugin here: this command runs outside the Next.js request scope.
const bootstrap = betterAuth({
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

async function account(kind: "CLIENT" | "ADMIN") {
  const number = process.env[`SEED_${kind}_PHONE`];
  const password = process.env[`SEED_${kind}_PASSWORD`];
  if (Boolean(number) !== Boolean(password))
    throw new Error("Both account fields are required");
  if (!number || !password) return null;
  phone.parse(number);
  if (password.length < (kind === "ADMIN" ? 16 : 8))
    throw new Error("Seed password too short");
  const users = db.collection("users");
  const existing = await users.findOne({ username: number });
  if (existing) {
    if (kind === "ADMIN" && existing.role !== "admin")
      throw new Error("Refusing to promote existing account");
    return { id: String(existing._id), created: false };
  }
  const created = await bootstrap.api.signUpEmail({
    body: {
      name: kind === "ADMIN" ? "مدیر سایت" : "کاربر آزمایشی",
      email: `${number}@accounts.kianakhorsand.invalid`,
      username: number,
      password,
    },
  });
  if (!created?.user?.id) throw new Error("Could not create account");
  if (kind === "ADMIN") {
    const result = await users.updateOne(
      { username: number, role: "user" },
      { $set: { role: "admin" } },
    );
    if (result.modifiedCount !== 1) throw new Error("Could not set admin role");
  }
  return { id: created.user.id, created: true };
}

export async function seedDevelopment() {
  if (process.env.NODE_ENV === "production")
    throw new Error("Development seed disabled in production");
  const admin = await account("ADMIN");
  const client = await account("CLIENT");
  let created = Number(admin?.created) + Number(client?.created);
  if (client) {
    const userId = client.id;
    const appointmentId = `dev-appointment-${userId}`;
    // Stable natural keys make reruns non-destructive and cross-client fixtures distinct.
    const startsAt = new Date(Date.now() + 14 * 86400_000);
    const endsAt = new Date(startsAt.getTime() + 50 * 60_000);
    const appointment = await db.collection("appointments").updateOne(
      { devKey: appointmentId },
      {
        $setOnInsert: {
          devKey: appointmentId,
          userId,
          serviceId: "s-online",
          startsAt,
          endsAt,
          status: "confirmed",
          price: 450000,
          note: "",
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );
    created += appointment.upsertedCount;
    const note = await db.collection("notes").updateOne(
      { devKey: `dev-note-${userId}` },
      {
        $setOnInsert: {
          devKey: `dev-note-${userId}`,
          userId,
          title: "یادداشت شخصی",
          body: "موضوع‌های جلسهٔ بعد را اینجا مرور می‌کنم.",
          tags: [],
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );
    created += note.upsertedCount;
    const invoice = `DEV-${userId}`;
    const payment = await db.collection("payments").updateOne(
      { invoice },
      {
        $setOnInsert: {
          userId,
          appointmentId,
          invoice,
          amount: 450000,
          status: "paid",
          paidAt: new Date(),
          method: "manual",
        },
      },
      { upsert: true },
    );
    created += payment.upsertedCount;
    const threadInsert = await db
      .collection("threads")
      .updateOne(
        { userId },
        { $setOnInsert: { createdAt: new Date(), updatedAt: new Date() } },
        { upsert: true },
      );
    created += threadInsert.upsertedCount;
    const thread = await db.collection("threads").findOne({ userId });
    if (!thread) throw new Error("Thread was not created");
    const message = await db.collection("messages").updateOne(
      { devKey: `dev-message-${userId}` },
      {
        $setOnInsert: {
          devKey: `dev-message-${userId}`,
          threadId: String(thread._id),
          userId,
          sender: "client",
          body: "سلام، دربارهٔ جلسهٔ بعد یک پرسش دارم.",
          readAt: null,
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );
    created += message.upsertedCount;
    const result = await db.collection("results").updateOne(
      { devKey: `dev-result-${userId}` },
      {
        $setOnInsert: {
          devKey: `dev-result-${userId}`,
          userId,
          assessmentId: "anxiety-check",
          answers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          score: 10,
          band: "پاسخ‌های میانی",
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );
    created += result.upsertedCount;
  }
  console.log(`Development seed: ${created} new documents`);
}
