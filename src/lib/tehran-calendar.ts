/* Gregorian day keys in the practice's time zone. UI labels use the Persian calendar. */
const zone = "Asia/Tehran";
const wallFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: zone,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});
function parts(value: Date) {
  const record = Object.fromEntries(
    wallFormatter.formatToParts(value).map((part) => [part.type, part.value]),
  );
  return {
    year: Number(record.year),
    month: Number(record.month),
    day: Number(record.day),
    hour: Number(record.hour),
    minute: Number(record.minute),
  };
}
export function dayKey(value: Date | string) {
  const { year, month, day } = parts(new Date(value));
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
export function validDayKey(value: string): boolean {
  if (!/^(20\d\d|2100)-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/.test(value))
    return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
export function addDays(key: string, days: number) {
  const date = new Date(`${key}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function weekStart(key: string) {
  const weekday = new Date(`${key}T00:00:00.000Z`).getUTCDay();
  return addDays(key, -(weekday + 1) % 7);
}
const persianParts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  timeZone: "UTC",
  day: "numeric",
  month: "numeric",
  year: "numeric",
});
function persianDay(key: string) {
  const entry = persianParts
    .formatToParts(new Date(`${key}T12:00:00Z`))
    .find((part) => part.type === "day");
  return Number(entry?.value);
}
export function monthStart(key: string) {
  return addDays(key, 1 - persianDay(key));
}
export function nextPersianMonth(key: string) {
  const first = monthStart(key);
  for (let offset = 29; offset <= 31; offset++) {
    const candidate = addDays(first, offset);
    if (persianDay(candidate) === 1) return candidate;
  }
  throw new Error("Invalid Persian calendar month");
}
export function tehranInstant(key: string, time = "00:00") {
  const [year, month, day] = key.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const naive = Date.UTC(year, month - 1, day, hour, minute);
  const observed = parts(new Date(naive));
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
export function periodFor(key: string, view: "day" | "week" | "month") {
  const start =
    view === "day" ? key : view === "week" ? weekStart(key) : monthStart(key);
  const end =
    view === "day"
      ? addDays(key, 1)
      : view === "week"
        ? addDays(start, 7)
        : nextPersianMonth(start);
  return { start, end, from: tehranInstant(start), to: tehranInstant(end) };
}
