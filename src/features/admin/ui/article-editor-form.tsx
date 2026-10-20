"use client";

import {
  panelAdminFormClassName,
  panelCardClassName,
  panelMutedClassName,
  panelErrorClassName,
} from "@/components/panels/panel-layout-classes";

import {
  createContext,
  startTransition,
  useActionState,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { saveArticle } from "@/actions/admin";
import { ArticleEmblem } from "@/features/articles/ui/article-emblem";
import {
  articleVisual,
  type ArticleVisual,
} from "@/features/articles/article-visual";
import type { AdminFeedback } from "@/types/admin";

const initial: AdminFeedback = { error: "", success: "" };
const VisualContext = createContext<{
  visual: ArticleVisual;
  slug: string;
} | null>(null);

export function ArticleEditorForm({
  children,
  initialVisual,
  initialSlug,
}: {
  children: ReactNode;
  initialVisual: ArticleVisual;
  initialSlug: string;
}) {
  const [state, action, pending] = useActionState(saveArticle, initial);
  const [preview, setPreview] = useState({
    visual: initialVisual,
    slug: initialSlug,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function readFields() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    // The Markdown editor updates a hidden input after the textarea event.
    const body =
      form.querySelector<HTMLTextAreaElement>(".rc-md-editor textarea")
        ?.value ?? String(data.get("body") ?? "");
    setPreview({
      visual: articleVisual({
        title: String(data.get("title") ?? ""),
        category: String(data.get("category") ?? ""),
        excerpt: String(data.get("excerpt") ?? ""),
        tags: String(data.get("tags") ?? "").split(/[,،\n]+/),
        body,
      }),
      slug: String(data.get("slug") ?? ""),
    });
  }
  function schedulePreview(event: FormEvent<HTMLFormElement>) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (
      !["title", "slug", "excerpt", "category", "tags", "body"].includes(
        target.getAttribute("name") ?? "",
      ) &&
      !target.closest(".article-markdown-editor")
    )
      return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(readFields, 180);
  }
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <VisualContext.Provider value={preview}>
      <form
        ref={formRef}
        action={action}
        className={`${panelCardClassName} ${panelAdminFormClassName}`}
        aria-busy={pending}
        onInputCapture={schedulePreview}
        onChangeCapture={schedulePreview}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          // Form Actions reset uncontrolled inputs after every response, including errors.
          // Dispatch manually so edits and the selected file survive validation feedback.
          event.preventDefault();
          if (timer.current) clearTimeout(timer.current);
          readFields();
          const data = new FormData(event.currentTarget);
          startTransition(() => action(data));
        }}
      >
        {children}
        {pending && (
          <p role="status" className={panelMutedClassName}>
            در حال بررسی و ذخیرهٔ مقاله…
          </p>
        )}
        {state.error && (
          <p role="alert" className={panelErrorClassName}>
            {state.error}
          </p>
        )}
      </form>
    </VisualContext.Provider>
  );
}

export function ArticleVisualPreview() {
  const preview = useContext(VisualContext);
  if (!preview) return null;
  return (
    <section
      className="admin-article-visual-preview flex min-w-0 items-center gap-4 rounded-[20px] border border-[color:color-mix(in_srgb,var(--panel-accent)_19%,var(--panel-line))] bg-[color:color-mix(in_srgb,var(--panel-accent)_4%,var(--panel-surface))] px-4 py-[.85rem] max-[359.02px]:gap-[.65rem] max-[359.02px]:px-[.7rem]"
      aria-labelledby="editor-icon-title"
    >
      <span className="admin-article-visual-icon block flex-none">
        <ArticleEmblem
          visual={preview.visual}
          slug={preview.slug || "new-article"}
          className="relative! inset-auto! grid! size-[68px]! place-items-center! rounded-[50%]! border-[6px]! border-[var(--panel-surface)]! max-[359.02px]:size-[68px]!"
        />
      </span>
      <div className="min-w-0">
        <h3 className="text-[.95rem] font-extrabold" id="editor-icon-title">
          نشان موضوعی مقاله
        </h3>
        <p className="mt-[.3rem] text-[.83rem] leading-[1.75]! text-[var(--panel-muted)]">
          {preview.visual.icon === "BookOpenText"
            ? "هنوز موضوع مشخصی شناسایی نشده؛ عنوان و متن دقیق‌تر، نشان مناسب‌تری پیشنهاد می‌کند."
            : `موضوع پیشنهادی: ${preview.visual.label}؛ این نشان پس از انتشار، خودکار روی کارت مقاله دیده می‌شود.`}
        </p>
      </div>
    </section>
  );
}
