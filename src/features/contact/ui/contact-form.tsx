"use client";

import {
  publicButtonPrimaryClassName,
  publicButtonSoftClassName,
  publicH3ClassName,
} from "@/components/layout/public-styles";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { PanelSelect } from "@/components/panels/panel-select";
import { useActionState } from "react";
import { sendContact } from "@/actions/contact";
import type { ContactState } from "@/types/contact";

/** Every control in this form shares one glass plate. */
const fieldLabelClassName =
  "mb-2 block text-[.8125rem] font-bold text-(--fg) [&>span:not(.text-muted)]:text-(--c-rose)";

/** Every control in this form shares one glass plate. */
const fieldControlClassName =
  "min-h-12 w-full rounded-[15px] border border-(--line) bg-(--surface) px-4 py-3 font-[inherit] text-base text-(--fg) placeholder:text-(--muted) placeholder:opacity-75 focus:border-(--c-teal) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--c-teal)_28%,transparent)] focus:outline-none dark:focus:ring-[color-mix(in_srgb,var(--c-teal)_48%,transparent)]";

const initial: ContactState = { error: "", success: false };
export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  if (state.success)
    return (
      <div role="status" className="px-4 py-12 text-center">
        <span className="mx-auto grid size-[84px] place-items-center rounded-full bg-[linear-gradient(135deg,var(--c-teal),var(--c-indigo))] text-[2.4rem] text-white">
          <i className="ph-duotone ph-check-circle" aria-hidden="true" />
        </span>
        <h3 className={`${publicH3ClassName} mt-5`}>پیام شما ثبت شد</h3>
        <p className="text-muted mt-3">
          پرسش شما در صندوق پیام‌های سایت ثبت شد. از همراهی‌تان سپاسگزاریم.
        </p>
        <Link href="/" className={`${publicButtonSoftClassName} mt-6`}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  return (
    <form id="contactForm" className="mt-6" action={action}>
      <div className="mb-[1.15rem]">
        <label className={fieldLabelClassName} htmlFor="contact-name">
          نام و نام خانوادگی <span aria-hidden="true">*</span>
        </label>
        <input
          className={fieldControlClassName}
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="نام شما"
          required
          minLength={3}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="mb-[1.15rem]">
          <label className={fieldLabelClassName} htmlFor="contact-phone">
            شمارهٔ موبایل <span aria-hidden="true">*</span>
          </label>
          <input
            className={fieldControlClassName}
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder="09XXXXXXXXX"
            required
            pattern="09[0-9]{9}"
          />
        </div>
        <div className="mb-[1.15rem]">
          <label className={fieldLabelClassName} htmlFor="contact-email">
            ایمیل <span className="text-muted">(اختیاری)</span>
          </label>
          <input
            className={fieldControlClassName}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            placeholder="name@example.com"
          />
        </div>
      </div>
      <div className="mb-[1.15rem]">
        <label className={fieldLabelClassName} htmlFor="contact-subject">
          موضوع <span aria-hidden="true">*</span>
        </label>
        <PanelSelect
          id="contact-subject"
          name="subject"
          required
          placeholder="انتخاب کن…"
          options={[
            { value: "question", label: "سؤال عمومی" },
            { value: "booking", label: "دربارهٔ رزرو" },
            { value: "fees", label: "دربارهٔ تعرفه‌ها" },
            { value: "workshop", label: "دربارهٔ کارگاه‌ها" },
            { value: "collab", label: "همکاری یا سایر" },
          ]}
        />
      </div>
      <div className="mb-[1.15rem]">
        <label className={fieldLabelClassName} htmlFor="contact-message">
          متن پیام <span aria-hidden="true">*</span>
        </label>
        <textarea
          className="min-h-[145px] w-full resize-y rounded-[15px] border border-(--line) bg-(--surface) px-4 py-3 font-[inherit] text-base text-(--fg) placeholder:text-(--muted) placeholder:opacity-75 focus:border-(--c-teal) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--c-teal)_28%,transparent)] focus:outline-none dark:focus:ring-[color-mix(in_srgb,var(--c-teal)_48%,transparent)]"
          id="contact-message"
          name="message"
          minLength={10}
          maxLength={3000}
          rows={5}
          placeholder="پرسش خودت را بنویس…"
          required
        />
      </div>
      <div className="mb-[1.15rem]">
        <div className="flex items-start gap-[.65rem] text-sm leading-[1.8]">
          <Checkbox
            id="contact-consent"
            className="mt-1 focus-visible:outline-[#d5ac72]!"
            name="consent"
            value="on"
            required
            aria-label="تأیید آگاهی از شرایط ارسال پیام و حریم خصوصی"
          />
          <span>
            می‌دانم ارسال این فرم، شروع یک رابطهٔ درمانی نیست و{" "}
            <Link
              className="text-(--fg) underline underline-offset-[.2em]"
              href="/privacy"
            >
              سیاست حریم خصوصی
            </Link>{" "}
            را خوانده‌ام.
          </span>
        </div>
      </div>
      {state.error && (
        <p
          role="alert"
          className="mb-4 text-[.8rem] font-bold text-[#af304d] dark:text-rose-300"
        >
          {state.error}
        </p>
      )}
      <button
        type="submit"
        className={`${publicButtonPrimaryClassName} w-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[.985]`}
        disabled={pending}
      >
        <i className="ph-duotone ph-paper-plane-tilt" aria-hidden="true" />
        {pending ? "در حال ثبت…" : "ارسال پیام"}
      </button>
      <p className="mt-4 text-xs text-(--muted)">
        پیام در صندوق سایت ثبت می‌شود؛ ارسال پیامک یا پاسخ خودکار انجام نمی‌شود.
      </p>
    </form>
  );
}
