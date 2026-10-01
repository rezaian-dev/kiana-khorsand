import type { Metadata } from "next";
import { Suspense } from "react";
import { Home } from "@/components/sections/home/home";
import { readArticles, readCourses, readProfile, readReviews } from "@/server/published";
import { routes } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await readProfile();
  const title = `${profile.name} | ${profile.role}`;
  const description = profile.introduction.slice(0, 180);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: routes.home },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title, description, url: routes.home },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page() {
  const [profile, articles, courses, reviews] = await Promise.all([readProfile(), readArticles("", "all", "featured", 1), readCourses("", "all", "featured", 1), readReviews(1)]);
  const content = { profile, articles: articles.entries, courses: courses.entries, reviews: reviews.entries };
  return <Suspense fallback={<Home {...content} isLoading />}><Home {...content} /></Suspense>;
}
