import { z } from "zod";

export const workshopReviewInput = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(30).max(1000),
});
export const workshopReviewStatus = z.enum(["published", "hidden"]);
export const enrollmentDecision = z.enum(["active", "cancelled"]);
