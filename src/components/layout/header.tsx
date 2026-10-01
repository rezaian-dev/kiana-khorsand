import { HeaderBar } from "./header-bar";
import { Logo } from "./logo";
import { ContactLinks } from "./contact-links";
import { MobileMenu } from "./mobile-menu";
import { LiveRefresh } from "@/components/shared/live-refresh";
import { readProfile } from "@/server/published";
import { getViewer } from "@/server/viewer";
import { canAuthenticate } from "@/server/auth";

export async function Header() {
  const [viewer, profile] = await Promise.all([getViewer(), readProfile()]);
  return (
    <HeaderBar viewer={viewer} menu={<MobileMenu brand={<Logo />} contacts={<ContactLinks profile={profile} />} />}>
      <LiveRefresh isEnabled={canAuthenticate()} viewer={viewer ? { id: viewer.id, role: viewer.role } : null} />
    </HeaderBar>
  );
}
