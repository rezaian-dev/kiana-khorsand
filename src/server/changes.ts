import "server-only";
import { publishChange } from "./live";

type Notice = Parameters<typeof publishChange>[0];

export function notifyChange(...notices: Notice[]) {
  // Called only after a confirmed write. Transport/cache failure cannot undo it.
  for (const notice of notices) {
    try { publishChange(notice); } catch { /* Reconnect performs a fresh read. */ }
  }
  // Readers use request-local React cache/direct MongoDB behind request barriers,
  // not a persistent Next Data/Full Route cache. The live owner invalidates the
  // current Router Cache with refresh. Root layout revalidation from an Action
  // would bypass dirty-form scheduling and replace the actor UI prematurely.
}
