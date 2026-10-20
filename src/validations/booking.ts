import { z } from "zod";

export const bookingInput = z.object({
  serviceId: z.string().min(1),
  startsAt: z.iso.datetime(),
  note: z.string().trim().max(1000),
  consent: z.literal("on"),
});
