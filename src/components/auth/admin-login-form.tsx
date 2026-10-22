"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLoginAction } from "@/actions/admin-auth";
import type { AuthState } from "@/types/auth";

const initial: AuthState = { error: "", fields: {} };

const labelClass =
  "mb-1.5 block text-[.82rem] font-bold text-[var(--site-ink)]";
const fieldErrorClass =
  "mt-1.5 text-[.78rem] font-bold text-[#a12441] dark:text-[#ff9eaf]";
const inputClass =
  "h-11 rounded-[.8rem] border-[var(--site-line)] bg-white/90 px-3 text-[.95rem] text-[var(--site-ink)] shadow-[inset_0_1px_0_#ffffff80] placeholder:text-[var(--site-muted)] focus-visible:border-[var(--c-teal)] focus-visible:ring-[color:color-mix(in_srgb,var(--c-teal)_28%,transparent)] dark:bg-white/5";

/**
 * Administrator sign-in form. Deliberately separate from `AuthForm`: this entrance
 * never links to registration, never restores a forgotten password, and reports a
 * non-admin account as "no access" instead of signing it in.
 */
export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, initial);
  const [visible, setVisible] = useState(false);

  return (
    <form action={action} noValidate className="grid gap-4">
      <div>
        <label className={labelClass} htmlFor="admin-phone">
          شمارهٔ موبایل مدیر
        </label>
        <Input
          id="admin-phone"
          name="phone"
          type="tel"
          dir="ltr"
          inputMode="numeric"
          autoComplete="username"
          placeholder="09XXXXXXXXX"
          required
          className={`${inputClass} text-start tracking-[.02em]`}
          aria-invalid={Boolean(state.fields.phone)}
          aria-describedby={state.fields.phone ? "admin-phone-error" : undefined}
        />
        {state.fields.phone && (
          <p id="admin-phone-error" className={fieldErrorClass}>
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
            className={`${inputClass} pe-11`}
            aria-invalid={Boolean(state.fields.password)}
            aria-describedby={
              state.fields.password ? "admin-password-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"}
            className="absolute inset-y-0 end-0 grid w-11 place-items-center rounded-e-[.8rem] text-[var(--site-muted)] transition-colors hover:text-[var(--site-ink)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)]"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {state.fields.password && (
          <p id="admin-password-error" className={fieldErrorClass}>
            {state.fields.password}
          </p>
        )}
      </div>

      {state.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-[.8rem] border border-[#e7b8c2] bg-[#fdf0f3] px-3 py-2.5 text-[.82rem] leading-6 font-bold text-[#8f1f3c] dark:border-[#7a3a4b] dark:bg-[#3a1f2a] dark:text-[#ffc6d2]"
        >
          <ShieldCheck className="mt-0.5 size-4 flex-none" aria-hidden="true" />
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="mt-1 h-11 w-full cursor-pointer gap-2 rounded-[.8rem] bg-[var(--c-teal)] text-[.95rem] font-extrabold text-white shadow-[0_14px_30px_-18px_var(--c-teal)] transition-[filter,transform] hover:brightness-105 active:translate-y-px disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <LogIn className="size-4" aria-hidden="true" />
        )}
        {pending ? "در حال بررسی…" : "ورود به پنل مدیریت"}
      </Button>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[var(--site-line)] pt-4 text-[.8rem]">
        <Link
          href="/login"
          className="font-bold text-[var(--site-muted)] underline-offset-4 hover:text-[var(--c-teal)] hover:underline"
        >
          ورود کاربران
        </Link>
        <Link
          href="/"
          className="font-bold text-[var(--site-muted)] underline-offset-4 hover:text-[var(--c-teal)] hover:underline"
        >
          بازگشت به سایت
        </Link>
      </div>
    </form>
  );
}
