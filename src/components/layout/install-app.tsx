"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, Share, SquarePlus, X } from "lucide-react";
import {
  useInstalledApp,
  useIosInstallable,
} from "@/components/layout/use-installed-app";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

/** The shape Chromium passes to `beforeinstallprompt`; not in the DOM typings yet. */
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
 * The one install affordance.
 *
 * Chromium and Android hand us a real prompt; Safari never does, so the same button
 * opens short instructions instead of pretending to install. In an installed app the
 * button is gone — that is what `PwaAddress` is for.
 * https://nextjs.org/docs/app/guides/progressive-web-apps#adding-to-home-screen
 */
export function InstallApp() {
  const installed = useInstalledApp();
  const ios = useIosInstallable();
  const [event, setEvent] = useState<InstallEvent | null>(null);
  const [explain, setExplain] = useState(false);
  const dismissed = useSyncExternalStore(
    dismissal.subscribe,
    dismissal.get,
    dismissal.server,
  );

  useEffect(() => {
    const onPrompt = (native: Event) => {
      // Keep it: browsers ignore `prompt()` called later from a different turn.
      native.preventDefault();
      setEvent(native as InstallEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (installed || dismissed) return null;
  // Nothing to offer: no prompt yet, and not a device we can explain it to.
  if (!event && !ios) return null;

  async function install() {
    if (!event) {
      setExplain(true);
      return;
    }
    await event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === "accepted") setEvent(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    window.dispatchEvent(new Event(DISMISSED_EVENT));
  }

  return (
    <>
      <div className="flex items-center gap-1 max-[359px]:hidden">
        <button
          type="button"
          onClick={install}
          aria-label="نصب اپ روی دستگاه"
          className="inline-flex size-11 min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-[#bdd9da] bg-[#e9f5f3] text-[.78rem] font-extrabold whitespace-nowrap text-[#175c6b] transition-[background-color,border-color,padding] hover:border-[#7db7b6] hover:bg-[#d8efec] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#167d8d] min-[420px]:w-auto min-[420px]:px-3 dark:border-[#587885] dark:bg-[#263d4a] dark:text-[#e6f8f4]"
        >
          <Download className="size-[15px]" aria-hidden="true" />
          {/* Icon-only on phones — the label is there for wider screens. */}
          <span className="max-[419px]:sr-only">نصب اپ</span>
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="بستن پیشنهاد نصب"
          className="grid size-6 cursor-pointer place-items-center rounded-full text-[var(--site-muted)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--c-teal)_10%,transparent)] hover:text-[var(--site-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)] max-[419px]:hidden"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <Sheet open={explain} onOpenChange={setExplain}>
        <SheetContent
          side="bottom"
          className="gap-0 rounded-t-[1.4rem] border-[var(--site-line)] bg-[var(--site-surface)] px-5 pt-5 pb-[max(1.2rem,env(safe-area-inset-bottom))]"
        >
          <SheetTitle className="text-[.95rem] font-extrabold text-[var(--site-ink)]">
            افزودن به صفحهٔ اصلی
          </SheetTitle>
          <SheetDescription className="mt-1 text-[.78rem] leading-6 text-[var(--site-muted)]">
            در Safari، نصب از منوی اشتراک‌گذاری انجام می‌شود.
          </SheetDescription>

          <ol className="mt-5 mb-0 grid list-none gap-4 p-0">
            <li className="flex items-center gap-3 text-[.84rem] leading-7">
              <span className="grid size-9 flex-none place-items-center rounded-[.7rem] border border-[var(--site-line)] text-[var(--c-teal)]">
                <Share className="size-4" aria-hidden="true" />
              </span>
              <span>
                دکمهٔ <b>اشتراک‌گذاری</b> را در نوار پایین Safari بزنید.
              </span>
            </li>
            <li className="flex items-center gap-3 text-[.84rem] leading-7">
              <span className="grid size-9 flex-none place-items-center rounded-[.7rem] border border-[var(--site-line)] text-[var(--c-teal)]">
                <SquarePlus className="size-4" aria-hidden="true" />
              </span>
              <span>
                <b>Add to Home Screen</b> را انتخاب کنید.
              </span>
            </li>
          </ol>
        </SheetContent>
      </Sheet>
    </>
  );
}
