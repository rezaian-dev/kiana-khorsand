import Link from "next/link";
import { ArrowUpLeft, Leaf, ShieldCheck, Sprout } from "lucide-react";
import { Drift } from "@/components/motion/drift";
import { Photo } from "@/components/shared/photo";
import { Button } from "@/components/ui/button";
import { images } from "@/content/images";
import type { Profile } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { profile: Profile };

export function Hero({ profile }: Props) {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <Drift className="hero-wash" />
      <div className="site-width hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span aria-hidden="true" />فرصتی برای خودتان</p>
          <div className="hero-identity"><p className="hero-name">{profile.name}</p><p className="hero-role">{profile.role}</p></div>
          <h1 id="home-title">اینجا، می‌شود{" "}<br /><span>از خودتان گفت.</span></h1>
          <p className="hero-description">{profile.introduction}</p>
          <div className="hero-actions"><Button asChild size="lg"><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button><Link href={routes.about} prefetch={false} className="quiet-link">آشنایی با من<ArrowUpLeft aria-hidden="true" /></Link></div>
          <p className="hero-trust"><ShieldCheck aria-hidden="true" />با احترام به تجربهٔ شما و حریم خصوصی‌تان</p>
          <ul className="hero-values" aria-label="رویکرد گفت‌وگو"><li>شنیدن، بدون قضاوت</li><li>قدم‌به‌قدم</li><li>با ریتم شما</li></ul>
        </div>
        <div className="hero-visual">
          <Drift className="hero-orbit" />
          <div className="hero-frame"><Photo image={images.hero} sizes="(min-width: 1024px) 428px, (min-width: 768px) calc(48vw - 64px), (min-width: 512px) 428px, calc(100vw - 68px)" className="hero-photo" isHero /></div>
          <span className="hero-leaf" aria-hidden="true"><Leaf /></span>
          <div className="hero-note"><span aria-hidden="true"><Sprout /></span><p>هر گفت‌وگو،<strong>از شنیدن شروع می‌شود.</strong></p></div>
        </div>
      </div>
    </section>
  );
}
