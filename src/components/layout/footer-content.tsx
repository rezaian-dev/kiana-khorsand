import Link from "next/link";
import { ArrowUp, ArrowUpLeft } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";
import { navigation } from "@/content/navigation";
import { routes } from "@/lib/constants";
import { formatYear } from "@/lib/format";

import type { Profile } from "@/lib/published";

export function FooterContent({ profile }: { profile: Profile }) {
  const year = formatYear(new Date());
  return (
    <footer className="site-footer">
      <div className="site-width">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-role">{profile.role}</p>
            <p className="footer-copy">{profile.introduction}</p>
            {profile.license && <p className="footer-license">شماره پروانه: {profile.license}</p>}
            <SocialLinks profile={profile} className="footer-socials" />
          </div>
          <nav aria-label="دسترسی سریع"><h2>دسترسی سریع</h2>{navigation.map((link) => <Link key={link.href} href={link.href} prefetch={false}>{link.label}</Link>)}<Link href={routes.faq} prefetch={false}>پرسش‌های متداول</Link><Link href={routes.courses} prefetch={false}>دوره‌های آموزشی</Link><Link href={routes.testimonials} prefetch={false}>تجربهٔ مراجعان</Link></nav>
          <div className="footer-booking"><span className="section-eyebrow">یک قدم، برای خودتان</span><h2>از یک گفت‌وگو شروع کنیم.</h2><p>زمان مناسب را انتخاب کنید؛ با آرامش و بدون عجله.</p><Button asChild><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button></div>
        </div>
        <div className="footer-bottom"><p>© {year} · {profile.name}</p><nav aria-label="پیوندهای حقوقی"><Link href={routes.privacy} prefetch={false} data-interact="control">حریم خصوصی</Link><Link href={routes.terms} prefetch={false} data-interact="control">شرایط استفاده</Link><a href={routes.sitemap} data-interact="control">نقشهٔ سایت</a></nav><a href="#page-top" className="back-top">بازگشت به بالا<ArrowUp aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
