import { SectionSurface } from "@/components/shared/section-surface";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArticleCard } from "@/components/shared/article-card";
import type { Article } from "@/lib/published";
import { routes } from "@/lib/constants";

type Props = { articles: Article[] };

export function Related({ articles }: Props) {
  return <SectionSurface tone="peach-glow" aria-labelledby="related-title"><SectionHeading id="related-title" eyebrow="ادامهٔ خواندن" title="در همین موضوع، بیشتر بخوانیم" description="نوشته‌های منتشرشده در همین موضوع؛ برای مطالعهٔ بیشتر، نه جایگزین ارزیابی فردی." href={routes.articles} linkLabel="همهٔ مقاله‌ها" />{articles.length ? <div className="related-grid">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="catalog-empty"><p>هنوز نوشتهٔ دیگری در این موضوع منتشر نشده است.</p></div>}</SectionSurface>;
}
