import type { Model } from "@/types/models";

export const rows = [
  {
    key: "sat",
    slots: ["۱۰:۰۰", "۱۱:۰۰", "۱۵:۰۰", "۱۶:۰۰", "۱۷:۰۰"],
    weekday: 6,
    start: "10:00",
    end: "18:00",
    blocks: [],
  },
  {
    key: "sun",
    slots: ["۰۹:۰۰", "۱۰:۰۰", "۱۱:۰۰", "۱۲:۰۰"],
    weekday: 0,
    start: "09:00",
    end: "13:00",
    blocks: [],
  },
  {
    key: "mon",
    slots: ["۱۴:۰۰", "۱۵:۰۰", "۱۶:۰۰", "۱۷:۰۰", "۱۸:۰۰"],
    weekday: 1,
    start: "14:00",
    end: "19:00",
    blocks: [],
  },
  {
    key: "tue",
    slots: ["۰۹:۰۰", "۱۰:۰۰", "۱۴:۰۰", "۱۵:۰۰"],
    weekday: 2,
    start: "09:00",
    end: "16:00",
    blocks: [],
  },
  {
    key: "wed",
    slots: ["۱۰:۰۰", "۱۱:۰۰", "۱۲:۰۰", "۱۶:۰۰", "۱۷:۰۰"],
    weekday: 3,
    start: "10:00",
    end: "18:00",
    blocks: [],
  },
  {
    key: "thu",
    slots: ["۱۰:۰۰", "۱۱:۰۰"],
    weekday: 4,
    start: "10:00",
    end: "12:00",
    blocks: [],
  },
] satisfies Model["availability"][];
