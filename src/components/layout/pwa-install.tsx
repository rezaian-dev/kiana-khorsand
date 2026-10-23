"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, X } from "lucide-react";
import { useInstalledApp } from "@/components/layout/use-installed-app";

/** The shape Chromium hands to `beforeinstallprompt`; not in the DOM typings yet. */
type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "kk-install-dismissed";
const DISMISSED_EVENT = "kk-install-dismissed-change";

/** The dismissal is remembered across visits; `localStorage` is the store of record. */
const dismissal = {
  subscribe(onChange: () => void) {
    window.addEventListener("storage", onChange);
    window.addEventListener(DISMISSED_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(DISMISSED_EVENT, onChange);
    };
  },
  get: () => localStorage.getItem(DISMISSED_KEY) === "1",
  // Never offer an install button before hydration has read the real value.
  server: () => true,
};

/**
 * Offers installation while the browser is willing to install.
 *
 * In an installed app there is no address bar, so `/admin` is reached through the
 * in-app address command. Explaining *how to install* belongs here, in the tab, and
 * only while the browser is actually offering it — a button that cannot work is worse
 * than no button, so nothing renders on browsers without `beforeinstallprompt`
 * (Safari, Firefox) or once the app is already installed.
 */
export function PwaInstall() {
  const installed = useInstalledApp();
  const [event, setEvent] = useState<InstallEvent | null>(null);
  const dismissed = useSyncExternalStore(
    dismissal.subscribe,
    dismissal.get,
    dismissal.server,
  );

  useEffect(() => {
    const onPrompt = (native: Event) => {
      // Keep the event so a real click can call `prompt()` — browsers ignore it later.
      native.preventDefault();
      setEvent(native as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (installed || dismissed || !event) return null;

  async function install() {
    if (!event) return;
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === "accepted") setEvent(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    window.dispatchEvent(new Event(DISMISSED_EVENT));
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={install}
        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-[#bdd9da] bg-[#e9f5f3] px-3 text-[.78rem] font-extrabold whitespace-nowrap text-[#175c6b] transition-colors hover:border-[#7db7b6] hover:bg-[#d8efec] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#167d8d] max-[420px]:hidden dark:border-[#587885] dark:bg-[#263d4a] dark:text-[#e6f8f4]"
      >
        <Download className="size-[15px]" aria-hidden="true" />
        نصب اپ
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label="بستن پیشنهاد نصب"
        className="grid size-7 cursor-pointer place-items-center rounded-full text-[var(--site-muted)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--c-teal)_10%,transparent)] hover:text-[var(--site-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)] max-[420px]:hidden"
      >
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
