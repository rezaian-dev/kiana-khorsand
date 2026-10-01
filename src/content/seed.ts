import { articles } from "./articles.ts";
import { courses } from "./courses.ts";
import { images, type ImageAsset } from "./images.ts";
import { profile } from "./profile.ts";
import { publicationStates } from "../lib/constants.ts";
import { articleSchema, courseSchema, settingsSchema } from "../lib/records.ts";
import { normalizeSearch } from "../lib/catalog.ts";
import { topics } from "../lib/constants.ts";

function findImage(asset: ImageAsset) {
  const key = (Object.keys(images) as (keyof typeof images)[]).find((key) => images[key].key === asset.key);
  if (!key) throw new Error("Seed image is missing from the local manifest.");
  return key;
}

// No timestamps, author attribution, users, real reviews or appointment records
// are fabricated here. The manual script stamps actual insertion time only.
export const seedArticles = articles.map((article) => ({
  ...articleSchema.parse({ ...article, image: findImage(article.image), social: findImage(article.social), status: publicationStates.draft, isReviewed: false, author: "" }),
  search: normalizeSearch(`${article.title} ${article.description} ${topics[article.category]}`),
}));
export const seedCourses = courses.map((course) => ({
  ...courseSchema.parse({ ...course, image: findImage(course.image), status: publicationStates.draft, isReviewed: false, author: "" }),
  search: normalizeSearch(`${course.title} ${course.description} ${topics[course.category]}`),
}));
export const seedSettings = settingsSchema.parse({
  ...profile, address: null, isBookingEnabled: false, slotMinutes: null, hours: [],
});
