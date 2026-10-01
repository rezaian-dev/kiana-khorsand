"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { liveSchema } from "@/lib/live";
import { liveScopes, roles, routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { isEnabled: boolean; viewer: Pick<Viewer, "id" | "role"> | null; isVisible?: boolean };

export function LiveRefresh({ isEnabled, viewer, isVisible = false }: Props) {
  const router = useRouter();
  const scopeKey = `${viewer?.id ?? "guest"}:${viewer?.role ?? "public"}`;
  const [status, setStatus] = useState({ key: scopeKey, text: "به‌روزرسانی خودکار پس از اتصال فعال می‌شود.", isConnected: false });
  const userId = viewer?.id ?? null;
  const role = viewer?.role ?? null;
  useEffect(() => {
    if (!isEnabled) return;
    let source: EventSource | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let reconnect: ReturnType<typeof setTimeout> | undefined;
    function updateStatus(text: string, isConnected = false) { setStatus({ key: scopeKey, text, isConnected }); }
    let hasChanges = false;
    let hasReset = false;
    let isDisposed = false;
    let hasFailed = false;
    function refreshPage() {
      if (!hasChanges || document.hidden || isDisposed) return;
      if (!hasReset && (document.activeElement?.matches("input,textarea,select,[contenteditable=true]") || document.querySelector('form[aria-busy="true"],[data-live-pause="true"]'))) {
        timer = setTimeout(refreshPage, 1000); return;
      }
      hasChanges = false;
      hasReset = false;
      startTransition(() => router.refresh());
    }
    function queueRefresh(isForced = false) {
      hasChanges = true;
      hasReset ||= isForced;
      if (timer) clearTimeout(timer);
      timer = setTimeout(refreshPage, 400);
    }
    function openStream() {
      if (document.hidden || isDisposed || source) return;
      if (reconnect) clearTimeout(reconnect);
      const scope = role === roles.admin ? liveScopes.admin : userId ? liveScopes.account : liveScopes.public;
      const stream = new EventSource(`${routes.live}?scope=${scope}`);
      source = stream;
      stream.onopen = () => {
        if (source !== stream || isDisposed || document.hidden) return;
        hasFailed = false;
        updateStatus("به‌روزرسانی خودکار متصل است.", true);
        // Refresh native session cookies through the real HTTP endpoint, not RSC.
        if (userId) void authClient.getSession().then((response) => { if (!isDisposed) queueRefresh(response.data?.user.id !== userId); }).catch(() => { if (!isDisposed) queueRefresh(); });
        else queueRefresh();
      };
      stream.addEventListener("change", (event: MessageEvent<string>) => {
        if (source !== stream || isDisposed || document.hidden) return;
        try { if (liveSchema.safeParse(JSON.parse(event.data)).success) queueRefresh(); } catch { /* Ignore malformed, untrusted event payloads. */ }
      });
      stream.addEventListener("reset", () => {
        if (source !== stream || isDisposed || document.hidden) return;
        stream.close(); source = null;
        reconnect = setTimeout(openStream, 5000);
        queueRefresh(true);
        updateStatus("نشست تغییر کرده است؛ صفحه در حال به‌روزرسانی است.");
      });
      stream.onerror = () => {
        if (source !== stream || isDisposed || document.hidden) return;
        stream.close(); source = null;
        updateStatus("اتصال به‌روزرسانی موقتاً قطع است؛ اطلاعات ممکن است قدیمی باشند.");
        if (!hasFailed) queueRefresh();
        hasFailed = true;
        if (!document.hidden && !isDisposed) reconnect = setTimeout(openStream, 30_000);
      };
    }
    function handleVisibility() {
      if (document.hidden) {
        updateStatus("به‌روزرسانی هنگام پنهان‌بودن صفحه مکث می‌کند.");
        source?.close(); source = null;
        if (timer) clearTimeout(timer);
        if (reconnect) clearTimeout(reconnect);
        hasChanges = true;
      } else { openStream(); }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    openStream();
    return () => {
      isDisposed = true;
      source?.close();
      if (timer) clearTimeout(timer);
      if (reconnect) clearTimeout(reconnect);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isEnabled, userId, role, router, scopeKey]);
  const isConnected = status.key === scopeKey && status.isConnected;
  const text = status.key === scopeKey ? status.text : "در انتظار بازبینی اتصال تازه…";
  return isEnabled ? <span className={isVisible ? "live-status" : "sr-only"} role="status" data-connected={isConnected} title={text}><i aria-hidden="true" /><span>{isVisible ? isConnected ? "به‌روزرسانی متصل" : "به‌روزرسانی نامتصل" : text}</span>{isVisible && <span className="sr-only">؛ {text}</span>}</span> : null;
}
