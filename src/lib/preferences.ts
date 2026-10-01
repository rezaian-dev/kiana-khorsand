import type { z } from "zod";
import type { settingsEditSchema } from "./mutations";

export const settingsTabs = { profile: "profile", hours: "hours", contact: "contact", social: "social" } as const;
export const settingsLabels = { profile: "مشخصات حرفه‌ای", hours: "ساعات و رزرو", contact: "راه‌های تماس", social: "شبکه‌های اجتماعی" } as const;
export const weekdays = [ { day: 6, label: "شنبه" }, { day: 0, label: "یکشنبه" }, { day: 1, label: "دوشنبه" }, { day: 2, label: "سه‌شنبه" }, { day: 3, label: "چهارشنبه" }, { day: 4, label: "پنجشنبه" }, { day: 5, label: "جمعه" } ] as const;
export type Preferences = z.infer<typeof settingsEditSchema>;
export type SettingsTab = keyof typeof settingsTabs;
export type SettingsSnapshot = { value: Preferences; updatedAt: string };
