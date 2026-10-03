import "server-only";
import { EventEmitter } from "node:events";
import { liveTopics } from "../lib/constants.ts";
import type { LiveNotice } from "../lib/live";

// Invalidation hints only. No records, tokens, names, messages or form data.
export type LiveChange = LiveNotice & (
  { topic: typeof liveTopics.content | typeof liveTopics.slots; audience: "public" } |
  { topic: typeof liveTopics.account | typeof liveTopics.appointments; audience: `user:${string}` } |
  { topic: typeof liveTopics.admin; audience: "admin" }
);

export interface LiveTransport {
  readonly kind: "process-local" | "shared";
  publish(notice: LiveChange): void | Promise<void>;
  // A shared adapter must validate incoming notices, multiplex one backend
  // subscription per worker, and signal loss of its upstream subscription.
  // Cleanup must be idempotent. SSE origin/session/audience checks stay in API.
  subscribe(onChange: (notice: LiveChange) => void, onUnavailable: () => void): () => void;
}

export function createProcessTransport(): LiveTransport {
  const emitter = new EventEmitter<{ change: [LiveChange] }>().setMaxListeners(256);
  return {
    kind: "process-local",
    publish(notice) { emitter.emit("change", notice); },
    subscribe(onChange) {
      emitter.on("change", onChange);
      return () => { emitter.off("change", onChange); };
    },
  };
}
