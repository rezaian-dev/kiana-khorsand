"use client";

import { useActionState, useEffect, useRef } from "react";
import { SendHorizonal } from "lucide-react";
import { sendMessage } from "@/actions/dashboard";
import type { PanelState } from "@/types/dashboard";

const initial: PanelState = { error: "", success: false };
export function MessageForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);
  // React resets uncontrolled fields after a form action. Restore only rejected input.
  useEffect(() => {
    const field = formRef.current?.elements.namedItem("body");
    if (field instanceof HTMLTextAreaElement)
      field.value = state.error ? (state.draft ?? "") : "";
  }, [state]);
  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_60px_-42px_rgba(20,50,80,.45)] sm:p-7 dark:border-white/10 dark:bg-slate-900/80"
    >
      <h2 className="text-fg text-lg font-extrabold">پیام به پشتیبان</h2>
      <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
        سؤال خود را مطرح کنید یا دربارهٔ لینک دعوت پیگیری کنید.
      </p>
      <label
        htmlFor="message-body"
        className="text-fg mt-5 block text-sm font-bold"
      >
        متن پیام
      </label>
      <textarea
        id="message-body"
        name="body"
        aria-invalid={Boolean(state.error)}
        minLength={2}
        maxLength={2000}
        required
        rows={4}
        placeholder="سؤال یا موضوع خود را اینجا بنویسید…"
        className="text-fg mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-8 shadow-inner shadow-slate-100 transition-colors outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 dark:border-white/15 dark:bg-white/5 dark:shadow-none"
      />
      <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-300">
        این صندوق کانال پاسخ فوری نیست. در بحران یا فوریت پزشکی از خدمات اورژانس
        کمک بگیرید.
      </p>
      {state.error && (
        <p role="alert" className="mt-3 text-sm font-bold text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="mt-3 text-sm font-bold text-teal-700">
          پیام شما ثبت شد.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-l from-teal-700 to-blue-700 px-5 text-sm font-extrabold text-white shadow-md shadow-blue-900/15 transition-transform disabled:opacity-60 motion-safe:hover:-translate-y-0.5"
      >
        <SendHorizonal size={17} aria-hidden="true" />
        {pending ? "در حال ارسال…" : "ارسال پیام"}
      </button>
    </form>
  );
}
