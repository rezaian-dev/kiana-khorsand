"use client";

import { TriangleAlert } from "lucide-react";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main"
      className="grid min-h-[100svh] place-items-center px-4 text-center"
      dir="rtl"
    >
      <div className="card-rainbow w-full max-w-lg">
        <span className="icon-tile tile-violet mx-auto" aria-hidden="true">
          <TriangleAlert size={28} />
        </span>
        <h1 className="h1 mt-6">در نمایش صفحه مشکلی پیش آمد</h1>
        <p className="lead mt-3">
          می‌توانی دوباره تلاش کنی یا به صفحهٔ اصلی برگردی.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn btn-primary" onClick={reset}>
            تلاش دوباره
          </button>
          <Link href="/" className="btn btn-soft">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </main>
  );
}
