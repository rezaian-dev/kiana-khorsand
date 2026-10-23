import {
  panelButtonClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import { formatToman } from "@/lib/format";
import {
  markWorkshopAttendance,
  moderateWorkshopReview,
  setEnrollmentStatus,
} from "@/actions/workshop-reviews";

type Enrollment = {
  id: string;
  userId: string;
  workshopId: string;
  name: string;
  status: "pending" | "active" | "cancelled";
  attendedAt: string | null;
  createdAt: string;
  priceAtRequest: number | null;
  discountPercentAtRequest: number | null;
};
type Review = {
  id: string;
  workshopId: string;
  name: string;
  body: string;
  rating: number;
  status: "pending" | "published" | "hidden";
};

export function WorkshopCommunityManager({
  slug,
  ended,
  enrollments,
  reviews,
}: {
  slug: string;
  ended: boolean;
  enrollments: Enrollment[];
  reviews: Review[];
}) {
  return (
    <details className="workshop-admin-community border-t border-[var(--panel-line,var(--line))] py-4">
      <summary>
        ثبت‌نام‌ها ({enrollments.length}) و نظرها ({reviews.length})
      </summary>
      <div className="grid gap-[.8rem] pt-4">
        <h3>ثبت‌نام‌ها و حضور</h3>
        {!enrollments.length && (
          <p className={panelMutedClassName}>
            هنوز درخواست ثبت‌نامی ثبت نشده است.
          </p>
        )}
        {enrollments.map((item) => (
          <div
            className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-[var(--panel-line,var(--line))] p-[.85rem]"
            key={item.id}
          >
            <div className="min-w-0 flex-1 wrap-anywhere">
              <strong>{item.name}</strong>
              <p className={`${panelMutedClassName} leading-[1.8]`}>
                {item.status === "active"
                  ? "تأییدشده"
                  : item.status === "pending"
                    ? "در انتظار تأیید"
                    : "لغوشده"}{" "}
                · {item.attendedAt ? "حضور ثبت‌شده" : "حضور ثبت‌نشده"}
                {item.priceAtRequest !== null && (
                  <> · قیمت هنگام درخواست: {formatToman(item.priceAtRequest)}</>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.status !== "active" && (
                <form action={setEnrollmentStatus}>
                  <input type="hidden" name="slug" value={slug} />
                  <input type="hidden" name="userId" value={item.userId} />
                  <input type="hidden" name="status" value="active" />
                  <button
                    className={`${panelButtonClassName} min-h-[38px]! text-[.8rem]!`}
                    type="submit"
                  >
                    تأیید ثبت‌نام
                  </button>
                </form>
              )}
              {item.status === "active" && (
                <>
                  <form action={setEnrollmentStatus}>
                    <input type="hidden" name="slug" value={slug} />
                    <input type="hidden" name="userId" value={item.userId} />
                    <input type="hidden" name="status" value="cancelled" />
                    <button
                      className="panel-button-muted min-h-[38px]! text-[.8rem]!"
                      type="submit"
                    >
                      لغو ثبت‌نام
                    </button>
                  </form>
                  {ended && !item.attendedAt && (
                    <form action={markWorkshopAttendance}>
                      <input type="hidden" name="slug" value={slug} />
                      <input type="hidden" name="userId" value={item.userId} />
                      <button
                        className={`${panelButtonClassName} min-h-[38px]! text-[.8rem]!`}
                        type="submit"
                      >
                        تأیید حضور
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <h3 className="mt-[1.3rem]">نظرهای این کارگاه</h3>
        {!reviews.length && (
          <p className={panelMutedClassName}>هنوز نظری ارسال نشده است.</p>
        )}
        {reviews.map((item) => (
          <div
            className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-[var(--panel-line,var(--line))] p-[.85rem]"
            key={item.id}
          >
            <div className="min-w-0 flex-1 wrap-anywhere">
              <strong>
                {item.name} · {item.rating} از ۵
              </strong>
              <p className="leading-[1.8]">{item.body}</p>
              <small className={panelMutedClassName}>
                {item.status === "pending"
                  ? "در انتظار بررسی"
                  : item.status === "published"
                    ? "منتشرشده"
                    : "پنهان"}
              </small>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["published", "hidden"] as const)
                .filter((status) => status !== item.status)
                .map((status) => (
                  <form action={moderateWorkshopReview} key={status}>
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="status" value={status} />
                    <button
                      className={
                        status === "published"
                          ? `${panelButtonClassName} min-h-[38px]! text-[.8rem]!`
                          : "panel-button-muted min-h-[38px]! text-[.8rem]!"
                      }
                      type="submit"
                    >
                      {status === "published" ? "انتشار نظر" : "پنهان‌کردن"}
                    </button>
                  </form>
                ))}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
