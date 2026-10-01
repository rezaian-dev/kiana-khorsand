import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { SlideRail } from "@/components/shared/slide-rail";
import { ArticleCard } from "@/components/shared/article-card";
import type { Article } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { articles: Article[] };

export function Articles({ articles }: Props) {
  return <SectionSurface className="home-articles" tone="golden-hour" aria-labelledby="articles-title"><SectionHeading id="articles-title" eyebrow="یادداشت‌هایی برای مکث" title="کمی بخوانیم، کمی به خودمان گوش کنیم." description="موضوع‌هایی نزدیک به تجربهٔ روزمره؛ با زبانی ساده و بدون نسخه‌پیچی برای همه." href={routes.articles} linkLabel="همهٔ مقاله‌ها" /><p className="section-disclosure">فقط نوشته‌های منتشرشده پس از بازبینی؛ نام نویسنده و منابع را در هر نوشته ببینید.</p>{articles.length > 0 ? <SlideRail label="مقاله‌های منتشرشده" slides={articles.map((article) => ({ key: article.slug, content: <ArticleCard article={article} /> }))} /> : <div className="catalog-empty"><h3>هنوز مقاله‌ای منتشر نشده است.</h3><p>نوشته‌ها پس از بازبینی در اینجا قرار می‌گیرند.</p></div>}</SectionSurface>;
}
