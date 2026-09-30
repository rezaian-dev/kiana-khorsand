"use client";

import { useRouter } from "next/navigation";
import { ArrowUpLeft, Image, Palette, SlidersHorizontal } from "lucide-react";
import { Command } from "@/components/ui/command";
import { CommandInput } from "@/components/ui/command-input";
import { CommandList } from "@/components/ui/command-list";
import { CommandEmpty } from "@/components/ui/command-empty";
import { CommandGroup } from "@/components/ui/command-group";
import { CommandItem } from "@/components/ui/command-item";

const links = [
  { href: "#identity", label: "هویت و رنگ‌ها", icon: Palette },
  { href: "#interaction", label: "فرم و حالت‌ها", icon: SlidersHorizontal },
  { href: "#image-demo", label: "تصاویر و اسلایدر", icon: Image },
];

export function CommandDemo() {
  const router = useRouter();
  return <div className="command-demo"><h3>پیدا کردن، بدون پیچیدگی</h3><p className="muted">نمونهٔ جست‌وجوی فرمان؛ با نوشتن، کلیدهای جهت و ورود کار می‌کند.</p><Command label="جست‌وجو در بخش‌های نمایش" dir="rtl"><CommandInput placeholder="مثلاً رنگ یا تصویر…" aria-label="نام بخش موردنظر" /><CommandList><CommandEmpty>بخشی با این نام پیدا نشد.</CommandEmpty><CommandGroup heading="در همین صفحه">{links.map((link) => <CommandItem key={link.href} value={link.label} onSelect={() => router.push(link.href)}><link.icon aria-hidden="true" />{link.label}<ArrowUpLeft className="ms-auto" aria-hidden="true" /></CommandItem>)}</CommandGroup></CommandList></Command></div>;
}
