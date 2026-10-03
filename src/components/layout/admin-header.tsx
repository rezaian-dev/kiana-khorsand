import { readProfile } from "@/server/published";
import { LiveRefresh } from "@/components/shared/live-refresh";
import { AdminHeaderContent } from "./admin-header-content";
import type { AdminMessage } from "@/lib/admin";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer; unread: number; messages: AdminMessage[] };
export async function AdminHeader({ viewer, unread, messages }: Props) {
  const profile = await readProfile();
  return <AdminHeaderContent viewer={viewer} unread={unread} messages={messages} profile={profile} connection={<LiveRefresh isEnabled viewer={{ id: viewer.id, role: viewer.role }} isVisible />} />;
}
