import { z } from "zod";

export const workshopRequestInput = z.object({
  slug: z.string().regex(/^[a-z0-9-]{1,100}$/),
});

export const reviewInput = z.object({
  quote: z.string().trim().min(30).max(600),
  experience: z.string().trim().max(120),
  consent: z.literal("yes"),
});
