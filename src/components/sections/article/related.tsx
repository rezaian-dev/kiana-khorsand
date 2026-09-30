import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArticleCard } from "@/components/shared/article-card";
import { articles } from "@/content/articles";
import { routes } from "@/lib/constants";

type Props = { slug: string };

export function Related({ slug }: Props) {
  const related = articles.filter((article) => article.slug !== slug).slice(0, 2);
  return <SectionSurface tone="peach-glow" aria-labelledby="related-title"><SectionHeading id="related-title" eyebrow="ادامهٔ خواندن" title="نوشته‌های مرتبط با مراقبت از خود" description="دو پیش‌نویس دیگر برای شناخت تجربهٔ روزمره و شروع گفت‌وگو؛ با همان محدودیتِ بازبینی‌نشده‌بودن." href={routes.articles} linkLabel="همهٔ مقاله‌ها" /><div className="related-grid">{related.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></SectionSurface>;
}
