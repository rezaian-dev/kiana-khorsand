# جداسازی پنل مدیریت از حساب کاربری

تاریخ: ۲۰۲۶-۱۰-۲۲

## چیدمان مسیرها

| مسیر | دسترسی | رفتار |
| --- | --- | --- |
| `/login`, `/register` | عمومی | ورود/ثبت‌نام کاربر عادی؛ مقصد همه (حتی مدیر) `/dashboard` |
| `/dashboard/**` | کاربر واردشده | پروفایل، نوبت‌ها، پرداخت‌ها… فقط تجربهٔ کاربر |
| `/admin/login` | عمومی | ورود جداگانهٔ مدیر؛ نشست غیرمدیر باطل و پیام «دسترسی مدیریت ندارد» |
| `/admin/**` | مدیر | گذرگاه در `(protected)/layout.tsx` با `requireAdmin()` |

`(protected)` یک route group است و روی URL اثری ندارد؛ فقط `layout.tsx` محافظ را دور صفحات مدیریت می‌گذارد و `login` بیرون از آن می‌ماند.

## Redirectها

`src/lib/session.ts`

- `requireUser()` → نبود نشست: `/login`
- `requireAdmin()` → نبود نشست: `/admin/login`؛ نشست غیرمدیر: `/dashboard`
- `safeReturnPath()` → فقط `/testimonials` و `/workshops/<slug>`، بقیه `/dashboard`

## حساب مدیر در ورود عادی

مدیر با `/login` مثل هر کاربر دیگری وارد می‌شود و در `/dashboard` فرود می‌آید. منوی حساب هیچ گزینهٔ مدیریتی ندارد (`src/components/layout/account-menu.tsx`). پنل فقط با تایپ `/admin` باز می‌شود.

## مدیریت کاربران

- `src/features/admin/users/{types,queries,actions}.ts` — لایهٔ داده و سرور اکشن‌ها
- `src/features/admin/users/ui/{users-manager,user-actions}.tsx` — جست‌وجو/فیلتر و دیالوگ‌های تأیید
- `src/app/(panels)/admin/(protected)/users/page.tsx` — صفحهٔ سرور

قواعد سرور: فقط مدیر، ObjectId معتبر، بدون تغییر نقش خود، بدون حذف خود، حداقل یک مدیر باید بماند. حذف حساب، `sessions` و `accounts` را هم پاک می‌کند.

## کامپوننت تأیید

`AlertDialog` از shadcn/ui (Radix) برای هر دو عمل ارتقا و حذف؛ حالت `variant="destructive"` برای حذف. توست‌ها با `sonner` از طریق `SiteToaster`.

## آزمون‌ها

`e2e/admin-separation.spec.ts`

1. ورود مدیر از فرم عمومی → `/dashboard` + منوی حساب بدون گزینهٔ مدیریت.
2. `/admin/login` → `/admin` و فهرست کاربران با دکمه‌های ارتقا/حذف.
3. مدیرِ نبودن حساب عادی → پیام «دسترسی مدیریت ندارد».

اجرای `npx playwright test` → ۹/۹ سبز (۳ آزمون جدید + ۶ آزمون اسلایدر).
