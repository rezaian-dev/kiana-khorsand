/** Remove navigation and duplicated hero copy embedded in the original HTML-derived body. */
export function cleanEditorialBody(
  body: string,
  kind: "workshop" | "article" | "area",
) {
  const blocks = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  const firstSection = blocks.findIndex((block) => block.startsWith("## "));
  if (firstSection < 0) return body;
  const content = blocks.slice(firstSection);
  if (kind === "workshop") {
    // The workshop amount and old month/day in the imported HTML are not live schedule data.
    const price = content.indexOf("تعرفه‌ی کارگاه");
    const note = content.indexOf("قبل از ثبت‌نام", price + 1);
    if (price >= 0 && note > price) content.splice(price, note - price);
  }
  return content.join("\n\n");
}
