import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Article } from "@/components/sections/article/article";
import { articles } from "@/content/articles";
import { routes, topics } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

// Static fixtures only. Phase 7 must replace this with request-time repository reads.
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  const url = `${routes.articles}/${article.slug}`;
  const title = `${article.title} | دکتر کیانا خرسند`;
  const social = { url: article.social.path, width: article.social.width, height: article.social.height, alt: article.social.alt };
  return {
    title: article.title, description: article.description,
    alternates: { canonical: url }, robots: { index: false, follow: true },
    openGraph: { type: "article", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title, description: article.description, url, images: [social], tags: [topics[article.category]] },
    twitter: { card: "summary_large_image", title, description: article.description, images: [social] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  return <Suspense key={slug} fallback={<Article article={article} isLoading />}><Article article={article} /></Suspense>;
}
