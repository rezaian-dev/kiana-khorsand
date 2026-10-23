"use client";

import { panelErrorClassName } from "@/components/panels/panel-styles";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ArticleCoverUpload({ current }: { current: string | null }) {
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const image = preview || current;
  return (
    <div className="admin-article-cover-upload grid min-w-0 gap-[.7rem] rounded-[20px] bg-[var(--surface)] p-4 [border:1px_solid_var(--line)]">
      <label className="font-extrabold!" htmlFor="article-cover-upload">
        یا کاور اختصاصی بارگذاری کنید
      </label>
      <input
        id="article-cover-upload"
        className="w-full min-w-0"
        name="coverUpload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={async (event) => {
          const input = event.currentTarget;
          const file = input.files?.[0];
          let message =
            file &&
            (file.size > 2_000_000 ||
              !["image/jpeg", "image/png", "image/webp"].includes(file.type))
              ? "فایل JPG، PNG یا WebP تا ۲ مگابایت انتخاب کنید."
              : "";
          if (file && !message && "createImageBitmap" in window) {
            input.setCustomValidity("تصویر در حال بررسی است.");
            try {
              const bitmap = await createImageBitmap(file);
              if (bitmap.width < 500 || bitmap.height < 280)
                message = "ابعاد کاور باید دست‌کم ۵۰۰ در ۲۸۰ پیکسل باشد.";
              bitmap.close();
            } catch {
              message = "تصویر خوانده نشد؛ یک فایل تصویری سالم انتخاب کنید.";
            }
          }
          // A slower decode of an older selection must not invalidate a newer one.
          if (input.files?.[0] !== file) return;
          input.setCustomValidity(message);
          setError(message);
          setPreview(file && !message ? URL.createObjectURL(file) : "");
        }}
      />
      <p className="panel-help">
        JPG، PNG یا WebP با ابعاد حداقل ۵۰۰×۲۸۰ و حجم تا ۲ مگابایت. تصویر پس از
        ذخیره به WebP بهینه و بدون فراداده تبدیل می‌شود؛ فایل انتخابی بر تصویر
        گالری اولویت دارد.
      </p>
      {error && (
        <p role="alert" className={panelErrorClassName}>
          {error}
        </p>
      )}
      {image && (
        <Image
          src={image}
          alt="پیش‌نمایش کاور مقاله"
          width={560}
          height={315}
          unoptimized
          className="admin-article-cover-preview block aspect-video h-auto w-[min(100%,560px)] rounded-[16px_16px_16px_5px] object-cover"
        />
      )}
    </div>
  );
}
