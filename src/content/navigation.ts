import { routes } from "@/lib/constants";

export const navigation = [
  { href: routes.home, label: "صفحه اصلی" },
  { href: routes.about, label: "درباره من" },
  { href: routes.services, label: "خدمات" },
  { href: routes.articles, label: "مقالات" },
  { href: routes.contact, label: "تماس" },
] as const;

export const serviceLinks = [
  { href: `${routes.services}#individual`, label: "مشاوره فردی" },
  { href: `${routes.services}#couples`, label: "مشاوره زوج‌ها" },
  { href: `${routes.services}#family`, label: "مشاوره خانواده" },
  { href: `${routes.services}#online`, label: "مشاوره آنلاین" },
] as const;
