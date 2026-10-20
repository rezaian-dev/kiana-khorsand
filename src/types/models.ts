import type { z } from "zod";
import type { models } from "@/validations/models";

export type Model = { [K in keyof typeof models]: z.infer<(typeof models)[K]> };
export type CollectionName = keyof Model;
export type SectionData = Model["pages"]["sections"][number];
