export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  articles: "/articles",
  contact: "/contact",
  booking: "/booking",
  courses: "/courses",
  testimonials: "/testimonials",
  faq: "/faq",
  login: "/login",
  account: "/account",
  appointments: "/account/appointments",
  settings: "/account/settings",
  admin: "/admin",
  privacy: "/privacy",
  terms: "/terms",
  sitemap: "/sitemap.xml",
} as const;

export const roles = { client: "client", admin: "admin" } as const;

export const themeColors = { light: "#faf8ff", dark: "#100c25" } as const;

export const topics = {
  start: "شروع مشاوره",
  daily: "زندگی روزمره",
  care: "مراقبت از خود",
  awareness: "خودآگاهی",
  communication: "مهارت ارتباط",
  family: "خانواده",
} as const;

export const sortOrders = { featured: "ترتیب پیشنهادی", title: "عنوان، الفبایی" } as const;
