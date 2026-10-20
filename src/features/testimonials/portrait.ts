const portraits: Record<string, { name: string; src: string }> = {
  "t-1": {
    name: "نسترن کریمی",
    src: "/assets/images/avatars/nastaran-karimi.jpg",
  },
  "t-2": { name: "مهدی کاظمی", src: "/assets/images/avatars/mahdi-kazemi.jpg" },
  "t-3": { name: "سارا رضایی", src: "/assets/images/avatars/sara-rezaei.jpg" },
  "t-4": { name: "رضا مرادی", src: "/assets/images/avatars/reza-moradi.jpg" },
  "t-5": {
    name: "هانیه براتی",
    src: "/assets/images/avatars/haniyeh-barati.jpg",
  },
  "t-6": { name: "امیر شریفی", src: "/assets/images/avatars/amir-sharifi.jpg" },
  "t-7": {
    name: "لیلا فرهادی",
    src: "/assets/images/avatars/leila-farhadi.jpg",
  },
  "t-8": { name: "کاوه نوری", src: "/assets/images/avatars/kaveh-nouri.jpg" },
  "t-9": {
    name: "مریم جلالی",
    src: "/assets/images/avatars/maryam-jalali.jpg",
  },
  "t-10": {
    name: "سعید طاهری",
    src: "/assets/images/avatars/saeed-taheri.jpg",
  },
};
/** Existing fictional seed profiles have generated illustrations; do not assign one to a new review. */
export function testimonialPortrait(item: {
  slug: string;
  avatar: string | null;
  name: string;
}) {
  const seeded = portraits[item.slug];
  return item.avatar || (seeded?.name === item.name ? seeded.src : null);
}
