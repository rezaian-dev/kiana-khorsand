import "server-only";

import { createDecipheriv, hkdfSync } from "node:crypto";
import { collection } from "@/db/collections";
import { env } from "@/lib/env";
type MeetingKind = "appointment" | "workshop";

const keyFor = (userId: string, version: string = "v1") => {
  // F10: derive from dedicated PRIVATE_NOTES_KEY via HKDF (OWASP Cryptographic Storage)
  // Keep read-compatibility with v1 (BETTER_AUTH_SECRET) for existing records
  const secret = version === "v2" && env.PRIVATE_NOTES_KEY ? env.PRIVATE_NOTES_KEY : env.BETTER_AUTH_SECRET;
  const info = version === "v2" ? "kiana-private-meeting-note-v2" : "kiana-private-meeting-note-v1";
  return Buffer.from(hkdfSync("sha256", secret, userId, info, 32));
};
const aadFor = (userId: string, kind: MeetingKind, referenceId: string) =>
  Buffer.from(`${userId}:${kind}:${referenceId}`);

export function decryptMeetingNote(
  encryptedBody: string,
  userId: string,
  kind: MeetingKind,
  referenceId: string,
) {
  const [version, iv, tag, body, extra] = encryptedBody.split(".");
  if ((version !== "v1" && version !== "v2") || !iv || !tag || !body || extra)
    throw new Error("Invalid private note format");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    keyFor(userId, version),
    Buffer.from(iv, "base64url"),
  );
  decipher.setAAD(aadFor(userId, kind, referenceId));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(body, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

/** Archive is owner-scoped, independent of a later cancellation or unpublished workshop. */
export async function listMyMeetingNotes(userId: string) {
  const docs = await collection("meetingNotes")
    .find({ userId })
    .sort({ updatedAt: -1 })
    .limit(100)
    .toArray();
  return docs.map((doc) => {
    let body: string | null;
    let decryptError: string | null = null;
    try {
      body = decryptMeetingNote(
        doc.encryptedBody,
        userId,
        doc.kind,
        doc.referenceId,
      );
    } catch (e) {
      body = null;
      decryptError = e instanceof Error ? e.message : "Decryption failed";
    }
    return {
      id: String(doc._id),
      kind: doc.kind,
      updatedAt: doc.updatedAt,
      body,
      // Surface failure explicitly instead of silent null (F10)
      decryptError,
    };
  });
}
