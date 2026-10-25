import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main"
      dir="rtl"
      className="grid min-h-svh place-items-center px-4 text-center"
    >
      <div className="card-rainbow w-full max-w-lg">
        <span className="icon-tile tile-violet mx-auto" aria-hidden="true">
          <SearchX size={28} />
        </span>
        <h1 className="h1 mt-6">صفحه پیدا نشد</h1>
        <p className="lead mt-3">
          ممکن است نشانی تغییر کرده باشد یا این صفحه دیگر در دسترس نباشد.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            صفحهٔ اصلی
          </Link>
          <Link href="/contact" className="btn btn-soft">
            تماس با ما
          </Link>
        </div>
      </div>
    </main>
  );
}
