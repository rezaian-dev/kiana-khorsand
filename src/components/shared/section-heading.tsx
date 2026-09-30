import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

type Props = { id: string; eyebrow: string; title: string; description: string; href?: string; linkLabel?: string };

export function SectionHeading({ id, eyebrow, title, description, href, linkLabel }: Props) {
  return <div className="section-heading home-heading"><div><p className="section-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div><div className="heading-aside"><p>{description}</p>{href && linkLabel && <Link className="quiet-link" href={href} prefetch={false}>{linkLabel}<ArrowUpLeft aria-hidden="true" /></Link>}</div></div>;
}
