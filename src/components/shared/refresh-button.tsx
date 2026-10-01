"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function handleRefresh() { startTransition(() => router.refresh()); }
  return <Button className="refresh-button" type="button" variant="outline" onClick={handleRefresh} disabled={isPending} aria-busy={isPending}><RefreshCw aria-hidden="true" />{isPending ? "در حال دریافت…" : "تازه‌کردن وضعیت"}</Button>;
}
