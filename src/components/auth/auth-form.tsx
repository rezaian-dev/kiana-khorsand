"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction, registerAction } from "@/actions/auth";
import type { AuthState } from "@/types/auth";

const initial: AuthState = { error: "", fields: {} };
const authInputClass =
  "min-h-[42px] w-full rounded-[10px] border border-[#d8d0e2] bg-white px-[.8rem] py-2 text-[#26213f] outline-offset-2 placeholder:text-[#716b82] aria-invalid:border-[#aa2a46] dark:border-[#59456d] dark:bg-[#221c32] dark:text-[#f7f3ff] max-[359px]:min-h-10";
const authLabelClass =
  "mb-[.28rem] block text-[.83rem] font-bold [@media(max-width:359px)_and_(max-height:600px)]:mb-[.1rem]";
const authErrorClass =
  "mt-[.3rem] text-[.78rem] font-bold text-[#a12441] dark:text-[#ff9eaf]";
const authSubmitClass =
  "auth-new-submit grid min-h-11 w-full cursor-pointer place-items-center rounded-[10px] bg-[#5130ad] px-4 py-[.55rem] font-extrabold text-white disabled:cursor-wait disabled:opacity-65 dark:bg-[#ad99ff] dark:text-[#1e1731]";

export function AuthForm({
  mode,
  next,
}: {
  mode: "login" | "register";
  next?: string;
}) {
  const [state, action, pending] = useActionState(
    mode === "login" ? loginAction : registerAction,
    initial,
  );
  const [showPassword, setShowPassword] = useState(false);
  const register = mode === "register";
  const suffix = next ? `?next=${encodeURIComponent(next)}` : "";
  return (
    <>
      <nav
        className="mb-[.9rem] grid grid-cols-2 gap-1 rounded-[14px] bg-[#f1edf7] p-1 dark:bg-[#30283c] [@media(max-width:359px)_and_(max-height:600px)]:mb-[.4rem]"
        aria-label="حساب کاربری"
      >
        <Link
          href={`/login${suffix}`}
          className="grid min-h-10 place-items-center rounded-[10px] font-bold aria-[current=page]:bg-white aria-[current=page]:shadow-[0_1px_8px_#24194516] max-[359px]:min-h-[37px] dark:aria-[current=page]:bg-[#221c32] dark:aria-[current=page]:text-[#f7f3ff]"
          aria-current={!register ? "page" : undefined}
        >
          ورود
        </Link>
        <Link
          href={`/register${suffix}`}
          className="grid min-h-10 place-items-center rounded-[10px] font-bold aria-[current=page]:bg-white aria-[current=page]:shadow-[0_1px_8px_#24194516] max-[359px]:min-h-[37px] dark:aria-[current=page]:bg-[#221c32] dark:aria-[current=page]:text-[#f7f3ff]"
          aria-current={register ? "page" : undefined}
        >
          ثبت‌نام
        </Link>
      </nav>
      <form
        action={action}
        className="grid gap-[clamp(.5rem,1.4vh,.95rem)] [@media(max-height:680px)]:gap-[.45rem] [@media(max-width:359px)_and_(max-height:600px)]:gap-[.3rem]"
        noValidate
      >
        {next && <input type="hidden" name="next" value={next} />}
        {register && (
          <div>
            <label className={authLabelClass} htmlFor="auth-name">
              نام و نام خانوادگی
            </label>
            <input
              className={authInputClass}
              id="auth-name"
              name="name"
              autoComplete="name"
              required
              minLength={3}
              maxLength={120}
              aria-invalid={Boolean(state.fields.name)}
              aria-describedby={
                state.fields.name ? "auth-name-error" : undefined
              }
            />
            <FieldError id="auth-name-error" text={state.fields.name} />
          </div>
        )}
        <div>
          <label className={authLabelClass} htmlFor="auth-phone">
            شماره موبایل
          </label>
          <input
            className={authInputClass}
            id="auth-phone"
            name="phone"
            type="tel"
            dir="ltr"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="09123456789"
            required
            pattern="09[0-9]{9}"
            aria-invalid={Boolean(state.fields.phone)}
            aria-describedby={
              state.fields.phone ? "auth-phone-error" : undefined
            }
          />
          <FieldError id="auth-phone-error" text={state.fields.phone} />
        </div>
        <div>
          <label className={authLabelClass} htmlFor="auth-password">
            رمز عبور
          </label>
          <div className="relative">
            <input
              id="auth-password"
              className={`${authInputClass} pe-[3.4rem]`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={register ? "new-password" : "current-password"}
              required
              minLength={register ? 8 : undefined}
              aria-invalid={Boolean(state.fields.password)}
              aria-describedby={
                state.fields.password ? "auth-password-error" : undefined
              }
            />
            <button
              type="button"
              className="absolute inset-e-0 top-0 grid h-[42px] w-11 place-items-center text-[#4b405d]"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={
                showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError id="auth-password-error" text={state.fields.password} />
        </div>
        {register && (
          <div>
            <label className={authLabelClass} htmlFor="auth-confirm">
              تکرار رمز عبور
            </label>
            <input
              className={authInputClass}
              id="auth-confirm"
              name="confirm"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              aria-invalid={Boolean(state.fields.confirm)}
              aria-describedby={
                state.fields.confirm ? "auth-confirm-error" : undefined
              }
            />
            <FieldError id="auth-confirm-error" text={state.fields.confirm} />
          </div>
        )}
        {register ? (
          <div>
            <label
              className="flex items-center gap-[.55rem] text-[.83rem] leading-[1.6]"
              htmlFor="auth-consent"
            >
              <Checkbox
                id="auth-consent"
                className="mt-[.12rem]"
                name="consent"
                value="on"
                required
                aria-label="تأیید رضایت"
              />
              <span>
                با{" "}
                <Link
                  href="/terms"
                  className="font-bold text-[#5130ad] underline underline-offset-[3px] dark:text-[#c3b4ff]"
                >
                  شرایط استفاده
                </Link>{" "}
                و{" "}
                <Link
                  href="/privacy"
                  className="font-bold text-[#5130ad] underline underline-offset-[3px] dark:text-[#c3b4ff]"
                >
                  حریم خصوصی
                </Link>{" "}
                آشنا شدم.
              </span>
            </label>
            <FieldError id="auth-consent-error" text={state.fields.consent} />
          </div>
        ) : (
          <Link
            href="/forgot-password"
            className="inline-block text-[.82rem] font-bold text-[#5130ad] underline underline-offset-[3px] dark:text-[#c3b4ff]"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        )}
        {state.error && (
          <p role="alert" className={authErrorClass}>
            {state.error}
          </p>
        )}
        <button
          type="submit"
          className={`${authSubmitClass} ${register ? "rounded-[12px_12px_12px_3px] bg-[linear-gradient(105deg,#12665f,#275576)] shadow-[0_10px_24px_-13px_rgb(10_91_87/55%)] dark:bg-[linear-gradient(105deg,#8de2cc,#a6ceee)]" : ""}`}
          disabled={pending}
        >
          {pending
            ? "لطفاً صبر کنید…"
            : register
              ? "ایجاد حساب کاربری"
              : "ورود به حساب کاربری"}
        </button>
      </form>
    </>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  return text ? (
    <p id={id} role="alert" className={authErrorClass}>
      {text}
    </p>
  ) : null;
}
