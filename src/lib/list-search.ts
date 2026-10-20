/** Bound and normalize request-time query parameters before rendering a list. */
export function searchText(value: string | string[] | undefined, max = 100) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
export function pageNumber(value: string | string[] | undefined) {
  return typeof value === "string" && /^[1-9]\d{0,4}$/.test(value)
    ? Number(value)
    : 1;
}
