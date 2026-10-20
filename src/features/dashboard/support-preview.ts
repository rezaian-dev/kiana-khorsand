import "server-only";
import { collection } from "@/db/collections";

/** Previews are always scoped on the server; no caller-supplied userId from the browser. */
export async function supportPreview(userId: string, admin = false) {
  const filter = admin
    ? { sender: "client" as const, readAt: null }
    : {
        userId,
        sender: { $in: ["support", "clinician", "system"] as const },
        readAt: null,
      };
  // Only IDs and counts leave the server: message text belongs on the messages page.
  const [unread, latest] = await Promise.all([
    collection("messages").countDocuments(filter),
    collection("messages")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(1)
      .project<{ _id: unknown }>({ _id: 1 })
      .next(),
  ]);
  return { unread, latestId: latest ? String(latest._id) : null };
}
