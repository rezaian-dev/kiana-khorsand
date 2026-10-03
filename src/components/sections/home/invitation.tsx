import Link from "next/link";
import { ArrowUpLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionConnector } from "@/components/shared/section-connector";
import { routes } from "@/lib/constants";

export function Invitation() {
  return <><SectionConnector /><section className="home-invitation" aria-labelledby="invitation-title"><div className="site-width invitation-inner">
    <div className="invitation-copy"><p className="section-eyebrow">یک قدم، برای خودتان</p><h2 id="invitation-title">همین که به شروع فکر می‌کنید،<br />ارزش توجه دارد.</h2><p>قرار نیست همهٔ مسیر را امروز بدانید.<br />می‌توانیم از یک گفت‌وگو شروع کنیم.</p><span className="invitation-privacy"><ShieldCheck aria-hidden="true" />با توضیح روشن دربارهٔ حریم خصوصی و روند همکاری</span></div>
    <Button asChild size="lg"><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button>
  </div></section></>;
}
