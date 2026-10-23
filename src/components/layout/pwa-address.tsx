"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInstalledApp } from "@/components/layout/use-installed-app";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Link2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

/** Nothing to subscribe to: the host a page was served from cannot change. */
const noSubscription = () => () => {};

function toInternalPath(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  const { origin, host } = window.location;
  // "127.0.0.1:3100/admin" or a pasted full URL: keep the path, drop the host.
  const withoutHost = value.startsWith(host) ? value.slice(host.length) : value;
  const target = withoutHost.startsWith("/") ? withoutHost : `/${withoutHost}`;
  // A scheme means the whole string is a URL — never glue it onto our origin, or
  // "https://example.com/x" would quietly become the path "/https:/example.com/x".
  const absolute = /^[a-z][a-z\d+.-]*:/i.test(withoutHost);

  let url: URL;
  try {
    url = absolute ? new URL(withoutHost) : new URL(target, origin);
  } catch {
    return null;
  }

  if (url.origin !== origin) return null;
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  return `${url.pathname}${url.search}${url.hash}`;
}

export function PwaAddress() {
  const installed = useInstalledApp();
  // The host never changes during a page's life, so it needs no subscription.
  const host = useSyncExternalStore(
    noSubscription,
    () => window.location.host,
    () => "",
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // A keyboard is the fastest way in on a desktop install; in a normal tab Ctrl+K
  // belongs to the browser, so the shortcut only exists inside the installed app.
  useEffect(() => {
    if (!installed) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [installed]);

  function go(event: React.FormEvent) {
    event.preventDefault();
    const path = toInternalPath(value);
    if (!path) {
      setError("یک مسیر داخلی وارد کنید؛ مثلاً /articles");
      return;
    }
    setError("");
    setValue("");
    setOpen(false);
    router.push(path);
  }

  return (
    <>
      {installed && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="رفتن به آدرس"
          aria-keyshortcuts="Control+K Meta+K"
          title="رفتن به آدرس"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] [box-shadow:var(--shadow-soft)] transition-colors hover:border-[#388d92] hover:text-[var(--c-teal)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)]"
        >
          <Link2 className="size-[18px]" aria-hidden="true" />
        </button>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          aria-describedby="pwa-address-note"
          className="gap-0 rounded-t-[1.4rem] border-[var(--line)] bg-[var(--surface)] px-4 pt-5 pb-[max(1.1rem,env(safe-area-inset-bottom))] shadow-[0_-24px_60px_-30px_#0b1626] sm:px-6"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            inputRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            // The sheet is a sibling of the button that opens it, so Radix has no
            // trigger to hand focus back to. Returning it here keeps keyboard users
            // where they were instead of dropping them on <body>.
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <SheetTitle className="text-[.95rem] font-extrabold text-[var(--fg)]">
            رفتن به آدرس
          </SheetTitle>
          <SheetDescription
            id="pwa-address-note"
            className="mt-1 mb-4 text-[.78rem] leading-6 text-[var(--site-muted)]"
          >
            نسخهٔ نصب‌شده نوار آدرس ندارد. مسیر داخلی سایت را وارد کنید.
          </SheetDescription>

          <form onSubmit={go} className="grid gap-3">
            <div className="flex items-center gap-2 rounded-[.9rem] border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--c-teal)_4%,var(--site-surface))] px-3 transition-[border-color,box-shadow] focus-within:border-[var(--c-teal)] focus-within:shadow-[0_0_0_1px_color-mix(in_srgb,var(--c-teal)_35%,transparent),0_12px_30px_-24px_color-mix(in_srgb,var(--c-teal)_75%,transparent)]">
              {host && (
                <span
                  dir="ltr"
                  className="shrink-0 font-mono [font-feature-settings:'ss01'] text-[.78rem] text-[var(--site-muted)]"
                >
                  {host}
                </span>
              )}
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setError("");
                }}
                dir="ltr"
                inputMode="url"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="/admin"
                aria-label="مسیر داخلی"
                aria-invalid={Boolean(error)}
                className="h-11 min-w-0 flex-1 bg-transparent text-start font-mono text-[.95rem] text-[var(--fg)] outline-none placeholder:text-[var(--site-muted)]/70"
              />
              <button
                type="submit"
                aria-label="برو"
                className="grid size-9 flex-none cursor-pointer place-items-center rounded-[.7rem] bg-[var(--c-teal)] text-white transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)]"
              >
                <CornerDownLeft className="size-4" aria-hidden="true" />
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="m-0 text-[.78rem] font-bold text-[#a12441] dark:text-[#ffb3c1]"
              >
                {error}
              </p>
            )}
          </form>

          <p className="mt-4 mb-0 text-[.74rem] leading-6 text-[var(--site-muted)]">
            در مرورگر رومیزی با{" "}
            <kbd className="rounded border border-[var(--line)] bg-[var(--site-surface)] px-1.5 py-0.5 font-mono text-[.7rem]">
              Ctrl&nbsp;+&nbsp;K
            </kbd>{" "}
            هم باز می‌شود.
          </p>
        </SheetContent>
      </Sheet>
    </>
  );
}
