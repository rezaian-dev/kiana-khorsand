"use client";

import {
  panelAdminFormClassName,
  panelButtonClassName,
  panelErrorClassName,
} from "@/components/panels/panel-layout-classes";
import { useActionState } from "react";
import { addBlockedRange } from "@/actions/admin";
import type { AdminFeedback } from "@/types/admin";
import { JalaliRangePicker } from "./jalali-date-picker";
const initial: AdminFeedback = { error: "", success: "" };
export function BlockedRangeForm({ today }: { today: string }) {
  const [state, action, pending] = useActionState(addBlockedRange, initial);
  return (
    <form
      action={action}
      className={`${panelAdminFormClassName} admin-block-form max-w-none!`}
    >
      <p className="panel-help">بستن روز، نوبت‌های ثبت‌شده را لغو نمی‌کند.</p>
      <JalaliRangePicker today={today} />
      <label htmlFor="block-reason">دلیل</label>
      <input
        id="block-reason"
        name="reason"
        minLength={3}
        maxLength={120}
        placeholder="مثلاً تعطیلات یا عدم حضور"
        required
      />
      {state.error && (
        <p role="alert" className={panelErrorClassName}>
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="admin-block-success">
          {state.success}
        </p>
      )}
      <button className={panelButtonClassName} type="submit" disabled={pending}>
        {pending ? "در حال ثبت…" : "افزودن بازهٔ بسته"}
      </button>
    </form>
  );
}
