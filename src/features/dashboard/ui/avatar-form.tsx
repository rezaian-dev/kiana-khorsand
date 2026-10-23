"use client";

import {
  panelCardClassName,
  panelButtonClassName,
  panelMutedClassName,
  panelErrorClassName,
} from "@/components/panels/panel-styles";

import Image from "next/image";
import { safeAvatarUrl } from "@/lib/avatar-url";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Camera, UserRound } from "lucide-react";
import { uploadAvatar } from "@/actions/avatar";

export function AvatarForm({
  name,
  image,
  userId,
}: {
  name: string;
  image?: string | null;
  userId: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [current, setCurrent] = useState(safeAvatarUrl(image, userId) || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, start] = useTransition();
  const previewUrl = useRef("");
  const router = useRouter();
  useEffect(
    () => () => {
      if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    },
    [],
  );
  function choose(next: File | null) {
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
    previewUrl.current = next ? URL.createObjectURL(next) : "";
    setPreview(previewUrl.current);
    setFile(next);
    setError("");
    setSuccess(false);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    const form = event.currentTarget;
    start(async () => {
      try {
        const result = await uploadAvatar(
          { error: "", image: "" },
          new FormData(form),
        );
        if (result.error) {
          setError(result.error);
          return;
        }
        setCurrent(result.image);
        setSuccess(true);
        setFile(null);
        setPreview("");
        if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
        previewUrl.current = "";
        form.reset();
        router.refresh();
      } catch {
        setError("ذخیرهٔ عکس انجام نشد؛ دوباره تلاش کنید.");
      }
    });
  }
  const source = preview || current;
  return (
    <form
      onSubmit={submit}
      className={`${panelCardClassName} grid min-w-0 gap-4 rounded-[22px]! p-[clamp(1rem,3vw,1.65rem)]!`}
      encType="multipart/form-data"
    >
      <div className="flex items-center gap-[1.1rem] max-[440.02px]:items-start">
        <span className="grid size-[100px] shrink-0 place-items-center overflow-hidden rounded-[28px] border-[3px] border-[var(--panel-surface)] bg-[color-mix(in_srgb,var(--panel-accent)_9%,var(--panel-surface))] text-[var(--panel-accent)] shadow-[0_0_0_2px_color-mix(in_srgb,var(--panel-accent)_25%,transparent),0_18px_32px_-20px_#1f344783] max-[440.02px]:size-[72px] max-[440.02px]:rounded-[22px]">
          {source ? (
            <Image
              src={source}
              alt={`آواتار ${name}`}
              width={100}
              height={100}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            <UserRound size={43} aria-hidden="true" />
          )}
        </span>
        <div>
          <h2 className="text-[1.1rem] font-[850]!">تصویر حساب کاربری</h2>
          <p
            className={`${panelMutedClassName} mt-[.35rem] text-[.85rem] leading-[1.9]!`}
          >
            یک تصویر واضح از خودتان انتخاب کنید. فقط وقتی نظری منتشر شود،
            تصویرتان کنار آن دیده خواهد شد.
          </p>
        </div>
      </div>
      <div className="grid gap-2">
        <label
          htmlFor="avatar-upload"
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-[14px] border border-[var(--panel-line)] bg-[var(--panel-bg)] px-4 py-[.65rem] font-[750] text-[var(--panel-text)] transition-colors duration-200 ease-[ease] focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-[var(--panel-accent)] hover:bg-[color-mix(in_srgb,var(--panel-accent)_8%,var(--panel-surface))] motion-reduce:transition-none"
        >
          <Camera size={18} aria-hidden="true" />
          انتخاب تصویر JPG، PNG یا WebP
          <input
            id="avatar-upload"
            name="avatar"
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => choose(event.currentTarget.files?.[0] || null)}
          />
        </label>
        <p
          className="m-0 truncate text-[.78rem] text-[var(--panel-muted)]"
          aria-live="polite"
        >
          {file ? `فایل انتخاب‌شده: ${file.name}` : "فایلی انتخاب نشده است."}
        </p>
      </div>
      <p className={panelMutedClassName}>
        حداکثر ۷۵۰ کیلوبایت؛ تصویر بعد از ثبت، به‌شکل مربع و بدون فرادادهٔ اضافی
        ذخیره می‌شود.
      </p>
      {error && (
        <p className={panelErrorClassName} role="alert">
          {error}
        </p>
      )}
      {success && <p role="status">تصویر حساب به‌روزرسانی شد.</p>}
      <button
        type="submit"
        className={panelButtonClassName}
        disabled={!file || pending}
      >
        {pending ? "در حال ذخیرهٔ تصویر…" : "اعمال تصویر حساب"}
      </button>
    </form>
  );
}
