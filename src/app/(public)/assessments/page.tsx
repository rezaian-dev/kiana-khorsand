import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/site-styles";
import { listAssessments } from "@/features/assessments/queries";
import { Intro } from "@/components/shared/intro";
import { ContentCard } from "@/components/shared/card";
import { formatNumber } from "@/lib/format";
import { labels } from "@/lib/labels";
import { publicMetadata } from "@/lib/public-metadata";

export const revalidate = 3600;
export const metadata = publicMetadata({
  title: labels.assessments,
  description:
    "خودسنجی‌های آموزشی برای شناخت بهتر الگوهای هیجانی و رفتاری؛ نه ابزار تشخیص.",
  path: "/assessments",
  image: "/assets/images/intro-journal.jpg",
});
export default async function Page() {
  const items = await listAssessments();
  return (
    <>
      <Intro
        story="journal"
        title={labels.assessments}
        description={items[0]?.introduction}
      />
      <div className={`${siteContainerClassName} ${siteGridClassName}`}>
        {items.map((item) => (
          <ContentCard
            key={item.slug}
            title={item.title}
            description={item.introduction}
            tag={`${formatNumber(item.questionCount)} پرسش`}
            href={`/assessments/${item.slug}`}
            action={labels.start}
          />
        ))}
      </div>
    </>
  );
}
