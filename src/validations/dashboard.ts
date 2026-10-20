import { z } from "zod";
import { ObjectId } from "mongodb";

export const noteSchema = z.object({
  title: z.string().trim().min(2).max(120),
  body: z.string().trim().min(2).max(3000),
});
export const messageSchema = z.string().trim().min(2).max(2000);
export const profileNameSchema = z.string().trim().min(3).max(120);
export function parseNoteId(value: FormDataEntryValue | null) {
  return typeof value === "string" && ObjectId.isValid(value)
    ? new ObjectId(value)
    : null;
}
