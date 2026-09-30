export function formatNumber(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}

export function formatYear(value: Date) {
  return new Intl.DateTimeFormat("fa-IR", { calendar: "persian", timeZone: "Asia/Tehran", year: "numeric" }).format(value);
}

export function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((word) => Array.from(word)[0] ?? "").join(" ");
}
