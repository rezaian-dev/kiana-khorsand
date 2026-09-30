import { MessageCircle } from "lucide-react";
import { Photo } from "./photo";
import { Badge } from "@/components/ui/badge";
import type { Story } from "@/content/home";

type Props = { story: Story };

export function ReviewCard({ story }: Props) {
  return <article className="review-card"><div className="review-top"><MessageCircle aria-hidden="true" /><Badge variant="outline">نمونهٔ چیدمان</Badge></div><h3>{story.title}</h3><p>{story.description}</p><div className="review-person"><Photo image={story.image} sizes="64px" className="review-avatar" /><div><strong>{story.label}</strong><span>چهرهٔ ساختگی · نه مراجع واقعی</span></div></div></article>;
}
