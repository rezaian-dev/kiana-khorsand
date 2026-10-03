import Link from "next/link";
import { MessageCircle, ShieldCheck, UserRoundCheck, ArrowUpLeft } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { ReviewCard } from "@/components/shared/review-card";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import { BookingPrompt } from "@/components/shared/booking-prompt";
import { BookingBar } from "@/components/layout/booking-bar";
import type { Reviews } from "@/lib/published";
import { formatNumber } from "@/lib/format";
import { routes } from "@/lib/constants";

type Props = { result: Reviews; hasError?: boolean; isLoading?: boolean };
const principles = [
  { title: "رضایت مشخص برای انتشار", text: "پیش از انتشار هر روایت واقعی، لازم است صاحب آن بداند کدام متن و چه اطلاعاتی در معرض دید دیگران قرار می‌گیرد. دریافت مشاوره به معنی رضایت به انتشار نیست.", icon: UserRoundCheck },
  { title: "کمترین اطلاعات شناسایی", text: "نام، تصویر، جزئیات خانوادگی یا اطلاعات قابل‌شناسایی نباید بدون اجازهٔ روشن منتشر شوند. اطلاعات افراد دیگری که در روایت حضور دارند نیز مهم است.", icon: ShieldCheck },
  { title: "تجربه، نه تضمین نتیجه", text: "حتی روایت واقعی یک فرد، نتیجهٔ یکسان برای دیگران را تضمین نمی‌کند. انتخاب مسیر همکاری به شرایط و نیازهای شخصی شما بستگی دارد.", icon: MessageCircle },
] as const;

export function Testimonials({ result, hasError = false, isLoading = false }: Props) {
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی صفحهٔ تجربه‌ها…</p>}<main id="main-content" className="public-page testimonials-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <BreadcrumbSchema title="تجربهٔ مراجعان" path={routes.testimonials} />}
    <SectionSurface tone="orchid"><PageHeading breadcrumb="تجربهٔ مراجعان" eyebrow="تجربهٔ همراهی" title="هر روایت، با اجازهٔ صاحب آن." description="شنیدن تجربهٔ دیگران می‌تواند بخشی از آشنایی باشد؛ اما حریم خصوصی، رضایت و حق انتخاب هر فرد مقدم است." />{result.count === 0 && <div className="experience-empty"><span className="service-symbol"><MessageCircle aria-hidden="true" /></span><div><h2>هنوز روایتی برای نمایش منتشر نشده است.</h2><p>فقط نظر تأییدشده با رضایت انتشار نمایش داده می‌شود.</p></div></div>}</SectionSurface>
    <SectionSurface tone="mint-dew" aria-labelledby="sharing-title"><SectionHeading id="sharing-title" eyebrow="پیش از انتشار یک تجربه" title="اعتماد، از احترام به انتخاب شروع می‌شود." description="انتشار تجربه به رضایت روشن و بررسی نیاز دارد. فرم دریافت نظر در این نسخه ارائه نمی‌شود." /><div className="principle-grid">{principles.map(({ title, text, icon: Icon }) => <article className="principle-card" key={title}><span className="service-symbol"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div><Link className="quiet-link section-link" href={routes.privacy}>دربارهٔ حریم خصوصی این نسخه<ArrowUpLeft aria-hidden="true" /></Link></SectionSurface>
    <SectionSurface tone="cotton-candy" aria-labelledby="reviews-title"><SectionHeading id="reviews-title" eyebrow="با احترام به حریم خصوصی" title="روایت‌های منتشرشده" description="انتخاب نام و انتشار متن با رضایت صاحب تجربه است." />
      {hasError && <p className="query-notice" role="status">شمارهٔ صفحه معتبر نبود؛ صفحهٔ نخست نمایش داده شد.</p>}
      <p className="section-disclosure">{formatNumber(result.count)} روایت منتشرشده</p><div className="experience-grid">{result.entries.map((review) => <ReviewCard key={review.id} review={review} />)}</div>
      {result.pageCount > 1 && <nav className="pagination" aria-label="صفحه‌بندی روایت‌ها"><span>صفحهٔ {formatNumber(result.page)} از {formatNumber(result.pageCount)}</span><div>{result.page > 1 && <Link href={result.page === 2 ? routes.testimonials : `${routes.testimonials}?page=${result.page - 1}`} prefetch={false}>قبلی</Link>}{result.page < result.pageCount && <Link href={`${routes.testimonials}?page=${result.page + 1}`} prefetch={false}>بعدی</Link>}</div></nav>}
    </SectionSurface>
    <BookingPrompt tone="lagoon" title="تصمیم شما، به شناخت خودتان هم نیاز دارد." description="برای آشنایی با شیوهٔ معرفی و مسیرهای همکاری، می‌توانید خدمات و اطلاعات حرفه‌ای را مرور کنید؛ هیچ تجربه‌ای جای بررسی نیاز شخصی شما را نمی‌گیرد." secondaryHref={routes.about} secondaryLabel="آشنایی با من" /><BookingBar />
  </main></>;
}
