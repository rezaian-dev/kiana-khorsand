"use client";

import {
  panelMutedClassName,
  panelErrorClassName,
} from "@/components/panels/panel-styles";

import {
  startTransition,
  useActionState,
  type ReactNode,
  type FormEvent,
} from "react";
import type { AdminFeedback } from "@/types/admin";
import { toast } from "sonner";
import { saveWorkshop } from "@/actions/admin";

export function WorkshopForm({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const [state, action, pending] = useActionState(saveWorkshop, {
    error: "",
    success: "",
  } satisfies AdminFeedback);
  function validate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const percent = Number(data.get("discountPercent") || 0);
    if (percent !== 0) {
      const from = String(data.get("discountFrom") || "");
      const to = String(data.get("discountTo") || "");
      if (!from || !to || from > to || Number(data.get("price")) === 0) {
        toast.error(
          "برای تخفیف، قیمت مثبت و بازهٔ کامل و معتبر را انتخاب کنید.",
        );
        return;
      }
    }
    // Keep form values on a server-side validation error or a successful save.
    startTransition(() => action(data));
  }
  return (
    <form
      action={action}
      className={className}
      onSubmit={validate}
      aria-busy={pending}
    >
      {children}
      {pending && (
        <p role="status" className={panelMutedClassName}>
          در حال ذخیرهٔ کارگاه…
        </p>
      )}
      {state.error && (
        <p role="alert" className={panelErrorClassName}>
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="panel-success">
          {state.success}
        </p>
      )}
    </form>
  );
}
