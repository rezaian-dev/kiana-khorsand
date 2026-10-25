import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/site-styles";
import { publicMetadata } from "@/lib/public-metadata";
import { Search } from "lucide-react";
import { searchText } from "@/lib/list-search";
import type { QueryPageProps } from "@/types/routes";
import { listWorkshops } from "@/features/workshops/queries";
import { Intro } from "@/components/shared/intro";
import { ContentCard } from "@/components/shared/card";
import { labels } from "@/lib/labels";
import {
  SearchEmpty,
  SearchInput,
  SearchPanel,
} from "@/components/shared/search-panel";
import { workshopPrice } from "@/features/workshops/pricing";
import { formatToman } from "@/lib/format";

export const revalidate = 3600;

const baseMetadata = {
  title: labels.workshops,
  description:
    "کارگاه‌های آموزشی مهارت‌های زندگی، رابطه و مراقبت از خود را ببینید.",
};

export async function generateMetadata({ searchParams }: QueryPageProps) {
  const params = await searchParams;
  return publicMetadata({
    ...baseMetadata,
    path: "/workshops",
    image: "/assets/images/intro-gather.jpg",
    canonical: !params.q,
    index: !params.q,
  });
}

export default async function Page({ searchParams }: QueryPageProps) {
  const q = searchText((await searchParams).q);
  const items = await listWorkshops();
  const visible = items.filter(
    (item) => !q || `${item.title} ${item.description}`.includes(q),
  );
  return (
    <>
      <Intro
        story="gather"
        title={labels.workshops}
        description={items[0]?.description}
      />
      <div className={siteContainerClassName}>
        <SearchPanel
          id="workshop-q"
          icon={<Search size={20} aria-hidden="true" />}
          label="جست‌وجوی کارگاه‌ها"
          hint="از میان کارگاه‌ها، موضوع دلخواهتان را پیدا کنید."
          field={
            <SearchInput
              id="workshop-q"
              placeholder="نام یا موضوع کارگاه..."
              defaultValue={q}
            />
          }
          submitLabel="جست‌وجو"
          clearHref="/workshops"
          clearLabel="پاک‌کردن جست‌وجو"
          clearable={Boolean(q)}
        />
        {visible.length ? (
          <div className={siteGridClassName}>
            {visible.map((item) => (
              <ContentCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/workshops/${item.slug}`}
                image={item.cover}
                tag={formatToman(workshopPrice(item).total)}
              />
            ))}
          </div>
        ) : (
          <SearchEmpty
            title="کارگاهی با این عبارت پیدا نشد"
            body="عبارت کوتاه‌تری جست‌وجو کنید یا همهٔ کارگاه‌ها را ببینید."
            href="/workshops"
            linkLabel="نمایش همهٔ کارگاه‌ها"
          />
        )}
      </div>
    </>
  );
}
