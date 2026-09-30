import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatNumber } from "@/lib/format";

const stages = [
  { title: "آشنایی و طرح دغدغه", description: "از چیزی بگویید که شما را به فکر مشاوره انداخته است. جلسهٔ نخست فرصتی برای شناخت اولیه و پرسیدن سؤال‌هاست." },
  { title: "روشن‌کردن انتظارها", description: "دربارهٔ موضوع، هدف‌ها، شیوهٔ همکاری و حدود محرمانگی صحبت می‌شود تا بتوانید آگاهانه تصمیم بگیرید." },
  { title: "بازبینی در طول مسیر", description: "نیازها و تجربهٔ شما ممکن است تغییر کنند. گفت‌وگو دربارهٔ ادامه، تغییر مسیر یا ارجاع، بخشی از تصمیم‌گیری مشترک است." },
] as const;

export function Collaboration() {
  return <SectionSurface tone="peach-glow" aria-labelledby="collaboration-title"><SectionHeading id="collaboration-title" eyebrow="از آشنایی تا همکاری" title="مسیر از پیش یکسانی برای همه وجود ندارد." description="تعداد جلسات یا نتیجه را نمی‌توان از پیش تضمین کرد. این‌ها نقاط گفت‌وگو در یک همکاری آگاهانه‌اند." /><ol className="collaboration-list">{stages.map((stage, index) => <li key={stage.title}><span className="step-number">{formatNumber(index + 1)}</span><h3>{stage.title}</h3><p>{stage.description}</p></li>)}</ol></SectionSurface>;
}
