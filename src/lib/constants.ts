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
  agenda: "/admin/appointments",
  clients: "/admin/clients",
  adminArticles: "/admin/articles",
  adminCourses: "/admin/courses",
  inbox: "/admin/messages",
  reviews: "/admin/reviews",
  adminSettings: "/admin/settings",
  privacy: "/privacy",
  terms: "/terms",
  sitemap: "/sitemap.xml",
  live: "/api/live",
} as const;

export const roles = { client: "client", admin: "admin" } as const;

export const themeColors = { light: "#fdf8f6", dark: "#171b26" } as const;

export const topics = {
  start: "شروع مشاوره",
  daily: "زندگی روزمره",
  care: "مراقبت از خود",
  awareness: "خودآگاهی",
  communication: "مهارت ارتباط",
  family: "خانواده",
} as const;

export const sortOrders = { featured: "ترتیب پیشنهادی", title: "عنوان، الفبایی" } as const;

export const collections = {
  users: "users", sessions: "sessions", accounts: "accounts", verification: "verification",
  rateLimit: "rateLimit", appointments: "appointments", articles: "articles", courses: "courses",
  testimonials: "testimonials", messages: "messages", settings: "settings",
} as const;

export const publicationStates = { draft: "draft", published: "published" } as const;
export const appointmentStates = { pending: "pending", confirmed: "confirmed", cancelled: "cancelled", completed: "completed" } as const;
export const reviewStates = { pending: "pending", approved: "approved", rejected: "rejected" } as const;
export const messageStates = { unread: "unread", read: "read", archived: "archived" } as const;
export const serviceKeys = { individual: "individual", couples: "couples", family: "family", online: "online" } as const;
export const siteKey = "site";
export const setupMessage = "Missing settings document (_id: site). Confirm MONGODB_URI and MONGODB_DB in the project-root .env.local, then stop the app and manually run: node --env-file=.env.local scripts/setup-indexes.mts followed by node --env-file=.env.local scripts/seed.mts. Restart the app afterward. No automatic initialization was performed.";

export const liveTopics = { content: "content", slots: "slots", appointments: "appointments", account: "account", admin: "admin" } as const;
export const liveScopes = { public: "public", account: "account", admin: "admin" } as const;
export const authPaths = { signIn: "/sign-in/email", signUp: "/sign-up/email", profile: "/update-user", password: "/change-password", signOut: "/sign-out" } as const;

export const resultCodes = { invalid: "invalid", unauthorized: "unauthorized", forbidden: "forbidden", conflict: "conflict", unavailable: "unavailable", limited: "limited", occupied: "occupied" } as const;
export const indexes = { slot: "appointment_slot", minutes: "appointment_minutes" } as const;
export const visitScopes = { upcoming: "upcoming", past: "past", all: "all" } as const;
