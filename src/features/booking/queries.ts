import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { availability } from "@/validations/models";
import { formatDay } from "@/lib/format";

const zone = "Asia/Tehran";
const parts = new Intl.DateTimeFormat("en-US", {
  timeZone: zone,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});

function wallParts(date: Date) {
  const entries = Object.fromEntries(
    parts.formatToParts(date).map((item) => [item.type, item.value]),
  );
  return {
    year: Number(entries.year),
    month: Number(entries.month),
    day: Number(entries.day),
    hour: Number(entries.hour),
    minute: Number(entries.minute),
  };
}

function instant(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
) {
  const naive = Date.UTC(year, month - 1, day, hour, minute);
  const observed = wallParts(new Date(naive));
  const offset =
    Date.UTC(
      observed.year,
      observed.month - 1,
      observed.day,
      observed.hour,
      observed.minute,
    ) - naive;
  return new Date(naive - offset);
}

export const getRules = unstable_cache(
  async () => {
    const docs = await collection("availability").find({}).toArray();
    return docs.map((doc) => {
      const rule = availability.parse(doc);
      return {
        ...rule,
        blocks: rule.blocks.map((block) => ({
          from: block.from.toISOString(),
          to: block.to.toISOString(),
          reason: block.reason,
        })),
      };
    });
  },
  ["weekly-availability"],
  { tags: ["availability"], revalidate: 3600 },
);

export async function getSlots() {
  const rules = await getRules();
  const now = new Date();
  const today = wallParts(now);
  const base = Date.UTC(today.year, today.month - 1, today.day);
  const candidates: { startsAt: string; label: string }[] = [];
  for (let offset = 0; offset < 21; offset++) {
    const day = new Date(base + offset * 86400_000);
    const rule = rules.find((item) => item.weekday === day.getUTCDay());
    if (!rule) continue;
    for (const text of rule.slots) {
      const normalized = text.replace(/[۰-۹]/g, (value) =>
        String("۰۱۲۳۴۵۶۷۸۹".indexOf(value)),
      );
      const match = /^(\d{1,2}):(\d{2})$/.exec(normalized);
      if (!match) continue;
      const starts = instant(
        day.getUTCFullYear(),
        day.getUTCMonth() + 1,
        day.getUTCDate(),
        Number(match[1]),
        Number(match[2]),
      );
      if (
        starts <= now ||
        rule.blocks.some(
          (block) =>
            starts >= new Date(block.from) && starts < new Date(block.to),
        )
      )
        continue;
      candidates.push({
        startsAt: starts.toISOString(),
        label: `${formatDay(starts)} · ${text}`,
      });
    }
  }
  if (!candidates.length) return [];
  const busy = await collection("appointments")
    .find(
      {
        startsAt: { $in: candidates.map((item) => new Date(item.startsAt)) },
        status: { $in: ["pending", "confirmed"] },
      },
      { projection: { startsAt: 1 } },
    )
    .toArray();
  const occupied = new Set(busy.map((item) => item.startsAt.toISOString()));
  return candidates.filter((item) => !occupied.has(item.startsAt));
}
