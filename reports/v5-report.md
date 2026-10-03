# گزارش بازطراحی v5 — Soft Spectrum Editorial

**تاریخ:** ۲۰۲۶-۱۰-۰۲ · **پروژه:** `rezaian-dev/kiana-khorsand` · **مبنای Git:** `ef426ad`

## خلاصهٔ وضعیت

بازطراحی در پروژهٔ موجود انجام شد، نه به‌صورت بازسازی پروژه. Home، هدر/فوتر، قالب‌های عمومی، ورود، حساب و مدیریت از یک سیستم بصری مشترک استفاده می‌کنند. ۱۹ انتخاب‌گر قبلی با کنترل‌های متناسب جایگزین شدند. لایهٔ transport زنده، مرز روشن و قابل‌تعویض دارد؛ کنترل‌های امنیتی SSE حفظ شده‌اند.

**تأیید شده در این نوبت:** typecheck/lint تمام فازها؛ build کامل برنامه با Webpack؛ نماهای اجزای واقعی در محیط ایزوله؛ کنترل‌های انتخاب؛ کنتراست‌های مشخص‌شده؛ حرکت/تم؛ ارسال GET بدون JS؛ دریافت واقعی SSE و ادغام RSC با حفظ وضعیت در یک آزمون فنی بدون دیتابیس.

**تأیید نشده:** سناریوهای کسب‌وکاری R7 با حساب/رکورد واقعی، تب مخفی بومی و BFCache، استقرار چندپروسسی، دسترس‌پذیری جامع با screen reader و همهٔ مرورگرها. این گزارش امتیاز پذیرش ≥۱۸ یا آمادگی تولیدیِ کامل اعلام نمی‌کند.

هیچ اتصال/پرس‌وجو/تغییر دیتابیس، اجرای seed/index، راه‌اندازی backend مشترک، commit یا push انجام نشد. Buildها با guard جلوگیری از DB اجرا شدند؛ فایل ثبت تلاش DB ایجاد نشده است.

---

## ۱. مرجع و مرز استفاده از آن

- مرجع `design-reference/code.html` از نظر head، header، بخش‌ها و footer خوانده و ساختار، token، spacing، grid، کنترل‌ها و حرکت استخراج شد. خلاصهٔ دقیق ۱۵بندی، فهرست قالب‌ها، ۱۹ select و جدول کامل R1 در [phase-0.md](phase-0.md) است.
- تصاویر مرجع در `verification/reference-1440.png` و `verification/reference-390.png` موجودند. نمایش محلی با سبک‌های محلی و فونت خودمیزبان انجام شد؛ HTML مرجع وارد برنامه نشد و از تولید سرو نشده است.
- فقط زبان بصری مرجع استفاده شد: شیشهٔ شناور، قوس پرتره، washهای چندرنگ، pill navigation، bento، rhythm، سایه و connector.
- ادعاهای حرفه‌ای، آمار، اشخاص، review، قیمت، زمان برگزاری، متن، تصویر، فونت/CDN و script مرجع کپی نشدند. شکل لوگوی موجود حفظ و رنگ آن اصلاح شد.
- مرجع از TypeScript، ESLint، Tailwind source scanning، output tracing و context انتشار Docker/Vercel کنار گذاشته شد. در sitemap مسیر تازه‌ای اضافه نشد.

## ۲. فایل‌ها و خروجی هر فاز

فایل CSS در چند فاز تکمیل شده است؛ جدول زیر ترتیب کار را ثبت می‌کند، نه commitهای جداگانه. فهرست کامل ۸۳ مسیر تغییر‌یافتهٔ سورس/تنظیمات/README در [changed-files.json](changed-files.json) آمده است. مدارک ممیزی و آزمون جدا از این فهرست‌اند.

