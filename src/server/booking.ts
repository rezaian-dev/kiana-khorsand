import "server-only";
import { cache } from "react";
import { connection } from "next/server";
import { z } from "zod";
import { getSchedule } from "./repos/settings";
import { listSlots } from "./repos/appointments";
import { addDays, getDay } from "@/lib/slots";
import type { Availability } from "@/lib/booking";

export const readAvailability = cache(async (): Promise<Availability> => {
  await connection();
  const today = getDay(new Date());
  const until = addDays(today, 31);
  const schedule = await getSchedule();
  if (!schedule) throw new Error("Booking settings have not been initialized.");
  const isEnabled = z.boolean().parse(schedule.isBookingEnabled);
  const slots = isEnabled ? await listSlots({ from: today, to: until }) : [];
  return { today, until, isEnabled, slots };
});
