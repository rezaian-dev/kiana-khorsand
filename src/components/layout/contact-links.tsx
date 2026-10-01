import { Phone } from "lucide-react";
import type { Profile } from "@/lib/published";
import { SocialIcon } from "@/components/shared/social-icon";

type Props = { profile: Profile };

export function ContactLinks({ profile }: Props) {
  return (
    <div className="contact-links">
      {profile.phone ? <a href={`tel:${profile.phone}`}><Phone aria-hidden="true" />تماس تلفنی</a> : <span aria-disabled="true"><Phone aria-hidden="true" />تلفن، پس از تأیید</span>}
      {profile.whatsapp ? <a href={profile.whatsapp} rel="noopener noreferrer" target="_blank"><SocialIcon name="whatsapp" />واتس‌اپ</a> : <span aria-disabled="true"><SocialIcon name="whatsapp" />واتس‌اپ، پس از تأیید</span>}
    </div>
  );
}
