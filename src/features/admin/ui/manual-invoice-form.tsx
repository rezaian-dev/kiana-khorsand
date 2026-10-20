"use client";

import {
  panelAdminFormClassName,
  panelCardClassName,
  adminCreatePanelClassName,
  adminCreatePanelSummaryClassName,
  panelButtonClassName,
  panelErrorClassName,
} from "@/components/panels/panel-layout-classes";

import { PanelSelect } from "@/components/panels/panel-select";

import { useActionState, useState } from "react";
import { createManualInvoice } from "@/actions/admin";
import type { AdminFeedback } from "@/types/admin";
const initial: AdminFeedback = { error: "", success: "" };
export function ManualInvoiceForm({
  users,
}: {
  users: { id: string; name: string; phone: string }[];
}) {
  const [state, action, pending] = useActionState(createManualInvoice, initial);
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
        فاکتور تازه (بدون نوبت)
      </summary>
      <form
        className={`${panelAdminFormClassName} admin-invoice-form mt-5 max-w-none!`}
        action={action}
      >
        <p className="panel-help">
          این فاکتور به یک مراجع متصل است، نه به نوبت؛ ابتدا با وضعیت «در
          انتظار» ثبت می‌شود. هیچ پرداخت خودکاری انجام نمی‌شود.
        </p>
        <label htmlFor="invoice-client">مراجع</label>
        <PanelSelect
          id="invoice-client"
          name="userId"
          required
          placeholder="انتخاب مراجع"
          options={users.map((item) => ({
            value: item.id,
            label: `${item.name} · ${item.phone}`,
          }))}
        />
        <label htmlFor="invoice-description">بابت</label>
        <input
          id="invoice-description"
          name="description"
          minLength={3}
          maxLength={180}
          required
          placeholder="شرح خدمت یا توافق مالی"
        />
        <label htmlFor="invoice-amount">مبلغ (تومان)</label>
        <input
          id="invoice-amount"
          name="amount"
          type="number"
          inputMode="numeric"
          min={1000}
          max={100000000}
          step={1}
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
        <button
          type="submit"
          className={panelButtonClassName}
          disabled={pending || !users.length}
        >
          {pending ? "در حال ثبت…" : "ایجاد فاکتور مستقل"}
        </button>
      </form>
    </details>
  );
}