| فاز | فایل‌ها/محدودهٔ تغییر | نتیجهٔ بررسی |
|---|---|---|
| P0 — ممیزی فقط‌خواندنی | `reports/phase-0.md`، `reference-tokens.json`، `phase-0-selects.json`، `phase-0-word-hits.json` | inventory مرجع/route/reader/writer؛ بدون عملیات DB |
| P1 — token | `src/app/globals.css`، `tsconfig.json`، `eslint.config.mjs`، `next.config.ts`، `.dockerignore`، `.vercelignore` | typecheck + lint موفق |
| P2 — primitive | `ui/{select,popover,combobox,segmented-control,choice-fallback}.tsx`؛ `shared/choice-field.tsx`؛ پوست Input/Textarea/Label/CommandItem/Skeleton/Sonner و Badge موجود | typecheck + lint موفق؛ dependency برنامه اضافه نشد |
| P3 — shell | `layout/{header,header-bar,nav-links,social-links,footer,footer-content,booking-bar}.tsx` و CSS | typecheck + lint موفق |
| P4 — Home | `sections/home/{home,hero,about,steps,faq,testimonials,invitation}.tsx`؛ `shared/{service-card,section-connector}.tsx`؛ `motion/{motion,lift}.tsx`؛ حذف `motion/interactions.tsx` | typecheck + lint و build Webpack موفق |
| P5 — عمومی/خواندنی/سیستمی | بخش‌های About/Services/Article/Courses/Contact/Booking/Testimonials/FAQ؛ `shared/policy-page.tsx`؛ `content/{images,questions,policies}.ts` | typecheck + lint موفق |
| P6 — فرم/حساب/مدیریت | ۹ فایل انتخاب‌گر در agenda، clients، preferences، publishing و queue؛ ظاهر auth/account/admin؛ حذف دستورهای بازخوانی از متن‌ها | typecheck + lint و build Webpack موفق |
| P7 — real-time | `server/live-transport.ts`، `server/live.ts`، `app/api/live/route.ts` | typecheck + lint، build Webpack و ۷ آزمون مستقیم transport موفق |
| P8 — اصلاح و تأیید | `admin-header-content.tsx`، `not-found-content.tsx` و bindingهای قبلی؛ reset/required/disabled کنترل‌های مشترک؛ hit target رادیو؛ hover/active/gutter/footer؛ حذف بندهای WIP از متن و descriptionهای ضروری | بررسی‌های تفصیلی زیر؛ محدودیت‌های باقی‌مانده صریح ثبت شده‌اند |

### فرمان‌ها و فایل‌های شاهد

- Node `24.21.0`؛ `npm run typecheck` و `npm run lint` پس از هر فاز: موفق. مدارک: `checks/phase-1.log` تا `checks/phase-8.log`؛ `git diff --check` نهایی نیز موفق.
- Buildهای برنامه پس از P4/P6/P7 و نهایی P8: **`npm run build -- --webpack` موفق** با guard DB و heap محدود. مدارک: `checks/phase-{4,6,7,8}-build.log`.
- مسیر پیش‌فرض Turbopack در محیط ۲GB به‌علت محدودیت منابع متوقف شد؛ آن را موفق اعلام نمی‌کنیم. نسخهٔ dependency و script اصلی build تغییر نکرد.
- build و typecheck محیط ایزولهٔ Next production نیز موفق: `verification/preview-build.log`. این build شاهد اجرای business/auth نیست.

## ۳. سیستم طراحی و کنتراست

### tokenهای اصلی

| نقش | روشن | تیره/توضیح |
|---|---|---|
| Canvas / Ink / Muted | `#FBF8F3` / `#1F2430` / `#5B6475` | blue-charcoal `#151B26`؛ متن `#F1F4FA` و muted روشن‌تر |
| Surface | سفید | `#222B38` |
| Violet | `#6A55D8`؛ متن کوچک `#513ABE` | hue کم‌اشباع و متن روشن |
| Sky / Mint | `#7CC4F2` / `#8FD6BF` | wash و ink مستقل، نه متن pastel کم‌کنتراست |
| Coral / Butter / Rose | `#F59E8B` / `#F6D48B` / `#F3B1C9` | washهای ملایم و کنترل‌شده |
| Field boundary | `#808B9D` | `#93A1B5` |
| CTA | `#6A55D8 → #2B73B0` | متن سفید؛ انتها از سقف تعیین‌شده روشن‌تر نیست |

