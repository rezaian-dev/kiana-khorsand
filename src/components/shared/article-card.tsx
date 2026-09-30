import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Photo } from "./photo";
import { Lift } from "@/components/motion/lift";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/content/articles";
import { routes, topics } from "@/lib/constants";

type Props = { article: Article };

export function ArticleCard({ article }: Props) {
  return <Lift className="card-lift"><article className="story-card article-card"><Link className="story-link" href={`${routes.articles}/${article.slug}`} prefetch={false}><Photo image={article.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 82vw" className="story-photo" /><div className="story-body"><Badge variant="outline">{topics[article.category]}</Badge><h3>{article.title}</h3><p>{article.description}</p><div className="story-action"><span>خواندن پیش‌نویس</span><ArrowUpLeft aria-hidden="true" /></div></div></Link></article></Lift>;
}
