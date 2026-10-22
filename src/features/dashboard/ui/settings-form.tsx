"use client";

import {
  panelFormClassName,
  panelCardClassName,
  panelButtonClassName,
  panelMutedClassName,
  panelErrorClassName,
} from "@/components/panels/panel-layout-classes";
import { useActionState } from "react";
import { updateProfile } from "@/actions/dashboard";
import type { PanelState } from "@/types/dashboard";
const initial: PanelState = { error: "", success: false };

/** Label + field pair; keeps the hint visually attached to its own input. */
const fieldClassName = "grid gap-[.4rem]";

export function SettingsForm({ name, phone }: { name: string; phone: string }) {
  const [state, action, pending] = useActionState(updateProfile, initial);
  return (
    <form
      action={action}
      className={`${panelCardClassName} ${panelFormClassName} gap-4!`}
    >
      <h2>اطلاعات حساب</h2>
      <p className={panelMutedClassName}>
        نامی که در پروفایل و نوبت‌ها نمایش داده می‌شود را همین‌جا به‌روز کنید.
      </p>

      <div className={fieldClassName}>
        <label htmlFor="profile-name">نام و نام خانوادگی</label>
        <input
          id="profile-name"
          name="name"
          defaultValue={name}
          required
          minLength={3}
          maxLength={120}
          autoComplete="name"
        />
      </div>

      <div className={fieldClassName}>
        <label htmlFor="profile-phone">شماره موبایل حساب</label>
        <input
          id="profile-phone"
          value={phone}
          readOnly
          dir="ltr"
          aria-describedby="phone-note"
          className="text-start tabular-nums! opacity-80!"
        />
        <p className={panelMutedClassName} id="phone-note">
          شمارهٔ تماس از این بخش تغییر نمی‌کند؛ برای اصلاح آن با پشتیبانی در
          ارتباط باشید.
        </p>
      </div>

      {state.error && (
        <p role="alert" className={panelErrorClassName}>
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="admin-block-success">
          اطلاعات حساب ذخیره شد.
        </p>
      )}

      <button
        type="submit"
        className={`${panelButtonClassName} justify-self-start`}
        disabled={pending}
      >
        {pending ? "در حال ذخیره…" : "ذخیره تغییرات"}
      </button>
    </form>
  );
}
