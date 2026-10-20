"use client";

import {
  panelAdminFormClassName,
  panelCardClassName,
  adminCreatePanelClassName,
  adminCreatePanelSummaryClassName,
  panelButtonClassName,
  panelErrorClassName,
} from "@/components/panels/panel-layout-classes";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createClientAccount } from "@/actions/admin-clients";
import type { AdminFeedback } from "@/types/admin";
const initial: AdminFeedback = { error: "", success: "" };
export function CreateClientForm() {
  const [state, action, pending] = useActionState(createClientAccount, initial);
  const [open, setOpen] = useState(false);
  const [dismissedFeedback, setDismissedFeedback] =
    useState<AdminFeedback | null>(null);
  return (
    <details
      className={`${panelCardClassName} ${adminCreatePanelClassName}`}
      open={
        open ||
        Boolean((state.error || state.success) && dismissedFeedback !== state)
      }
      onToggle={(event) => {
        setOpen(event.currentTarget.open);
        if (!event.currentTarget.open) setDismissedFeedback(state);
      }}
    >
      <summary className={adminCreatePanelSummaryClassName}>
        افزودن مراجع
      </summary>
      <form
        action={action}
        className={`${panelAdminFormClassName} admin-new-client-form mt-5 max-w-none!`}
        autoComplete="off"
      >
        <p className="panel-help">
          فقط با درخواست و اطلاع مراجع حساب بسازید. رمز موقت را در تماس یا پیام
          ناامن نفرستید؛ مراجع پس از ورود می‌تواند آن را در تنظیمات حساب تغییر
          دهد. هیچ پیامک یا ایمیلی ارسال نمی‌شود.
        </p>
        <label htmlFor="new-client-name">نام مراجع</label>
        <input
          id="new-client-name"
          name="name"
          minLength={3}
          maxLength={120}
          required
          autoComplete="off"
        />
        <label htmlFor="new-client-phone">شمارهٔ موبایل</label>
        <input
          id="new-client-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          dir="ltr"
          pattern="09[0-9]{9}"
          required
          placeholder="09XXXXXXXXX"
          autoComplete="off"
        />
        <div className="admin-block-form-grid grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4 [&>div]:grid [&>div]:min-w-0 [&>div]:gap-2">
          <div>
            <label htmlFor="new-client-password">
              رمز موقت (حداقل ۱۲ کاراکتر شامل حرف و رقم)
            </label>
            <input
              id="new-client-password"
              name="password"
              type="password"
              minLength={12}
              maxLength={128}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label htmlFor="new-client-confirm">تکرار رمز موقت</label>
            <input
              id="new-client-confirm"
              name="confirm"
              type="password"
              minLength={12}
              maxLength={128}
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <label
          className="admin-client-permission flex items-start gap-[.65rem] text-[.83rem]! leading-[1.9] [&_input]:mt-[.2rem] [&_input]:h-[19px] [&_input]:min-h-0! [&_input]:w-[19px] [&_input]:flex-none [&_input]:accent-[var(--panel-accent)]"
          htmlFor="new-client-permission"
        >
          <Checkbox
            className="mt-[.12rem]"
            id="new-client-permission"
            name="permission"
            value="on"
            required
            aria-label="تأیید مجوز ساخت حساب"
          />
          <span>
            تأیید می‌کنم که برای ساخت حساب و پردازش داده‌های مراجع، مجوز لازم را
            دارم.
          </span>
        </label>
        {state.error && (
          <p role="alert" className={panelErrorClassName}>
            {state.error}
          </p>
        )}
        {state.success && (
          <p role="status" className="admin-block-success">
            {state.success}
            {state.id && (
              <>
                {" "}
                <Link href={`/admin/client?id=${state.id}`}>
                  مشاهدهٔ پروندهٔ حساب ←
                </Link>
              </>
            )}
          </p>
        )}
        <button
          className={panelButtonClassName}
          type="submit"
          disabled={pending}
        >
          {pending ? "در حال ایجاد…" : "ایجاد حساب مراجع"}
        </button>
      </form>
    </details>
  );
}
