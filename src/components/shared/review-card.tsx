import { MessageCircle } from "lucide-react";
import { Photo } from "./photo";
import { Badge } from "@/components/ui/badge";
import type { Review } from "@/lib/published";
import { formatDate, getInitials } from "@/lib/format";

type Props = { review: Review };

export function ReviewCard({ review }: Props) {
  return <article className="review-card"><div className="review-top"><MessageCircle aria-hidden="true" /><Badge variant="outline">با رضایت انتشار</Badge></div><h3>روایت {review.name}</h3><blockquote><p>{review.quote}</p></blockquote><div className="review-person">{review.image ? <Photo image={review.image} sizes="64px" className="review-avatar" /> : <span className="review-avatar review-initials" aria-hidden="true">{getInitials(review.name)}</span>}<div><strong>{review.name}</strong><span>انتشار: <time dateTime={review.publishedAt}>{formatDate(new Date(review.publishedAt))}</time></span></div></div></article>;
}
