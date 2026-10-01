import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { SlideRail } from "@/components/shared/slide-rail";
import { CourseCard } from "@/components/shared/course-card";
import type { Course } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { courses: Course[] };

export function Courses({ courses }: Props) {
  return <SectionSurface tone="dream" aria-labelledby="courses-title"><SectionHeading id="courses-title" eyebrow="فرصتی برای یادگیری" title="برای زندگی روزمره، بیشتر بدانیم." description="آموزش می‌تواند به شناخت بهتر کمک کند؛ جایگزین ارزیابی و مشاورهٔ فردی نیست." href={routes.courses} linkLabel="همهٔ دوره‌ها" /><p className="section-disclosure">معرفی و سرفصل دوره‌های تأییدشده را ببینید؛ ثبت‌نام از طریق سایت فعال نیست.</p>{courses.length > 0 ? <SlideRail label="معرفی دوره‌های آموزشی" slides={courses.map((course) => ({ key: course.slug, content: <CourseCard course={course} /> }))} /> : <div className="catalog-empty"><h3>هنوز دوره‌ای معرفی نشده است.</h3><p>معرفی دوره‌ها فقط پس از تأیید منتشر می‌شود.</p></div>}</SectionSurface>;
}
