import { BookOpen, Check, Info } from "lucide-react";
import { Photo } from "@/components/shared/photo";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/content/courses";
import { topics } from "@/lib/constants";

type Props = { course: Course };

export function CourseOutline({ course }: Props) {
  return <article className="course-outline" id={course.slug} aria-labelledby={`${course.slug}-title`}><figure><Photo image={course.image} sizes="(min-width: 1024px) 36vw, 90vw" /><figcaption>تصویر مفهومیِ هوش مصنوعی؛ نمایش کلاس واقعی نیست.</figcaption></figure><div className="outline-body"><div className="outline-badges"><Badge variant="secondary">{topics[course.category]}</Badge><Badge variant="outline">طرح پیشنهادی</Badge></div><h3 id={`${course.slug}-title`}>{course.title}</h3><p>{course.description}</p><h4>این موضوع برای چه کسانی در نظر گرفته شده؟</h4><p className="muted">{course.audience}</p><h4><BookOpen aria-hidden="true" />سرفصل‌های پیشنهادی</h4><ul className="care-list">{course.outline.map((line) => <li key={line}><Check aria-hidden="true" />{line}</li>)}</ul><div className="detail-note"><Info aria-hidden="true" /><p>{course.boundary}</p></div><p className="course-status">ثبت‌نام فعال نیست. مدرس، قالب، زمان، مدت، هزینه و شرایط دسترسی هنوز نهایی نشده‌اند.</p></div></article>;
}
