"use client";

import {
  siteBadgeClassName,
  siteContainerClassName,
} from "@/components/shared/public-layout-classes";

import { useState, useTransition, type FormEvent } from "react";
import Image from "next/image";
import { PanelSelect } from "@/components/panels/panel-select";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { submitWorkshopReview } from "@/actions/workshop-reviews";
import { showSignInToast } from "./sign-in-toast";

const reviewSurface =
  "rounded-[24px] border border-[color:color-mix(in_srgb,var(--fg)_12%,transparent)] bg-[var(--surface)] p-[clamp(1.2rem,3vw,2rem)] [box-shadow:0_18px_50px_-40px_#1d344c80]";

export function WorkshopReviewForm({
  slug,
  authenticated,
  eligible,
  alreadyReviewed,
}: {
  slug: string;
  authenticated: boolean;
  eligible: boolean;
  alreadyReviewed: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [pending, start] = useTransition();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authenticated) {
      showSignInToast("برای ثبت نظر ابتدا وارد حساب شوید.");
      return;
    }
    if (!eligible || alreadyReviewed || sent) return;
    const form = event.currentTarget;
    start(async () => {
      try {
        const result = await submitWorkshopReview(slug, new FormData(form));
        if (result.ok) {
          setSent(true);
          toast.success(result.message);
        } else toast.error(result.message);
      } catch {
        toast.error("نظر ثبت نشد؛ دوباره تلاش کنید.");
      }
    });
  }
  return (
    <div className={`workshop-review-compose mt-6 ${reviewSurface}`}>
      <h3 className="mb-4">تجربهٔ شما از این کارگاه</h3>
      {!authenticated ? (
        <button
          className="site-button border! border-current! text-[var(--fg)]!"
          type="button"
          onClick={() => showSignInToast("برای ثبت نظر ابتدا وارد حساب شوید.")}
        >
          ورود برای ثبت نظر
        </button>
      ) : alreadyReviewed || sent ? (
        <p role="status" className="leading-[2]">
          نظر شما ثبت شده است؛ انتشار آن پس از بررسی انجام می‌شود.
        </p>
      ) : !eligible ? (
        <p className="leading-[2]">
          بعد از پایان کارگاه و تأیید ثبت‌نام و حضور شما توسط مدیر، امکان ثبت
          نظر فعال می‌شود.
        </p>
      ) : (
        <form
          onSubmit={submit}
          className="workshop-review-form grid max-w-[650px] gap-3"
        >
          <label htmlFor="workshop-rating" className="font-[750]">
            امتیاز کارگاه
          </label>
          <PanelSelect
            id="workshop-rating"
            name="rating"
            required
            defaultValue="5"
            triggerClassName="w-full! rounded-[14px]! border-[color:color-mix(in_srgb,var(--fg)_17%,transparent)]! bg-[var(--surface)]! p-4! text-[var(--fg)]!"
            options={[5, 4, 3, 2, 1].map((value) => ({
              value: String(value),
              label: `${value} از ۵ ستاره`,
            }))}
          />
          <label htmlFor="workshop-review-body" className="font-[750]">
            نظر شما
          </label>
          <textarea
            id="workshop-review-body"
            className="w-full rounded-[14px] border border-[color:color-mix(in_srgb,var(--fg)_17%,transparent)] bg-[var(--surface)] p-4 text-[var(--fg)]"
            name="body"
            minLength={30}
            maxLength={1000}
            rows={5}
            placeholder="تجربهٔ خود را با دیگران به اشتراک بگذارید…"
            required
          />
          <button
            className="site-button [justify-self:start]"
            disabled={pending}
          >
            {pending ? "در حال ثبت…" : "ارسال نظر برای بررسی"}
          </button>
        </form>
      )}
    </div>
  );
}

export function WorkshopReviews({
  reviews,
  slug,
  authenticated,
  eligible,
  alreadyReviewed,
}: {
  reviews: {
    id: string;
    name: string;
    body: string;
    rating: number;
    createdAt: string;
    image: string | null;
  }[];
  slug: string;
  authenticated: boolean;
  eligible: boolean;
  alreadyReviewed: boolean;
}) {
  return (
    <section
      className={`${siteContainerClassName} workshop-reviews py-[clamp(3rem,7vw,6rem)]`}
      aria-labelledby="workshop-reviews-heading"
    >
      <div className="workshop-reviews-heading mb-8 max-w-[640px]">
        <span className={siteBadgeClassName}>تجربهٔ شرکت‌کنندگان</span>
        <h2
          id="workshop-reviews-heading"
          className="my-3 text-[clamp(1.7rem,3vw,2.5rem)]"
        >
          نظرها دربارهٔ این کارگاه
        </h2>
        <p className="leading-[2] opacity-[0.78]">
          نظرهای منتشرشده متعلق به شرکت‌کنندگانِ دارای حضور تأییدشده است.
        </p>
      </div>
      {reviews.length ? (
        <div className="workshop-review-grid grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-[1.2rem]">
          {reviews.map((review) => (
            <article
              className={`workshop-review-card flex flex-col gap-4 ${reviewSurface}`}
              key={review.id}
            >
              <div
                className="workshop-review-stars flex gap-[0.2rem] text-[#b28231]"
                role="img"
                aria-label={`${review.rating} از ۵ ستاره`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < review.rating ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="flex-1 leading-[2] [overflow-wrap:anywhere]">
                {review.body}
              </blockquote>
              <footer className="flex flex-wrap items-center justify-between gap-2 text-[0.82rem]">
                <div className="workshop-review-author inline-flex items-center gap-[0.65rem]">
                  {review.image && (
                    <Image
                      className="size-10 rounded-[50%] object-cover"
                      src={review.image}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                    />
                  )}
                  <strong>{review.name}</strong>
                </div>
                <time dateTime={review.createdAt} className="opacity-70">
                  {new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                    timeZone: "Asia/Tehran",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(review.createdAt))}
                </time>
              </footer>
            </article>
          ))}
        </div>
      ) : (
        <p
          className={`workshop-review-empty leading-[2] opacity-[0.78] ${reviewSurface}`}
        >
          هنوز نظری برای این کارگاه منتشر نشده است. اگر در آن شرکت کرده‌اید،
          نخستین تجربه را ثبت کنید.
        </p>
      )}
      <WorkshopReviewForm
        slug={slug}
        authenticated={authenticated}
        eligible={eligible}
        alreadyReviewed={alreadyReviewed}
      />
    </section>
  );
}
