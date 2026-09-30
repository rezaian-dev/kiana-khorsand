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
  hero: { key: "hero", path: "/images/hero.jpg", mobile: "/images/hero-mobile.jpg", width: 2400, height: 1350, alt: "تصویر نمونهٔ یک روان‌شناس زن ایرانی با روسری یاسی، نشسته در اتاقی روشن", subject: "Fictional Iranian psychologist, seated, lavender hijab", aspectRatio: "16/9", section: "Home hero", isSample: true },
  portrait: { key: "portrait", path: "/images/portrait.jpg", width: 1280, height: 1600, alt: "پرترهٔ نمایشیِ زن جوان ایرانی با پوشش حرفه‌ای و روسری یاسی؛ تصویر واقعی دکتر نیست", subject: "Matching fictional portrait", aspectRatio: "4/5", section: "About portrait", isSample: true },
  quiet: { key: "quiet", path: "/images/quiet-room.jpg", mobile: "/images/quiet-room-mobile.jpg", width: 2400, height: 1350, alt: "اتاق مشاورهٔ نمونه با صندلی یاسی، گیاه و نور آرام عصر", subject: "Fictional sunlit counseling room", aspectRatio: "16/9", section: "Home final CTA", isSample: true },
  desk: { key: "desk", path: "/images/desk.jpg", mobile: "/images/desk-mobile.jpg", width: 2400, height: 1350, alt: "میز کار نمونه با دفتر یاسی، فنجان چای و شاخهٔ سبز", subject: "Fictional therapist workspace", aspectRatio: "16/9", section: "Admin greeting", isSample: true },
} as const satisfies Record<string, ImageAsset>;
