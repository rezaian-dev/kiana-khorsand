import "server-only";
import { revalidatePath } from "next/cache";
import { routes } from "../lib/constants";
import { publishChange } from "./live";

type Notice = Parameters<typeof publishChange>[0];

export function notifyChange(...notices: Notice[]) {
  // Called only after a confirmed write. Transport/cache failure cannot undo it.
  for (const notice of notices) {
    try { publishChange(notice); } catch { /* Reconnect performs a fresh read. */ }
  }
  try { revalidatePath(routes.home, "layout"); } catch { /* Never return a false mutation failure. */ }
}
