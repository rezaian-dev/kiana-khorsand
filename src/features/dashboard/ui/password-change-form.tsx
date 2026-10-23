"use client";

import {
  panelFormClassName,
  panelCardClassName,
  panelButtonClassName,
  panelMutedClassName,
  panelErrorClassName,
} from "@/components/panels/panel-styles";

import { useActionState, useEffect, useRef } from "react";
import { changeAccountPassword } from "@/actions/account-security";
import type { PanelState } from "@/types/dashboard";
const initial: PanelState = { error: "", success: false };

/** Label + field pair; keeps the hint visually attached to its own input. */
const fieldClassName = "grid gap-[.4rem]";
export function PasswordChangeForm() {
  const [state, action, pending] = useActionState(
    changeAccountPassword,
    initial,
  );
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.success) ref.current?.reset();
  }, [state.success]);
  return (
    <form
      ref={ref}
      action={action}
      className={`${panelCardClassName} ${panelFormClassName} account-password-form gap-4! [.admin-ref-frame_&]:max-w-[640px]`}
    >
      <h2>تغییر رمز عبور</h2>
      <p className={panelMutedClassName}>
        پس از تغییر رمز، نشست‌های دیگر این حساب باطل می‌شوند.
      </p>
      <div className={fieldClassName}>
        <label htmlFor="account-current-password">رمز کنونی</label>
        <input
          id="account-current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor="account-new-password">رمز تازه</label>
        <input
          id="account-new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          required
          aria-describedby="account-password-hint"
        />
        <p className={panelMutedClassName} id="account-password-hint">
          دست‌کم ۸ نویسه شامل حرف و رقم؛ یک رمز یکتا انتخاب کنید.
        </p>
      </div>

      <div className={fieldClassName}>
        <label htmlFor="account-confirm-password">تکرار رمز تازه</label>
        <input
          id="account-confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={128}
          required
        />
      </div>
      {state.error && (
        <p role="alert" className={panelErrorClassName}>
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="admin-block-success">
          رمز حساب تغییر کرد و نشست‌های دیگر باطل شدند.
        </p>
      )}
      <button
        type="submit"
        className={`${panelButtonClassName} justify-self-start`}
        disabled={pending}
      >
        {pending ? "در حال تغییر…" : "تغییر رمز عبور"}
      </button>
    </form>
  );
}
