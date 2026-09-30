import { Ear, Compass, ShieldCheck } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";

const principles = [
  { title: "شنیدن، پیش از قضاوت", description: "تجربهٔ هر فرد زمینهٔ خودش را دارد. برای شروع، لازم نیست روایت شما مرتب یا کامل باشد؛ می‌توانید با ریتم خودتان از دغدغه‌ها بگویید.", icon: Ear },
  { title: "مسیری با مشارکت شما", description: "هدف‌ها و انتظارها باید برای هر دو طرف روشن باشند. سؤال‌پرسیدن، بیان تردید و گفت‌وگو دربارهٔ مناسب‌بودن مسیر، بخشی از همکاری است.", icon: Compass },
  { title: "حریم خصوصی با حدود روشن", description: "حفظ اطلاعات شخصی مهم است. حدود قانونی محرمانگی و شرایط مرتبط با ایمنی باید پیش از شروع توضیح داده شوند؛ محرمانگی وعده‌ای بدون استثنا نیست.", icon: ShieldCheck },
] as const;

export function Approach() {
  return <SectionSurface tone="mint-dew" aria-labelledby="approach-title"><SectionHeading id="approach-title" eyebrow="نگاه به همکاری" title="گفت‌وگویی روشن، انسانی و همراه با احترام" description="این اصول، چارچوبی برای شروع آگاهانه‌اند؛ نه وعدهٔ نتیجه یا معرفی یک روش درمانی خاص." /><div className="principle-grid">{principles.map(({ title, description, icon: Icon }) => <article className="principle-card" key={title}><span className="service-symbol"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>)}</div></SectionSurface>;
}
