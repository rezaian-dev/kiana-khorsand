import { MessageState } from "./message-state";
import type { InboxRecord } from "@/lib/queue";
import { queueLabels } from "@/lib/queue";
import { formatDate } from "@/lib/format";

type Props = { record: InboxRecord };

export function MessageDetail({ record }: Props) {
  return <article><h2>{record.name || "فرستندهٔ بدون نام"}</h2><dl className="client-details"><div><dt>ایمیل</dt><dd><bdi>{record.email}</bdi></dd></div><div><dt>دریافت</dt><dd><time dateTime={record.createdAt}>{formatDate(new Date(record.createdAt), { dateStyle: "medium", timeStyle: "short" })}</time></dd></div><div><dt>وضعیت سرور</dt><dd>{queueLabels[record.status]}</dd></div></dl><h3>متن پیام</h3><p className="private-text">{record.message}</p><p className="panel-note">این صندوق پاسخ ایمیلی ارسال نمی‌کند و برای وضعیت اضطراری نیست. برای پاسخ‌گویی، از راه ارتباطیِ تأییدشده و مطابق سیاست محرمانگی استفاده کنید؛ هیچ ارسال خارجی خودکاری نداریم.</p><MessageState key={record.id} value={{ id: record.id, revision: record.revision, status: record.status }} /></article>;
}
