import { z } from "zod";
import { ObjectId } from "mongodb";

export const legacySlugSchema = z.string().regex(/^[a-z0-9-]{1,80}$/);
export const isBookingId = (value: unknown): value is string =>
  typeof value === "string" && ObjectId.isValid(value);
