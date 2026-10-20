// Deterministic, offline editorial art direction. No user text becomes SVG or CSS.
// The title is strongest, followed by tags, category, excerpt and article text;
// rewording a published article updates its emblem without a separate admin step.
const topics = [
  {
    icon: "MoonStar",
    label: "خواب و شب",
    tone: "violet",
    words: ["خواب", "بی خوابی", "شب بیداری", "رویا", "sleep", "insomnia"],
  },
  {
    icon: "HeartPulse",
    label: "نشانه‌های بدنی",
    tone: "coral",
    words: [
      "بدن",
      "تپش",
      "ضربان",
      "قلب",
      "جسم",
      "سردرد",
      "درد",
      "پانیک",
      "body",
      "heartbeat",
    ],
  },
  {
    icon: "ShieldCheck",
    label: "مرزگذاری",
    tone: "sage",
    words: ["مرز", "نه گفتن", "حد و حدود", "حریم", "boundary", "boundaries"],
  },
  {
    icon: "HeartCrack",
    label: "سوگ و فقدان",
    tone: "plum",
    words: ["سوگ", "فقدان", "عزا", "داغ", "جدایی", "grief", "loss"],
  },
  {
    icon: "MessageCircleHeart",
    label: "گفت‌وگوی درونی",
    tone: "plum",
    words: [
      "منتقد",
      "سرزنش",
      "صدای درون",
      "گفتگوی درونی",
      "خودگویی",
      "inner critic",
    ],
  },
  {
    icon: "RefreshCcw",
    label: "الگوهای تکراری",
    tone: "violet",
    words: [
      "وسواس",
      "چک کردن",
      "بررسی مداوم",
      "اطمینان جویی",
      "تکرار",
      "obsess",
      "compuls",
    ],
  },
  {
    icon: "Sun",
    label: "نور و روز",
    tone: "amber",
    words: ["آفتاب", "نور روز", "نور طبیعی", "خورشید", "daylight", "sunlight"],
  },
  {
    icon: "Wind",
    label: "تنفس و آرام‌سازی",
    tone: "teal",
    words: ["تنفس", "نفس", "دم و بازدم", "آرام سازی", "breath"],
  },
  {
    icon: "Workflow",
    label: "چرخهٔ فکر و احساس",
    tone: "violet",
    words: [
      "چرخه",
      "فکر و احساس",
      "الگوی فکری",
      "نشخوار",
      "باور",
      "thought",
      "rumination",
    ],
  },
  {
    icon: "HeartHandshake",
    label: "روابط عاطفی",
    tone: "coral",
    words: [
      "رابطه",
      "زوج",
      "همسر",
      "صمیمیت",
      "دلخوری",
      "تعارض",
      "relationship",
      "couple",
    ],
  },
  {
    icon: "UsersRound",
    label: "خانواده",
    tone: "sage",
    words: ["خانواده", "والدین", "پدر", "مادر", "فرزند", "family", "parent"],
  },
  {
    icon: "HandHeart",
    label: "خودمراقبتی",
    tone: "coral",
    words: [
      "عزت نفس",
      "خودارزش",
      "خودارزشی",
      "مهربانی با خود",
      "خودمراقبت",
      "خوددوستی",
      "self worth",
      "self care",
    ],
  },
  {
    icon: "Brain",
    label: "اضطراب و ذهن",
    tone: "teal",
    words: ["اضطراب", "نگرانی", "دلشوره", "ترس", "استرس", "anxiety", "stress"],
  },
  {
    icon: "CloudSun",
    label: "خلق و احساس",
    tone: "amber",
    words: ["خلق", "افسردگی", "غمگین", "بی حوصلگی", "mood", "depression"],
  },
  {
    icon: "BriefcaseBusiness",
    label: "کار و فرسودگی",
    tone: "sage",
    words: ["محیط کار", "شغل", "کار و زندگی", "فرسودگی", "burnout", "career"],
  },
  {
    icon: "Flower2",
    label: "ذهن‌آگاهی",
    tone: "plum",
    words: [
      "ذهن آگاهی",
      "مراقبه",
      "مدیتیشن",
      "حضور در لحظه",
      "mindful",
      "meditation",
    ],
  },
  {
    icon: "Target",
    label: "هدف و کمال‌گرایی",
    tone: "amber",
    words: ["کمال گرایی", "هدف", "عملکرد", "موفقیت", "perfection"],
  },
  {
    icon: "Compass",
    label: "انتخاب و مسیر",
    tone: "teal",
    words: [
      "تصمیم",
      "انتخاب",
      "تغییر مسیر",
      "معنا",
      "پیدا کردن راه",
      "decision",
    ],
  },
  {
    icon: "NotebookPen",
    label: "نوشتن و تمرین",
    tone: "sage",
    words: ["نوشتن", "یادداشت", "ژورنال", "دفتر", "journal", "writing"],
  },
] as const;

export type ArticleIcon = (typeof topics)[number]["icon"] | "BookOpenText";
export type ArticleTone = (typeof topics)[number]["tone"];
export type ArticleVisual = {
  icon: ArticleIcon;
  tone: ArticleTone;
  label: string;
};

const normalize = (value: string) =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u064b-\u065f\u0670\u200c\u200d\u0640]/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

export function articleVisual(article: {
  title: string;
  category: string;
  excerpt: string;
  tags?: readonly string[];
  body?: string;
}): ArticleVisual {
  const sources = [
    [article.title, 24],
    [(article.tags ?? []).join(" "), 5],
    [article.category, 4],
    [article.excerpt, 3],
    [article.body ?? "", 1],
  ] as const;
  const text = sources.map(([value, weight]) => ({
    text: normalize(value),
    weight,
  }));
  let winner: ArticleVisual = {
    icon: "BookOpenText",
    tone: "teal",
    label: "مطالعه",
  };
  let highest = 0;
  for (const topic of topics) {
    const score = text.reduce((sum, field) => {
      const hits = topic.words.filter((word) =>
        field.text.includes(normalize(word)),
      ).length;
      return sum + Math.min(hits, 2) * field.weight;
    }, 0);
    if (score > highest) {
      highest = score;
      winner = { icon: topic.icon, tone: topic.tone, label: topic.label };
    }
  }
  return winner;
}
