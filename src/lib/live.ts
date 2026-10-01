import { z } from "zod";
import { liveScopes, liveTopics } from "./constants";

export const liveSchema = z.object({ topic: z.enum(liveTopics), id: z.string().min(1).max(100) });
export const scopeSchema = z.enum(liveScopes);
export type LiveNotice = z.infer<typeof liveSchema>;
