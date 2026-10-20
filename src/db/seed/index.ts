import "server-only";
import { db } from "../client";
import { ensureIndexes } from "../indexes";
import { models } from "@/validations/models";
import type { CollectionName, Model } from "@/types/models";
import { rows as pages } from "./pages";
import { rows as areas } from "./areas";
import { rows as articles } from "./articles";
import { rows as workshops } from "./workshops";
import { rows as testimonials } from "./testimonials";
import { rows as faqs } from "./faqs";
import { rows as assessments } from "./assessments";
import { rows as services } from "./services";
import { rows as settings } from "./settings";
import { rows as availability } from "./availability";

async function insertMissing<K extends CollectionName>(
  name: K,
  key: keyof Model[K] & string,
  rows: Model[K][],
) {
  for (const row of rows) models[name].parse(row);
  if (rows.length === 0) return 0;
  const result = await db.collection(name).bulkWrite(
    rows.map((row) => ({
      updateOne: {
        filter: { [key]: row[key] },
        update: { $setOnInsert: row },
        upsert: true,
      },
    })),
    { ordered: false },
  );
  console.log(`${name}: ${rows.length} total, ${result.upsertedCount} new`);
  return result.upsertedCount;
}

export async function seed() {
  if (db.databaseName !== "kiana-khorsand")
    throw new Error("Unexpected database");
  await ensureIndexes();
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
  console.log(`Seed: ${created} new documents`);
  return created;
}
