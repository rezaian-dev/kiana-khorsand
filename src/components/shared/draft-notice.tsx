"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

type Props = { hasChanged?: boolean; isDisabled?: boolean; onDiscard: () => void };

export function DraftNotice({ hasChanged = false, isDisabled = false, onDiscard }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const subscribe = useCallback((onChange: () => void) => {
    const form = ref.current?.closest("form");
    if (!form) return () => {};
    const observer = new MutationObserver(onChange);
    observer.observe(form, { attributes: true, attributeFilter: ["data-live-stale"] });
    return () => observer.disconnect();
  }, []);
  const isWaiting = useSyncExternalStore(subscribe, () => ref.current?.closest("form")?.dataset.liveStale === "true", () => false);
  const isActive = isWaiting || hasChanged;
  return <div ref={ref} className="draft-notice" role="status" data-active={isActive} aria-hidden={!isActive} inert={!isActive}><><p>دادهٔ تازه در دسترس است؛ ویرایش شما حفظ شده و پس از ذخیره یا کنارگذاشتن آن اعمال می‌شود.</p><Button type="button" variant="outline" onClick={onDiscard} disabled={isDisabled || !isActive}>کنارگذاشتن ویرایش من</Button></></div>;
}
