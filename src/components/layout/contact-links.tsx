import { Phone } from "lucide-react";
import { profile } from "@/content/profile";
import { SocialIcon } from "@/components/shared/social-icon";

export function ContactLinks() {
  return (
    <div className="contact-links">
      {profile.phone ? <a href={`tel:${profile.phone}`}><Phone aria-hidden="true" />تماس تلفنی</a> : <span aria-disabled="true"><Phone aria-hidden="true" />تلفن، پس از تأیید</span>}
      {profile.whatsapp ? <a href={profile.whatsapp} rel="noopener noreferrer" target="_blank"><SocialIcon name="whatsapp" />واتس‌اپ</a> : <span aria-disabled="true"><SocialIcon name="whatsapp" />واتس‌اپ، پس از تأیید</span>}
    </div>
  );
}
