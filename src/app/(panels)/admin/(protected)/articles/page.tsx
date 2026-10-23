import {
  panelListItemClassName,
  panelCardClassName,
  panelMutedClassName,
} from "@/components/panels/panel-styles";
import Link from "next/link";
import { adminArticles } from "@/features/admin/queries";
import { AdminStatus } from "@/components/panels/admin-status";
import { FilterableList } from "@/components/panels/filterable-list";
import { PanelHeading, PanelEmpty } from "@/components/panels/panel-heading";
export const metadata = { title: "مدیریت مقاله‌ها" };
export default async function Page() {
  const articles = await adminArticles();
  return (
    <>
      <PanelHeading
        title="مقاله‌ها"
        description="محتوای منتشرشده و پیش‌نویس‌ها را جست‌وجو، ویرایش یا پنهان کنید."
        action={{ href: "/admin/article-editor", label: "مقاله تازه" }}
      />
      {articles.length ? (
        <FilterableList
          label="جست‌وجو در مقاله‌ها"
          options={[
            { value: "published", label: "منتشرشده" },
            { value: "draft", label: "پیش‌نویس" },
            { value: "hidden", label: "پنهان" },
          ]}
          items={articles.map((item) => ({
            key: item.slug,
            search: `${item.title} ${item.excerpt} ${item.tags?.join(" ") ?? ""}`,
            status: item.status,
            content: (
              <article
                className={`${panelCardClassName} ${panelListItemClassName}`}
              >
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                  {item.tags?.length ? (
                    <p className={panelMutedClassName}>
                      برچسب‌ها: {item.tags.join("، ")}
                    </p>
                  ) : null}
                  <Link
                    href={`/admin/article-editor?slug=${item.slug}`}
                    className="panel-amount font-extrabold text-[var(--panel-accent)]"
                  >
                    ویرایش مقاله ←
                  </Link>
                </div>
                <AdminStatus
                  kind="articles"
                  slug={item.slug}
                  value={item.status}
                />
              </article>
            ),
          }))}
        />
      ) : (
        <PanelEmpty message="مقاله‌ای ثبت نشده است." />
      )}
    </>
  );
}
