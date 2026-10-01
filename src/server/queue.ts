import "server-only";
import { z } from "zod";
import { readAdmin } from "./admin";
import { browseQueue as browseMessages, getMessage } from "./repos/messages";
import { browseQueue as browseReviews, getReview } from "./repos/testimonials";
import { parseQueue, queueKinds, type Queue, type QueueKind } from "@/lib/queue";
import { idSchema, testimonialSchema } from "@/lib/records";
import { messageSchema } from "@/lib/message";
import { revisionSchema } from "@/lib/mutations";
import { messageStates, reviewStates } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";

export async function readQueue(kind: QueueKind, params: SearchParams): Promise<Queue> {
  await readAdmin();
  const parsed = parseQueue(kind, params);
  if (kind === queueKinds.messages) {
    const result = await browseMessages(parsed.query);
    const record = result.query.id ? await getMessage(result.query.id) : null;
    return { ...result, kind, hasError: parsed.hasError, entries: result.entries.map((entry) => ({ id: idSchema.parse(entry._id.toHexString()), name: messageSchema.shape.name.parse(entry.name), status: z.enum(messageStates).parse(entry.status), createdAt: z.date().parse(entry.createdAt).toISOString() })), selected: record ? { ...messageSchema.parse(record), id: idSchema.parse(record._id.toHexString()), revision: revisionSchema.parse(record.revision), status: z.enum(messageStates).parse(record.status), createdAt: z.date().parse(record.createdAt).toISOString(), updatedAt: z.date().parse(record.updatedAt).toISOString() } : null };
  }
  const result = await browseReviews(parsed.query);
  const record = result.query.id ? await getReview(result.query.id) : null;
  return { ...result, kind, hasError: parsed.hasError, entries: result.entries.map((entry) => ({ id: idSchema.parse(entry._id.toHexString()), name: testimonialSchema.shape.name.parse(entry.name), status: z.enum(reviewStates).parse(entry.status), createdAt: z.date().parse(entry.createdAt).toISOString() })), selected: record ? { ...testimonialSchema.parse(record), id: idSchema.parse(record._id.toHexString()), revision: revisionSchema.parse(record.revision), createdAt: z.date().parse(record.createdAt).toISOString(), updatedAt: z.date().parse(record.updatedAt).toISOString() } : null };
}
