"use client";

import { useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import { requestLive } from "./live-client";

type Props<T> = { value: T; version: string | number; isPaused: boolean; onApply: (value: T) => void };

// Protection also lives at the editor: a new RSC payload can arrive while a
// previously pristine form becomes dirty, independently of SSE scheduling.
export function useDraft<T>({ value, version, isPaused, onApply }: Props<T>) {
  const [snapshot, setSnapshot] = useState({ value, version });
  const applied = useRef(version);
  if (!isPaused && version !== snapshot.version) setSnapshot({ value, version });
  const handleApply = useEffectEvent((next: T) => {
    const active = document.activeElement;
    const field = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement || active instanceof HTMLSelectElement ? active : null;
    const form = field?.closest("form");
    const selection = field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? { start: field.selectionStart, end: field.selectionEnd } : null;
    onApply(next);
    // RHF reset may replace field-array nodes. Restore only that same field,
    // without scrolling or taking focus back from a subsequent user choice.
    if (field?.id && form) queueMicrotask(() => {
      if (!form.isConnected || (document.activeElement !== field && (field.isConnected || document.activeElement !== document.body))) return;
      const replacement = document.getElementById(field.id);
      if (!(replacement instanceof HTMLElement) || !form.contains(replacement) || !replacement.getClientRects().length || replacement.closest("[inert],[hidden]")) return;
      replacement.focus({ preventScroll: true });
      if (selection?.start !== null && selection?.start !== undefined && selection.end !== null && (replacement instanceof HTMLInputElement || replacement instanceof HTMLTextAreaElement)) replacement.setSelectionRange(selection.start, selection.end);
    });
  });
  // Synchronize the external RHF store before paint, only for an adopted version.
  // Do not reset on each RSC object identity or remount field arrays on a no-op read.
  useLayoutEffect(() => {
    if (applied.current === snapshot.version) return;
    applied.current = snapshot.version;
    handleApply(snapshot.value);
  }, [snapshot]);
  function discard() {
    onApply(value);
    applied.current = version;
    setSnapshot({ value, version });
    requestLive();
  }
  return { snapshot: snapshot.value, hasChanged: version !== snapshot.version, discard };
}
