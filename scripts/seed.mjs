#!/usr/bin/env node
import { MongoClient } from "mongodb";
import fs from "fs";

// Direct seed without Next.js server-only — for manual execution
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "kiana-khorsand";
if (!uri) {
  console.error("❌ MONGODB_URI missing in env");
  process.exit(1);
}
console.log(`🌱 Connecting to ${dbName}...`);
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
await client.connect();
const db = client.db(dbName);
console.log(`✅ Connected to ${db.databaseName}`);

// Ensure indexes
async function ensureIndexes() {
  const ensure = async (name, keys, options = {}) => {
    await db.collection(name).createIndex(keys, options);
  };
  await ensure("users", { email: 1 }, { unique: true });
  await ensure("users", { username: 1 }, { unique: true, sparse: true });
  for (const name of ["pages","areas","articles","workshops","testimonials","faqs","services","assessments"] ) {
    await ensure(name, { slug: 1 }, { unique: true });
  }
  for (const name of ["areas","articles","workshops","testimonials","faqs","services","assessments"]) {
    await ensure(name, { status: 1 });
  }
  await ensure("articles", { status: 1, publishedAt: -1 });
  console.log("📇 Indexes ensured");
}

// Helper to load seed rows via reading TS files and extracting via dynamic import (tsx)
// Instead, we will directly import TS via tsx -- we are running via node with --loader? Simpler: read JSON via require with tsx
// We will use tsx to import the seed files dynamically
import { pathToFileURL } from "url";
async function loadRows(relativePath) {
  const mod = await import(pathToFileURL(relativePath).href);
  return mod.rows;
}

await ensureIndexes();

// Load seed data (using tsx transpiled)
const base = process.cwd();
const areas = (await import(pathToFileURL(base + "/src/db/seed/areas.ts").href)).rows;
const articles = (await import(pathToFileURL(base + "/src/db/seed/articles.ts").href)).rows;
const workshops = (await import(pathToFileURL(base + "/src/db/seed/workshops.ts").href)).rows;
const testimonials = (await import(pathToFileURL(base + "/src/db/seed/testimonials.ts").href)).rows;
const faqs = (await import(pathToFileURL(base + "/src/db/seed/faqs.ts").href)).rows;
const assessments = (await import(pathToFileURL(base + "/src/db/seed/assessments.ts").href)).rows;
const services = (await import(pathToFileURL(base + "/src/db/seed/services.ts").href)).rows;
const pages = (await import(pathToFileURL(base + "/src/db/seed/pages.ts").href)).rows;
const settings = (await import(pathToFileURL(base + "/src/db/seed/settings.ts").href)).rows;
const availability = (await import(pathToFileURL(base + "/src/db/seed/availability.ts").href)).rows;

async function insertMissing(name, key, rows) {
  if (rows.length === 0) return 0;
  const result = await db.collection(name).bulkWrite(
    rows.map((row) => ({
      updateOne: {
        filter: { [key]: row[key] },
        update: { $setOnInsert: row },
        upsert: true,
      },
    })),
    { ordered: false }
  );
  console.log(`${name}: ${rows.length} total, ${result.upsertedCount} new`);
  return result.upsertedCount;
}

let created = 0;
created += await insertMissing("settings", "_id", settings);
created += await insertMissing("pages", "slug", pages);
created += await insertMissing("areas", "slug", areas);
created += await insertMissing("articles", "slug", articles);
created += await insertMissing("workshops", "slug", workshops);
created += await insertMissing("testimonials", "slug", testimonials);
created += await insertMissing("faqs", "slug", faqs);
created += await insertMissing("assessments", "slug", assessments);
created += await insertMissing("services", "slug", services);
created += await insertMissing("availability", "key", availability);
console.log(`🎉 Seed done: ${created} new documents`);

// Create demo users via Better Auth approach — simpler: insert users with hashed password using better-auth internal? We'll use direct signUp via bootstrap.api.signUpEmail
// For professional seeding, we create 8 demo clients with known phones for showcase
const demoUsers = [
  { name: "نسترن کریمی", username: "09123456701" },
  { name: "امیرحسین شریفی", username: "09123456702" },
  { name: "سارا رضایی", username: "09123456703" },
  { name: "مریم جلالی", username: "09123456704" },
  { name: "کاوه نوری", username: "09123456705" },
  { name: "هانیه براتی", username: "09123456706" },
  { name: "رضا مرادی", username: "09123456707" },
  { name: "لیلا فرهادی", username: "09123456708" },
];
try {
  const { betterAuth } = await import("better-auth");
  const { mongodbAdapter } = await import("@better-auth/mongo-adapter");
  const { username } = await import("better-auth/plugins");
  const bootstrap = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(db, { client }),
    emailAndPassword: { enabled: true, minPasswordLength: 8 },
    user: { modelName: "users", additionalFields: { role: { type: "string", required: true, defaultValue: "user", input: false } } },
    session: { modelName: "sessions" },
    account: { modelName: "accounts" },
    verification: { modelName: "verifications" },
    plugins: [username({ minUsernameLength: 11, maxUsernameLength: 11, usernameValidator: (v) => /^09\d{9}$/.test(v), immutableUsername: true })],
  });
  for (const u of demoUsers) {
    const exists = await db.collection("users").findOne({ username: u.username });
    if (exists) {
      console.log(`👤 ${u.name} (${u.username}) already exists`);
      continue;
    }
    try {
      const created = await bootstrap.api.signUpEmail({
        body: { name: u.name, email: `${u.username}@accounts.kianakhorsand.invalid`, username: u.username, password: "Demo12345678!" },
      });
      console.log(`✅ Demo user created: ${u.name} (${u.username}) ${created?.user?.id ? "" : "(maybe exists)"}`);
    } catch (e) {
      console.log(`⚠️  ${u.name} skip: ${e.message.slice(0,80)}`);
    }
  }
  // Also ensure SEED_ADMIN / SEED_CLIENT from env
  for (const kind of ["ADMIN","CLIENT"]) {
    const number = process.env[`SEED_${kind}_PHONE`];
    const password = process.env[`SEED_${kind}_PASSWORD`];
    if (!number || !password) continue;
    const exists = await db.collection("users").findOne({ username: number });
    if (exists) {
      console.log(`👤 SEED_${kind} ${number} already exists`);
      continue;
    }
    try {
      const created = await bootstrap.api.signUpEmail({ body: { name: kind==="ADMIN"?"مدیر سایت":"کاربر آزمایشی", email: `${number}@accounts.kianakhorsand.invalid`, username: number, password } });
      if (kind==="ADMIN" && created?.user?.id) {
        await db.collection("users").updateOne({ username: number }, { $set: { role: "admin" } });
        console.log(`✅ SEED_ADMIN created and promoted`);
      } else if (created?.user?.id) console.log(`✅ SEED_CLIENT created`);
    } catch (e) { console.log(`⚠️  SEED_${kind} skip: ${e.message.slice(0,80)}`); }
  }
} catch (e) {
  console.log(`ℹ️  Demo users via Better Auth skipped (will be created on first login): ${e.message}`);
  for (const u of demoUsers) {
    console.log(`ℹ️  Demo user ${u.name} (${u.username}) — create via SEED_PHONE/PASSWORD env on first run (skipped direct insert for security)`);
  }
}

await client.close();
console.log("✅ Done");
process.exit(0);
