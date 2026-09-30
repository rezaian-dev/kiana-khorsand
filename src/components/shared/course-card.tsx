import Link from "next/link";
import { ArrowUpLeft, BookOpen } from "lucide-react";
import { Photo } from "./photo";
import { Lift } from "@/components/motion/lift";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/content/home";
import { routes } from "@/lib/constants";

type Props = { course: Course };

export function CourseCard({ course }: Props) {
  return <Lift className="card-lift"><article className="story-card course-card"><Link className="story-link" href={`${routes.courses}#${course.slug}`} prefetch={false}><Photo image={course.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 82vw" className="story-photo" /><div className="story-body"><Badge variant="secondary">{course.category}</Badge><h3>{course.title}</h3><p>{course.description}</p><div className="story-action"><span><BookOpen aria-hidden="true" />آشنایی با دوره</span><ArrowUpLeft aria-hidden="true" /></div></div></Link></article></Lift>;
}
