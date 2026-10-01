"use client";

import { useEffect, useState, useTransition } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { liveEvents, requestLive } from "@/lib/live-client";
import { saveSidebar } from "@/server/actions/sidebar";

type Props = { isCollapsed: boolean };

export function SidebarToggle({ isCollapsed }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isUncertain, setIsUncertain] = useState(false);
  useEffect(() => { function handleApplied() { setIsUncertain(false); } window.addEventListener(liveEvents.applied, handleApplied); return () => window.removeEventListener(liveEvents.applied, handleApplied); }, []);
  function handleToggle() {
    if (isPending || isUncertain) return;
    startTransition(async () => {
      try {
        const result = await saveSidebar({ isCollapsed: !isCollapsed });
        if (!result.isSuccess) { setIsUncertain(true); toast.error("ترجیح منو تأیید نشد."); }
      } catch { setIsUncertain(true); toast.error("نتیجهٔ تغییر منو روشن نیست."); }
      finally { requestLive(); }
    });
  }
  return <div className="sidebar-control"><Button type="button" variant="outline" size="icon" onClick={handleToggle} disabled={isPending || isUncertain} aria-busy={isPending} aria-controls="admin-sidebar" aria-expanded={!isCollapsed} aria-label={isCollapsed ? "گسترش منوی مدیریت" : "جمع‌کردن منوی مدیریت"}>{isCollapsed ? <PanelRightOpen aria-hidden="true" /> : <PanelRightClose aria-hidden="true" />}</Button></div>;
}
