import "server-only";
import { createProcessTransport, type LiveChange, type LiveTransport } from "./live-transport.ts";

type Bus = { transport: LiveTransport; failures: Set<() => void>; counts: Map<string, number>; total: number };
const scope = globalThis as typeof globalThis & { kianaLiveV5?: Bus };

function getBus() {
  scope.kianaLiveV5 ??= { transport: createProcessTransport(), failures: new Set(), counts: new Map(), total: 0 };
  return scope.kianaLiveV5;
}

// Bootstrap seam only. No backend/env/infrastructure is provisioned here.
// Choose and initialize a shared adapter before accepting SSE requests.
export function configureLiveTransport(transport: LiveTransport) {
  const bus = getBus();
  if (bus.total || bus.failures.size) throw new Error("Configure live transport before opening streams.");
  bus.transport = transport;
}

export function publishChange(notice: LiveChange) {
  const bus = getBus();
  try {
    const published = bus.transport.publish(notice);
    if (published) void published.catch(() => { bus.failures.forEach((notify) => notify()); });
  } catch {
    // A confirmed database write is never turned into a failed action by a
    // best-effort hint. Closing streams prompts reconnect + a fresh snapshot.
    bus.failures.forEach((notify) => notify());
  }
}

export function subscribeChanges(onChange: (notice: LiveChange) => void, onUnavailable: () => void = () => {}) {
  const bus = getBus();
  let active = true;
  const notify = () => { if (active) onUnavailable(); };
  const unsubscribe = bus.transport.subscribe(onChange, notify);
  bus.failures.add(notify);
  return () => {
    if (!active) return;
    active = false;
    bus.failures.delete(notify);
    unsubscribe();
  };
}

// Caps remain exactly as before and are process-local. A future multi-worker
// deployment also needs a shared reservation/lease strategy (see R5 report).
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
