import type { Model } from "@/types/models";

export const rows = [
  {
    slug: "t-1",
    name: "نسترن کریمی",
    quote:
      "قبل از شروع، فکر می‌کردم حرف زدن فایده‌ای ندارد. اما اینجا یاد گرفتم نگرانی‌ام را بشناسم و به‌جای فرار، با آن روبه‌رو شوم. هر جلسه، یک قدم کوچک بود که با هم برداشتیم.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-2",
    name: "مهدی کاظمی",
    quote:
      "ما همیشه سر یک چیز دعوا می‌کردیم و نمی‌فهمیدیم چرا. این‌بار توانستیم پشتِ آن دعوا را ببینیم؛ موضوع، همان چیزی که فکر می‌کردیم نبود.",
    category: "couples",
    experience: "مشاورهٔ زوجی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-3",
    name: "سارا رضایی",
    quote:
      "جلسه‌ها بی‌عجله بود و هیچ‌وقت احساس قضاوت نداشتم. تمرین‌های کوچک بین جلسه‌ها واقعاً کمک کرد. اولین باری بود که کسی بدون نصیحت کردن، فقط گوش داد.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-4",
    name: "رضا مرادی",
    quote:
      "دلم می‌خواست کسی بدون نصیحت کردن گوش بدهد. همین اتفاق افتاد و بعد از مدتی خودم راه‌ها را دیدم. فهمیدم خیلی از جواب‌ها، از قبل درون خودم بود.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-5",
    name: "هانیه براتی",
    quote:
      "برای من سخت‌ترین بخش، تماس اول بود. اما از همان جلسه‌ی اول حس کردم در جای امنی هستم. اینکه می‌دانستم وقت مال خودم است، خیلی کمک کرد.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-6",
    name: "امیر شریفی",
    quote:
      "سال‌ها فکر می‌کردم باید خودم همه‌چیز را حل کنم. اینجا یاد گرفتم کمک خواستن ضعف نیست. حالا با خودم مهربان‌تر حرف می‌زنم و خوابم بهتر شده.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-7",
    name: "لیلا فرهادی",
    quote:
      "بعد از سال‌ها، اولین بار بود که توانستیم بدون دعوا درباره‌ی یک موضوع سخت حرف بزنیم. تمرین‌های ارتباطی، همان چیزی بود که کم داشتیم.",
    category: "couples",
    experience: "کارگاه مهارت‌های ارتباطی برای زوج‌ها",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-8",
    name: "کاوه نوری",
    quote:
      "من آدم اهل حرف زدن نبودم. اما جلسه‌ها آنقدر بی‌فشار بودند که کم‌کم شروع کردم به گفتن. حالا می‌فهمم چرا بعضی وقت‌ها عصبی می‌شدم.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-9",
    name: "مریم جلالی",
    quote:
      "چیزی که برای من فرق داشت این بود که کسی برایم نسخه نپیچید. با هم کشف کردیم چه چیزی در زندگی‌ام کار می‌کند و چه چیزی نه.",
    category: "individual",
    experience: "مشاورهٔ فردی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
  {
    slug: "t-10",
    name: "سعید طاهری",
    quote:
      "فکر می‌کردم می‌آییم که یکی از ما مقصر شناخته شود. اما اینجا برنده و باختنی نبود؛ فهمیدیم مشکل، الگویی بود که هر دو با هم ساخته بودیم.",
    category: "couples",
    experience: "مشاورهٔ زوجی",
    avatar: null,
    status: "published",
    createdAt: new Date(),
  },
] satisfies Model["testimonials"][];
