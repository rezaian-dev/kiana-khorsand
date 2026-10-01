import { CalendarDays, Clock3 } from "lucide-react";
import { CancelForm } from "@/components/sections/appointments/cancel-form";
import { Badge } from "@/components/ui/badge";
import { services } from "@/content/services";
import { appointmentStates } from "@/lib/constants";
import { formatDate } from "@/lib/format";
import { appointmentLabels, type Visit } from "@/lib/visits";

type Props = { visit: Visit };

export function AppointmentCard({ visit }: Props) {
  const title = services.find((service) => service.key === visit.service)?.title ?? "جلسهٔ مشاوره";
  const date = formatDate(new Date(visit.startsAt));
  const time = `${formatDate(new Date(visit.startsAt), { hour: "2-digit", minute: "2-digit" })} تا ${formatDate(new Date(visit.endsAt), { hour: "2-digit", minute: "2-digit" })}`;
  return <article className="visit-card" data-status={visit.status}><div className="visit-heading"><span className="member-symbol"><CalendarDays aria-hidden="true" /></span><Badge variant="outline">{appointmentLabels[visit.status]}</Badge></div><h3>{title}</h3><p className="visit-date"><CalendarDays aria-hidden="true" /><time dateTime={visit.startsAt}>{date}</time></p><p className="visit-date"><Clock3 aria-hidden="true" /><span>{time} · به وقت تهران</span></p><p className="visit-note">{visit.status === appointmentStates.pending ? "ثبت درخواست، تأیید نهایی جلسه نیست؛ وضعیت را در همین صفحه پیگیری کنید." : visit.status === appointmentStates.confirmed ? "وضعیت ثبت‌شدهٔ جلسه تأیید است؛ جزئیات هماهنگی را از راه ارتباط معتبر بررسی کنید." : visit.status === appointmentStates.cancelled ? "این نوبت لغو شده است. لغو، به‌خودی‌خود تأیید بازپرداخت نیست." : "این جلسه در سامانه برگزارشده ثبت شده است."}</p><div className="visit-action"><CancelForm id={visit.id} revision={visit.revision} canCancel={visit.canCancel} title={title} date={date} time={time} /><noscript><p>برای تغییر نوبت، جاوااسکریپت لازم است.</p></noscript></div></article>;
}
