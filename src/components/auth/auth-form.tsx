"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useActionState, useState } from "react";
import { m } from "motion/react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { loginAction, registerAction } from "@/actions/auth";
import type { AuthState } from "@/types/auth";
import { motionTiming } from "@/lib/motion-tokens";
import { fieldRingClassName } from "@/components/shared/field-styles";

const initial: AuthState = { error: "", fields: {} };

const authLabelClass =
  "mb-[.34rem] block text-[.82rem] font-extrabold tracking-[.01em] text-[#4b405d] dark:text-[#d5cce4] [@media(max-width:359px)_and_(max-height:600px)]:mb-[.1rem]";
const authErrorClass =
  "mt-[.3rem] text-[.78rem] font-bold text-[#a12441] dark:text-[#ff9eaf]";

/** One field: a leading icon, the input itself, and its error line. */
const authInputClass = `min-h-[46px] w-full rounded-[12px] border border-[#d8d0e2] bg-white/85 py-2 pr-11 pl-[.85rem] text-[#26213f] placeholder:text-[#8b83a1] hover:border-[#bdb2d0] aria-invalid:border-[#aa2a46] dark:border-[#59456d] dark:bg-[#221c32]/85 dark:text-[#f7f3ff] dark:placeholder:text-[#9b90b5] dark:hover:border-[#6c5a86] max-[359px]:min-h-10 ${fieldRingClassName}`;

/** The wrapper lights its icon when the field inside takes focus. */
const fieldWrapClass = "group/field relative";

/**
 * The leading icon is a landmark, not a state: it keeps its weight and colour
 * while the field is focused, so focus reads from the ring alone.
 *
 * `z-1` is required, not cosmetic: the focused field gets a `backdrop-blur`
 * plate, and a backdrop filter promotes the input into its own stacking
 * context, which would otherwise paint the translucent plate *over* the icon
 * and wash it out.
 */
const fieldIconClass =
  "pointer-events-none absolute inset-y-0 right-0 z-1 my-auto mr-[.85rem] size-[18px] text-[#544d66] dark:text-[#d6cfe4]";

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
      {/* Two links, one glass pill that slides between them. */}
      <nav
        className="relative mb-4 grid grid-cols-2 gap-1 rounded-[14px] border border-[#e7e1f1] bg-[#f1edf7]/80 p-1 backdrop-blur-sm dark:border-white/10 dark:bg-[#2b2438]/80"
        aria-label="حساب کاربری"
      >
        {[
          { href: `/login${suffix}`, label: "ورود", active: !register },
          { href: `/register${suffix}`, label: "ثبت‌نام", active: register },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={tab.active ? "page" : undefined}
            className="relative z-10 grid min-h-10 place-items-center rounded-[10px] text-[.9rem] font-extrabold text-[#5a5170] transition-colors aria-[current=page]:text-[#231a3d] dark:text-[#b7accb] dark:aria-[current=page]:text-white"
          >
            {tab.active && (
              <m.span
                layoutId="auth-tab-pill"
                className="absolute inset-0 -z-10 rounded-[10px] border border-white/70 bg-white shadow-[0_6px_16px_-10px_#24194580,inset_0_1px_0_#fff] dark:border-white/10 dark:bg-white/10 dark:shadow-[0_6px_18px_-10px_#0009]"
                transition={motionTiming.indicator}
              />
            )}
            {tab.label}
          </Link>
        ))}
      </nav>

      <form
        action={action}
        className="grid gap-[clamp(.55rem,1.4vh,.95rem)] [@media(max-height:680px)]:gap-[.45rem] [@media(max-width:359px)_and_(max-height:600px)]:gap-[.3rem]"
        noValidate
      >
        {next && <input type="hidden" name="next" value={next} />}

        {register && (
          <div>
            <label className={authLabelClass} htmlFor="auth-name">
              نام و نام خانوادگی
            </label>
            <div className={fieldWrapClass}>
              <UserRound aria-hidden="true" className={fieldIconClass} />
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
            </div>
            <FieldError id="auth-name-error" text={state.fields.name} />
          </div>
        )}

        <div>
          <label className={authLabelClass} htmlFor="auth-phone">
            شماره موبایل
          </label>
          <div className={fieldWrapClass}>
            <Phone aria-hidden="true" className={fieldIconClass} />
            <input
              className={`${authInputClass} text-start`}
              id="auth-phone"
              name="phone"
              type="tel"
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
          </div>
          <FieldError id="auth-phone-error" text={state.fields.phone} />
        </div>

        <div>
          <label className={authLabelClass} htmlFor="auth-password">
            رمز عبور
          </label>
          <div className={fieldWrapClass}>
            <Lock aria-hidden="true" className={fieldIconClass} />
            <input
              id="auth-password"
              className={`${authInputClass} ps-[3.4rem]`}
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
              className="absolute inset-y-0 inset-s-0 grid w-11 place-items-center rounded-s-[12px] text-[#5a5170] transition-colors hover:text-(--field-accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--field-accent) dark:text-[#b7accb]"
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
            <div className={fieldWrapClass}>
              <ShieldCheck aria-hidden="true" className={fieldIconClass} />
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
            </div>
            <FieldError id="auth-confirm-error" text={state.fields.confirm} />
          </div>
        )}

        {register ? (
          <div>
            <label
              className="flex items-center gap-[.55rem] text-[.82rem] leading-[1.7]"
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
            className="inline-flex w-fit items-center gap-1 text-[.82rem] font-bold text-[#5130ad] underline-offset-4 transition-colors hover:underline dark:text-[#c3b4ff]"
          >
            رمز عبور را فراموش کرده‌اید؟
          </Link>
        )}

        {state.error && (
          <p role="alert" className={authErrorClass}>
            {state.error}
          </p>
        )}

        <m.button
          type="submit"
          disabled={pending}
          whileHover={pending ? undefined : { y: -1 }}
          whileTap={pending ? undefined : { scale: 0.985 }}
          transition={motionTiming.hover}
          className={`group relative mt-1 grid min-h-12 w-full cursor-pointer place-items-center overflow-hidden rounded-[14px] bg-[linear-gradient(105deg,#12665f,#275576)] px-4 py-[.6rem] font-extrabold text-white shadow-[0_18px_36px_-20px_rgb(10_91_87/85%)] transition-colors disabled:cursor-wait disabled:opacity-70 dark:bg-[linear-gradient(105deg,#8de2cc,#a6ceee)] dark:text-[#10222a] ${
            register ? "rounded-[14px_14px_14px_4px]" : ""
          }`}
        >
          {/* A slow sheen across the button — pure CSS, gone the moment the user taps. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgb(255_255_255/28%),transparent)] transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden"
          />
          <span className="relative flex items-center gap-2">
            {pending ? (
              "لطفاً صبر کنید…"
            ) : register ? (
              <>
                ایجاد حساب کاربری
                <ArrowLeft className="size-4" aria-hidden="true" />
              </>
            ) : (
              <>
                ورود به حساب کاربری
                <ArrowLeft className="size-4" aria-hidden="true" />
              </>
            )}
          </span>
        </m.button>
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
