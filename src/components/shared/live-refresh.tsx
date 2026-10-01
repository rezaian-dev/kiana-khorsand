"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { liveSchema } from "@/lib/live";
import { liveScopes, roles, routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { isEnabled: boolean; viewer: Pick<Viewer, "id" | "role"> | null };

export function LiveRefresh({ isEnabled, viewer }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState("به‌روزرسانی خودکار پس از اتصال فعال می‌شود.");
  const userId = viewer?.id ?? null;
  const role = viewer?.role ?? null;
  useEffect(() => {
    if (!isEnabled) return;
    let source: EventSource | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let reconnect: ReturnType<typeof setTimeout> | undefined;
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
        setStatus("به‌روزرسانی خودکار متصل است.");
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
        setStatus("نشست تغییر کرده است؛ صفحه در حال به‌روزرسانی است.");
      });
      stream.onerror = () => {
        if (source !== stream || isDisposed || document.hidden) return;
        stream.close(); source = null;
        setStatus("اتصال به‌روزرسانی موقتاً قطع است؛ اطلاعات ممکن است قدیمی باشند.");
        if (!hasFailed) queueRefresh();
        hasFailed = true;
        if (!document.hidden && !isDisposed) reconnect = setTimeout(openStream, 30_000);
      };
    }
    function handleVisibility() {
      if (document.hidden) {
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
  }, [isEnabled, userId, role, router]);
  return isEnabled ? <span className="sr-only" role="status">{status}</span> : null;
}
