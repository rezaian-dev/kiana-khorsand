import Link from "next/link";
import { routes } from "@/lib/constants";
import { Mail } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { AdminMessage } from "@/lib/admin";

type Props = { messages: AdminMessage[] };

export function MessagePreview({ messages }: Props) {
  return messages.length ? <ul className="message-preview">{messages.map((message) => <li key={message.id}><Mail aria-hidden="true" /><div><Link className="message-link" prefetch={false} href={`${routes.inbox}?id=${encodeURIComponent(message.id)}`}><strong>{message.name}</strong></Link><span>پیام تماس · خوانده‌نشده</span><time dateTime={message.createdAt}>{formatDate(new Date(message.createdAt), { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</time></div></li>)}</ul> : <p className="dashboard-empty">پیام خوانده‌نشده‌ای ثبت نشده است.</p>;
}
