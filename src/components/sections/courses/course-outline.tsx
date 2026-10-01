import { BookOpen, Check, Info } from "lucide-react";
import { Photo } from "@/components/shared/photo";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/published";
import { formatDate } from "@/lib/format";
import { topics } from "@/lib/constants";

type Props = { course: Course };

export function CourseOutline({ course }: Props) {
  return <article className="course-outline" id={course.slug} aria-labelledby={`${course.slug}-title`}><figure><Photo image={course.image} sizes="(min-width: 1024px) 36vw, 90vw" />{course.image.isSample && <figcaption>تصویر مفهومیِ هوش مصنوعی؛ نمایش کلاس واقعی نیست.</figcaption>}</figure><div className="outline-body"><div className="outline-badges"><Badge variant="secondary">{topics[course.category]}</Badge><Badge variant="outline">معرفی تأییدشده</Badge></div><h3 id={`${course.slug}-title`}>{course.title}</h3><p>{course.description}</p><p className="muted">مدرس معرفی‌شده: {course.author}</p><p className="section-disclosure">انتشار: <time dateTime={course.publishedAt}>{formatDate(new Date(course.publishedAt))}</time> · آخرین ویرایش: <time dateTime={course.updatedAt}>{formatDate(new Date(course.updatedAt))}</time></p><h4>این موضوع برای چه کسانی در نظر گرفته شده؟</h4><p className="muted">{course.audience}</p><h4><BookOpen aria-hidden="true" />سرفصل‌ها</h4><ul className="care-list">{course.outline.map((line) => <li key={line}><Check aria-hidden="true" />{line}</li>)}</ul><div className="detail-note"><Info aria-hidden="true" /><p>{course.boundary}</p></div><p className="course-status">ثبت‌نام از طریق این سایت فعال نیست. زمان، قالب، هزینه و شرایط دسترسی در این صفحه اعلام نشده‌اند؛ پیش از هر تصمیم، اطلاعات برگزاری را بررسی کنید.</p></div></article>;
}
