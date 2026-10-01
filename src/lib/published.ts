import type { z } from "zod";
import type { ImageAsset } from "@/content/images";
import type { articleSchema, courseSchema, settingsSchema } from "./records";
import type { CatalogQuery } from "./catalog";

type Publication = { publishedAt: string; updatedAt: string; image: ImageAsset };
export type Article = Omit<z.infer<typeof articleSchema>, "image" | "social" | "status" | "isReviewed"> & Publication;
export type Course = Omit<z.infer<typeof courseSchema>, "image" | "status" | "isReviewed"> & Publication;
export type Review = { id: string; name: string; quote: string; image: ImageAsset | null; publishedAt: string };
// whatsapp is a normalized HTTPS link in this public projection, not the stored phone number.
export type Profile = Pick<z.infer<typeof settingsSchema>, "name" | "role" | "introduction" | "license" | "phone" | "whatsapp" | "instagram" | "telegram" | "address">;
export type Catalog<T> = { entries: T[]; count: number; pageCount: number; query: CatalogQuery; categories: Exclude<CatalogQuery["category"], "all">[] };

export type Reviews = { entries: Review[]; count: number; pageCount: number; page: number };
