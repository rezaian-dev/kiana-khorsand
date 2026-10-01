import { z } from "zod";
import { bookingSchema } from "./mutations";
import { routes } from "./constants";
import type { SearchParams } from "./catalog";
import type { Slot } from "./result";

const selectionSchema = bookingSchema.pick({ service: true, date: true, slot: true }).partial()
  .refine((value) => !value.slot || !!value.date, { path: ["slot"], error: "ساعت به انتخاب روز نیاز دارد." });
export type Selection = z.infer<typeof selectionSchema>;
export type BookingValues = z.infer<typeof bookingSchema>;
export type Availability = { today: string; until: string; isEnabled: boolean; slots: Slot[] };

export function parseBooking(params: SearchParams) {
  const result = selectionSchema.safeParse({ service: params.service, date: params.date, slot: params.slot });
  return { selection: result.success ? result.data : {}, hasError: !result.success };
}

export function buildBooking(selection: Selection) {
  const value = selectionSchema.parse(selection);
  const params = new URLSearchParams();
  if (value.service) params.set("service", value.service);
  if (value.date) params.set("date", value.date);
  if (value.slot) params.set("slot", value.slot);
  return `${routes.booking}${params.size ? `?${params}` : ""}`;
}

export function getReturn(input: unknown) {
  if (typeof input !== "string" || input.length > 1200 || !input.startsWith("/") || input.startsWith("//") || input.includes("\\")) return routes.account;
  try {
    // Parsing only; this origin is never requested or sent to the browser.
    const url = new URL(input, "https://return.invalid");
    if (url.origin !== "https://return.invalid" || url.hash) return routes.account;
    if ([routes.account, routes.appointments, routes.settings].some((path) => path === url.pathname)) return url.pathname;
    if (url.pathname === routes.booking) {
      const params: SearchParams = {};
      for (const key of ["service", "date", "slot"]) {
        const values = url.searchParams.getAll(key);
        if (values.length > 1) return routes.booking;
        params[key] = values[0];
      }
      return buildBooking(parseBooking(params).selection);
    }
  } catch { /* Invalid return destinations use the fixed private landing page. */ }
  return routes.account;
}

export function buildLogin(selection: Selection) {
  return `${routes.login}?${new URLSearchParams({ next: buildBooking(selection) })}`;
}
