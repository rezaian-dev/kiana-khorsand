export const metadata = { title: "آفلاین — کیانا خرسند" };

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-[600px] p-8 text-center">
      <h1 className="text-2xl font-bold">شما آفلاین هستید</h1>
      <p className="mt-4 text-muted-foreground">
        اتصال اینترنت برقرار نیست. لطفاً دوباره تلاش کنید. محتوای خصوصی هرگز به‌صورت آفلاین ذخیره نمی‌شود.
      </p>
      <a href="/" className="mt-6 inline-block rounded bg-teal-600 px-4 py-2 text-white">بازگشت به خانه</a>
    </div>
  );
}
