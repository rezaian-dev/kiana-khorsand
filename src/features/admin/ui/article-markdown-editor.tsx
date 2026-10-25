"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const Editor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
  loading: () => (
    <div
      className="article-editor-loading grid min-h-[200px] place-items-center rounded-[18px] border border-dashed border-(--panel-line)"
      role="status"
    >
      ویرایشگر در حال آماده‌سازی است…
    </div>
  ),
});
const parser = new MarkdownIt({
  html: false,
  linkify: false,
  typographer: true,
});

export function ArticleMarkdownEditor({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fixFocus = () => {
      const preview = root.current?.querySelector<HTMLElement>(".html-wrap");
      if (preview && !preview.hasAttribute("tabindex")) {
        preview.tabIndex = 0;
        preview.setAttribute("role", "region");
        preview.setAttribute("aria-label", "پیش‌نمایش مقاله");
      }
    };
    fixFocus();
    const observer = new MutationObserver(fixFocus);
    if (root.current)
      observer.observe(root.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={root}
      className="article-markdown-editor min-w-0"
      role="group"
      aria-labelledby="article-body-label"
    >
      <input type="hidden" name="body" value={value} />
      <Editor
        value={value}
        onChange={({ text }) => setValue(text)}
        renderHTML={(text) => parser.render(text)}
        className="h-[500px] max-w-full overflow-hidden rounded-[18px] bg-(--panel-surface)! text-(--panel-text)! [border:1px_solid_var(--panel-line)]! max-[640.02px]:min-h-[440px]! [&_.button-wrap]:text-(--panel-text)! [&_.button-wrap:hover]:text-(--panel-accent)! max-[640.02px]:[&_.editor-container]:flex-col! [&_.rc-md-navigation]:border-(--panel-line)! [&_.rc-md-navigation]:bg-(--ar-surface2)! [&_.section]:bg-(--panel-surface)! [&_.section]:text-(--panel-text)! [&_.section-container]:text-end! [&_textarea]:text-end!"
        htmlClass="custom-html-style [direction:rtl]! text-right! [font-family:inherit]! text-base! leading-8!"
        placeholder="متن مقاله را اینجا بنویسید…"
        plugins={[
          "header",
          "font-bold",
          "font-italic",
          "list-unordered",
          "list-ordered",
          "block-quote",
          "link",
          "clear",
          "mode-toggle",
          "full-screen",
        ]}
      />
      <p className="panel-help mt-[0.7rem]!" aria-live="polite">
        {new Intl.NumberFormat("fa-IR").format(value.length)} نویسه · حداقل ۴۰
        نویسه برای ذخیره. متن Markdown در نمایش عمومی ایمن رندر می‌شود.
      </p>
    </div>
  );
}
