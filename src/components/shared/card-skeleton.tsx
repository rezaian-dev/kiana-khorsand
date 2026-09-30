import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return <div className="sample-card" role="status" aria-label="در حال آماده‌سازی کارت"><Skeleton className="skeleton-photo" /><div className="sample-body"><Skeleton className="h-6 w-3/4" /><Skeleton className="mt-3 h-4 w-full" /><Skeleton className="mt-2 h-4 w-4/5" /><Skeleton className="mt-6 h-11 w-28" /></div></div>;
}