- Container برابر ۱۲۸۰px، gutter پایه ۲۴px با safe-area، بخش‌های دسکتاپ با فاصلهٔ حدود ۵–۶rem.
- radius کنترل ۱۰، کارت ۲۰ و سطح بزرگ ۲۸px. فیلد اندازه‌گیری‌شده ۴۴px، متن ۱۶px و padding افقی ۱۴px؛ سایهٔ نازک شیشه‌ای، border بنفش و ring سه‌پیکسلی با alpha `0.18` در focus.
- Vazirmatn موجود و خودمیزبان؛ نمایش بزرگ ۵۶/۷۶، موبایل ۳۶/۵۰؛ headingهای بخش ۳۶/۵۲ و موبایل ۲۸/۴۰؛ بدنه در حالت ۱۶/۲۸ یا ۱۸/۳۲.
- زمان‌ها: ۱۲۰/۱۸۰/۲۶۰/۴۲۰/۷۰۰ms. حرکت ترجیحاً transform/opacity/shadow/color/background/filter، hover فقط با fine pointer؛ نسخهٔ reduced-motion و fallback رنگ/شیشه حفظ شد.

### نسبت‌های اندازه‌گیری‌شده

شاهد محاسبات از رنگ‌های computed در `checks/browser.json` و midpoint/hover در `checks/cta-hover-contrast.json`:

| مورد | روشن | تیره |
|---|---:|---:|
| متن اصلی / canvas | 14.648:1 | 15.667:1 |
| muted / canvas | 5.624:1 | 9.900:1 |
| ink کوچک روی washهای شش‌گانه | حداقل 6.124:1 | حداقل 7.447:1 |
| CTA ابتدا / وسط / انتها | 5.379 / **5.364** / 5.022:1 | همان foreground/gradient |
| CTA hover، بدترین انتها | **4.822:1** | همان |
| مرز فیلد / سطح فیلد | **3.444:1** | **5.444:1** |

Midpoint دقیق گرادیان sRGB برابر `[74.5,100,196]` است؛ فقط دو انتها بررسی نشده‌اند. hover واقعی `brightness(1.025)` نیز محاسبه شده است. این نسبت‌ها و axe، گواهی AA جامعِ تمام داده‌ها/حالت‌ها/مرورگرها نیستند.

## ۴. پوشش route و template

**معنی «نمای بررسی‌شده»:** اجزای واقعی پروژه در harness مستقل Next production با profile موجود و DTOهای خالی؛ readerهای DB و authentication واقعی اجرا نشده‌اند. این مسیرهای harness، route تولیدی تازه نیستند.

| route / گروه | قالب | وضعیت لایهٔ نمایش / شواهد |
|---|---|---|
| `/` | T1 | نمای روشن/تیره، ۶ عرض، keyboard/motion/تصویر و booking bar بررسی شد |
| `/about` | T2 + T3 | نمای بررسی‌شده؛ اطلاعات واقعی DB بررسی نشده |
| `/services` و anchorهای جزئیات | T2 + T3 | نمای بررسی‌شده؛ route جداگانهٔ خدمت اختراع نشد |
| `/articles` | T2 | فهرست خالی و کنترل‌های موجود بررسی شدند |
| `/articles/[slug]` | T3 | styling/source بررسی شد؛ محتوای DB، SEO داده‌محور و حالت populated اجرا نشد |
| `/courses` و outlineها | T2 + T3 | نمای خالی بررسی‌شده؛ route detail تازه اضافه نشد |
| `/faq` | T2 | Accordion و حذف `stories` از DOM/پاسخ‌های بسته بررسی شد |
| `/contact`، `/booking` | T4 | نمای بدون ارسال بررسی شد؛ ذخیره/availability واقعی اجرا نشد |
| `/testimonials` | T2 | نمای خالی بررسی شد؛ guard انتشار unchanged؛ دادهٔ واقعی خوانده نشد |
| `/privacy`، `/terms` | T2 + T3 | reading layout، متن و بندهای WIP بررسی شدند |
| `/login` | T4 | نمای ورود/ثبت‌نام؛ حساب‌سازی/نشست واقعی اجرا نشد |
| `/account`، `/account/appointments` | T5 | نمای خالی بررسی‌شده؛ دادهٔ حساب و cancellation واقعی اجرا نشد |
| `/account/settings` | T4 + T5 | نمای فرم بررسی شد؛ profile/password write اجرا نشد |
| `/admin` | T6 | dashboard خالی و shell بررسی شدند؛ اعداد شاهد دادهٔ واقعی نیستند |
| `/admin/appointments`، `/admin/clients` | T6 | نمای خالی و filterها بررسی شدند؛ تاریخچه/جابه‌جایی واقعی اجرا نشد |
| `/admin/articles`، `/admin/courses` | T6 | نمای فهرست خالی بررسی‌شده |
| `/admin/{articles,courses}/[id]`، حالت `new` موجود | T6 | فرم تازه و RHF انتخاب category/image بررسی شد؛ save/edit رکورد موجود اجرا نشد |
| `/admin/messages`، `/admin/reviews` | T6 | نمای خالی/کنترل‌ها؛ moderation و message write واقعی اجرا نشد |
| `/admin/settings` | T6 | فرم، weekday و ماندگاری tab بررسی شد؛ ذخیرهٔ settings اجرا نشد |
| 404، loading، error | T7 | UI واقعی 404 و loading مربوط به About در harness بررسی شد؛ recovery و تمام شاخه‌های خطای برنامه source-reviewed، نه runtime business |
| layoutهای public/auth/account/admin/root | shell | source و اجزای shell بررسی شدند؛ bindingهای reader/session اصلی حفظ شدند |
| API auth/live، sitemap/robots/manifest/OG | مرز رفتار/SEO | route و منطق حفظ شد؛ GET واقعی SSE فقط در آزمون فنی anonymous اجرا شد |

