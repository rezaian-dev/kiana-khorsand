import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { SlideRail } from "@/components/shared/slide-rail";
import { ArticleCard } from "@/components/shared/article-card";
import { articles } from "@/content/home";
import { routes } from "@/lib/constants";

export function Articles() {
  return <SectionSurface tone="peach-glow" aria-labelledby="articles-title"><SectionHeading id="articles-title" eyebrow="یادداشت‌هایی برای مکث" title="کمی بخوانیم، کمی به خودمان گوش کنیم." description="موضوع‌هایی نزدیک به تجربهٔ روزمره؛ با زبانی ساده و بدون نسخه‌پیچی برای همه." href={routes.articles} linkLabel="همهٔ مقاله‌ها" /><p className="section-disclosure">پیش‌نمایش موضوع‌ها؛ متن کامل مقاله‌ها در مرحلهٔ بعدی محتوا آماده می‌شود.</p><SlideRail label="پیش‌نمایش مقاله‌ها" slides={articles.map((article) => ({ key: article.slug, content: <ArticleCard article={article} /> }))} /></SectionSurface>;
}
