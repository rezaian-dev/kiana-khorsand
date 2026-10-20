import { requireAdmin } from "@/lib/session";
import { AdminReferenceFrame } from "@/components/panels/admin-reference-frame";
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
