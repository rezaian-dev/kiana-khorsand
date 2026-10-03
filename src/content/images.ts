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
  hero: { key: "hero", path: "/images/hero.jpg", mobile: "/images/hero-mobile.jpg", width: 2400, height: 1350, alt: "زنی با روسری یاسی، نشسته روی مبل در اتاقی روشن", subject: "Fictional Iranian psychologist, seated, lavender hijab", aspectRatio: "16/9", section: "Home hero arched portrait crop", isSample: true },
  portrait: { key: "portrait", path: "/images/portrait.jpg", width: 1280, height: 1600, alt: "زنی با روسری یاسی در فضایی روشن و کنار گیاهان", subject: "Matching fictional portrait", aspectRatio: "4/5", section: "Home teaser / About and Contact portrait", isSample: true },
  quiet: { key: "quiet", path: "/images/quiet-room.jpg", mobile: "/images/quiet-room-mobile.jpg", width: 2400, height: 1350, alt: "صندلی یاسی و گیاهان در اتاقی با نور ملایم", subject: "Fictional sunlit counseling room", aspectRatio: "16/9", section: "Home final CTA", isSample: true },
  desk: { key: "desk", path: "/images/desk.jpg", mobile: "/images/desk-mobile.jpg", width: 2400, height: 1350, alt: "دفتر، فنجان چای و شاخهٔ سبز روی میز", subject: "Fictional therapist workspace", aspectRatio: "16/9", section: "Admin greeting", isSample: true },
  conversation: { key: "conversation", path: "/images/conversation.jpg", width: 1200, height: 900, alt: "دو نفر در حال گفت‌وگو در فضای خانه", subject: "Fictional Iranian adults in attentive conversation", aspectRatio: "4/3", section: "Home and Services couples / communication course", isSample: true },
  family: { key: "family", path: "/images/family.jpg", width: 1200, height: 900, alt: "چند نفر در حال گفت‌وگو در فضای خانه", subject: "Fictional Iranian family conversation", aspectRatio: "4/3", section: "Home and Services family / family course", isSample: true },
  journal: { key: "journal", path: "/images/journal.jpg", width: 1200, height: 900, alt: "دفتر باز، خودکار و فنجان روی میز روشن", subject: "Blank journal and tea, generated still life", aspectRatio: "4/3", section: "Home and Services individual / stress course / Articles intro", isSample: true },
  evening: { key: "evening", path: "/images/evening.jpg", width: 1200, height: 900, alt: "چراغ روشن و کتاب بسته کنار تخت", subject: "Generated quiet bedroom and evening routine", aspectRatio: "4/3", section: "Home / Articles / evening detail", isSample: true },
  walk: { key: "walk", path: "/images/walk.jpg", width: 1200, height: 900, alt: "زنی با روسری یاسی در مسیر سبز پارک", subject: "Fictional Iranian woman on a morning walk", aspectRatio: "4/3", section: "Home / Articles / stress detail", isSample: true },
  online: { key: "online", path: "/images/online.jpg", width: 1200, height: 900, alt: "لپ‌تاپ و هدفون روی میز", subject: "Generated private online conversation workspace", aspectRatio: "4/3", section: "Home and Services online / first-session detail", isSample: true },
  rosePortrait: { key: "rose-portrait", path: "/images/rose-portrait.jpg", width: 640, height: 640, alt: "زنی با روسری صورتی", subject: "Fictional Iranian woman, rose hijab", aspectRatio: "1/1", section: "Retained design portrait one; not a public review", isSample: true },
  tealPortrait: { key: "teal-portrait", path: "/images/teal-portrait.jpg", width: 640, height: 640, alt: "مردی با پیراهن سبزآبی", subject: "Fictional Iranian man, teal shirt", aspectRatio: "1/1", section: "Retained design portrait two; not a public review", isSample: true },
  indigoPortrait: { key: "indigo-portrait", path: "/images/indigo-portrait.jpg", width: 640, height: 640, alt: "زنی با روسری نیلی", subject: "Fictional Iranian woman, indigo hijab", aspectRatio: "1/1", section: "Retained design portrait three; not a public review", isSample: true },
  sessionSocial: { key: "session-social", path: "/images/session-social.jpg", width: 1200, height: 630, alt: "برای جلسهٔ اول مشاوره چه آماده کنیم؟؛ کارت اشتراک‌گذاری مقاله", subject: "Outlined Persian article title and generated online workspace photo", aspectRatio: "40/21", section: "First-session article sharing", isSample: true },
  stressSocial: { key: "stress-social", path: "/images/stress-social.jpg", width: 1200, height: 630, alt: "وقتی استرس در روزمره همراه ماست؛ کارت اشتراک‌گذاری مقاله", subject: "Outlined Persian article title and generated park photo", aspectRatio: "40/21", section: "Everyday-stress article sharing", isSample: true },
  eveningSocial: { key: "evening-social", path: "/images/evening-social.jpg", width: 1200, height: 630, alt: "چطور برای پایان روز فضای آرام‌تری بسازیم؟؛ کارت اشتراک‌گذاری مقاله", subject: "Outlined Persian article title and generated evening photo", aspectRatio: "40/21", section: "Evening-routine article sharing", isSample: true },
} as const satisfies Record<string, ImageAsset>;
