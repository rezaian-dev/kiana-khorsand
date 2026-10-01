import "server-only";
import { EventEmitter } from "node:events";
import { liveTopics } from "../lib/constants";
import type { LiveNotice } from "../lib/live";

type Notice = LiveNotice & (
  { topic: typeof liveTopics.content | typeof liveTopics.slots; audience: "public" } |
  { topic: typeof liveTopics.account | typeof liveTopics.appointments; audience: `user:${string}` } |
  { topic: typeof liveTopics.admin; audience: "admin" }
);
type Bus = { emitter: EventEmitter<{ change: [Notice] }>; counts: Map<string, number>; total: number };
const scope = globalThis as typeof globalThis & { kianaLive?: Bus };

function getBus() {
  scope.kianaLive ??= { emitter: new EventEmitter<{ change: [Notice] }>().setMaxListeners(256), counts: new Map(), total: 0 };
  return scope.kianaLive;
}

export function publishChange(notice: Notice) {
  getBus().emitter.emit("change", notice);
}

export function subscribeChanges(onChange: (notice: Notice) => void) {
  const bus = getBus();
  bus.emitter.on("change", onChange);
  return () => { bus.emitter.off("change", onChange); };
}

export function reserveStream(userId: string | null) {
  const bus = getBus();
  const key = userId ? `user:${userId}` : "anonymous";
  const count = bus.counts.get(key) ?? 0;
  if (count >= (userId ? 4 : 64) || bus.total >= 256) return null;
  bus.counts.set(key, count + 1);
  bus.total += 1;
  let isReleased = false;
  return () => {
    if (isReleased) return;
    isReleased = true;
    const remaining = (bus.counts.get(key) ?? 1) - 1;
    if (remaining > 0) bus.counts.set(key, remaining); else bus.counts.delete(key);
    bus.total -= 1;
  };
}
