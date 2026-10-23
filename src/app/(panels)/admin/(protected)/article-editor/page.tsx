import { panelButtonClassName } from "@/components/panels/panel-styles";
import { PanelSelect } from "@/components/panels/panel-select";
import { JalaliPublicationDate } from "@/features/admin/ui/jalali-publication-date";
import type { LegacySlugPageProps } from "@/types/routes";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { adminArticle } from "@/features/admin/queries";
import {
  ArticleEditorForm,
  ArticleVisualPreview,
} from "@/features/admin/ui/article-editor-form";
import { articleVisual } from "@/features/articles/article-visual";
import { PanelHeading } from "@/components/panels/ui";
import { ArticleCoverUpload } from "@/features/admin/ui/article-cover-upload";
import { ArticleMarkdownEditor } from "@/features/admin/ui/article-markdown-editor";
import {
  articleCoverOptions,
  articleCoverLabels,
  editorialArticleCover,
} from "@/lib/editorial-covers";

// Preserve old editor bookmarks; the actual articles are read from MongoDB.
const oldEditorSlugs = [
  "anxiety-basics",
  "thought-feeling-loop",
  "relationship-stuck",
  "self-worth",
  "grief-path",
  "sleep-anxiety",
  "body-signals",
  "boundaries-family",
  "inner-critic",
  "daylight-and-mood",
  "grief-and-work",
  "checking-behavior",
];

