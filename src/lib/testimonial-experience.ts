export function testimonialExperience(item: {
  slug: string;
  name: string;
  category: string;
  experience?: string;
}) {
  if (item.experience) return item.experience;
  // Legacy sample records lack an explicit attribution. Never infer a workshop
  // for a real person's unclassified review.
  if (item.slug === "t-7" && item.name === "لیلا فرهادی")
    return "کارگاه مهارت‌های ارتباطی برای زوج‌ها";
  if (item.category === "couples") return "مشاورهٔ زوجی";
  if (item.category === "individual") return "مشاورهٔ فردی";
  return "تجربهٔ همراهی";
}
