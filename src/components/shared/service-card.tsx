import Link from "next/link";
import { ArrowUpLeft, HeartHandshake, Laptop, Leaf, UsersRound } from "lucide-react";
import { Photo } from "./photo";
import type { Service } from "@/content/services";

type Props = { service: Service };
const icons = { individual: Leaf, couples: HeartHandshake, family: UsersRound, online: Laptop };

export function ServiceCard({ service }: Props) {
  const Icon = icons[service.key];
  return <article className="service-card"><Photo image={service.image} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 90vw" className="service-photo" /><div className="service-body"><span className="service-symbol"><Icon aria-hidden="true" /></span><h3>{service.title}</h3><p>{service.description}</p><Link href={service.href} prefetch={false} className="quiet-link" aria-label={`آشنایی با ${service.title}`}>بیشتر بدانید<ArrowUpLeft aria-hidden="true" /></Link></div></article>;
}
