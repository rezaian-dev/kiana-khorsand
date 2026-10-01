import "server-only";
import { z } from "zod";
import { readAdmin } from "./admin";
import { getSettings } from "./repos/settings";
import { settingsEditSchema } from "@/lib/mutations";
import type { SettingsSnapshot } from "@/lib/preferences";
import { setupMessage } from "@/lib/constants";

export async function readPreferences(): Promise<SettingsSnapshot> {
  await readAdmin();
  const record = await getSettings();
  if (!record) throw new Error(setupMessage);
  return { value: settingsEditSchema.parse({ revision: record.revision, record }), updatedAt: z.date().parse(record.updatedAt).toISOString() };
}
