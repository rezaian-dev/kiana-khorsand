import { ReviewForm } from "./review-form";
import { Photo } from "@/components/shared/photo";
import { images } from "@/content/images";
import { queueLabels, type ReviewRecord } from "@/lib/queue";
import { formatDate } from "@/lib/format";

type Props = { record: ReviewRecord };

export function ReviewDetail({ record }: Props) {
  return <article><h2>{record.name}</h2><p>وضعیت ثبت‌شده: {queueLabels[record.status]} · {record.isSample ? "برچسب داخلی: نمونه" : "نیازمند بررسی اصالت"}</p><p><time dateTime={record.createdAt}>{formatDate(new Date(record.createdAt), { dateStyle: "medium", timeStyle: "short" })}</time></p><blockquote className="private-text">{record.quote}</blockquote>{record.image && <div className="review-photo"><Photo image={images[record.image]} sizes="160px" /></div>}<p className="panel-note">تصمیم فقط دربارهٔ همین متن و نام است؛ این پنجره شرح‌حال، امتیاز درمان یا گزارش تاریخچهٔ رضایت نیست.</p><ReviewForm key={record.id} value={{ id: record.id, revision: record.revision, status: record.status, hasConsent: record.hasConsent, isImageRemoved: record.image === null }} isSample={record.isSample} /></article>;
}
