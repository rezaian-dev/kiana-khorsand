import { CalendarDays } from "lucide-react";
import { services } from "@/content/services";
import { Badge } from "@/components/ui/badge";
import { formatDate, getInitials } from "@/lib/format";
import { appointmentLabels } from "@/lib/visits";
import type { AdminVisit } from "@/lib/admin";

type Props = { entries: AdminVisit[]; isDated?: boolean };

export function ScheduleList({ entries, isDated = false }: Props) {
  if (!entries.length) return <div className="dashboard-empty"><CalendarDays aria-hidden="true" /><h3>نوبتی برای نمایش نیست.</h3><p>این بخش فقط نوبت‌های در انتظار تأیید یا تأییدشده را نشان می‌دهد؛ نبود ردیف، خطای خواندن نیست.</p></div>;
  return <ul className="schedule-list">{entries.map((entry) => <li key={entry.id} data-status={entry.status}><span className="schedule-avatar" aria-hidden="true">{getInitials(entry.name)}</span><div className="schedule-person"><h3>{entry.name}</h3><p>{services.find((service) => service.key === entry.service)?.title ?? "جلسهٔ مشاوره"}</p>{isDated && <p>{formatDate(new Date(entry.startsAt), { weekday: "short", month: "long", day: "numeric" })}</p>}</div><div className="schedule-time"><time dateTime={entry.startsAt}>{formatDate(new Date(entry.startsAt), { hour: "2-digit", minute: "2-digit" })}</time><span>تا {formatDate(new Date(entry.endsAt), { hour: "2-digit", minute: "2-digit" })}</span><Badge variant="outline">{appointmentLabels[entry.status]}</Badge></div></li>)}</ul>;
}
