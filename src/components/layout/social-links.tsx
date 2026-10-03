import { cn } from "cn";
import type { Profile } from "@/lib/published";
import { SocialIcon } from "@/components/shared/social-icon";

type Props = { profile: Pick<Profile, "telegram" | "instagram" | "whatsapp">; className?: string };
export function SocialLinks({ profile, className }: Props) {
  const links = [
    { key: "telegram", label: "تلگرام", href: profile.telegram },
    { key: "instagram", label: "اینستاگرام", href: profile.instagram },
    { key: "whatsapp", label: "واتس‌اپ", href: profile.whatsapp },
  ] as const;
  if (!links.some((link) => link.href)) return null;
  return <div className={cn("social-links", className)} role="group" aria-label="راه‌های ارتباط">
    {links.map((link) => link.href ? <a key={link.key} data-network={link.key} href={link.href} aria-label={link.label} title={link.label} target="_blank" rel="noopener noreferrer"><SocialIcon name={link.key} /></a> : null)}
  </div>;
}
