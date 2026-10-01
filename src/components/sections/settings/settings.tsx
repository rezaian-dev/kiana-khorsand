import { KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { ProfileForm } from "./profile-form";
import { PasswordForm } from "./password-form";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { RefreshButton } from "@/components/shared/refresh-button";
import { AccountNav } from "@/components/layout/account-nav";
import { AccountLinks } from "@/components/layout/account-links";
import type { Member } from "@/lib/member";
import { routes } from "@/lib/constants";

type Props = { member: Member; isLoading?: boolean };

export function Settings({ member, isLoading = false }: Props) {
  return <>{isLoading && <p role="status" className="load-status">در حال آماده‌سازی تنظیمات…</p>}<main id="main-content" className="member-page" inert={isLoading} aria-busy={isLoading}>
    <SectionSurface tone="aurora" className="member-intro"><PageHeading breadcrumb="تنظیمات حساب" parents={[{ label: "حساب من", href: routes.account }]} eyebrow="اطلاعات روشن، دسترسی امن‌تر" title="تنظیمات حساب" description="نام و شمارهٔ تماس را ویرایش کنید یا رمزتان را تغییر دهید. اطلاعات فقط هنگام انتخاب دکمهٔ ذخیره فرستاده می‌شوند؛ پیش‌نویس دائمی نداریم." /><AccountNav current={routes.settings} /></SectionSurface>
    <SectionSurface tone="cotton-candy"><div className="member-heading"><div><h2>مشخصات و امنیت</h2><p className="muted">تازه‌سازی معمول هنگام ویرایش متوقف می‌شود؛ تغییر یا پایان نشست استثناست. بازخوانی دستی نوشته‌ها را خودکار جایگزین نمی‌کند.</p></div><RefreshButton /></div><div className="settings-grid">
      <section className="member-panel" aria-labelledby="profile-title"><span className="member-symbol"><UserRound aria-hidden="true" /></span><h3 id="profile-title">نام و راه تماس</h3><p className="muted">ایمیل ورود: <bdi>{member.email}</bdi></p><p className="section-disclosure">{member.isEmailVerified ? "ایمیل در سرویس ورود تأییدشده ثبت شده است." : "مالکیت این ایمیل هنوز تأیید نشده است."} تغییر ایمیل در این نسخه فراهم نیست.</p><ProfileForm key={member.id} profile={{ name: member.name, phone: member.phone }} /></section>
      <section className="member-panel" aria-labelledby="password-title"><span className="member-symbol"><KeyRound aria-hidden="true" /></span><h3 id="password-title">رمز عبور</h3><p className="muted">رمز تازه را در جای امن نگه دارید. هیچ رمز یا توکن نشستی در این صفحه نمایش داده نمی‌شود.</p><PasswordForm key={member.id} /></section>
    </div></SectionSurface>
    <SectionSurface tone="mint-dew"><div className="member-exit"><div><ShieldCheck aria-hidden="true" /><h2>روی دستگاه مشترک هستید؟</h2><p className="muted">پس از پایان کار از حساب خارج شوید. خروج، حساب یا سوابق نوبت‌ها را حذف نمی‌کند.</p></div><AccountLinks viewer={{ id: member.id, name: member.name, email: member.email, role: member.role, appointments: member.appointments }} /></div></SectionSurface>
  </main></>;
}
