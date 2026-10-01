import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Article } from "@/components/sections/article/article";
import { readArticle, readProfile, readRelated } from "@/server/published";
import { routes, topics } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await readArticle(slug);
  if (!article) notFound();
  const url = `${routes.articles}/${article.slug}`;
  const title = `${article.title} | دکتر کیانا خرسند`;
  const social = { url: article.social.path, width: article.social.width, height: article.social.height, alt: article.social.alt };
  return {
    title: article.title, description: article.description, authors: [{ name: article.author }],
    alternates: { canonical: url }, robots: { index: true, follow: true },
    openGraph: { type: "article", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title, description: article.description, url, images: [social], publishedTime: article.publishedAt, modifiedTime: article.updatedAt, authors: [article.author], tags: [topics[article.category]] },
    twitter: { card: "summary_large_image", title, description: article.description, images: [social] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await readArticle(slug);
  if (!article) notFound();
  const [profile, related] = await Promise.all([readProfile(), readRelated(article.slug, article.category)]);
  return <Suspense key={slug} fallback={<Article article={article} profile={profile} related={related} isLoading />}><Article article={article} profile={profile} related={related} /></Suspense>;
}
