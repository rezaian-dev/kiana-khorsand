import Link from "next/link";
import { ArrowDown, ArrowUpLeft, ShieldCheck } from "lucide-react";
import { Photo } from "@/components/shared/photo";
import { Button } from "@/components/ui/button";
import { images } from "@/content/images";
import type { Profile } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { profile: Profile };

export function Hero({ profile }: Props) {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <Photo image={images.hero} sizes="100vw" className="hero-photo" isHero />
      <div className="hero-veil" aria-hidden="true" />
      <div className="site-width hero-inner"><div className="hero-copy">
        <p className="hero-name">{profile.name}</p><p className="hero-role">{profile.role}</p>
        <h1 id="home-title">اینجا، می‌شود<br /><span>از خودتان گفت.</span></h1>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-actions"><Button asChild size="lg"><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button><Link href={routes.about} prefetch={false} className="quiet-link">آشنایی با من</Link></div>
        <p className="hero-trust"><ShieldCheck aria-hidden="true" />با احترام به شما، تجربه‌تان و حریم خصوصی‌تان</p>
        <p className="launch-hint">رزرو آنلاین هنوز در مرحلهٔ راه‌اندازی است.</p>
      </div><a className="hero-explore" href="#services">مسیرهای همراهی<ArrowDown aria-hidden="true" /></a></div>
      <span className="visual-caption">تصویر نمونه؛ عکس واقعی دکتر نیست</span>
    </section>
  );
}
