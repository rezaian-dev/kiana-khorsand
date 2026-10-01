import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { SlideRail } from "@/components/shared/slide-rail";
import { ReviewCard } from "@/components/shared/review-card";
import { stories } from "@/content/stories";
import { routes } from "@/lib/constants";

export function Testimonials() {
  return <SectionSurface tone="mint-dew" aria-labelledby="testimonials-title"><SectionHeading id="testimonials-title" eyebrow="تجربهٔ همراهی" title="هر روایت، با اجازهٔ صاحب آن." description="حفظ حریم خصوصی مهم‌تر از انتشار یک تجربه است؛ اینجا تنها روایت‌های رضایت‌داده‌شده جای می‌گیرند." href={routes.testimonials} linkLabel="دربارهٔ تجربهٔ مراجعان" /><p className="section-disclosure">هنوز هیچ نظر واقعی منتشر نشده است. متن‌ها و چهره‌های زیر صرفاً نمونهٔ طراحی‌اند و نتیجهٔ درمان را نشان نمی‌دهند.</p><SlideRail label="جایگاه نمایشی تجربهٔ مراجعان؛ بدون نظر واقعی" slides={stories.map((story) => ({ key: story.key, content: <ReviewCard story={story} /> }))} /></SectionSurface>;
}
