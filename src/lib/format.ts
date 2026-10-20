const timeZone = "Asia/Tehran";

const date = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone,
  year: "numeric",
  month: "long",
  day: "numeric",
});
const day = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone,
  weekday: "long",
  month: "long",
  day: "numeric",
});
const time = new Intl.DateTimeFormat("fa-IR", {
  timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});
const number = new Intl.NumberFormat("fa-IR");

export const formatDate = (value: Date | string) =>
  date.format(new Date(value));
export const formatDay = (value: Date | string) => day.format(new Date(value));
export const formatTime = (value: Date | string) =>
  time.format(new Date(value));
export const formatNumber = (value: number) => number.format(value);
export const formatToman = (value: number) => `${formatNumber(value)} تومان`;
