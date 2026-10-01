import Link from "next/link";
import { MessageCircle, ShieldCheck, UserRoundCheck, ArrowUpLeft } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { ReviewCard } from "@/components/shared/review-card";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import { BookingPrompt } from "@/components/shared/booking-prompt";
import { BookingBar } from "@/components/layout/booking-bar";
import { stories } from "@/content/stories";
import { routes } from "@/lib/constants";

type Props = { isLoading?: boolean };
const principles = [
  { title: "رضایت مشخص برای انتشار", text: "پیش از انتشار هر روایت واقعی، لازم است صاحب آن بداند کدام متن و چه اطلاعاتی در معرض دید دیگران قرار می‌گیرد. دریافت مشاوره به معنی رضایت به انتشار نیست.", icon: UserRoundCheck },
  { title: "کمترین اطلاعات شناسایی", text: "نام، تصویر، جزئیات خانوادگی یا اطلاعات قابل‌شناسایی نباید بدون اجازهٔ روشن منتشر شوند. اطلاعات افراد دیگری که در روایت حضور دارند نیز مهم است.", icon: ShieldCheck },
  { title: "تجربه، نه تضمین نتیجه", text: "حتی روایت واقعی یک فرد، نتیجهٔ یکسان برای دیگران را تضمین نمی‌کند. انتخاب مسیر همکاری به شرایط و نیازهای شخصی شما بستگی دارد.", icon: MessageCircle },
] as const;

export function Testimonials({ isLoading = false }: Props) {
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی صفحهٔ تجربه‌ها…</p>}<main id="main-content" className="testimonials-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <BreadcrumbSchema title="تجربهٔ مراجعان" path={routes.testimonials} />}
    <SectionSurface tone="aurora"><PageHeading breadcrumb="تجربهٔ مراجعان" eyebrow="تجربهٔ همراهی" title="هر روایت، با اجازهٔ صاحب آن." description="شنیدن تجربهٔ دیگران می‌تواند بخشی از آشنایی باشد؛ اما حریم خصوصی، رضایت و حق انتخاب هر فرد مقدم است." /><div className="experience-empty"><span className="service-symbol"><MessageCircle aria-hidden="true" /></span><div><h2>هنوز روایت واقعی برای انتشار نداریم.</h2><p>این صفحه فعلاً برای بازبینی طراحی است. هیچ نقل‌قول، امتیاز، تعداد مراجع یا نتیجهٔ درمانی به فردی نسبت داده نشده است.</p></div></div></SectionSurface>
    <SectionSurface tone="mint-dew" aria-labelledby="sharing-title"><SectionHeading id="sharing-title" eyebrow="پیش از انتشار یک تجربه" title="اعتماد، از احترام به انتخاب شروع می‌شود." description="این‌ها اصول پیشنهادی انتشارند؛ سامانهٔ دریافت و بررسی نظر هنوز فعال نشده است." /><div className="principle-grid">{principles.map(({ title, text, icon: Icon }) => <article className="principle-card" key={title}><span className="service-symbol"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</div><Link className="quiet-link section-link" href={routes.privacy}>دربارهٔ حریم خصوصی این نسخه<ArrowUpLeft aria-hidden="true" /></Link></SectionSurface>
    <SectionSurface tone="cotton-candy" aria-labelledby="samples-title"><SectionHeading id="samples-title" eyebrow="فقط برای بازبینی ظاهر" title="نمونهٔ چیدمان؛ نه نظر مراجعان" description="هر سه چهره ساختگی‌اند و متن کارت‌ها روایت یا تأیید یک مراجع واقعی نیست. نظر واقعی فقط پس از دریافت و تأیید اجازه قابل‌جایگزینی است." /><div className="experience-grid">{stories.map((story) => <ReviewCard key={story.key} story={story} />)}</div></SectionSurface>
    <BookingPrompt tone="dream" title="تصمیم شما، به شناخت خودتان هم نیاز دارد." description="برای آشنایی با شیوهٔ معرفی و مسیرهای همکاری، می‌توانید خدمات و اطلاعات حرفه‌ای را مرور کنید؛ هیچ تجربه‌ای جای بررسی نیاز شخصی شما را نمی‌گیرد." secondaryHref={routes.about} secondaryLabel="آشنایی با من" /><BookingBar />
  </main></>;
}
