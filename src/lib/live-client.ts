"use client";

export const liveEvents = { refresh: "kiana:refresh", applied: "kiana:applied", session: "kiana:session" } as const;
export const sessionChannel = "kiana-session";

// Hints contain no identity, session token or form data. Only LiveRefresh owns
// router.refresh, coalescing and its completion gate within the current shell.
export function requestLive() { return !window.dispatchEvent(new Event(liveEvents.refresh, { cancelable: true })); }

export function announceSession() {
  window.dispatchEvent(new Event(liveEvents.session));
  try {
    const channel = new BroadcastChannel(sessionChannel);
    channel.postMessage("changed");
    channel.close();
  } catch { /* Visibility/focus/online checks still reconcile restricted browsers. */ }
}
