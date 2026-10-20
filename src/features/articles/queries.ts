import "server-only";
import { unstable_cache } from "next/cache";
import { collection } from "@/db/collections";
import { article } from "@/validations/models";
import { editorialArticleCover } from "@/lib/editorial-covers";
import { articleVisual } from "@/features/articles/article-visual";

export const listArticles = unstable_cache(
  async () => {
    try {
      const docs = await collection("articles")
        .find({ status: "published" })
        .sort({ publishedAt: -1 })
        .toArray();
      return docs.map((doc) => {
        const item = article.parse(doc);
        return {
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          tags: item.tags ?? [],
          visual: articleVisual(item),
          cover: editorialArticleCover(item.slug, item.cover),
          publishedAt: item.publishedAt?.toISOString() ?? null,
        };
      });
    } catch {
      return [];
    }
  },
  ["articles-list"],
  { tags: ["articles"], revalidate: 3600 },
);

export const getArticle = unstable_cache(
  async (slug: string) => {
    try {
      const doc = await collection("articles").findOne({
        slug,
        status: "published",
      });
      if (!doc) return null;
      const item = article.parse(doc);
      return {
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        body: item.body,
        category: item.category,
        tags: item.tags ?? [],
        visual: articleVisual(item),
        cover: editorialArticleCover(item.slug, item.cover),
        seoTitle: item.seoTitle || null,
        seoDescription: item.seoDescription || null,
        publishedAt: item.publishedAt?.toISOString() ?? null,
      };
    } catch {
      return null;
    }
  },
  ["articles-detail"],
  { tags: ["articles"], revalidate: 3600 },
);
