"use client";

import { useState, useTransition } from "react";
import { communityButtonClassName } from "./community-styles";
import { toast } from "sonner";
import { CalendarHeart } from "lucide-react";
import { requestWorkshop } from "@/actions/community";
import { showSignInToast } from "./sign-in-toast";

export function WorkshopRequest({
  slug,
  authenticated,
  status,
  closed,
}: {
  slug: string;
  authenticated: boolean;
  status?: "pending" | "active" | "cancelled";
  closed: boolean;
}) {
  const [pending, start] = useTransition();
  const [requested, setRequested] = useState(false);
  return (
    <button
      type="button"
      className={communityButtonClassName}
      disabled={pending || requested || Boolean(status) || closed}
      onClick={() => {
        if (!authenticated)
          return showSignInToast(
            "برای ثبت‌نام در کارگاه ابتدا وارد حساب شوید.",
          );
        start(async () => {
          try {
            const result = await requestWorkshop(slug);
            if (result.ok) {
              setRequested(true);
              toast.success(result.message);
            } else toast.error(result.message);
          } catch {
            toast.error("درخواست ثبت نشد؛ دوباره تلاش کنید.");
          }
        });
      }}
    >
      <CalendarHeart size={19} aria-hidden="true" />
      {pending
        ? "در حال ثبت..."
        : status === "active"
          ? "ثبت‌نام تأییدشده"
          : status === "pending"
            ? "در انتظار تأیید ثبت‌نام"
            : status === "cancelled"
              ? "ثبت‌نام لغوشده"
              : requested
                ? "درخواست ثبت شد"
                : closed
                  ? "مهلت ثبت‌نام پایان یافته است"
                  : "درخواست ثبت‌نام در کارگاه"}
    </button>
  );
}
