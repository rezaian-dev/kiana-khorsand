// Curated local assets. A saved cover always wins over the editorial default.
export const articleCoverOptions = {
  "anxiety-basics": "/assets/images/articles/anxiety-basics.jpg",
  "thought-feeling-loop": "/assets/images/articles/thought-feeling-loop.jpg",
  "relationship-stuck": "/assets/images/articles/relationship-stuck.jpg",
  "self-worth": "/assets/images/articles/self-worth.jpg",
  "grief-path": "/assets/images/articles/grief-path.jpg",
  "sleep-anxiety": "/assets/images/articles/sleep-anxiety.jpg",
  "body-signals": "/assets/images/articles/body-signals.jpg",
  "boundaries-family": "/assets/images/articles/boundaries-family.jpg",
  "inner-critic": "/assets/images/articles/inner-critic.jpg",
  "daylight-and-mood": "/assets/images/articles/daylight-and-mood.jpg",
  "grief-and-work": "/assets/images/articles/grief-and-work.jpg",
  "checking-behavior": "/assets/images/articles/checking-behavior.jpg",
} as const;
export const articleCoverLabels: Record<string, string> = {
  "anxiety-basics": "آرام‌سازی اضطراب",
  "thought-feeling-loop": "فکر، احساس و رفتار",
  "relationship-stuck": "رابطه و گفت‌وگو",
  "self-worth": "عزت‌نفس",
  "grief-path": "مسیر سوگ",
  "sleep-anxiety": "خواب و آرامش",
  "body-signals": "نشانه‌های بدن",
  "boundaries-family": "مرزهای سالم",
  "inner-critic": "منتقد درونی",
  "daylight-and-mood": "نور روز و حال خوب",
  "grief-and-work": "سوگ در کار",
  "checking-behavior": "رفتارهای تکراری",
};
const workshopCovers: Record<string, string> = {
  "emotion-regulation": "/assets/images/workshops/emotion-workshop.jpg",
  "couple-communication": "/assets/images/articles/relationship-stuck.jpg",
  "mindfulness-intro": "/assets/images/workshops/mindfulness-workshop.jpg",
  "self-compassion": "/assets/images/workshops/mindfulness-workshop.jpg",
  "boundaries-workshop": "/assets/images/articles/boundaries-family.jpg",
  "sleep-workshop": "/assets/images/articles/sleep-anxiety.jpg",
};
export const editorialArticleCover = (slug: string, saved?: string | null) =>
  saved ||
  articleCoverOptions[slug as keyof typeof articleCoverOptions] ||
  null;
export const editorialWorkshopCover = (slug: string, saved?: string | null) =>
  saved ||
  workshopCovers[slug] ||
  "/assets/images/workshops/emotion-workshop.jpg";
export const allowedArticleCovers: string[] = [
  ...Object.values(articleCoverOptions),
  "/assets/images/hero-therapist.jpg",
  "/assets/images/about-therapist.jpg",
];
