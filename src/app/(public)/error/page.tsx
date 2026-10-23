import { siteDetailClassName } from "@/components/shared/site-styles";
import Link from "next/link";
import { Intro } from "@/components/shared/intro";
import { labels } from "@/lib/labels";
export const metadata = {
  title: "خطا",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <>
      <Intro story="path" title="خطایی رخ داده است" />
      <div className={siteDetailClassName}>
        <Link className="site-button" href="/">
          {labels.home}
        </Link>
      </div>
    </>
  );
}
