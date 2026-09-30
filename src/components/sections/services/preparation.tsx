import { NotebookPen, CircleHelp, LockKeyhole } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { notices } from "@/content/profile";

const suggestions = [
  { title: "یک دغدغه، کافی است", description: "اگر دوست دارید، موضوعی که بیشتر ذهنتان را درگیر کرده و انتظارتان از گفت‌وگو را برای خودتان یادداشت کنید. نیازی به آماده‌کردن شرح‌حال کامل نیست.", icon: NotebookPen },
  { title: "پرسش‌هایتان را نگه دارید", description: "دربارهٔ روند، هزینه، مدت، شیوهٔ برگزاری و شرایط لغو سؤال کنید. اطلاعات تأییدشدهٔ زمان و هزینه هنوز در این نسخه منتشر نشده است.", icon: CircleHelp },
  { title: "حریم خصوصی را جدی بگیرید", description: notices.confidentiality, icon: LockKeyhole },
] as const;

export function Preparation() {
  return <SectionSurface tone="mint-dew" aria-labelledby="preparation-title"><SectionHeading id="preparation-title" eyebrow="پیش از شروع" title="کمی آمادگی، بدون فشار برای کامل‌بودن" description="این نکته‌ها راهنمای عمومی شروع گفت‌وگو هستند؛ جایگزین ارزیابی فردی یا توصیهٔ درمانی نیستند." /><div className="principle-grid">{suggestions.map(({ title, description, icon: Icon }) => <article className="principle-card" key={title}><span className="service-symbol"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>)}</div></SectionSurface>;
}
