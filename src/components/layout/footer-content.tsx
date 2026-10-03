import Link from "next/link";
import { ArrowUp, ArrowUpLeft, Sprout } from "lucide-react";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/navigation";
import { routes } from "@/lib/constants";
import { formatYear } from "@/lib/format";
import type { Profile } from "@/lib/published";

export function FooterContent({ profile }: { profile: Profile }) {
  const year = formatYear(new Date());
  const links = [...navigation, { href: routes.faq, label: "پرسش‌های متداول" }, { href: routes.courses, label: "دوره‌های آموزشی" }, { href: routes.testimonials, label: "تجربهٔ مراجعان" }];
  return <footer className="site-footer editorial-footer">
    <div className="footer-atmosphere" aria-hidden="true"><span /><span /><span /></div>
    <div className="site-width footer-shell">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-role">{profile.role}</p>
          <p className="footer-copy">{profile.introduction}</p>
          {profile.license && <p className="footer-license">شماره پروانه: {profile.license}</p>}
          <SocialLinks profile={profile} className="footer-socials" />
          <div className="footer-brand-rule" aria-hidden="true"><span /><Sprout /><span /></div>
        </div>
        <nav className="footer-quick-links" aria-label="دسترسی سریع">
          <h2><span aria-hidden="true" />دسترسی سریع</h2>
          {links.map((link) => <Link key={link.href} href={link.href} prefetch={false}><span>{link.label}</span><ArrowUpLeft aria-hidden="true" /></Link>)}
        </nav>
        <div className="footer-booking">
          <Sprout className="footer-booking-motif" aria-hidden="true" />
          <span className="section-eyebrow"><span aria-hidden="true" />یک قدم، برای خودتان</span>
          <h2>از یک گفت‌وگو<br />شروع کنیم.</h2>
          <p>زمان مناسب را انتخاب کنید؛ با آرامش و بدون عجله.</p>
          <Button asChild><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} <span aria-hidden="true">·</span> {profile.name}</p>
        <nav aria-label="پیوندهای حقوقی"><Link href={routes.privacy} prefetch={false} data-interact="control">حریم خصوصی</Link><Link href={routes.terms} prefetch={false} data-interact="control">شرایط استفاده</Link><a href={routes.sitemap} data-interact="control">نقشهٔ سایت</a></nav>
        <a href="#page-top" className="back-top"><span>بازگشت به بالا</span><span className="back-top-icon"><ArrowUp aria-hidden="true" /></span></a>
      </div>
    </div>
  </footer>;
}
