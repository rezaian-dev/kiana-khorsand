"use client";

import {
  communityButtonClassName,
  communityFieldClassName,
} from "./community-classes";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useTransition, type FormEvent } from "react";
import { MessageSquareHeart } from "lucide-react";
import { toast } from "sonner";
import { submitReview } from "@/actions/community";
import { showSignInToast } from "./sign-in-toast";

export function ReviewSubmission({
  authenticated,
}: {
  authenticated: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authenticated)
      return showSignInToast("برای ثبت تجربه ابتدا وارد حساب شوید.");
    const form = event.currentTarget;
    const data = new FormData(form);
    start(async () => {
      try {
        const result = await submitReview(data);
        if (result.ok) {
          toast.success(result.message);
          form.reset();
          setOpen(false);
        } else toast.error(result.message);
      } catch {
        toast.error("تجربه ثبت نشد؛ دوباره تلاش کنید.");
      }
    });
  }
  return (
    <div className="community-review mt-5 mb-6">
      <button
        type="button"
        className={communityButtonClassName}
        aria-expanded={open}
        aria-controls="review-form"
        onClick={() =>
          authenticated
            ? setOpen(!open)
            : showSignInToast("برای ثبت تجربه ابتدا وارد حساب شوید.")
        }
      >
        <MessageSquareHeart size={19} aria-hidden="true" /> ثبت تجربهٔ من
      </button>
      {open && (
        <form
          id="review-form"
          className="community-review-form mt-4 grid max-w-[590px] gap-3 rounded-[22px] border border-[var(--line)] bg-[var(--surface)] p-[clamp(1rem,3vw,1.5rem)] [box-shadow:var(--shadow-soft)]"
          onSubmit={onSubmit}
        >
          <label className="font-[750]" htmlFor="review-experience">
            خدمت یا کارگاه مرتبط (اختیاری)
          </label>
          <input
            id="review-experience"
            className={communityFieldClassName}
            name="experience"
            maxLength={120}
            placeholder="مثلاً کارگاه تنظیم هیجان"
          />
          <label className="font-[750]" htmlFor="review-quote">
            تجربهٔ شما
          </label>
          <textarea
            id="review-quote"
            className={communityFieldClassName}
            name="quote"
            required
            minLength={30}
            maxLength={600}
            rows={5}
            placeholder="تجربه‌تان را با کلمات خودتان بنویسید…"
          />
          <label
            className="community-consent flex [align-items:start] gap-[.6rem] text-[.88rem] font-[750] [&_input]:mt-[.2rem] [&_input]:size-[18px] [&_input]:shrink-0 [&_input]:accent-[var(--c-teal)]"
            htmlFor="review-consent"
          >
            <Checkbox
              className="mt-[.12rem]"
              id="review-consent"
              name="consent"
              value="yes"
              required
              aria-label="رضایت انتشار تجربه"
            />{" "}
            با بررسی متن و انتشار آن پس از تأیید موافقم.
          </label>
          <button type="submit" className="site-button" disabled={pending}>
            {pending ? "در حال ارسال…" : "ارسال برای بررسی"}
          </button>
        </form>
      )}
    </div>
  );
}
