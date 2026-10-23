import { requireUser } from "@/lib/session";
import { PanelFrame } from "@/components/panels/panel-frame";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { robots: { index: false, follow: false } };
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireUser();
  return (
    <PanelFrame
      name={session.user.name}
      image={session.user.image}
      userId={session.user.id}
    >
      {children}
    </PanelFrame>
  );
}
