import { requireAdmin } from "@/lib/session";
import { AdminReferenceFrame } from "@/components/panels/admin-reference-frame";

/**
 * Guarded shell for everything under `/admin`.
 *
 * It lives in a `(protected)` route group so `/admin/login` — which must render for
 * visitors who are not administrators yet — stays outside this layout. Route groups
 * do not change URLs:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin();
  return (
    <>
      <link rel="stylesheet" href="/assets/vendor/phosphor/duotone/style.css" />
      <AdminReferenceFrame name={user.name} image={user.image} userId={user.id}>
        {children}
      </AdminReferenceFrame>
    </>
  );
}
