import { z } from "zod";
import { articleSchema, courseSchema, idSchema, settingsSchema, testimonialSchema } from "./records";
import { appointmentStates, messageStates, serviceKeys } from "./constants";

export const revisionSchema = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER - 1);
export const changeSchema = z.object({ id: idSchema, revision: revisionSchema });
const identitySchema = z.object({ id: idSchema.nullable(), revision: revisionSchema }).refine((value) => value.id !== null || value.revision === 0, { path: ["revision"], error: "رکورد تازه باید با نسخهٔ صفر آغاز شود." });
export const articleEditSchema = identitySchema.safeExtend({ record: articleSchema });
export const courseEditSchema = identitySchema.safeExtend({ record: courseSchema });
export const reviewEditSchema = identitySchema.safeExtend({ record: testimonialSchema });
export const settingsEditSchema = z.object({ revision: revisionSchema, record: settingsSchema });
export const messageEditSchema = changeSchema.extend({ status: z.enum(messageStates) });
export const bookingSchema = z.object({
  service: z.enum(serviceKeys), date: z.iso.date(), slot: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/), scheduleRevision: revisionSchema,
});
export const rescheduleSchema = changeSchema.extend({ date: bookingSchema.shape.date, slot: bookingSchema.shape.slot, scheduleRevision: revisionSchema });
export const statusSchema = changeSchema.extend({ status: z.enum(appointmentStates) });
