import "server-only";
import { db } from "./client";
import type { CollectionName, Model } from "@/types/models";

export function collection<K extends CollectionName>(name: K) {
  return db.collection<Model[K]>(name);
}
