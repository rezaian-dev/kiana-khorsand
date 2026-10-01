import type { Metadata } from "next";
import { Suspense } from "react";
import { ContentEditor } from "@/components/sections/publishing/content-editor";
import { readEditor } from "@/server/publishing";
import { routes } from "@/lib/constants";

const title = "ویرایش دوره‌ها";
const description = "ویرایشگر خصوصی دوره؛ آماده‌سازی مخاطب، سرفصل‌ها، مرز آموزشی و مشخصات مدرس.";
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title, description, robots: { index: false, follow: false }, alternates: { canonical: `${routes.adminCourses}/${id === "new" || /^[a-f\d]{24}$/i.test(id) ? id : "new"}` }, openGraph: { title, description, locale: "fa_IR" }, twitter: { card: "summary", title, description } };
}
export default async function Page({ params }: Props) {
  const draft = await readEditor("course", (await params).id);
  return <Suspense fallback={<ContentEditor draft={draft} isLoading />}><ContentEditor draft={draft} /></Suspense>;
}
