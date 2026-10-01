import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";

export function BookingBar() {
  return <aside className="booking-bar" aria-label="دسترسی سریع به رزرو"><div><strong>یک قدم برای خودتان</strong><span>انتخاب زمان و ثبت درخواست</span></div><Button asChild><Link href={routes.booking} prefetch={false}>رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></Button></aside>;
}
