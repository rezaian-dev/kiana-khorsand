import Image from "next/image";
import { BadgeCheck, Phone, ShieldCheck } from "lucide-react";
import { safeAvatarUrl } from "@/lib/avatar-url";
import { formatDate } from "@/lib/format";

/**
 * Read-only identity block at the top of the customer profile.
 * It is customer-facing only: nothing here links into the administrator area.
 */
export function ProfileSummary({
  name,
  phone,
  image,
  userId,
  createdAt,
}: {
  name: string;
  phone: string;
  image?: string | null;
  userId: string;
  createdAt?: Date | string | null;
}) {
  const avatar = safeAvatarUrl(image, userId);

  return (
    <section
      aria-labelledby="profile-summary-title"
      className="overflow-hidden rounded-[1.2rem] border border-(--panel-line) bg-(--panel-surface)"
    >
      <div className="h-20 bg-[linear-gradient(115deg,#0f6f6c,#27547a_58%,#5a3f86)]" />
      <div className="-mt-9 grid gap-3 px-5 pb-5">
        <span className="grid size-[72px] place-items-center overflow-hidden rounded-full border-4 border-(--panel-surface) bg-[#e8f4f2] text-[1.4rem] font-extrabold text-(--panel-accent)">
          {avatar ? (
            <Image
              src={avatar}
              alt=""
              width={72}
              height={72}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            name.trim().slice(0, 1)
          )}
        </span>

        <div className="grid gap-1">
          <h2
            id="profile-summary-title"
            className="m-0 flex flex-wrap items-center gap-2 text-[1.15rem] font-extrabold"
          >
            {name}
            <span className="inline-flex items-center gap-1 rounded-full border border-[#9fd3c9] bg-[#e8f7f3] px-2 py-0.5 text-[.68rem] font-extrabold text-[#12655c] dark:border-[#3f6e68] dark:bg-[#1f3a37] dark:text-[#a6ece0]">
              <BadgeCheck className="size-3" aria-hidden="true" />
              کاربر
            </span>
          </h2>
          <p className="m-0 flex items-center gap-1.5 text-[.85rem] text-(--panel-muted)">
            <Phone className="size-3.5" aria-hidden="true" />
            <span dir="ltr" className="tabular-nums">
              {phone || "—"}
            </span>
          </p>
          {createdAt && (
            <p className="m-0 text-[.75rem] text-(--panel-muted)">
              عضو از {formatDate(new Date(createdAt))}
            </p>
          )}
        </div>

        <p className="m-0 flex items-start gap-2 rounded-[.8rem] border border-(--panel-line) bg-(--panel-bg) px-3 py-2.5 text-[.76rem]/6 text-(--panel-muted)">
          <ShieldCheck className="mt-0.5 size-4 flex-none" aria-hidden="true" />
          اطلاعات این بخش خصوصی است و فقط برای همین حساب نمایش داده می‌شود.
        </p>
      </div>
    </section>
  );
}
