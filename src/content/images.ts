export type ImageAsset = Readonly<{
  key: string;
  path: `/images/${string}`;
  mobile?: `/images/${string}`;
  width: number;
  height: number;
  alt: string;
  subject: string;
  aspectRatio: `${number}/${number}`;
  section: string;
  isSample: boolean;
}>;

export const images = {
  hero: { key: "hero", path: "/images/hero.jpg", mobile: "/images/hero-mobile.jpg", width: 2400, height: 1350, alt: "تصویر نمونهٔ یک روان‌شناس زن ایرانی با روسری یاسی، نشسته در اتاقی روشن", subject: "Fictional Iranian psychologist, seated, lavender hijab", aspectRatio: "16/9", section: "Home hero arched portrait crop", isSample: true },
  portrait: { key: "portrait", path: "/images/portrait.jpg", width: 1280, height: 1600, alt: "پرترهٔ نمایشیِ زن جوان ایرانی با پوشش حرفه‌ای و روسری یاسی؛ تصویر واقعی دکتر نیست", subject: "Matching fictional portrait", aspectRatio: "4/5", section: "Home teaser / About and Contact portrait", isSample: true },
  quiet: { key: "quiet", path: "/images/quiet-room.jpg", mobile: "/images/quiet-room-mobile.jpg", width: 2400, height: 1350, alt: "اتاق مشاورهٔ نمونه با صندلی یاسی، گیاه و نور آرام عصر", subject: "Fictional sunlit counseling room", aspectRatio: "16/9", section: "Home final CTA", isSample: true },
  desk: { key: "desk", path: "/images/desk.jpg", mobile: "/images/desk-mobile.jpg", width: 2400, height: 1350, alt: "میز کار نمونه با دفتر یاسی، فنجان چای و شاخهٔ سبز", subject: "Fictional therapist workspace", aspectRatio: "16/9", section: "Admin greeting", isSample: true },
  conversation: { key: "conversation", path: "/images/conversation.jpg", width: 1200, height: 900, alt: "گفت‌وگوی آرام دو فرد ایرانیِ ساختگی در خانه؛ تصویر نمونه", subject: "Fictional Iranian adults in attentive conversation", aspectRatio: "4/3", section: "Home and Services couples / communication course", isSample: true },
  family: { key: "family", path: "/images/family.jpg", width: 1200, height: 900, alt: "خانوادهٔ ایرانی ساختگی در حال شنیدن صحبت یکدیگر؛ تصویر نمونه", subject: "Fictional Iranian family conversation", aspectRatio: "4/3", section: "Home and Services family / family course", isSample: true },
  journal: { key: "journal", path: "/images/journal.jpg", width: 1200, height: 900, alt: "دفتر بدون نوشته، خودکار و فنجان یاسی روی میز روشن؛ تصویر نمونه", subject: "Blank journal and tea, generated still life", aspectRatio: "4/3", section: "Home and Services individual / stress course / Articles intro", isSample: true },
  evening: { key: "evening", path: "/images/evening.jpg", width: 1200, height: 900, alt: "چراغ گرم و کتاب بسته کنار تخت در فضای آرام عصر؛ تصویر نمونه", subject: "Generated quiet bedroom and evening routine", aspectRatio: "4/3", section: "Home / Articles / evening detail", isSample: true },
  walk: { key: "walk", path: "/images/walk.jpg", width: 1200, height: 900, alt: "زن ایرانی ساختگی با روسری یاسی در مسیر سبز پارک؛ تصویر نمونه", subject: "Fictional Iranian woman on a morning walk", aspectRatio: "4/3", section: "Home / Articles / stress detail", isSample: true },
  online: { key: "online", path: "/images/online.jpg", width: 1200, height: 900, alt: "لپ‌تاپ با صفحهٔ خالی و هدفون در محیط خصوصی خانه؛ تصویر نمونه", subject: "Generated private online conversation workspace", aspectRatio: "4/3", section: "Home and Services online / first-session detail", isSample: true },
  rosePortrait: { key: "rose-portrait", path: "/images/rose-portrait.jpg", width: 640, height: 640, alt: "چهرهٔ ساختگی زن ایرانی با روسری رز؛ مراجع واقعی نیست", subject: "Fictional Iranian woman, rose hijab", aspectRatio: "1/1", section: "Retained design portrait one; not a public review", isSample: true },
  tealPortrait: { key: "teal-portrait", path: "/images/teal-portrait.jpg", width: 640, height: 640, alt: "چهرهٔ ساختگی مرد ایرانی با پیراهن سبزآبی؛ مراجع واقعی نیست", subject: "Fictional Iranian man, teal shirt", aspectRatio: "1/1", section: "Retained design portrait two; not a public review", isSample: true },
  indigoPortrait: { key: "indigo-portrait", path: "/images/indigo-portrait.jpg", width: 640, height: 640, alt: "چهرهٔ ساختگی زن ایرانی با روسری نیلی؛ مراجع واقعی نیست", subject: "Fictional Iranian woman, indigo hijab", aspectRatio: "1/1", section: "Retained design portrait three; not a public review", isSample: true },
  sessionSocial: { key: "session-social", path: "/images/session-social.jpg", width: 1200, height: 630, alt: "برای جلسهٔ اول مشاوره چه آماده کنیم؟؛ کارت اشتراک‌گذاری پیش‌نویس آموزشی", subject: "Outlined Persian article title and generated online workspace photo", aspectRatio: "40/21", section: "First-session article sharing", isSample: true },
  stressSocial: { key: "stress-social", path: "/images/stress-social.jpg", width: 1200, height: 630, alt: "وقتی استرس در روزمره همراه ماست؛ کارت اشتراک‌گذاری پیش‌نویس آموزشی", subject: "Outlined Persian article title and generated park photo", aspectRatio: "40/21", section: "Everyday-stress article sharing", isSample: true },
  eveningSocial: { key: "evening-social", path: "/images/evening-social.jpg", width: 1200, height: 630, alt: "چطور برای پایان روز فضای آرام‌تری بسازیم؟؛ کارت اشتراک‌گذاری پیش‌نویس آموزشی", subject: "Outlined Persian article title and generated evening photo", aspectRatio: "40/21", section: "Evening-routine article sharing", isSample: true },
} as const satisfies Record<string, ImageAsset>;
