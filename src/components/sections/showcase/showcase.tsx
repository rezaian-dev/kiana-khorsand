import Link from "next/link";
import { ArrowDownToLine, ArrowUpLeft, Check, LoaderCircle, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { PageHeading } from "@/components/shared/page-heading";
import { Photo } from "@/components/shared/photo";
import { SlideRail } from "@/components/shared/slide-rail";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { JsonLd } from "@/components/shared/json-ld";
import { Lift } from "@/components/motion/lift";
import { Logo } from "@/components/layout/logo";
import { AccountMenu } from "@/components/layout/account-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommandDemo } from "@/components/sections/showcase/command-demo";
import { MessageDemo } from "@/components/sections/showcase/message-demo";
import { StateDemo } from "@/components/sections/showcase/state-demo";
import { FaqDemo } from "@/components/sections/showcase/faq-demo";
import { gradients } from "@/content/gradients";
import { images } from "@/content/images";
import { brand } from "@/content/brand";
import { notices, profile } from "@/content/profile";
import { formatNumber } from "@/lib/format";
import { roles } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { isLoading?: boolean };

export function Showcase({ isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  const cards = [
    { image: images.hero, title: "فضایی برای شنیده‌شدن", detail: "نمونهٔ عکس بخش آغازین؛ سوژه در سمت چپ و فضای متن در راست." },
    { image: images.portrait, title: "یک حضور نزدیک و انسانی", detail: "نمونهٔ پرترهٔ درباره من؛ تصویر ساختگی است، نه عکس واقعی دکتر." },
    { image: images.quiet, title: "فرصتی برای یک شروع آرام", detail: "نمونهٔ فضای دعوت پایانی؛ بدون نوشتارِ داخل تصویر." },
    { image: images.desk, title: "نظم، با کمی آرامش", detail: "نمونهٔ تصویر خوشامد پنل؛ آماده برای برش موبایل و دسکتاپ." },
  ];
  return (
    <>
    {isLoading && <p role="status" className="load-status">در حال آماده‌سازی نمایش…</p>}
    <main id="main-content" className="showcase" inert={isLoading} aria-busy={isLoading}>
      <JsonLd schema={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "@id": `${origin}/#website`, url: origin, name: profile.name, inLanguage: "fa-IR", publisher: { "@id": `${origin}/#person` } }, { "@type": "Person", "@id": `${origin}/#person`, name: profile.name, jobTitle: profile.role, url: origin }, { "@type": "Service", "@id": `${origin}/#family-counseling`, name: "مشاوره خانواده", serviceType: "مشاوره خانواده", provider: { "@id": `${origin}/#person` } }] }} />
      <SectionSurface tone="aurora" className="showcase-intro">
        <PageHeading breadcrumb="سیستم طراحی" eyebrow="فاز دوم · نسخهٔ بازبینی" title="آرامش، در جزئیات." description="از یک امضای شخصی تا رنگ، نوشتار و تعامل؛ زبان بصریِ وب‌سایت دکتر کیانا خرسند، در یک نگاه." />
        <div className="intro-actions"><Button asChild><a href="#interaction">دیدن اجزای تعاملی<ArrowUpLeft aria-hidden="true" /></a></Button><a className="quiet-link" href="#identity">هویت و رنگ‌ها<Palette aria-hidden="true" /></a><Badge variant="outline">صفحهٔ موقت · بدون نمایه‌سازی</Badge></div>
        <p className="sample-notice"><ShieldCheck aria-hidden="true" />{notices.sample} پیوندهای صفحات بعدی فعلاً به صفحهٔ ۴۰۴ می‌رسند.</p>
        <div className="design-note"><span>فارسی، از ابتدا</span><span>دو تم، یک ساختار</span><span>حرکت، فقط به‌اندازه</span></div>
      </SectionSurface>
      <SectionSurface tone="cotton-candy" id="identity">
        <div className="section-heading"><div><p className="section-eyebrow">۰۱ / هویت</p><h2>امضای همراه؛ انتخاب شما.</h2></div><p>چهار مسیر ساده، با اشاره‌ای به نیلوفر، سای و حرف آغازین نام.</p></div>
        <div className="identity-grid">
          <div className="design-card brand-card"><div className="brand-stage"><Logo /></div><div className="brand-caption"><Check aria-hidden="true" /><p>نماد و نام، برای هر دو سربرگ و پابرگ</p></div><div className="asset-links">{brand.files.map((file) => <a key={file.path} href={file.path} download><ArrowDownToLine aria-hidden="true" />{file.label}</a>)}</div></div>
          <div className="design-card type-card"><p className="section-eyebrow">وزیرمتن محلی · متغیر</p><h3>گاهی، شروع<br />از یک گفت‌وگوست.</h3><p>تجربهٔ شما ارزش شنیده‌شدن دارد. قرار نیست همهٔ پاسخ‌ها را از همان ابتدا بدانید.</p><div className="type-specs"><span>متن پایه: ۱۶ پیکسل</span><span>وزن: ۱۰۰ تا ۹۰۰</span><span>راست‌به‌چپ</span></div></div>
        </div>
        <div className="palette-grid">{gradients.map((gradient) => <figure key={gradient.key} className="color-swatch"><div style={{ backgroundImage: `var(--gradient-${gradient.key})` }} aria-hidden="true" /><figcaption>{gradient.label}</figcaption></figure>)}</div>
      </SectionSurface>
      <SectionSurface tone="lagoon" id="interaction">
        <div className="section-heading"><div><p className="section-eyebrow">۰۲ / تعامل</p><h2>روشن، قابل‌فهم، بدون غافلگیری.</h2></div><p>دکمه‌ها، فرم‌ها و بازخوردهایی که فضا و جای خود را حفظ می‌کنند.</p></div>
        <div className="design-card control-samples"><div className="button-samples"><Button asChild><a href="#form-demo">اقدام اصلی<ArrowUpLeft aria-hidden="true" /></a></Button><Button variant="outline" asChild><a href="#image-demo">اقدام دوم</a></Button><Button variant="secondary" asChild><a href="#states">حالت‌های نمونه</a></Button><Button variant="ghost" asChild><a href="#questions">پرسش‌ها</a></Button><Button disabled>غیرفعال</Button><Button disabled aria-busy="true"><LoaderCircle aria-hidden="true" />در حال بررسی…</Button></div><div className="badge-samples"><Badge>تأییدشده · نمونه</Badge><Badge variant="secondary">در انتظار · نمونه</Badge><Badge variant="destructive">لغوشده · نمونه</Badge><Badge variant="outline">آنلاین</Badge></div><div className="account-sample"><div><h3>منوی حساب</h3><p className="muted">حساب ساختگی برای نمایش منو؛ در موبایل به شکل پنجرهٔ پایین صفحه باز می‌شود. شمارنده زنده نیست و خروج غیرفعال است.</p></div><AccountMenu isSample viewer={{ name: "مریم رضایی · نمونه", email: "sample@example.com", role: roles.admin, appointments: 2 }} /></div></div>
        <div className="demo-grid"><div className="design-card" id="form-demo"><MessageDemo /></div><div className="design-card" id="states"><StateDemo /><div className="disabled-field"><Label htmlFor="sample-disabled">نمونهٔ ورودی غیرفعال</Label><Input id="sample-disabled" disabled value="در انتظار تکمیل اطلاعات" readOnly /></div></div></div>
        <div className="design-card command-card"><CommandDemo /></div>
      </SectionSurface>
      <SectionSurface tone="peach-glow" id="image-demo">
        <div className="section-heading"><div><p className="section-eyebrow">۰۳ / تصویر و حرکت</p><h2>انسانی، روشن و بی‌تکلف.</h2></div><p>تصاویر نمونه‌اند. اسلایدر با لمس، فلش و نقطه‌ها حرکت می‌کند؛ پخش خودکار با اشاره‌گر و فوکوس متوقف می‌شود.</p></div>
        <SlideRail label="نمونه‌های تصویری سیستم طراحی" slides={cards.map((card) => ({ key: card.image.key, content: <Lift className="card-lift"><article className="sample-card"><Photo image={card.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 82vw" className="photo-card" /><div className="sample-body"><span className="sample-tag">تصویر نمونهٔ هوش مصنوعی</span><h3>{card.title}</h3><p>{card.detail}</p></div></article></Lift> }))} />
      </SectionSurface>
      <SectionSurface tone="dream" id="questions">
        <div className="section-heading"><div><p className="section-eyebrow">۰۴ / جزئیات قابل اتکا</p><h2>حتی وقتی محتوا هنوز آماده نیست.</h2></div><p>اسکلت هم‌اندازه، پرسش‌های بازشونده و یک صفحهٔ گم‌شدهٔ راهنما.</p></div>
        <div className="detail-grid"><div className="design-card"><h3>پیش از ادامه بدانید</h3><FaqDemo /><Link href="/design-missing" prefetch={false} className="quiet-link">دیدن صفحهٔ ۴۰۴<ArrowUpLeft aria-hidden="true" /></Link></div><div className="skeleton-demo"><CardSkeleton /><p className="muted">نمونهٔ اسکلت کارت؛ بدون انیمیشن مداوم و با جای تصویر رزروشده.</p></div></div>
        <Lift><div className="review-note scroll-reveal"><Sparkles aria-hidden="true" /><div><h3>پایه‌ها آمادهٔ بازبینی‌اند.</h3><p>{formatNumber(16)} خانوادهٔ گرادیان، نشان تأییدشده و اجزای مشترک؛ صفحهٔ اصلی، محتوا و عملیات واقعی هنوز وارد این نسخه نشده‌اند.</p></div></div></Lift>
      </SectionSurface>
    </main>
    </>
  );
}