Inventory تک‌تک `layout/loading/error/page`ها در گزارش P0 آمده است. همهٔ قالب‌های موجود پوست مشترک دارند، اما همهٔ حالت‌های populated و error دارای شاهد runtime نیستند.

## ۵. کنترل‌های انتخاب و primitiveها

### جایگزینی ۱۹ select در ۹ فایل

| فایل | انتخاب‌ها | کنترل نهایی |
|---|---|---|
| `agenda-filter.tsx` | status / service / sort | Select / Select / segmented radio |
| `visit-sheet.tsx` | action / date / slot | action chips / date pills / time chip grid |
| `client-filter.tsx` | sort | segmented radio |
| `hours-editor.tsx` | weekday | weekday radio chips؛ تبدیل عددی Controller و time input موجود حفظ شد |
| `content-filter.tsx` | category / status / sort | Select / segmented / segmented |
| `content-form.tsx` | category / image / social / publication | Select / searchable Combobox / searchable Combobox / segmented |
| `message-state.tsx` | status | segmented |
| `queue-filter.tsx` | status / sort | segmented / segmented |
| `review-form.tsx` | status | segmented؛ approval ممنوع همچنان disabled |

- Shared `ChoiceField`، ref/blur/name/value و RHF/zod را نگه می‌دارد. Schema، enum، availability/revision و callbackهای apply/reset تغییر نکردند.
- بدون JS، radioهای واقعی در disclosure قابل‌دسترسی، GET/POST نام/مقدار اصلی را حفظ می‌کنند. panel باز در-flow است و کنترل بعدی را نمی‌پوشاند.
- Radix select مخفی برای submission مجاز است؛ **native select قابل‌دیدن در ۵۶ نمای بررسی‌شده وجود نداشت**.
- ۱۳ آزمون رفتاری موفق در `checks/controls.json`: کیبورد/typeahead، search/Enter/Escape، restore focus، rowهای حداقل ۴۴px، required visible focus، disabled omission، reset uncontrolled/controlled/cancelled، Sheet-local portals، RHF review flag/dirty و GET بدون JS.
- نقص واقعی reset داخلی Radix برای controlled/cancelled form در P8 اصلاح شد: capture/reset guard و انتظار یک task برای native action و React `onReset`. این تغییر schema یا رفتار ذخیره را عوض نمی‌کند.
- دادهٔ native POST نیز بررسی شد، **بدون ارسال درخواست یا اجرای write** (`checks/dom-contracts.json`).

از Select/Popover/Sheet، menuهای موجود، Tabs، Accordion، Calendar، Command و Sonner موجود استفاده شد. Card/layout/avatar/badge primitive جدید، dependency برنامه، CDN، یا stock shadcn appearance اضافه نشد. Badge موجود فقط پوست هماهنگ گرفت. استخراج content هدر/فوتر/404 برای حفظ Server Component و reader binding بود، نه افزودن primitive تزئینی.

