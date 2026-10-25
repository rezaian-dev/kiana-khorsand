"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  ShieldAlert,
  Smartphone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { adminLoginAction } from "@/actions/admin-auth";
import type { AuthState } from "@/types/auth";
import { fieldRingClassName } from "@/components/shared/field-styles";

/** The quiet links under the form ("فراموشی رمز", "بازگشت به سایت"). */
const authLinkClassName =
  "font-bold text-(--site-muted) underline-offset-4 transition-colors hover:text-(--c-teal) hover:underline";

const initial: AuthState = { error: "", fields: {} };

/** Glass plate: hairline at rest, one precise ring plus a soft glow on focus. */
const fieldClass = `h-12 w-full min-w-0 ps-11 pe-4 text-[.95rem] text-[var(--site-ink)] placeholder:text-[#98a1b6] dark:text-[#eef3ff] dark:placeholder:text-[#8b93a8] ${fieldRingClassName} rounded-[.95rem] border border-[rgb(15_23_42/0.1)] bg-[rgb(255_255_255/0.68)] [box-shadow:inset_0_1px_0_#fff,0_1px_2px_rgb(22_35_61/0.04)] backdrop-blur-md hover:border-[rgb(15_23_42/0.18)] dark:border-white/15 dark:bg-white/5 dark:[box-shadow:inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(0_0_0/0.2)] dark:hover:border-white/25`;

/**
 * Fixed colour on purpose: focusing the field must not wash the icon out.
 * `z-1` keeps it above the focused field's backdrop-blur plate.
 */
const fieldIconClass =
  "pointer-events-none absolute inset-y-0 start-3.5 z-1 grid place-items-center text-[#4f586b] dark:text-[#cdd6e4]";

const labelClass =
  "mb-2 block text-[.8rem] font-extrabold tracking-[.01em] text-[var(--site-muted)]";

const hintClass =
  "mt-2 flex items-start gap-1.5 text-[.76rem] font-bold text-[#a12441] dark:text-[#ffb3c1]";

/**
 * Administrator sign-in. Deliberately separate from `AuthForm`: no registration,
 * no password recovery, and a non-admin account is rejected instead of signed in.
 *
 * In an installed PWA there is no address bar, so this page is also the landing spot
 * for `/admin` entered through the in-app address command (see `PwaAddress`).
 */
export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, initial);
  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const errorId = useId();

  return (
    <form action={action} noValidate className="grid gap-[1.15rem]">
      <div>
        <label className={labelClass} htmlFor="admin-phone">
          شمارهٔ موبایل مدیر
        </label>
        <div className="relative">
          <Input
            id="admin-phone"
            name="phone"
            type="tel"
            dir="ltr"
            inputMode="numeric"
            autoComplete="username"
            placeholder="09XXXXXXXXX"
            required
            className={`peer ${fieldClass} text-start tracking-[.035em]`}
            aria-invalid={Boolean(state.fields.phone)}
            aria-describedby={
              state.fields.phone ? "admin-phone-error" : undefined
            }
          />
          <span className={fieldIconClass} aria-hidden="true">
            <Smartphone className="size-[1.05rem]" />
          </span>
        </div>
        {state.fields.phone && (
          <p id="admin-phone-error" className={hintClass}>
            <ShieldAlert
              className="mt-px size-3.5 flex-none"
              aria-hidden="true"
            />
            {state.fields.phone}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="admin-password">
          رمز عبور
        </label>
        <div className="relative">
          <Input
            id="admin-password"
            name="password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            required
            minLength={8}
            className={`peer ${fieldClass} pe-12`}
            aria-invalid={Boolean(state.fields.password)}
            aria-describedby={
              state.fields.password ? "admin-password-error" : undefined
            }
            onKeyDown={(event) =>
              setCapsLock(event.getModifierState("CapsLock"))
            }
            onKeyUp={(event) => setCapsLock(event.getModifierState("CapsLock"))}
            onBlur={() => setCapsLock(false)}
          />
          <span className={fieldIconClass} aria-hidden="true">
            <Lock className="size-[1.05rem]" />
          </span>
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            aria-pressed={visible}
            className="absolute inset-y-0 inset-e-0 grid w-12 cursor-pointer place-items-center rounded-e-[.95rem] text-[#8b94a9] transition-colors hover:text-(--site-ink) focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-(--c-teal) dark:text-[#8b93a8] dark:hover:text-[#eef3ff]"
          >
            {visible ? (
              <EyeOff className="size-[1.05rem]" />
            ) : (
              <Eye className="size-[1.05rem]" />
            )}
          </button>
        </div>
        {state.fields.password && (
          <p id="admin-password-error" className={hintClass}>
            <ShieldAlert
              className="mt-px size-3.5 flex-none"
              aria-hidden="true"
            />
            {state.fields.password}
          </p>
        )}
        {capsLock && !state.fields.password && (
          <p className="mt-2 text-[.76rem] font-bold text-[#8a5a00] dark:text-[#f0c982]">
            کلید Caps Lock روشن است.
          </p>
        )}
      </div>

      {state.error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-2 rounded-[.9rem] border border-[#e7b8c2] bg-[#fdf0f3]/85 px-3.5 py-2.5 text-[.82rem]/6 font-bold text-[#8f1f3c] backdrop-blur-sm dark:border-[#7a3a4b] dark:bg-[#3a1f2a]/85 dark:text-[#ffc6d2]"
        >
          <ShieldAlert className="mt-0.5 size-4 flex-none" aria-hidden="true" />
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-1 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[.95rem] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--c-teal)_82%,#0b2f3a),color-mix(in_srgb,var(--c-teal)_96%,#06202a))] text-[.95rem] font-extrabold text-white shadow-[0_18px_34px_-22px_color-mix(in_srgb,var(--c-teal)_85%,transparent),inset_0_1px_0_rgb(255_255_255/0.34)] transition-[filter,transform,box-shadow] duration-200 hover:-translate-y-px hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c-teal) active:translate-y-px disabled:cursor-wait disabled:opacity-85 md:h-[3.15rem] dark:bg-[linear-gradient(135deg,#6fe0d0,#35b9ad)] dark:text-[#062a2a]"
      >
        {pending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Lock
            className="size-4 transition-transform duration-200 group-hover:-rotate-6"
            aria-hidden="true"
          />
        )}
        {pending ? "در حال بررسی…" : "ورود به پنل مدیریت"}
        {!pending && (
          <ArrowLeft
            className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}
      </button>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/60 pt-4 text-[.79rem] dark:border-white/10">
        <Link href="/login" className={authLinkClassName}>
          ورود کاربران
        </Link>
        <Link href="/" className={authLinkClassName}>
          بازگشت به سایت
        </Link>
      </div>
    </form>
  );
}
