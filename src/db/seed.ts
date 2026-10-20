#!/usr/bin/env tsx
import { seed } from "./seed/index";
import { seedDevelopment } from "./seed/development";
import { mongoClient } from "./client";

// Professional seed runner — works locally and on Vercel (via npm run seed)
async function main() {
  console.log("🌱 Kiana Khorsand — Seeding database...");
  console.log(`📦 DB: ${process.env.MONGODB_DB || "kiana-khorsand"}`);
  try {
    const created = await seed();
    console.log(`✅ Core seed: ${created} new docs`);
    // Development fixtures (users, appointments) — skip in strict production unless SEED_ALLOW_DEMO=1
    if (process.env.NODE_ENV !== "production" || process.env.SEED_ALLOW_DEMO === "1") {
      try {
        await seedDevelopment();
      } catch (e) {
        console.warn("⚠️  Development seed skipped:", (e as Error).message);
      }
    }
    console.log("🎉 Seed completed successfully");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoClient.close().catch(() => {});
    process.exit(0);
  }
}

main();
