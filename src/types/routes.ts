// Route inputs are resolved asynchronously by the Next.js App Router.
export type SlugPageProps = { params: Promise<{ slug: string }> };
export type LegacySlugPageProps = { searchParams: Promise<{ slug?: string }> };
export type QueryPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};
export type ArticleSearchProps = {
  searchParams: Promise<{
    q?: string | string[];
    category?: string | string[];
    page?: string | string[];
  }>;
};
export type CategorySearchProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
  }>;
};
export type ReceiptPageProps = { searchParams: Promise<{ id?: string }> };
