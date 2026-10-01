import { collections, siteKey } from "../src/lib/constants.ts";
import { seedArticles, seedCourses, seedSettings } from "../src/content/seed.ts";
import { getEnv } from "../src/lib/env.ts";
import { getDb, closeDb } from "../src/server/db.ts";
import type { Article, Course, Settings } from "../src/server/models.ts";

// MANUAL ONLY; first run setup-indexes. Existing records are never overwritten.
let stage = "بررسی متغیرهای محیطی";
try {
  const env = getEnv();
  console.log(`پایگاه‌دادهٔ انتخاب‌شده: ${env.MONGODB_DB}؛ نشانی اتصال و رمزها نمایش داده نمی‌شوند.`);
  const db = getDb();
  stage = "بررسی نمایه‌های یکتا";
  // Refuse to seed without the uniqueness prerequisites; do not create them here.
  for (const name of [collections.articles, collections.courses]) {
    const indexes = await db.collection(name).listIndexes().toArray();
    if (!indexes.some((index) => index.unique && index.key?.slug === 1 && Object.keys(index.key).length === 1 && !index.partialFilterExpression && !index.sparse)) {
      throw new Error("Run setup-indexes before seeding.");
    }
  }
  const now = new Date();
  stage = "ایجاد تنظیمات اولیهٔ سایت";
  // Initialize the required singleton before optional draft content: a later
  // draft insertion failure must not leave a fresh site's profile absent.
  const settings = await db.collection<Settings>(collections.settings).updateOne({ _id: siteKey }, {
    $setOnInsert: { ...seedSettings, createdAt: now, updatedAt: now, revision: 0 },
  }, { upsert: true });
  if (!settings.acknowledged) throw new Error("Settings write was not acknowledged.");
  let inserted = settings.upsertedCount;
  console.log(settings.upsertedCount > 0
    ? "تنظیمات اولیهٔ سایت ایجاد شد؛ رزرو غیرفعال و ساعت‌ها خالی‌اند."
    : "سند تنظیمات سایت از قبل وجود دارد و تغییر نکرد؛ این پیام تأیید کامل‌بودن فیلدهای آن نیست.");
  stage = "درج پیش‌نویس مقاله‌ها";
  for (const article of seedArticles) {
    const result = await db.collection<Article>(collections.articles).updateOne({ slug: article.slug }, {
      $setOnInsert: { ...article, createdAt: now, updatedAt: now, publishedAt: null, revision: 0 },
    }, { upsert: true });
    if (!result.acknowledged) throw new Error("Article write was not acknowledged.");
    inserted += result.upsertedCount;
  }
  stage = "درج پیش‌نویس دوره‌ها";
  for (const course of seedCourses) {
    const result = await db.collection<Course>(collections.courses).updateOne({ slug: course.slug }, {
      $setOnInsert: { ...course, createdAt: now, updatedAt: now, publishedAt: null, revision: 0 },
    }, { upsert: true });
    if (!result.acknowledged) throw new Error("Course write was not acknowledged.");
    inserted += result.upsertedCount;
  }
  console.log(`${new Intl.NumberFormat("fa-IR").format(inserted)} رکورد تازه درج شد؛ محتوای تازه پیش‌نویس است. رکوردهای موجود، از جمله وضعیت فعلی رزرو، تغییر نکردند.`);
} catch {
  console.error(`راه‌اندازی در مرحلهٔ «${stage}» کامل نشد. متغیرهای محیطی، پایگاه‌دادهٔ انتخاب‌شده، نمایه‌ها و دسترسی را روی دستگاه خود بررسی کنید. ابتدا setup-indexes.mts و سپس seed.mts را با همان .env.local اجرا کنید. ممکن است بخشی از داده‌ها درج شده باشد؛ اجرای دوباره رکورد موجود را بازنویسی نمی‌کند.`);
  process.exitCode = 1;
} finally {
  try { await closeDb(); } catch {
    console.error("بستن اتصال پایگاه‌داده کامل نشد؛ این خطا به معنی لغو درج‌های قبلی نیست.");
    process.exitCode = 1;
  }
}
