import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { SlideRail } from "@/components/shared/slide-rail";
import { CourseCard } from "@/components/shared/course-card";
import { courses } from "@/content/home";
import { routes } from "@/lib/constants";

export function Courses() {
  return <SectionSurface tone="dream" aria-labelledby="courses-title"><SectionHeading id="courses-title" eyebrow="فرصتی برای یادگیری" title="برای زندگی روزمره، بیشتر بدانیم." description="آموزش می‌تواند به شناخت بهتر کمک کند؛ جایگزین ارزیابی و مشاورهٔ فردی نیست." href={routes.courses} linkLabel="همهٔ دوره‌ها" /><p className="section-disclosure">پیش‌نمایش موضوع‌های پیشنهادی؛ جزئیات دوره‌ها و امکان ثبت‌نام هنوز منتشر نشده‌اند.</p><SlideRail label="پیش‌نمایش دوره‌های آموزشی" slides={courses.map((course) => ({ key: course.slug, content: <CourseCard course={course} /> }))} /></SectionSurface>;
}
