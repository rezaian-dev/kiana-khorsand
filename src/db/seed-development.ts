#!/usr/bin/env tsx
import { seedDevelopment } from "./seed/development";
import { mongoClient } from "./client";

async function main() {
  console.log("🌱 Running development fixtures...");
  await seedDevelopment();
  await mongoClient.close().catch(() => {});
  process.exit(0);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
