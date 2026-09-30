import Link from "next/link";
import { ArrowUp, ArrowUpLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ContactLinks } from "@/components/layout/contact-links";
import { SocialIcon } from "@/components/shared/social-icon";
import { Button } from "@/components/ui/button";
import { navigation, serviceLinks } from "@/content/navigation";
import { notices, profile } from "@/content/profile";
import { routes } from "@/lib/constants";
import { formatYear } from "@/lib/format";

// Server-only module snapshot; rebuild at Persian New Year for static deployments.
const year = formatYear(new Date());

export function Footer() {
  const socials = [
    { key: "instagram", label: "اینستاگرام", href: profile.instagram },
    { key: "telegram", label: "تلگرام", href: profile.telegram },
    { key: "whatsapp", label: "واتس‌اپ", href: profile.whatsapp },
  ] as const;
  return (
    <footer className="site-footer">
      <svg className="footer-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 35C320 115 890-50 1440 35V80H0Z" fill="currentColor" /></svg>
      <div className="site-width">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-role">{profile.role}</p>
            <p className="footer-copy">{profile.introduction}</p>
            <p className="footer-license">{profile.license ? `شماره پروانه: ${profile.license}` : "شماره پروانه پس از تأیید درج می‌شود."}</p>
            <div className="footer-socials">
              {socials.map((social) => social.href ? <a key={social.key} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer"><SocialIcon name={social.key} /></a> : <span key={social.key} aria-disabled="true" title={`${social.label}؛ نشانی هنوز تأیید نشده`}><SocialIcon name={social.key} /><span className="sr-only">{social.label}؛ نشانی هنوز تأیید نشده</span></span>)}
            </div>
          </div>
          <nav aria-label="دسترسی سریع"><h2>دسترسی سریع</h2>{navigation.map((link) => <Link key={link.href} href={link.href} prefetch={false}>{link.label}</Link>)}<Link href={routes.faq} prefetch={false}>پرسش‌های متداول</Link></nav>
          <nav aria-label="خدمات و یادگیری"><h2>مسیرهای همراهی</h2>{serviceLinks.map((link) => <Link key={link.href} href={link.href} prefetch={false}>{link.label}</Link>)}<Link href={routes.courses} prefetch={false}>دوره‌های آموزشی</Link><Link href={routes.testimonials} prefetch={false}>تجربهٔ مراجعان</Link></nav>
          <div className="footer-booking"><span className="section-eyebrow">یک قدم، برای خودتان</span><h2>از یک گفت‌وگو شروع کنیم.</h2><p>زمان مناسب را انتخاب کنید؛ با آرامش و بدون عجله.</p><Button asChild><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button><ContactLinks /></div>
        </div>
        <div className="footer-care"><ShieldCheck aria-hidden="true" /><div><p>{notices.emergency}</p><p>گفت‌وگوها محرمانه‌اند؛ حدود قانونی و شرایط حفظ ایمنی در شروع همکاری توضیح داده می‌شوند.</p></div></div>
        <div className="footer-bottom"><p>© {year} · {profile.name}</p><nav aria-label="پیوندهای حقوقی"><Link href={routes.privacy} prefetch={false}>حریم خصوصی</Link><Link href={routes.terms} prefetch={false}>شرایط استفاده</Link><a href={routes.sitemap}>نقشهٔ سایت</a></nav><a href="#page-top" className="back-top">بازگشت به بالا<ArrowUp aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
