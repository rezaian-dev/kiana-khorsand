import type { ObjectId } from "mongodb";
import type { z } from "zod";
import type { articleSchema, courseSchema, appointmentSchema, testimonialSchema, settingsSchema } from "../lib/records.ts";
import type { messageSchema } from "../lib/message.ts";
import type { messageStates, roles, siteKey } from "../lib/constants.ts";

type Timestamps = { createdAt: Date; updatedAt: Date };
export type Article = z.infer<typeof articleSchema> & Timestamps & { _id: ObjectId; search: string; revision: number; publishedAt: Date | null };
export type Course = z.infer<typeof courseSchema> & Timestamps & { _id: ObjectId; search: string; revision: number; publishedAt: Date | null };
export type Appointment = z.infer<typeof appointmentSchema> & Timestamps & { _id: ObjectId; revision: number; minutes: number[]; scheduleRevision: number };
export type Testimonial = z.infer<typeof testimonialSchema> & Timestamps & { _id: ObjectId; revision: number; publishedAt: Date | null };
export type Message = z.infer<typeof messageSchema> & Timestamps & { _id: ObjectId; status: (typeof messageStates)[keyof typeof messageStates]; revision: number };
export type Settings = z.infer<typeof settingsSchema> & Timestamps & { _id: typeof siteKey; revision: number };
// Business projection only: credential/session/token collections belong to Better Auth.
export type Client = Timestamps & { _id: ObjectId; name: string; email: string; emailVerified: boolean; phone?: string; role: (typeof roles)[keyof typeof roles] };
