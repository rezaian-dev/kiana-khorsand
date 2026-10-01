import { FileCheck, Check } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import type { Profile } from "@/lib/published";

type Props = { profile: Profile };

export function Background({ profile }: Props) {
  return <SectionSurface tone="cotton-candy" aria-labelledby="background-title"><div className="background-grid"><div><p className="section-eyebrow">شفافیت در معرفی</p><h2 id="background-title">اطلاعات حرفه‌ای،<br />بدون حدس و اغراق</h2><p className="muted">انتخاب درمانگر به اطلاعات روشن نیاز دارد. نام، عنوان و شمارهٔ پروانهٔ ثبت‌شده در این بخش نمایش داده می‌شوند؛ هرجا اطلاعاتی ارائه نشده باشد، آن را روشن می‌گوییم.</p><ul className="care-list"><li><Check aria-hidden="true" />حق پرسیدن دربارهٔ تحصیلات و مجوز</li><li><Check aria-hidden="true" />حق آگاهی از شیوه و حدود همکاری</li><li><Check aria-hidden="true" />انتظار واقع‌بینانه، بدون تضمین نتیجه</li></ul></div><div className="credential-card"><div className="credential-title"><FileCheck aria-hidden="true" /><h3>مشخصات حرفه‌ای</h3></div><dl><div><dt>نام</dt><dd>{profile.name}</dd></div><div><dt>عنوان معرفی‌شده</dt><dd>{profile.role}</dd></div><div><dt>شمارهٔ پروانه</dt><dd>{profile.license ?? "هنوز ارائه و تأیید نشده"}</dd></div><div><dt>تحصیلات و سوابق</dt><dd>پس از دریافت و تأیید اطلاعات تکمیل می‌شود.</dd></div></dl><p className="section-disclosure">هیچ مدرک، دانشگاه، سابقهٔ زمانی یا گواهی تخصصی فرضی درج نشده است. صحت اطلاعات حرفه‌ای باید پیش از شروع همکاری بررسی شود.</p></div></div></SectionSurface>;
}
