import type { ArticleVisual } from "./article-visual";

/** The subset of an article the client list needs to render and filter. */
export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  visual: ArticleVisual;
  cover: string | null;
};
