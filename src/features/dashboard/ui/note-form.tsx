"use client";

import {
  panelFormClassName,
  panelCardClassName,
  panelButtonClassName,
  panelMutedClassName,
  panelErrorClassName,
} from "@/components/panels/panel-layout-classes";
import { useActionState } from "react";
import { createNote } from "@/actions/dashboard";
import type { PanelState } from "@/types/dashboard";
const initial: PanelState = { error: "", success: false };
export function NoteForm() {
  const [state, action, pending] = useActionState(createNote, initial);
  return (
    <form
      action={action}
      className={`${panelCardClassName} ${panelFormClassName}`}
    >
      <h2>یادداشت تازه</h2>
      <label htmlFor="note-title">عنوان</label>
      <input
        id="note-title"
        name="title"
        required
        minLength={2}
        maxLength={120}
      />
      <label htmlFor="note-body">متن یادداشت</label>
      <textarea
        id="note-body"
        name="body"
        required
        minLength={2}
        maxLength={3000}
      />
      <p className={panelMutedClassName}>
        این یادداشت فقط در حساب شما نمایش داده می‌شود.
      </p>
      {state.error && (
        <p role="alert" className={panelErrorClassName}>
          {state.error}
        </p>
      )}
      {state.success && <p role="status">یادداشت ذخیره شد.</p>}
      <div>
        <button
          className={panelButtonClassName}
          disabled={pending}
          type="submit"
        >
          {pending ? "در حال ذخیره…" : "ذخیره یادداشت"}
        </button>
      </div>
    </form>
  );
}