export const metadata = { title: "ویرایش مقاله" };
export default async function Page({ searchParams }: LegacySlugPageProps) {
  const { slug } = await searchParams;
  const match = slug?.match(/^a-(1[0-2]|[1-9])$/);
  if (match) {
    permanentRedirect(
      `/admin/article-editor?slug=${oldEditorSlugs[Number(match[1]) - 1]}`,
    );
  }
  const item = slug ? await adminArticle(slug) : null;
  if (slug && !item) notFound();

  return (
    <>
      <PanelHeading
        title={item ? "ویرایش مقاله" : "مقاله تازه"}
        description="عنوان، دسته، خلاصه و متن مقاله را ویرایش کنید؛ تنظیمات انتشار و سئو نیز همین‌جا ذخیره می‌شوند."
        action={{ href: "/admin/articles", label: "فهرست مقاله‌ها" }}
      />
      <ArticleEditorForm
        key={item ? `article:${item.slug}` : "create"}
        initialSlug={item?.slug ?? ""}
        initialVisual={articleVisual(
          item ?? { title: "", category: "", excerpt: "", body: "", tags: [] },
        )}
      >
        <input type="hidden" name="intent" value={item ? "edit" : "create"} />
        <h2>محتوای مقاله</h2>
        <label htmlFor="article-title">عنوان</label>
        <input
          id="article-title"
          name="title"
          defaultValue={item?.title}
          minLength={3}
          maxLength={160}
          placeholder="عنوان مقاله…"
          required
        />
        <label htmlFor="article-slug">نشانی (slug)</label>
        <input
          id="article-slug"
          name="slug"
          pattern="[a-z0-9-]+"
          maxLength={80}
          defaultValue={item?.slug}
          readOnly={Boolean(item)}
          required
          dir="ltr"
        />
        <p className="panel-help">
          حروف لاتین کوچک، رقم و خط تیره؛ نشانی مقاله پس از ساخت ثابت می‌ماند.
        </p>
        <label htmlFor="article-excerpt">خلاصه</label>
        <textarea
          id="article-excerpt"
          name="excerpt"
          defaultValue={item?.excerpt}
          minLength={10}
          maxLength={500}
          placeholder="جمله‌ی کوتاهی که در کارت مقاله نمایش داده می‌شود."
          required
        />
        <h3 id="article-body-label" className="font-bold">
          متن مقاله
        </h3>
        <ArticleMarkdownEditor initial={item?.body ?? ""} />
        <h2>تنظیمات انتشار</h2>
        <label htmlFor="article-status">وضعیت</label>
        <PanelSelect
          id="article-status"
          name="status"
          defaultValue={item?.status ?? "draft"}
          options={[
            { value: "draft", label: "پیش‌نویس" },
            { value: "published", label: "منتشرشده" },
            { value: "hidden", label: "پنهان" },
          ]}
        />
        <label htmlFor="article-date">تاریخ انتشار</label>
        <JalaliPublicationDate
          value={item?.publishedAt?.toISOString().slice(0, 10) ?? ""}
        />
        <p className="panel-help">
          اگر مقاله را منتشر کنید و تاریخ را خالی بگذارید، زمان انتشار به‌صورت
          خودکار ثبت می‌شود.
        </p>
        <label htmlFor="article-category">دسته</label>
        <input
          id="article-category"
          name="category"
          defaultValue={item?.category}
          minLength={2}
          maxLength={90}
          required
        />
        <label htmlFor="article-tags">برچسب‌ها</label>
        <input
          id="article-tags"
          name="tags"
          defaultValue={item?.tags?.join("، ") ?? ""}
          maxLength={400}
          placeholder="مثلاً اضطراب، خودمراقبتی، روابط"
        />
        <p className="panel-help">
          تا ۸ برچسب، جداشده با ویرگول؛ هر برچسب حداکثر ۳۰ نویسه.
        </p>
        <ArticleVisualPreview />
        <label htmlFor="article-cover">تصویر مقاله از گالری</label>
        <PanelSelect
          id="article-cover"
          name="cover"
          placeholder="بدون تصویر"
          defaultValue={
            item?.cover || editorialArticleCover(item?.slug || "") || ""
          }
          options={[
            { value: "", label: "بدون تصویر" },
            ...Object.entries(articleCoverOptions).map(([slug, cover]) => ({
              value: cover,
              label: articleCoverLabels[slug],
            })),
            {
              value: "/assets/images/hero-therapist.jpg",
              label: "تصویر مشاوره",
            },
            {
              value: "/assets/images/about-therapist.jpg",
              label: "تصویر دربارهٔ مشاور",
            },
            ...(item?.cover &&
            !Object.values(articleCoverOptions).includes(
              item.cover as (typeof articleCoverOptions)[keyof typeof articleCoverOptions],
            ) &&
            ![
              "/assets/images/hero-therapist.jpg",
              "/assets/images/about-therapist.jpg",
            ].includes(item.cover)
              ? [{ value: item.cover, label: "تصویر فعلی" }]
              : []),
          ]}
        />
        <p className="panel-help">
          تصویر مرتبط را از گالری آماده انتخاب کنید؛ پیش‌نمایش آن در کارت‌ها و
          صفحهٔ مقاله نمایش داده می‌شود.
        </p>
        <ArticleCoverUpload
          current={item?.cover || editorialArticleCover(item?.slug || "")}
        />
        <h2>نمایش در جست‌وجو</h2>
        <label htmlFor="article-seo-title">عنوان سئو</label>
        <input
          id="article-seo-title"
          name="seoTitle"
          maxLength={160}
          defaultValue={item?.seoTitle ?? ""}
          placeholder="در صورت خالی بودن، عنوان مقاله استفاده می‌شود."
        />
        <label htmlFor="article-seo-description">توضیح سئو</label>
        <textarea
          id="article-seo-description"
          name="seoDescription"
          maxLength={300}
          defaultValue={item?.seoDescription ?? ""}
          placeholder="در صورت خالی بودن، خلاصهٔ مقاله استفاده می‌شود."
        />
        <div className="panel-editor-actions mt-3 flex flex-wrap items-center gap-4">
          <button className={panelButtonClassName} type="submit">
            ذخیره مقاله
          </button>
          {item?.status === "published" && (
            <Link
              href={`/articles/${item.slug}`}
              className="panel-editor-preview font-bold text-[var(--panel-accent,#6840c8)] underline underline-offset-[.25em]"
            >
              پیش‌نمایش منتشرشده ←
            </Link>
          )}
        </div>
      </ArticleEditorForm>
    </>
  );
}
