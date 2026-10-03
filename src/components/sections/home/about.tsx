import Link from "next/link";
import { ArrowUpLeft, Check, Sprout } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { images } from "@/content/images";
import type { Profile } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { profile: Profile };

export function About({ profile }: Props) {
  return <SectionSurface tone="peach-glow" className="home-about" aria-labelledby="about-title"><div className="about-grid">
    <div className="about-copy"><p className="section-eyebrow">کمی نزدیک‌تر</p><h2 id="about-title">پیش از هر چیز،<br />تجربهٔ شما شنیدنی است.</h2><p className="about-name">{profile.name}<span>{profile.role}</span></p><p className="muted">گاهی دغدغه‌ها نام روشنی ندارند؛ فقط احساس می‌کنیم به فضایی برای حرف‌زدن نیاز داریم. در مسیر مشاوره، برای شنیدن تجربهٔ شما و روشن‌تر شدن موضوعی که برایتان مهم است، وقت می‌گذاریم.</p><ul className="care-list"><li><Check aria-hidden="true" />فرصت بیان دغدغه‌ها، با ریتم خودتان</li><li><Check aria-hidden="true" />شناخت نیازها و هدف‌گذاری مشترک</li><li><Check aria-hidden="true" />توضیح روشن دربارهٔ روند و حدود محرمانگی</li></ul><Link href={routes.about} prefetch={false} className="quiet-link">بیشتر با من آشنا شوید<ArrowUpLeft aria-hidden="true" /></Link></div>
    <figure className="about-portrait"><Photo image={images.portrait} sizes="(min-width: 1024px) 34vw, (min-width: 768px) 42vw, 90vw" /><figcaption><Sprout aria-hidden="true" /><span>فضایی برای خودتان</span></figcaption></figure>
  </div></SectionSurface>;
}
