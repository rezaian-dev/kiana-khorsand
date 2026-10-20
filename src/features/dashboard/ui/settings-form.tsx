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
export function SettingsForm({ name, phone }: { name: string; phone: string }) {
  const [state, action, pending] = useActionState(updateProfile, initial);
  return (
    <form
      action={action}
      className={`${panelCardClassName} ${panelFormClassName}`}
    >
      <h2>اطلاعات حساب</h2>
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
      <label htmlFor="profile-phone">شماره موبایل حساب</label>
      <input
        id="profile-phone"
        value={phone}
        readOnly
        dir="ltr"
        aria-describedby="phone-note"
      />
      <p className={panelMutedClassName} id="phone-note">
        تغییر شماره از این بخش پشتیبانی نمی‌شود.
      </p>
      {state.error && (
        <p role="alert" className={panelErrorClassName}>
          {state.error}
        </p>
      )}
      {state.success && <p role="status">نام حساب به‌روزرسانی شد.</p>}
      <div>
        <button
          type="submit"
          className={panelButtonClassName}
          disabled={pending}
        >
          {pending ? "در حال ذخیره…" : "ذخیره تغییرات"}
        </button>
      </div>
    </form>
  );
}
