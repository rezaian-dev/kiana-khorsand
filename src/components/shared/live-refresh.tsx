"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { liveSchema } from "@/lib/live";
import { liveEvents, sessionChannel } from "@/lib/live-client";
import { liveScopes, liveTopics, roles, routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { isEnabled: boolean; viewer: Pick<Viewer, "id" | "role"> | null; isVisible?: boolean };
const drainEvent = "kiana:drain";
const pauseSelector = 'form[data-live-pause="true"],form[aria-busy="true"]';

export function LiveRefresh({ isEnabled, viewer, isVisible = false }: Props) {
  const router = useRouter();
  const userId = viewer?.id ?? null;
  const role = viewer?.role ?? null;
  const scopeKey = `${userId ?? "guest"}:${role ?? "public"}`;
  const [status, setStatus] = useState({ key: scopeKey, isConnected: false });
  const [isRefreshing, startTransition] = useTransition();
  const [completion, setCompletion] = useState(0);
  const flight = useRef(false);
  const completed = useRef(0);

  useEffect(() => {
    if (isRefreshing || completion === completed.current) return;
    completed.current = completion;
    flight.current = false;
    window.dispatchEvent(new Event(liveEvents.applied));
    window.dispatchEvent(new Event(drainEvent));
  }, [isRefreshing, completion]);

  useEffect(() => {
    if (!isEnabled) return;
    let source: EventSource | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let reconnect: ReturnType<typeof setTimeout> | undefined;
    let hasChanges = false;
    let hasReset = false;
    let isDisposed = false;
    let isChecking = false;
    let needsCheck = false;
    let attempt = 0;
    function setConnection(isConnected: boolean) { setStatus({ key: scopeKey, isConnected }); }
    function markDrafts() {
      document.querySelectorAll<HTMLFormElement>("form[data-live-pause],form[aria-busy]").forEach((form) => {
        if (hasChanges && form.matches(pauseSelector)) form.dataset.liveStale = "true";
        else form.removeAttribute("data-live-stale");
      });
    }
    function flushChanges() {
      timer = undefined;
      if (!hasChanges || isDisposed || document.hidden || !navigator.onLine || flight.current) return;
      markDrafts();
      // Focus alone is never a reason to delay. A confirmed security reset
      // cannot retain access merely because a private form has unsaved input.
      if (!hasReset && document.querySelector(pauseSelector)) return;
      hasChanges = false; hasReset = false;
      markDrafts();
      flight.current = true;
      startTransition(() => { router.refresh(); setCompletion((value) => value + 1); });
    }
    function scheduleFlush() {
      if (!hasChanges || timer || isDisposed) return;
      timer = setTimeout(flushChanges, 250);
    }
    function queueRefresh(isForced = false) {
      hasChanges = true; hasReset ||= isForced;
      markDrafts(); scheduleFlush();
    }
    async function checkSession() {
      if (isDisposed || document.hidden || !navigator.onLine) return;
      if (isChecking) { needsCheck = true; return; }
      isChecking = true;
      try {
        const response = await authClient.getSession({ query: { disableCookieCache: true } });
        if (isDisposed) return;
        if (response.error) { if (userId) queueRefresh(true); return; }
        const current = response.data?.user;
        const currentRole = current && "role" in current ? current.role : null;
        const hasChanged = (current?.id ?? null) !== userId || currentRole !== role;
        if (hasChanged) queueRefresh(true);
      } catch {
        // A guarded RSC read resolves uncertainty; never infer successful logout.
        if (!isDisposed && userId) queueRefresh(true);
      } finally {
        isChecking = false;
        if (needsCheck) { needsCheck = false; void checkSession(); }
      }
    }
    function closeStream() { source?.close(); source = null; }
    function retryStream() {
      if (reconnect) clearTimeout(reconnect);
      if (isDisposed || document.hidden || !navigator.onLine) return;
      const ceiling = Math.min(15_000, 1000 * 2 ** Math.min(attempt++, 4));
      const delay = Math.min(15_000, Math.max(1000, ceiling * (.75 + Math.random() * .5)));
      reconnect = setTimeout(openStream, delay);
    }
    function openStream() {
      reconnect = undefined;
      if (isDisposed || document.hidden || !navigator.onLine || source) return;
      const scope = role === roles.admin ? liveScopes.admin : userId ? liveScopes.account : liveScopes.public;
      const stream = new EventSource(`${routes.live}?scope=${scope}`);
      source = stream;
      const isCurrent = () => source === stream && !isDisposed && !document.hidden;
      stream.onopen = () => {
        if (!isCurrent()) return;
        attempt = 0; setConnection(true);
        // A snapshot after subscription closes the connect/disconnect gap.
        queueRefresh(); void checkSession();
      };
      stream.addEventListener("change", (event: MessageEvent<string>) => {
        if (!isCurrent()) return;
        try {
          const notice = liveSchema.safeParse(JSON.parse(event.data));
          if (!notice.success) return;
          queueRefresh();
          if (notice.data.topic === liveTopics.account) void checkSession();
        } catch { /* Ignore untrusted malformed events. */ }
      });
      stream.addEventListener("renew", () => {
        if (!isCurrent()) return;
        closeStream();
        // Planned lifetime renewal is invisible; no disconnected flash.
        reconnect = setTimeout(openStream, 150);
      });
      stream.addEventListener("reset", () => {
        if (!isCurrent()) return;
        closeStream(); queueRefresh(true); void checkSession(); retryStream();
      });
      stream.onerror = () => {
        if (!isCurrent()) return;
        closeStream(); setConnection(false); void checkSession(); retryStream();
      };
    }
    function resume() {
      if (document.hidden || !navigator.onLine || isDisposed) return;
      if (reconnect) clearTimeout(reconnect);
      openStream(); queueRefresh(); void checkSession();
    }
    function handleVisibility() {
      if (!document.hidden) { resume(); return; }
      closeStream();
      if (timer) clearTimeout(timer); timer = undefined;
      if (reconnect) clearTimeout(reconnect); reconnect = undefined;
      hasChanges = true;
    }
    function handleOnline() { attempt = 0; resume(); }
    function handleOffline() { closeStream(); setConnection(false); if (reconnect) clearTimeout(reconnect); }
    function handlePage(event: PageTransitionEvent) { if (event.persisted) resume(); }
    function handleSession() { closeStream(); resume(); }
    function handleRefresh(event: Event) { event.preventDefault(); queueRefresh(); }
    function handleFocus() { void checkSession(); }
    const observer = new MutationObserver(() => { markDrafts(); scheduleFlush(); });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-live-pause", "aria-busy"] });
    let channel: BroadcastChannel | undefined;
    try { channel = new BroadcastChannel(sessionChannel); channel.onmessage = (event) => { if (event.data === "changed") handleSession(); }; } catch { /* Optional cross-tab hint; no credentials. */ }
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("pageshow", handlePage);
    window.addEventListener("focus", handleFocus);
    window.addEventListener(liveEvents.refresh, handleRefresh);
    window.addEventListener(liveEvents.session, handleSession);
    window.addEventListener(drainEvent, scheduleFlush);
    // Clock-dependent eligibility and a missed best-effort notice also converge.
    // This is read-only fallback, not a substitute for shared multi-instance fan-out.
    const clock = setInterval(() => { if (!document.hidden && navigator.onLine) { queueRefresh(); void checkSession(); } }, 60_000);
    openStream();
    return () => {
      isDisposed = true; closeStream(); observer.disconnect(); channel?.close();
      if (timer) clearTimeout(timer);
      if (reconnect) clearTimeout(reconnect);
      clearInterval(clock);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("pageshow", handlePage);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener(liveEvents.refresh, handleRefresh);
      window.removeEventListener(liveEvents.session, handleSession);
      window.removeEventListener(drainEvent, scheduleFlush);
    };
  }, [isEnabled, userId, role, router, scopeKey, startTransition]);
  const isConnected = status.key === scopeKey && status.isConnected;
  const text = isConnected ? "به‌روزرسانی خودکار متصل است." : "اتصال به‌روزرسانی خودکار در حال بررسی است.";
  return isEnabled ? <span className={isVisible ? "live-status" : "sr-only"} role="status" data-connected={isConnected} title={text}><i aria-hidden="true" /><span>{isVisible ? isConnected ? "به‌روزرسانی متصل" : "در حال اتصال" : text}</span></span> : null;
}
