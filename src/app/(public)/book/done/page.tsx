import {
  siteContainerClassName,
  siteDetailClassName,
  siteHeadingClassName,
} from "@/components/shared/site-styles";
import type { ReceiptPageProps } from "@/types/routes";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { isBookingId } from "@/validations/routes";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/session";
import { collection } from "@/db/collections";
import { formatDate, formatTime, formatToman } from "@/lib/format";
import { labels } from "@/lib/labels";
import { Intro } from "@/components/shared/intro";
import { MeetInviteNotice } from "@/components/shared/meet-invite-notice";

export const metadata = { title: "جزئیات رزرو", robots: { index: false } };
export default async function Page({ searchParams }: ReceiptPageProps) {
  const session = await requireUser();
  const { id } = await searchParams;
  if (!isBookingId(id)) notFound();
  const appointment = await collection("appointments").findOne({
    _id: new ObjectId(id),
    userId: session.user.id,
  });
  if (!appointment) notFound();
  const service = await collection("services").findOne({
    slug: appointment.serviceId,
  });
  return (
    <>
      <Intro story="fees" title="جزئیات درخواست رزرو" />
      {service?.mode === "online" && (
        <div className={siteContainerClassName}>
          <MeetInviteNotice />
        </div>
      )}
      <div className={siteDetailClassName}>
        <h2 className={siteHeadingClassName}>{service?.name}</h2>
        <p>
          {formatDate(appointment.startsAt)} ·{" "}
          {formatTime(appointment.startsAt)}
        </p>
        <p>{formatToman(appointment.price)}</p>
        <p>
          {appointment.status === "pending"
            ? "در انتظار تأیید"
            : appointment.status}
        </p>
        <Link href="/dashboard/appointments" className="site-button">
          نوبت‌های من
        </Link>
        <Link href="/book" className="site-button site-button-secondary">
          {labels.book}
        </Link>
      </div>
    </>
  );
}
