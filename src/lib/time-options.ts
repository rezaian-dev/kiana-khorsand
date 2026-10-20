/** Fixed, validated choices prevent mistyped times in admin forms. */
export function timeOptions(current?: string) {
  const values = Array.from(
    { length: 48 },
    (_, i) =>
      `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
  );
  if (current && /^([01]\d|2[0-3]):[0-5]\d$/.test(current))
    values.push(current);
  return [...new Set(values)].sort().map((value) => ({ value, label: value }));
}
