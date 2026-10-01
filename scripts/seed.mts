import { collections, siteKey } from "../src/lib/constants.ts";
import { seedArticles, seedCourses, seedSettings } from "../src/content/seed.ts";
import { getDb, closeDb } from "../src/server/db.ts";
import type { Article, Course, Settings } from "../src/server/models.ts";

// MANUAL ONLY; first run setup-indexes. Existing records are never overwritten.
try {
  const db = getDb();
  // Refuse to seed without the uniqueness prerequisites; do not create them here.
  for (const name of [collections.articles, collections.courses]) {
    const indexes = await db.collection(name).listIndexes().toArray();
    if (!indexes.some((index) => index.unique && index.key?.slug === 1 && Object.keys(index.key).length === 1 && !index.partialFilterExpression && !index.sparse)) {
      throw new Error("Run setup-indexes before seeding.");
    }
  }
  const now = new Date();
  let inserted = 0;
  for (const article of seedArticles) {
    const result = await db.collection<Article>(collections.articles).updateOne({ slug: article.slug }, {
      $setOnInsert: { ...article, createdAt: now, updatedAt: now, publishedAt: null, revision: 0 },
    }, { upsert: true });
    inserted += result.upsertedCount;
  }
  for (const course of seedCourses) {
    const result = await db.collection<Course>(collections.courses).updateOne({ slug: course.slug }, {
      $setOnInsert: { ...course, createdAt: now, updatedAt: now, publishedAt: null, revision: 0 },
    }, { upsert: true });
    inserted += result.upsertedCount;
  }
  const result = await db.collection<Settings>(collections.settings).updateOne({ _id: siteKey }, {
    $setOnInsert: { ...seedSettings, createdAt: now, updatedAt: now, revision: 0 },
  }, { upsert: true });
  inserted += result.upsertedCount;
  console.log(`${new Intl.NumberFormat("fa-IR").format(inserted)} رکورد تازه درج شد؛ متن‌ها پیش‌نویس‌اند و رزرو غیرفعال است. رکورد موجود تغییر نکرد.`);
} catch {
  console.error("درج نمونه‌ها کامل نشد. ابتدا نمایه‌ها، سپس تنظیمات و دسترسی محلی را بررسی کنید. اجرای دوباره رکورد موجود را بازنویسی نمی‌کند.");
  process.exitCode = 1;
} finally {
  try { await closeDb(); } catch { process.exitCode = 1; }
}
