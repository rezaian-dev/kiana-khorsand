// Gregorian keys are storage only; visible dates use the existing fa-IR formatters.
const clock = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tehran", calendar: "gregory", numberingSystem: "latn", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

function readClock(value: Date) {
  const parts = clock.formatToParts(value);
  const readPart = (name: Intl.DateTimeFormatPartTypes) => {
    const part = parts.find((part) => part.type === name);
    if (!part) throw new Error("Time zone components are unavailable.");
    return part.value;
  };
  return { date: `${readPart("year")}-${readPart("month")}-${readPart("day")}`, slot: `${readPart("hour")}:${readPart("minute")}` };
}

export function getDay(value: Date) { return readClock(value).date; }

export function addDays(date: string, days: number) {
  const value = new Date(`${date}T00:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function getInstant(date: string, slot: string) {
  const wall = Date.parse(`${date}T${slot}:00.000Z`);
  let instant = wall;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const local = readClock(new Date(instant));
    const projected = Date.parse(`${local.date}T${local.slot}:00.000Z`);
    instant += wall - projected;
  }
  const value = new Date(instant);
  const local = readClock(value);
  if (local.date !== date || local.slot !== slot) throw new Error("Local time cannot be resolved safely.");
  return value;
}

export function buildMinutes(startsAt: Date, endsAt: Date) {
  const start = startsAt.getTime();
  const end = endsAt.getTime();
  const duration = (end - start) / 60_000;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start % 60_000 !== 0 || end % 60_000 !== 0 || duration < 15 || duration > 180) throw new Error("Reservation interval is not minute-aligned or within bounds.");
  return Array.from({ length: duration }, (_, index) => start / 60_000 + index);
}
