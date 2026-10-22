"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteUserAccount, setUserRole } from "../actions";
import type { UserActionResult } from "../types";

/**
 * Confirmation gate for every destructive account change.
 *
 * Radix AlertDialog is modal by design: it traps focus, is announced as an alert
 * dialog, and requires an explicit confirm or cancel — the exact behaviour asked for
 * before promoting or deleting somebody.
 * https://ui.shadcn.com/docs/components/alert-dialog
 */

const triggerBase =
  "inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-[.7rem] border border-[var(--panel-line)] bg-[var(--panel-surface)] px-3 text-[.8rem] font-extrabold transition-colors hover:bg-[var(--panel-bg)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--panel-accent)] disabled:cursor-not-allowed disabled:opacity-45";

export function UserActions({
  userId,
  name,
  role,
  isSelf,
}: {
  userId: string;
  name: string;
  role: "user" | "admin";
  isSelf: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const promote = role === "user";

  const run = (task: () => Promise<UserActionResult>) =>
    startTransition(async () => {
      const result = await task();
      if (result.ok) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });

  if (isSelf) {
    return (
      <span className="text-[.75rem] font-bold text-[var(--panel-muted)]">
        حساب شما
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button type="button" className={triggerBase} disabled={pending}>
            {promote ? (
              <ShieldCheck className="size-4" aria-hidden="true" />
            ) : (
              <ShieldOff className="size-4" aria-hidden="true" />
            )}
            {promote ? "ارتقا به مدیر" : "تبدیل به کاربر"}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {promote ? "ارتقای این حساب به مدیر؟" : "گرفتن دسترسی مدیریت؟"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {promote
                ? `«${name}» پس از تأیید به همهٔ بخش‌های مدیریتی سایت، از جمله حذف داده‌ها و تغییر تنظیمات، دسترسی پیدا می‌کند.`
                : `«${name}» دسترسی مدیریت را از دست می‌دهد و به کاربر عادی تبدیل می‌شود.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              disabled={pending}
              onClick={() =>
                run(() => setUserRole(userId, promote ? "admin" : "user"))
              }
            >
              {pending && (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {promote ? "تأیید و ارتقا" : "تأیید و تبدیل"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className={`${triggerBase} border-[#e5bdc8] text-[#9c2148] hover:bg-[#fdf1f4] dark:border-[#6d3d4d] dark:text-[#ffb3c2] dark:hover:bg-[#38222c]`}
            disabled={pending}
          >
            <Trash2 className="size-4" aria-hidden="true" />
            حذف حساب
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف حساب «{name}»؟</AlertDialogTitle>
            <AlertDialogDescription>
              این کار قابل بازگشت نیست: حساب، نشست‌های فعال و اطلاعات ورود کاربر
              برای همیشه حذف می‌شوند.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>انصراف</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={pending}
              onClick={() => run(() => deleteUserAccount(userId))}
            >
              {pending && (
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              تأیید و حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