## ۶. shell، شبکه‌های اجتماعی و موارد حذف‌شده

- هدر شناور، گرد و شیشه‌ای؛ لوگوی موجود با رنگ تازه؛ pill navigation با indicator؛ یک ورودی ورود/حساب؛ theme toggle؛ social قبل از theme/account در desktop و ردیف compact در mobile.
- social فقط از URL موجود در `Profile` رندر می‌شود؛ `target="_blank" rel="noopener noreferrer"`؛ ۴۰px هدر و ۴۴px فوتر. در profile موجود، Telegram/Instagram/WhatsApp مقدار ندارند؛ **لینک یا URL اختراع نشد**. حالت URL پرشده source-reviewed است، نه proof از settings واقعی.
- فوتر دقیقاً ۳ ستون brand/social، quick links، booking دارد؛ پایین باریک copyright/privacy/terms/sitemap/back-to-top. quick links دو ستونه و ۴۴px؛ license فقط در صورت وجود مقدار. پاراگراف اضطراری/حقوقی-مراقبتی فوتر حذف شد.
- Hero لینک اضافی «مسیرهای همراهی» ندارد. caption معرفی تصویر و disclosure Home حذف شدند. جملهٔ «ثبت درخواست، تأیید نهایی جلسه نیست.» کنار submit رزرو قرار دارد؛ متن‌های لازم دربارهٔ وضعیت درخواست در صفحات پیگیری حفظ شده‌اند.
- `notices` و سؤال `stories` در constants حفظ شدند؛ rendering مربوط به آن‌ها حذف شد. altها توصیفی و خنثی‌اند، نه ادعای هویت افراد.
- بندهای site-readiness/WIP در UI و descriptionهای FAQ/Privacy/Terms/Testimonials حذف/خنثی شدند. title/canonical/robots/OG/Twitter structure و منطق metadata تغییر نکرد.
- هیچ دکمه/فایل/CSS دستی RefreshButton یا دستور reload باقی نمانده است. reset فرم، اعمال filter و کنارگذاشتن draft، کنترل بازخوانی دستی داده نیستند.
- `isSample`، guardهای `published.ts`، repository testimonials و schema دست‌نخورده‌اند. تنها برچسب داخلی مدیریت مجاز است. فایل `checks/source-word-hits.json` هر hit باقی‌مانده را طبقه‌بندی می‌کند؛ placeholderهای input/CSS/API disclosure نیستند.

## ۷. R1 — پوشش real-time و اصلاحات

جدول کامل reader → writer → topic → audience در P0 موجود است؛ تمام خانواده‌های write بررسی شدند: appointment/book/cancel/move، settings/hours، article/course publish/edit/unpublish، review moderation، messages، auth user/profile/session/account hooks. noticeها پس از موفقیت write قرار دارند؛ writer گمشدهٔ persisted data شناسایی نشد.

**اصلاحات انجام‌شده:**

1. transport invalidation-only با `LiveTransport` و adapter process-local؛ hook قابل‌تعویض، بدون record/token/message/form payload.
2. reconfigure هنگام subscriber فعال رد می‌شود؛ unsubscribe و release idempotent هستند.
3. publish failure، write تأییدشده را شکست‌خورده جلوه نمی‌دهد؛ streamهای مربوط بسته می‌شوند تا reconnect + fresh snapshot شکاف را جبران کنند.
4. API cleanup در subscribe failure و قطع زودهنگام، timer/reservation را نشت نمی‌دهد.
5. reader/header binding اصلی در استخراج `AdminHeaderContent` و footer/404 حفظ شد.

**حفظ‌شده:** Origin/cross-site/scope/session/role checks، capهای ۴/user، ۶۴ anonymous، ۲۵۶ total در هر process، pending cap، heartbeat ۲۰s، عمر اتصال ۵min و revalidation خصوصی.

Client موجود با coalescing ۲۵۰ms، transition/یک flight، jitter exponential ۱→۱۵s، renewal، visible/pageshow/online catch-up، BroadcastChannel و fallback دوره‌ای حفظ شد. focus خالی علت pause نیست؛ فقط dirty/submitting/busy. `useDraft` لایهٔ دوم محافظت در برابر RSCِ در حال رسیدن است.

