import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { SlideRail } from "@/components/shared/slide-rail";
import { ReviewCard } from "@/components/shared/review-card";
import type { Review } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { reviews: Review[] };

export function Testimonials({ reviews }: Props) {
  return <SectionSurface className="home-testimonials" tone="orchid" aria-labelledby="testimonials-title"><SectionHeading id="testimonials-title" eyebrow="تجربهٔ همراهی" title="هر روایت، با اجازهٔ صاحب آن." description="حفظ حریم خصوصی مهم‌تر از انتشار یک تجربه است؛ اینجا تنها روایت‌های رضایت‌داده‌شده جای می‌گیرند." href={routes.testimonials} linkLabel="دربارهٔ تجربهٔ مراجعان" /><p className="section-disclosure">فقط روایت‌های تأییدشده با رضایت انتشار؛ تجربهٔ هر فرد، تضمینی برای نتیجهٔ دیگران نیست.</p>{reviews.length > 0 ? <SlideRail label="تجربه‌های منتشرشده" slides={reviews.map((review) => ({ key: review.id, content: <ReviewCard review={review} /> }))} /> : <div className="catalog-empty"><h3>هنوز روایتی برای نمایش منتشر نشده است.</h3></div>}</SectionSurface>;
}
