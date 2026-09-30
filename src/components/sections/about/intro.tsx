import Link from "next/link";
import { ArrowUpLeft, Sprout } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { Button } from "@/components/ui/button";
import { images } from "@/content/images";
import { profile } from "@/content/profile";
import { routes } from "@/lib/constants";

export function Intro() {
  return <SectionSurface tone="aurora" className="bio-intro" aria-label="درباره من"><div className="bio-grid">
    <div className="bio-copy"><PageHeading breadcrumb="درباره من" eyebrow="کمی نزدیک‌تر" title="آشنایی، پیش از آغاز گفت‌وگو" description={profile.introduction} /><p className="bio-name">{profile.name}<span>{profile.role}</span></p><p className="muted">من کیانا خرسند هستم. در اینجا می‌توانید با مسیرهای مشاوره و نکته‌هایی که پیش از شروع همکاری مهم‌اند، آشنا شوید. قرار نیست از ابتدا پاسخ همهٔ پرسش‌ها را بدانید؛ می‌توانیم از همان چیزی شروع کنیم که برای شما اهمیت دارد.</p><div className="page-actions"><Button asChild size="lg"><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button><Link href={routes.services} className="quiet-link">آشنایی با خدمات<ArrowUpLeft aria-hidden="true" /></Link></div><p className="section-disclosure">این نسخهٔ طراحی است؛ رزرو هنوز فعال نیست و اطلاعات حرفه‌ای نیاز به تکمیل و تأیید دارد.</p></div>
    <figure className="bio-portrait"><div className="portrait-frame"><Photo image={images.portrait} sizes="(min-width: 1280px) 440px, (min-width: 768px) 38vw, 90vw" /></div><figcaption><Sprout aria-hidden="true" /><span>فرصتی برای شناخت و گفت‌وگو<small>پرترهٔ ساخته‌شده با هوش مصنوعی؛ تصویر واقعی دکتر نیست.</small></span></figcaption></figure>
  </div></SectionSurface>;
}