Freshness با مستندات Next 16 بررسی شد: `router.refresh()` RSC را ادغام می‌کند ولی cache persistent را invalid نمی‌کند. readerهای موجود `connection()` و React cache درخواست‌محور دارند، نه persistent DB cache. استنادهای فنی: [Next useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)، [Next caching](https://nextjs.org/docs/app/guides/caching)، [React state identity](https://react.dev/learn/preserving-and-resetting-state).

## ۸. آزمون‌های واقعاً اجراشده و محدودیت R7

### شواهد مستقل از DB

| شاهد | نتیجه / محدوده |
|---|---|
| `checks/browser.json` | **۵۶ render = ۲۸ مسیر × ۲ تم**؛ **۳۳۶ بررسی viewport** در ۳۲۰/۳۹۰/۷۶۸/۱۰۲۴/۱۴۴۰/۱۹۲۰؛ بدون overflow سند، خطای صفحه، واژهٔ ممنوعِ جست‌وجوشده یا native select قابل‌دیدن؛ CLS اولیهٔ ثبت‌شده **۰** |
| axe در همین پرونده | **۲۲ بررسی خودکار بدون violation**؛ فقط مسیرها/حالت‌های انتخاب‌شده، نه گواهی جامع AA |
| `checks/controls.json` | **۱۳ آزمون رفتاری موفق**؛ بدون server action/write |
| `checks/motion.json` | **۶ آزمون موفق**؛ lift ۴px، button lift ۱px و active .98، focus ring، reduced/coarse، theme geometry، font-delay ۱۲۰۰ms در دو تم با CLS ۰ |
| `checks/dom-contracts.json` | booking bar، FAQ/JSON-LD، فوتر و native POST data؛ بدون write |
| `checks/transport.json` | **۷ آزمون واقعی pure transport**، cap/cleanup/failure؛ بدون DB/auth/network backend |
| `checks/live-browser.json` | GET واقعی SSE + LiveRefresh + Next production RSC؛ **۸ مورد فنی موفق و ۱ مورد تب مخفیِ تأییدنشده** |
| `checks/renew.json` | **عمر واقعی پنج‌دقیقه‌ای**، event بومی renew، اتصال مجدد در حدود ۱۵۵ms، بدون disconnected flash در attribute ثبت‌شده و با حفظ focus |

آزمون live یک counter حافظه‌ای را تغییر داد و notice واقعی public فرستاد؛ session endpoint در harness صریحاً null است. **هیچ‌یک جای رکورد واقعی، حساب معتبر، auth یا پایداری داده نیستند.**

در اجرای ثبت‌شدهٔ live: latency سالم **۲۸۷/۳۰۱/۳۰۱ms**، ۲۰ notice در یک refresh و max-flight برابر ۱، حفظ tab/slide/menu/Sheet، حفظ متن/caret/scroll هنگام dirty، catch-up پس از discard حدود **۳۰۲ms** و online recovery حدود **۲۸۳ms**. این اعداد benchmark تولیدی نیستند.

### جدول پذیرش R7

| سناریو | واقعاً اجراشده | وضعیت پذیرش |
|---|---|---|
| رزرو client → admin/client | خیر | فقط source-reviewed؛ DB ممنوع |
| تغییر نوبت admin → owner | خیر | فقط source-reviewed؛ DB ممنوع |
| publish/edit/unpublish → anonymous Home/list/detail | خیر | counter فنی فقط freshness plumbing را ثابت می‌کند |
| settings → تمام shellها | خیر | writer/read coverage بررسی شد؛ URL/دادهٔ واقعی ذخیره نشد |
| messages → admin | خیر | source-reviewed؛ ارسال واقعی انجام نشد |
| signup/profile/role/session revocation | خیر | signed/DB session و auth حقیقی اجرا نشد |
| hidden tab ≤۱s | تلاش شد، اما بومی قابل تأیید نبود | headful/Xvfb محیط trusted hidden event تولید نکرد؛ timeout harness، نه PASS یا latency محصول |
| offline recovery | بله، native offline/online در counter anonymous | plumbing تأیید شد؛ business scenario کامل نه |
| dirty typing/focus/scroll و حفظ UI | بله، در counter و فرم‌های کنترل | محافظت فنی تأیید شد؛ همهٔ editorها/سناریوهای واقعی نه |

BFCache بومی، session/role escalation و revocation با cookie واقعی، چند worker، heartbeat خصوصی، تمام حالت‌های populated/soft insertion/removal و برخوردهای concurrent DB اجرا نشده‌اند. event یا شرط visibility برای تبدیل این موارد به PASS جعل نشده است.

## ۹. R5 — تصمیم استقرار موردنیاز مالک

در repo، پیکربندی قابل‌اتکایی برای shared backend، replica set یا deployment چندپروسسی پیدا نشد. adapter فعلی درون حافظه است و **فقط یک process دائمی Node با writeهای برنامه را پوشش می‌دهد**. برای چند worker/container/serverless، notification و capها اکنون سراسری نیستند.

**یک تصمیم مالک:** «استقرار یک process دائمی Node است، یا چندپروسسی/serverless؟»

- **یک Node دائمی:** adapter موجود می‌تواند باقی بماند؛ مالک باید محیط واقعی، امنیت session و سناریوهای R7 را با دادهٔ مجاز تأیید کند.
- **چندپروسسی:** کوچک‌ترین fan-out، یک adapter مشترک است. انتخاب مشروط به زیرساخت مالک:
  - **MongoDB change streams:** از driver موجود استفاده می‌کند و writeهای بیرون از برنامه را هم می‌تواند ببیند؛ replica set/Atlas و watcher دائمی/resume token لازم دارد. eventها باید به topic/audience معتبر تبدیل شوند و دادهٔ خصوصی به SSE نرود.
  - **Redis Pub/Sub:** ساده برای noticeهای پس از confirmed write؛ یک subscription multiplexed در هر worker. Pub/Sub history ندارد، پس subscribe + fresh snapshot/reconnect ضروری است. اگر cap سراسری لازم باشد، lease/counter اتمیک با TTL نیز لازم است.
- فایل‌های بعدی: `src/server/live-transports/{mongodb|redis}.ts`، bootstrap انتخاب adapter، env/deployment documentation؛ رابط موجود `live-transport.ts` و `live.ts` آمادهٔ binding است. Origin/session/audience policy در API باید باقی بماند.
- هیچ broker، watcher، replica set، database یا سرویس مشترکی provision/متصل نشد؛ transport interface را shared deployment موفق معرفی نمی‌کنیم.

## ۱۰. موارد عمداً کپی‌نشده و موارد باز

**کپی‌نشده:** هویت/آمار/مدرک/مراجع/quote/قیمت/ساعت/URL مرجع؛ سرویس یا route ناموجود؛ متن تبلیغاتی ACT/تخصص از مرجع؛ تصاویر/CDN/فونت آن؛ footer سنگین و legal/emergency paragraph؛ manual refresh؛ avatar اضافه و primitiveهای نمایشی بی‌مصرف.

**حفظ‌شده:** copy و بخش‌های پروژه به‌جز حذف‌های مجاز، بخش Courses اضافی Home، business/schema/auth/model/guardها، مسیرها، consent، stale locks، availability و commit-before-notice.

**باز برای پذیرش:** تمام DB-dependent R7، تصمیم استقرار R5، native hidden tab/BFCache، browser/AT جامع، runtime SEO داده‌محور، دادهٔ populated، اجتماعی‌های دارای URL واقعی و حفظ همهٔ حالت‌های concurrent/private.

فایل‌های تصویری جدید: `verification/home-{1440,390}.jpg`، `login-{1440,390}.jpg`، `admin-{1440,390}.jpg`، `admin-articles-new-{1440,390}.jpg` و `verification-controls-{1440,390}.jpg`. این‌ها شواهد component harness هستند، نه snapshot دیتابیس تولیدی. پوشهٔ verification از انتشار تولیدی و Git ignore کنار گذاشته شده است؛ گزارش‌های جاری در `reports/` نگهداری می‌شوند.

**نتیجه:** پیاده‌سازی بصری و بررسی‌های امنِ مستقل از DB انجام شده‌اند؛ پذیرش کامل محصول/استقرار تا اجرای موارد باز توسط محیط مجاز مالک تکمیل نیست.
