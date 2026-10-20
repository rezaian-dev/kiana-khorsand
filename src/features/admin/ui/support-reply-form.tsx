"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send, Video } from "lucide-react";
import { replyToThread } from "@/actions/admin";
import { PanelSelect } from "@/components/panels/panel-select";

export function SupportReplyForm({
  threadId,
  users,
}: {
  threadId?: string;
  users?: { id: string; name: string }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(replyToThread, {
    error: "",
    success: "",
  });
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    for (const name of ["body", "meetUrl"] as const) {
      const field = form.elements.namedItem(name);
      if (
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLInputElement
      )
        field.value = state.error ? (state.draft?.[name] ?? "") : "";
    }
  }, [state]);
  return (
    <form
      ref={formRef}
      action={action}
      className="mt-5 grid gap-3 border-t border-slate-200/80 pt-5 dark:border-white/10"
    >
      {threadId ? (
        <input type="hidden" name="id" value={threadId} />
      ) : (
        <div>
          <label
            htmlFor="support-recipient"
            className="text-fg mb-2 block text-sm font-bold"
          >
            دریافت‌کننده
          </label>
          <PanelSelect
            id="support-recipient"
            name="userId"
            label="حساب کاربر"
            required
            options={
              users?.map(({ id, name }) => ({ value: id, label: name })) || []
            }
          />
        </div>
      )}
      <div>
        <label
          className="text-fg mb-2 block text-sm font-bold"
          htmlFor={`support-body-${threadId || "new"}`}
        >
          پاسخ پشتیبان
        </label>
        <textarea
          id={`support-body-${threadId || "new"}`}
          name="body"
          aria-invalid={Boolean(state.error)}
          minLength={2}
          maxLength={2000}
          required
          rows={3}
          placeholder="متن پیام خصوصی برای کاربر…"
          className="text-fg w-full rounded-xl border border-slate-200 bg-white p-3 text-sm leading-7 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 dark:border-white/15 dark:bg-slate-900"
        />
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-800/40 dark:bg-blue-900/10">
        <label
          htmlFor={`meet-url-${threadId || "new"}`}
          className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-800 dark:text-blue-200"
        >
          <Video size={17} aria-hidden="true" /> لینک دعوت Google Meet{" "}
          <span className="text-xs font-normal">(اختیاری)</span>
        </label>
        <input
          id={`meet-url-${threadId || "new"}`}
          name="meetUrl"
          aria-invalid={Boolean(state.error)}
          type="url"
          inputMode="url"
          dir="ltr"
          placeholder="https://meet.google.com/abc-defg-hij"
          className="text-fg w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-left text-sm outline-none focus:border-blue-500 dark:border-blue-800 dark:bg-slate-900"
        />
        <p className="mt-2 text-xs leading-6 text-blue-800/80 dark:text-blue-200/80">
          لینک فقط در حساب همین کاربر نمایش داده می‌شود؛ زمان و توضیحات جلسه را
          در متن پیام بنویسید.
        </p>
      </div>
      {state.error && (
        <p role="alert" className="text-sm font-bold text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="text-sm font-bold text-teal-700">
          {state.success}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-bold text-white transition-colors hover:bg-teal-800 disabled:opacity-60"
      >
        <Send size={17} aria-hidden="true" />{" "}
        {pending ? "در حال ارسال…" : "ارسال پاسخ و اعلان"}
      </button>
    </form>
  );
}
