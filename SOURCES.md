# Version table

| Package / tool | Exact version | Official version source |
| --- | --- | --- |
| Node.js (Active LTS) | 24.21.0 | https://nodejs.org/dist/index.json ; https://github.com/nodejs/Release/blob/main/schedule.json |
| npm (bundled with Node) | 11.19.0 | https://nodejs.org/dist/index.json |
| create-next-app (one-off scaffolder) | 16.3.8 | https://registry.npmjs.org/create-next-app/16.3.8 |
| `@better-auth/mongo-adapter` | 1.7.7 | https://registry.npmjs.org/@better-auth/mongo-adapter/1.7.7 |
| `@daypicker/persian` (Phase 2 approved calendar add-on) | 10.0.2 | https://registry.npmjs.org/@daypicker/persian/10.0.2 |
| `@daypicker/react` (transitive compatibility facade) | 10.0.2 | https://registry.npmjs.org/@daypicker/react/10.0.2 |
| `date-fns-jalali` (approved transitive runtime prerelease exception) | 4.1.0-0 | https://registry.npmjs.org/date-fns-jalali/4.1.0-0 |
| `@hookform/resolvers` | 5.9.1 | https://registry.npmjs.org/@hookform/resolvers/5.9.1 |
| `better-auth` | 1.7.7 | https://registry.npmjs.org/better-auth/1.7.7 |
| `class-variance-authority` | 0.7.1 | https://registry.npmjs.org/class-variance-authority/0.7.1 |
| `cmdk` | 1.1.1 | https://registry.npmjs.org/cmdk/1.1.1 |
| `cn` | 0.4.0 | https://registry.npmjs.org/cn/0.4.0 |
| `date-fns` | 4.4.0 | https://registry.npmjs.org/date-fns/4.4.0 |
| `embla-carousel-autoplay` | 8.6.0 | https://registry.npmjs.org/embla-carousel-autoplay/8.6.0 |
| `embla-carousel-react` | 8.6.0 | https://registry.npmjs.org/embla-carousel-react/8.6.0 |
| `lucide-react` | 1.49.0 | https://registry.npmjs.org/lucide-react/1.49.0 |
| `mongodb` | 7.7.0 | https://registry.npmjs.org/mongodb/7.7.0 |
| `motion` | 13.5.0 | https://registry.npmjs.org/motion/13.5.0 |
| `next` | 16.3.8 | https://registry.npmjs.org/next/16.3.8 |
| `next-themes` | 0.4.6 | https://registry.npmjs.org/next-themes/0.4.6 |
| `radix-ui` | 1.6.7 | https://registry.npmjs.org/radix-ui/1.6.7 |
| `react` | 19.3.0 | https://registry.npmjs.org/react/19.3.0 |
| `react-day-picker` | 10.0.2 | https://registry.npmjs.org/react-day-picker/10.0.2 |
| `react-dom` | 19.3.0 | https://registry.npmjs.org/react-dom/19.3.0 |
| `react-hook-form` | 7.89.0 | https://registry.npmjs.org/react-hook-form/7.89.0 |
| `recharts` | 3.10.1 | https://registry.npmjs.org/recharts/3.10.1 |
| `sonner` | 2.0.8 | https://registry.npmjs.org/sonner/2.0.8 |
| `zod` | 4.6.5 | https://registry.npmjs.org/zod/4.6.5 |
| `@tailwindcss/postcss` (development) | 4.3.3 | https://registry.npmjs.org/@tailwindcss/postcss/4.3.3 |
| `@types/node` (development) | 26.6.3 | https://registry.npmjs.org/@types/node/26.6.3 |
| `@types/react` (development) | 19.3.0 | https://registry.npmjs.org/@types/react/19.3.0 |
| `@types/react-dom` (development) | 19.3.0 | https://registry.npmjs.org/@types/react-dom/19.3.0 |
| `eslint` (development) | 9.39.5 | https://registry.npmjs.org/eslint/9.39.5 |
| `eslint-config-next` (development) | 16.3.8 | https://registry.npmjs.org/eslint-config-next/16.3.8 |
| `shadcn` (development) | 4.21.1 | https://registry.npmjs.org/shadcn/4.21.1 |
| `@shadcn/registry` (CLI-required transitive development) | 0.1.0 | https://registry.npmjs.org/@shadcn/registry/0.1.0 |
| `tailwindcss` (development) | 4.3.3 | https://registry.npmjs.org/tailwindcss/4.3.3 |
| `tw-animate-css` (development) | 1.4.0 | https://registry.npmjs.org/tw-animate-css/1.4.0 |
| `typescript` (development) | 6.0.3 | https://registry.npmjs.org/typescript/6.0.3 |
| Vazirmatn (local variable WOFF2 and outline source) | 33.003 | https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003 |
| `gensync` (transitive development; prerelease) | 1.0.0-beta.2 | https://registry.npmjs.org/gensync/1.0.0-beta.2 |
| `resolve` (transitive development; prerelease) | 2.0.0-next.7 | https://registry.npmjs.org/resolve/2.0.0-next.7 |

## Client Component register

Updated at Phase 11 completion (2026-10-01). **55 authored client entry files**: 53 TSX files, including the required Next error boundary, and two context-only TS modules. Phase 10 added QueueFilter, MessageState, ReviewForm, SettingsForm and HoursEditor; Phase 11 removed the unreferenced ChartLegendContent. The remaining register is complete. Queue/detail text, settings chrome, pages, readers and repository access remain server-owned. No second live subscriber, client page, session provider or context provider was added.

| File under `src/components` unless explicitly prefixed with `src/` | Client reason and boundary |
| --- | --- |
| `sections/queue/queue-filter.tsx` | QueueFilter — shared RHF/Zod URL sender/status/order/page filter for the two queues, native GET fallback and dirty/pending pause; never browser-filters message bodies. |
| `sections/queue/message-state.tsx` | MessageState — small RHF/Zod status action leaf, explicit write only, stable revision snapshot, pending/uncertain/receipt guard; message body/email stay server-rendered. |
| `sections/queue/review-form.tsx` | ReviewForm — constrained moderation inputs (status/consent/remove-image), RHF/Zod, explicit acknowledged writes and stale/unknown guard; cannot edit testimony or sample provenance. |
| `sections/preferences/settings-form.tsx` | SettingsForm — RHF/Zod full-singleton snapshot and CAS action, controlled RTL preserved tabs, nullable Controllers, error-tab selection and dirty/pending/unknown/saved states. |
| `sections/preferences/hours-editor.tsx` | HoursEditor — useFieldArray/useWatch/Controller for bounded weekly intervals and numeric day/duration, explicit empty-row add/remove, deterministic bar/text preview; no availability read or invented hours. |
| `sections/publishing/content-filter.tsx` | ContentFilter — RHF/Zod URL search/category/status/order, explicit router navigation, native GET fallback and dirty/pending live pause. |
| `sections/publishing/content-form.tsx` | ContentForm — shared discriminated article/course form, RHF/Zod/useWatch/Controller, manifest-only cover choices, snapshot/CAS actions, pending/receipt/uncertain locks and explicit review consent; no autosave or reset from live props. |
| `sections/publishing/article-fields.tsx` | ArticleFields — article-only RHF useFieldArray sections/sources with native stable keys, explicit reorder/removal and Controller paragraph/point arrays; passed client form methods, no server reads. |
| `layout/nav-link.tsx` | NavLink — pathname-only current-page/current-location leaf for list/editor routes with server-passed icon/label; no post-mount guard or rewritten paths. |
| `sections/agenda/agenda-filter.tsx` | AgendaFilter — RHF/Zod server query defaults, explicit URL navigation, dirty/pending live pause and native GET fallback; no client-side record filtering. |
| `sections/agenda/visit-sheet.tsx` | VisitSheet — explicit snapshot/revision, RHF/Zod operation, native CAS actions and guarded availability read, bounded useOptimistic preview inside transition, pending/uncertain lock outside Portal, scoped Ctrl/Cmd+Enter. |
| `sections/clients/client-filter.tsx` | ClientFilter — RHF/Zod search/sort URL navigation, dirty/pending live pause and explicit query privacy disclosure. |
| `sections/clients/client-sheet.tsx` | ClientSheet — controlled Sheet only; profile/history remain server-rendered children, stable ID parent key, never automatically opened by URL. |
| `layout/admin-drawer.tsx` | AdminDrawer — controlled native Sheet, post-interaction Motion and dismissal of server-passed navigation; no viewport render branching. |
| `layout/sidebar-toggle.tsx` | SidebarToggle — validated native cookie Server Action in a transition, pending/uncertain guard; server cookie controls geometry, no parallel local collapse state. |
| `layout/command-menu.tsx` | CommandMenu — existing cmdk and Sheet, Ctrl/Cmd+K listener with composition/modal guards, local shortcut filtering plus RHF/Zod authorized record-search action, superseded-response rejection and fixed-destination navigation; no search expression in destination URL. |
| `layout/notifications.tsx` | Notifications — existing Radix Popover/portal/focus behavior plus reduced-aware Motion presence; server unread count and server-rendered preview children, no client data fetch or mark-read action; explicit child link activation closes the Popover. |
| `sections/dashboard/live-number.tsx` | LiveNumber — Motion spring/transform seeded with the real SSR number; changes animate after refresh, reduced motion jumps, assistive value is the actual target. |
| `sections/dashboard/visit-chart.tsx` | VisitChart — existing shadcn Chart/Recharts composition, deterministic ID/data and fixed chart slot; native chart animation disabled, Persian labels and server text-table alternative. |
| `layout/account-links.tsx` | AccountLinks — typed native HTTP logout result, pending/error status and router refresh; identity/role/count supplied by the server, no browser-derived initial session. |
| `layout/account-menu.tsx` | AccountMenu — controlled Dropdown/Sheet; CSS-first breakpoint choice, no viewport render branch. |
| `layout/mobile-menu.tsx` | MobileMenu — controlled fullscreen Sheet, user-triggered Motion stagger, close events. |
| `layout/nav-links.tsx` | NavLinks — usePathname for the five active-link states; no rewrites or render-time browser reads. |
| `layout/theme-toggle.tsx` | ThemeToggle — useTheme/click; both icons and stable label present in SSR. |
| `layout/theme.tsx` | Theme — next-themes provider and prepaint script; server children stay server-rendered. |
| `motion/lift.tsx` | Lift — reduced-aware 8px hover transform; initial=false, server card children. |
| `motion/motion.tsx` | Motion — strict LazyMotion/domAnimation and system-reduced MotionConfig; passes server children. |
| `motion/scroll-progress.tsx` | ScrollProgress — useScroll; fixed transform-based track, no scroll writes. |
| `sections/booking/booking-form.tsx` | BookingForm — RHF/Zod/useWatch selection, controlled Persian Calendar, CSS-only compact day choices, native Server Action transition, live prop reconciliation without resetting selections, explicit stale-slot alternatives and uncertain-write block. |
| `sections/contact/message-form.tsx` | MessageForm — RHF Controller/resolver/Zod, useId, native sendMessage transition, acknowledged/uncertain outcomes and retained inputs; dirty/busy SSE pause and unnamed native fields preventing no-JS GET of entered values. |
| `sections/login/auth-form.tsx` | AuthForm — RHF/Zod Controllers, typed native same-origin sign-in/sign-up, Persian server field errors and verified-session confirmation followed by full-document navigation to the server-allowlisted return path; unnamed DOM fields, reserved status/errors, no mounted gate. |
| `sections/login/auth-tabs.tsx` | AuthTabs — RTL native Tabs and two preserved form instances; CSS hides inactive force-mounted content before hydration. |
| `shared/live-refresh.tsx` | LiveRefresh — one native EventSource, authorized server-selected scope, visibility lifecycle/debounced transitions and accessible connection status; dirty/open-confirmation pause for ordinary refresh, forced recheck for reset/observed identity change; optional visible transport status keyed to server scope, never a second EventSource or an initially-green guess. |
| `src/app/error.tsx` | Next error convention — safe Persian retry boundary using reset; never fabricates a guest session or an empty result on failure; retains the emergency disclaimer even when profile/chrome reads fail. |
| `shared/search-form.tsx` | SearchForm — RHF/Zod query validation, useId, pending transition and safe router navigation; server defaultValue, native GET fallback, no client filtering or data fetch. |
| `sections/appointments/cancel-form.tsx` | CancelForm — controlled existing Sheet, RHF/Zod hidden receipt fields, explicit confirmation, revision snapshot, typed Server Action result; shared root Sonner receipt survives removal of the row. |
| `sections/settings/profile-form.tsx` | ProfileForm — RHF/Zod with server defaults, native HTTP name/phone update, explicit remote-value replacement and unknown-outcome block; no automatic reset from props. |
| `sections/settings/password-form.tsx` | PasswordForm — native HTTP password change/current-password verification and other-session revocation request; empty SSR defaults, clear only after confirmed success. |
| `shared/refresh-button.tsx` | RefreshButton — reused transition-based router.refresh with reserved button width; no navigation or forced scroll. |
| `shared/photo.tsx` | Photo — scoped useAnimate load fade and local error state; getImageProps/native picture, reserved geometry. |
| `shared/slide-rail.tsx` | SlideRail — Embla/autoplay lifecycle, external-store selected/snap-count snapshots, reInit eligibility, viewport/reduced/focus/hover/visibility gates, pause and dots. |
| `ui/carousel-content.tsx` | CarouselContent — consumes carouselRef/orientation context; CSS-first slide geometry. |
| `ui/carousel-context.ts` | CarouselContext/useCarousel — client context/hook and CarouselApi types, not a component/barrel. |
| `ui/carousel-next.tsx` | CarouselNext — consumes scrollability/context and handles navigation. |
| `ui/carousel-previous.tsx` | CarouselPrevious — consumes scrollability/context and handles navigation. |
| `ui/carousel.tsx` | Carousel — native Embla hook/context and useSyncExternalStore select/reInit subscriptions; stable primitive snapshots and SSR default. |
| `ui/direction.tsx` | DirectionProvider — native shadcn/Radix RTL provider with dir=rtl. |
| `ui/dropdown-menu-content.tsx` | DropdownMenuContent — forceMount portal and controlled AnimatePresence for post-interaction Motion exit/entry. |
| `ui/sheet-content.tsx` | SheetContent — controlled forceMount portal/overlay/content, Motion presence, reduced-motion handling. |
| `ui/sonner.tsx` | Toaster — Sonner leaf with Persian region label, RTL, stable semantic CSS theme; native transitions/animations disabled. |
| `ui/calendar.tsx` | Calendar — native interactive DayPicker with local component/formatter functions, enforced Persian/RTL/Tehran and required deterministic today prop; fixed weeks, native animation disabled. |
| `ui/calendar-day-button.tsx` | CalendarDayButton — native focus modifier and button ref effect with preventScroll; no autoFocus on initial page. |
| `ui/chart-context.ts` | ChartContext/useChart — native client context hook and config type; no component or barrel. |
| `ui/chart-container.tsx` | ChartContainer — useId, native chart context and ResponsiveContainer; fixed-height slot and deterministic initial dimensions. |
| `ui/chart-tooltip-content.tsx` | ChartTooltipContent — native chart context and active payload, safe type narrowing and Intl numeric formatting; no raw vendor payload read. |

Header, Footer, Logo, ContactLinks, BookingBar, SocialIcon, PageHeading, SectionHeading, SectionSurface, JsonLd, BookingPrompt, Home/About/Services/Articles/Article/Courses, CatalogFilters, CatalogResults, Testimonials, Faq, Contact, PolicyPage, BreadcrumbSchema, Login, Booking and the content sections/cards, pages, loading, layouts and metadata conventions remain server files; the explicitly listed interactive forms and Next error boundary are the exceptions. The retained Calendar/Chart foundations are not mounted by Home. The showcase and all seven specimen-section files were deleted, along with their local messageSchema. The pure CLI Sheet/Dropdown/Accordion/Tabs/Command/Label wrappers no longer carry redundant client directives: their native Radix/cmdk controls retain vendor client boundaries, and wrappers enter the client graph when imported by an interactive leaf. CalendarChevron, ChartStyle and ChartTooltip are directive-free native leaves consumed within their client parents; CarouselItem, Button, Input, Textarea, Skeleton and Badge are also directive-free. These are not claims that native widgets execute without JavaScript. Account, Appointments, Settings, AccountNav and AppointmentCard are also server files. AdminHeader, AdminNav, Dashboard, ScheduleList and MessagePreview are server files; they pass rendered children or minimal DTOs to the six new leaves. Server content is passed through interactive leaves as children rather than imported by a top-level client page.

Header and login now resolve a verified server Viewer; native Auth/SSE routes and a visibility-aware subscriber exist. There is no client session provider, fake session or post-mount guest replacement. Public content/profile and article metadata now use request-time, validated repository DTOs; the sitemap is dynamic. Seed fixtures are never an error/loading fallback. Own-appointment cancellation is now wired to its existing Server Action. Profile/password editing uses native Auth HTTP wrappers. Booking creation and contact submission are now wired to their existing Server Actions; the admin shell/dashboard now consume guarded real summaries. Admin appointment/client search, all management pages and Phase 10 editors are implemented. Phase 11 audited the source, corrected live reauthorization/tab attributes/article share selection, and trimmed unused code. This register and the Phase 11 section supersede historical statuses; implementation is not operational launch acceptance. The user's «ادامه» after the Phase 6 decision request is treated as approval of the explicitly proposed temporary development-only ESLint 9 exception. ESLint remains EOL; this does not restore upstream support or authorize other deprecated packages.

## Version selection and compatibility

- Verified 2026-09-30 against npm registry `latest` tags, published package manifests, installed manifests and the lockfile; all declared versions are exact, with no force/legacy-peer-deps/overrides or experimental framework flags; full transitive versions and integrity hashes live in `package-lock.json`.
- Node 24 is Active LTS until 2026-10-20; 26.10.0 is Current, not yet LTS, so the explicit Active LTS rule selects 24.21.0; the official Linux binary SHA256 was checked against that release’s SHASUMS256.txt — https://nodejs.org/en/about/previous-releases ; https://nodejs.org/dist/v24.21.0/SHASUMS256.txt
- Next 16.3.8 is both npm latest and the September 30 security patch; reviewed the blog and advisory index before selecting it — https://nextjs.org/blog/september-2026-security-release ; https://github.com/vercel/next.js/security/advisories
- Next 16.3.8 accepts React/React DOM ^19.0.0; latest React and React DOM 19.3.0 match each other; the scaffolder’s older React 19.2.8 defaults were replaced before installation — https://registry.npmjs.org/next/16.3.8 ; https://registry.npmjs.org/react-dom/19.3.0
- React Hook Form 7.89.0 accepts React ^19; resolvers 5.9.1 accepts RHF ^7.55.0 and Zod ^4.0.0; Zod 4.6.5 therefore fits — https://registry.npmjs.org/react-hook-form/7.89.0 ; https://registry.npmjs.org/@hookform/resolvers/5.9.1
- Motion 13.4.6 accepts React/React DOM ^18 or ^19; next-themes 0.4.6 accepts React/React DOM ^19; both fit 19.3.0 — https://registry.npmjs.org/motion/13.4.6 ; https://registry.npmjs.org/next-themes/0.4.6
- Better Auth 1.7.6 accepts Next ^16, React ^19 and MongoDB ^7; its matching MongoDB adapter 1.7.6 accepts MongoDB ^7; mongodb 7.7.0 requires Node >=20.19.0, satisfied by 24.21.0 — https://registry.npmjs.org/better-auth/1.7.6 ; https://registry.npmjs.org/@better-auth/mongo-adapter/1.7.6 ; https://registry.npmjs.org/mongodb/7.7.0
- shadcn 4.21.0 requires Node >=20.18.1; cn 0.4.0 requires >=20; Tailwind and its PostCSS integration both resolve to 4.3.3; radix-ui, Embla, cmdk, Recharts, Sonner and DayPicker peer ranges accept React 19.3.0 — https://registry.npmjs.org/shadcn/4.21.0 ; https://ui.shadcn.com/r/styles/radix-nova/style.json
- Latest ESLint 10.11.0 conflicts with Next’s eslint-plugin-import 2.32.0 (maximum major 9) and eslint-plugin-react 7.37.5 (maximum major 9); strict npm resolution rejected it; newest mutually compatible ESLint is 9.39.5, but it is deprecated/EOL, an unresolved policy blocker — https://registry.npmjs.org/eslint-plugin-import/2.32.0 ; https://registry.npmjs.org/eslint-plugin-react/7.37.5 ; https://eslint.org/version-support/
- Latest TypeScript 7.0.2 conflicts with typescript-eslint 8.71.0 (>=4.8.4 <6.1.0); strict npm resolution rejected it; newest stable compatible TypeScript 6.0.3 was selected under version-policy rule 3 — https://registry.npmjs.org/typescript-eslint/8.71.0 ; https://registry.npmjs.org/typescript/6.0.3
- Strict peer/engine installation passed after those two compatibility selections; this establishes declared dependency compatibility, not authentication, UI or database behavioral correctness — https://docs.npmjs.com/cli/v11/using-npm/config#strict-peer-deps
- The shadcn Chart registry currently pins Recharts 3.8.0, while npm latest is compatible 3.10.1; 3.10.1 is installed, but Chart code has not been added or modified in Phase 0; reconcile this when the CLI component is introduced — https://ui.shadcn.com/r/styles/radix-nova/chart.json

## Official documentation followed in Phase 0

- Scaffold: official create-next-app 16.3.8, --ts --tailwind --eslint --app --src-dir --empty --skip-install --no-react-compiler --no-agents-md, followed by reviewed exact versions — https://nextjs.org/docs/app/api-reference/cli/create-next-app
- Routing and directory placement: src/app route groups, routes-only app tree and framework-reserved filenames; empty future directories have no placeholder source files — https://nextjs.org/docs/app/getting-started/project-structure
- Root layout: typed ReactNode children, html/body and Persian lang/RTL attributes; no browser-dependent state — https://nextjs.org/docs/app/api-reference/file-conventions/layout ; https://react.dev/learn/typescript
- Scaffold noindex only: root metadata protects the unfinished placeholder; site-wide SEO is not implemented ahead of Phase 2 — https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots
- Environment variables: root .env.local, committed .env.example, one explicit allowlist in src/lib/env.ts; no database or auth module imported during configuration — https://nextjs.org/docs/app/guides/environment-variables
- Environment validation: z.object, protocol-restricted z.url, refinements, preprocessing, transformation and safeParse; failures disclose field names only — https://zod.dev/api ; https://zod.dev/basics
- Config: typed next.config.ts calls getEnv() at config load, validating configuration without network access — https://nextjs.org/docs/app/api-reference/config/next-config-js
- Tailwind: retained the official scaffolder’s PostCSS integration and CSS import, upgraded both packages together to stable latest — https://tailwindcss.com/docs/installation/framework-guides/nextjs
- shadcn installation: CLI init --base radix --preset nova --rtl --no-monorepo --yes, CSS variables enabled, no page/component implementation yet — https://ui.shadcn.com/docs/installation/next ; https://ui.shadcn.com/docs/cli
- shadcn paths: components.json maps ui/layout-related code into the required src tree; hooks alias points at components/shared, never an extra src/hooks folder — https://ui.shadcn.com/docs/components-json
- shadcn RTL: CLI configured rtl:true; DirectionProvider will be added with the actual design system in Phase 2 — https://ui.shadcn.com/docs/rtl/next
- Font scope: removed CLI-injected next/font/google Geist code and unused font variables; official local Vazirmatn setup remains Phase 2, with no downloaded substitute — https://ui.shadcn.com/docs/cli ; https://nextjs.org/docs/app/getting-started/fonts
- shadcn foundation dependencies: cn, class-variance-authority, radix-ui, tw-animate-css and shadcn CSS are specified by the official installation/registry; no clsx/tailwind-merge copy from older tutorials — https://ui.shadcn.com/docs/installation/manual ; https://ui.shadcn.com/r/styles/radix-nova/style.json
- Carousel dependency selection: Embla React and its autoplay plugin follow the documented shadcn integration; no carousel code is implemented yet — https://ui.shadcn.com/docs/components/radix/carousel
- Sheet/DropdownMenu dependency selection: current Radix-based registry uses the radix-ui package, not manually selected substitute libraries — https://ui.shadcn.com/r/styles/radix-nova/style.json ; https://ui.shadcn.com/r/styles/radix-nova/sheet.json ; https://ui.shadcn.com/r/styles/radix-nova/dropdown-menu.json
- Command dependency selection: cmdk, with dialog/input primitives added only when used in the relevant phase — https://ui.shadcn.com/docs/components/radix/command
- Chart dependency selection: Recharts, installed but not imported globally or pre-built — https://ui.shadcn.com/docs/components/radix/chart
- Toast dependency selection: sonner and next-themes, installed without global client wrappers in Phase 0 — https://ui.shadcn.com/docs/components/radix/sonner
- Calendar dependency selection: official Calendar installation requires react-day-picker and date-fns and documents the /persian import; application date/number formatting will still use Intl, not date-fns — https://ui.shadcn.com/docs/components/radix/calendar
- Theme package selection only: next-themes per shadcn Next.js dark-mode guide; no provider or theme toggle built ahead of Phase 2 — https://ui.shadcn.com/docs/dark-mode/next
- Forms dependency selection only: React Hook Form, @hookform/resolvers and Zod; no application form built yet — https://react-hook-form.com/get-started ; https://registry.npmjs.org/@hookform/resolvers/5.9.1 ; https://zod.dev/basics
- Motion package selection only: Motion supports React 18.2+ and App Router; no animation API used yet — https://motion.dev/docs/react-installation
- Better Auth installation only: better-auth plus the explicitly required @better-auth/mongo-adapter; the live adapter docs currently demonstrate the better-auth/adapters/mongodb import; implementation is Phase 7 — https://better-auth.com/docs/installation ; https://better-auth.com/docs/adapters/mongo
- MongoDB driver installation only: current driver npm metadata has the authoritative 7.7.0 version and >=20.19.0 engine; no quickstart connection instructions executed — https://www.mongodb.com/docs/drivers/node/current/get-started/ ; https://registry.npmjs.org/mongodb/7.7.0
- Manual script execution documented for Phase 7: Node 24 type stripping is stable since 24.12.0, --env-file is stable since 24.10.0; no script runner is needed — https://nodejs.org/docs/latest-v24.x/api/typescript.html ; https://nodejs.org/docs/latest-v24.x/api/cli.html#--env-filefile
- Verification: ESLint CLI with Next core-web-vitals and TypeScript configs, tsc --noEmit and next build; no test library, browser or database execution — https://nextjs.org/docs/app/api-reference/config/eslint
- Reproducible installs and audit: exact declared versions, package-lock.json, npm ci and npm audit, without automatic force fixes — https://docs.npmjs.com/cli/v11/commands/npm-ci ; https://docs.npmjs.com/cli/v11/commands/npm-audit

## Audit and verification record

- Executed with Node 24.21.0 / npm 11.19.0: strict-peer/engine npm installation, shadcn initialization, npm run typecheck, npm run lint, npm run build and npm audit --json.
- TypeScript: passed; ESLint: passed; Next production build: passed, with only the scaffold root and framework not-found route; no database code exists to execute.
- npm audit: 0 total vulnerabilities (0 high, 0 critical); this is not a guarantee that dependency defects or security issues do not exist.
- Lockfile inspection: one deprecated dependency (ESLint 9.39.5) and two prerelease development transitives (gensync and resolve); no claim of full stable-only compliance.
- Naming inspection: handwritten identifiers are English and short; framework page/layout/config conventions retained; CLI-generated src/lib/utils.ts is an unresolved naming conflict.
- No server was started; no browser, database command, auth call, live handler, database script, external SEO validator or performance measurement was run.

## Deviations needing approval

**Decision recorded at the start of Phase 1:** the user replied «ادامه» to the explicit Phase 0 proposals. Proceeding with those narrowly scoped exceptions: the pinned development-only toolchain exception and documented support packages are accepted; the unused utils.ts re-export is removed, with the shadcn utility alias set to the documented cn package; the auth catch-all is authorized only for Phase 7 and has not been implemented. The findings below remain as historical disclosure, not a claim that deprecated/prerelease dependencies became stable.

1. **Toolchain stability blocker:** the provisional lockfile uses deprecated ESLint 9.39.5 because the official Next ESLint plugins reject 10.x, and includes gensync@1.0.0-beta.2 via Babel/shadcn/React Hooks linting plus resolve@2.0.0-next.7 via Next’s ESLint resolvers; gensync latest is itself beta and the upstream resolve ranges require the prerelease major. Smallest proposed exception: accept only these exact development-tool dependencies until upstream stable compatible replacements exist, or keep Phase 0 blocked pending upstream releases. No override, unsupported peer suppression, or replacement stack has been applied — https://eslint.org/version-support/ ; https://registry.npmjs.org/gensync ; https://registry.npmjs.org/eslint-import-resolver-node/0.3.10
2. **Document-required supporting packages:** explicit reporting under the source-of-truth exception: cn, class-variance-authority, radix-ui, tw-animate-css, cmdk, date-fns, Recharts, Sonner and Embla/autoplay support the requested shadcn components; TypeScript/type packages/ESLint/PostCSS come from the mandated scaffolder; the separate MongoDB auth adapter is explicitly required by current docs. All are pinned; approve the documented supporting dependency set. In particular tw-animate-css is installed by current shadcn but conflicts with a literal ban on every other animation library; smallest proposal is allow this documented CSS dependency only, with Motion as the sole authored JS animation library — https://ui.shadcn.com/docs/installation/manual ; https://ui.shadcn.com/r/styles/radix-nova/style.json ; https://better-auth.com/docs/adapters/mongo
3. **Naming conflict:** the required project layout explicitly names lib/utils, and shadcn init creates src/lib/utils.ts re-exporting cn, but the naming rules forbid utils and the abbreviation cn; the generated file is retained for review and currently unused. Smallest proposal: remove that unused file and use the current shadcn-documented direct import from cn in future UI code, with no generic helper module; not applied without approval — https://ui.shadcn.com/docs/installation/manual
4. **Later auth routing conflict discovered during installation review:** the structure permits only api/live, but Better Auth’s documented integration requires an auth catch-all handler. Smallest proposal: permit src/app/api/auth/[...all]/route.ts in Phase 7, with the required private/noindex API treatment; no auth route has been created now — https://better-auth.com/docs/installation#mount-handler

## Phase 0 acceptance

| Requirement | Result |
| --- | --- |
| Verify/pin the current Active LTS Node runtime | Met |
| Read npm latest tags, engines/peers and official Next security releases | Met |
| Exact mutually compatible declared versions and committed lockfile | Met, with explicitly disclosed policy blockers below |
| Entire dependency graph stable and non-deprecated | Not met: ESLint, gensync, resolve |
| Official create-next-app, App Router, src, strict TypeScript, Tailwind | Met |
| Required directory layout, without premature feature implementation | Met; empty directories are not represented in Git |
| Initialize shadcn via its CLI | Met |
| Listed dependencies with supporting additions approved | Not met: documented supporting dependency exception awaits approval |
| Audit and resolve high/critical findings | Met: none reported |
| Central Zod env validation, .env.local and committed .env.example | Met |
| SOURCES version table, official references and complete client register | Met |
| README setup and real-time limitations | Met |
| Typed image-manifest skeleton | Met |
| Naming rules | Not met: generated utils.ts/cn conflict |
| Allowed type/lint/build verification without database access | Met |

**Checklist at the Phase 0 hand-off: 12 of 15 met.** The following «ادامه» authorizes the proposed exceptions; this historical result is retained rather than rewriting the audit.


## Phase 1 — logo concepts

- Scope: temporary `/logo-preview` route only, with a review entry on the existing scaffold; no final logo assets, favicon, app icons, theme provider, public-site chrome, Motion system, website font installation or other Phase 2 work has started.
- Concept A is displayed as «الف / پناهِ آرام»: a Psi stem grows into a lotus with leaf-like side arms; concept B is «ب / امضایِ همراه»: a K monogram fused with a petal and Psi-inspired arm; concept C is «پ / افقِ خرسندی»: a sunrise and a supporting curve cradle a lotus.
- Preview matrix: three concepts × four fixed proof grounds (light, dark, mono and inverse mono) × two forms × four widths (256, 64, 32, 16 CSS pixels); 96 complete comparison specimens, in addition to the three navigation thumbnails.
- Geometry: hand-authored 96-unit artboards with a consistent 7-unit round stroke; A and C use five paths, B four; the outlined wordmark adds one compound path; lockup viewBox is 336 × 96 with the emblem at the RTL reading start — https://www.w3.org/TR/SVG2/paths.html
- Inline SVG: one viewBox, no raster, filters, masks, clip paths, external references or external font requests; all rendering passes through the single temporary Concept component — https://www.w3.org/TR/SVG2/paths.html ; https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/linearGradient
- SVG accessibility and unique identifiers: first-child title, role=img, aria-labelledby, explicit dimensions, React useId with concept-prefixed title and gradient ids in a synchronous server component — https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title ; https://react.dev/reference/react/useId
- Font source: latest official release v33.003, original variable `fonts/webfonts/Vazirmatn[wght].woff2`, axis 100–900, licensed SIL OFL 1.1; downloaded to sandbox-only working storage for outlining, not wired into the app — https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003 ; https://raw.githubusercontent.com/rastikerdar/vazirmatn/v33.003/fonts/webfonts/Vazirmatn%5Bwght%5D.woff2
- Font provenance: WOFF2 SHA256 `4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92`; original OFL SHA256 `17e355067c8284f47743a1ee3b1ef7ff684ff0601eda357f9353b10b3016ab31`; the license exempts documents created using the font from the font-software licensing requirement — https://raw.githubusercontent.com/rastikerdar/vazirmatn/v33.003/OFL.txt
- Wordmark: unmodified «کیانا خرسند», variable weight 750, Persian language / Arabic script / RTL shaping through HarfBuzz, then glyph outlines through fontTools; never hand-drawn Persian forms; no title or descriptor inside the logo — https://harfbuzz.github.io/what-is-harfbuzz.html ; https://fonttools.readthedocs.io/en/stable/pens/svgPathPen.html
- Outlining tools (fontTools, HarfBuzz bindings, CairoSVG and Brotli) are sandbox-only; no new project dependency or script-runner package was added, and no generation script was added to scripts/; the outlined name was rasterized for the specifically requested letter-joining inspection, not a browser/page visual test.
- Minimum sizes: 16px emblem and 96px lockup remain the intended production minima; the requested 64/32/16px lockups are explicitly labeled scale stress specimens, not approved production usage; final clear-space rules remain Phase 2 after selection.
- Rendering: all proof content, rationales and both light/dark treatments are in the server HTML; no client-only tabs, theme-state detection, click-to-load specimens or generated-image service — https://nextjs.org/docs/app/getting-started/server-and-client-components
- Review metadata: Persian title and description, environment-based canonical, Open Graph website/fa_IR and Twitter summary, explicit noindex/nofollow; the temporary design route is not an indexable business page and has no fabricated structured data — https://nextjs.org/docs/app/api-reference/functions/generate-metadata ; https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Navigation: real Next Link between scaffold and preview; same-document anchors for the concept sections and back-to-top, fixed identifiers for these addressable document anchors, one h1, h2 concepts, h3 proof modes, visible breadcrumb — https://nextjs.org/docs/app/api-reference/components/link
- Loading: loading.tsx reuses the same Gallery with isLoading; only the fixed-dimension graphic slots become static skeletons, preserving all copy, grids and measurements — https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Responsive sizing: 320px baseline, wrapping Persian text, logical properties, 256px proofs retained at native dimensions, one proof column until 720px, two until 1400px and four above; responsive behavior is reasoned from CSS, not browser-verified — https://tailwindcss.com/docs/responsive-design ; https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio
- Motion scope: the proof sheet is deliberately static on first paint; links have only small transform/shadow hover/press feedback and disable movement under prefers-reduced-motion; the shared Motion system is not pre-started — https://web.dev/articles/optimize-cls
- Accessibility: real keyboard-operable anchors, minimum 44px targets, 3px visible focus outline, accessible SVG titles, explicit light/dark grounds and no color-only concept identifiers — https://www.w3.org/TR/WCAG22/

### Phase 1 contrast calculations

- Calculated using WCAG sRGB relative luminance, not browser sampling: ink/white 15.99:1; light secondary text/white 6.45:1; secondary text against conservative darkest component-wise pastel background #e4e5f0 5.15:1; dark secondary text/ink 8.90:1 — https://www.w3.org/TR/WCAG22/#dfn-relative-luminance ; https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
- Light emblem gradient stops on white range from 5.47:1 to 7.10:1; explicit sRGB interpolation has convex luminance, so the light-ground minimum is bounded by the brightest endpoint; the name itself is solid ink, not gradient text.
- Dark gradient contrast has a conservative 4.32:1 lower bound using component-wise minimum RGB #388cbf against #1e1b4b; actual gradient colors cannot be darker than that bound; wordmark and inverse mono are solid white at 15.99:1.
- These are token-level calculations, not a claim of cross-browser visual quality, small-size legibility verification or final whole-site AA conformance; the production contrast audit remains Phase 11.

### Phase 1 SEO checklist

**SEO checklist: met for the temporary noindex review route, by source inspection.** Title, description, canonical, Open Graph, intended noindex, one h1, ordered headings, visible breadcrumb, real internal links, SVG accessible names and fixed dimensions, and complete server-rendered content are present; article/business/course structured data and photographic alt text are not applicable to this design-only route; final social-image assets belong to Phase 2. No search engine or rich-results validator was run.

### Phase 1 zero-flicker reasoning

| Requirement | Review-route reasoning |
| --- | --- |
| 1. Theme | Fixed light/dark/mono specimens appear together in server HTML; no theme provider or theme hydration is involved in the temporary route. |
| 2. Fonts | Logo lettering is outlined, and temporary explanatory copy uses the installed system stack from first paint; no webfont fetch or swap; final next/font/local setup is still Phase 2. |
| 3. Auth | No session-dependent UI in this design-only route; no signed-out-to-signed-in replacement. |
| 4. Hydration | No time, randomness, locale-dependent formatting, effects or mounted checks; synchronous useId supplies SVG accessibility/paint identifiers. |
| 5. Images | No raster imagery; each inline SVG declares width, height and viewBox and is present in the HTML. |
| 6. Widgets | No carousel, calendar or initializing widget exists in this phase. |
| 7. Loading | loading.tsx and page.tsx use the same Gallery, with identical content and graphic dimensions; skeletons occupy the final slots. |
| 8. Chrome | No fixed header, sidebar, scroll lock or overlay; min-block-size uses svh and no effects change scroll position or page width. |
| 9. Animation | No first-load entrances or hidden content awaiting hydration; only user-initiated transform/shadow feedback, disabled under reduced motion. |
| 10. Interactive state | Only real anchor navigation; no forms, asynchronous action labels, live content mutations or in-flow toasts. |
| 11. Third parties | No external fonts, embeds, browser scripts or remotely loaded assets; font tooling runs only during authoring. |
| 12. Verification | Reasoned source review, tsc, ESLint and build only; no browser execution, no measured CLS and no claim of flicker-free rendering verification. |

**Zero-flicker check: met by design reasoning for the temporary route; not visually verified.**

### Phase 1 acceptance

| Requirement | Result |
| --- | --- |
| Three distinct, prescribed A/B/C concepts | Met |
| Clinical/family relevance and serene name rationale, without invented Kiana etymology | Met |
| Emblem and RTL full-name lockup, no title/descriptor inside | Met |
| Requested 256/64/32/16px specimens for both forms | Met |
| Light, dark and mono, including inverse mono | Met |
| Three rationale statements per concept | Met |
| Geometric, consistent SVG paths, unique ids, accessible titles, no raster/filter tricks | Met |
| Faithfully shaped and outlined official-font wordmark | Met; only glyph-joining raster inspection performed |
| Temporary noindex server route, metadata and dimension-matched loading | Met |
| Responsive/accessibility/contrast reasoning with honest verification limits | Met |
| Naming, complete client register and official source updates | Met; zero project client components |
| TypeScript, ESLint and build; stop for concept and placement selection | Met; selection is the phase gate |

**Checklist: 12 of 12 met.** No new deviations needing approval; prior Phase 0 exceptions remain documented. Await the user's concept choice and emblem/lockup choices for header and footer before beginning Phase 2.

- Phase 1 preview delivery: started the built Next.js production server on 0.0.0.0:3000; the review route is /logo-preview. This is delivery, not a browser, database or real-time behavior test.


## Phase 2 part 1 — approved brand and foundations

The user chose B («ب — امضای همراه») and explicitly chose **lockup for both header and footer**. Part 1 was announced as final brand assets, local typography, theme and design tokens; the remaining Phase 2 interactions/chrome/full showcase are a separate approval-gated continuation. No Phase 3 page has been started.

### Official sources and decisions

- Local font: next/font/local with source relative to root layout, weight `100 900`, preload, CSS variable, `display: optional` and adjusted Arial fallback — https://nextjs.org/docs/app/api-reference/components/font
- No late font swap: optional has an extremely small block period and no swap period; browser timings vary; slow connections may keep fallback for that page view — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display
- Preload plus optional avoids the early rerender in the documented Chrome behavior; this is a strategy, not a cross-browser first-paint or measured CLS guarantee — https://web.dev/articles/preload-optional-fonts
- Official font source/license: unchanged Vazirmatn 33.003 WOFF2 distributed with the complete OFL; font SHA256 `4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92`, license SHA256 `17e355067c8284f47743a1ee3b1ef7ff684ff0601eda357f9353b10b3016ab31` — https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003
- Theme provider: class attribute, default system, enableColorScheme, enableSystem and disableTransitionOnChange; one root suppressHydrationWarning; SSR-unsafe theme reads are avoided, not hidden with a mounted gate — https://github.com/pacocoursey/next-themes ; https://ui.shadcn.com/docs/dark-mode/next
- Theme button: both Lucide icons are rendered in equal absolute slots and switched by root CSS; the click handler reads the already-applied root class and calls setTheme; the static accessible label avoids server/client text differences — https://ui.shadcn.com/docs/dark-mode/next ; https://github.com/pacocoursey/next-themes#usetheme
- shadcn Button: generated using the pinned official CLI (`npx --no-install shadcn add button --yes`) with strict-peer/engine and exact-save environment settings, then restyled; all original variant/size keys and native exports retained; anchor downloads use asChild — https://ui.shadcn.com/docs/components/radix/button ; https://ui.shadcn.com/docs/cli
- Semantic foreground/background pairs, light/dark overrides, sidebar/chart/radius mappings and named colors follow the official theme convention, not the neutral demo palette — https://ui.shadcn.com/docs/theming
- Tailwind v4 mapping uses top-level @theme inline for CSS-variable aliases; shadow namespaces map central layered elevations — https://tailwindcss.com/docs/theme ; https://tailwindcss.com/docs/box-shadow
- All 22 hue scales have levels 50/100/200/300/400/500/600/700/800/900/950; 50–400 mix 4/9/18/34/62% of the anchor with white in oklab, and 600–950 mix 84/68/50/34/20% with #080613; these are author-selected brand scales, not an upstream palette — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix
- All 16 requested gradient families have light/dark accent and surface versions (64 tokens); explicit sRGB interpolation is used for these and the separate contrast-controlled action gradient; raw accent gradients are decoration, not arbitrary text backgrounds — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient
- Stable scrollbar space, logical RTL properties, dvh, fixed logo/icon slots and 44px control minima reduce avoidable geometry changes; reduced motion disables state transitions; no initial content is animated or hydration-hidden — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scrollbar-gutter ; https://www.w3.org/TR/WCAG22/
- Logo: synchronous server useId gives unique paint/title identifiers; exactly the approved four geometric paths plus the one faithfully outlined wordmark path; no image-based logo embedding, filters, external font or hand-drawn lettering — https://react.dev/reference/react/useId ; https://www.w3.org/TR/SVG2/pservers.html ; https://www.w3.org/TR/SVG2/struct.html#TitleElement
- Icon file conventions: adaptive app/icon.svg and opaque 180×180 app/apple-icon.png are automatically exposed by Next; six standalone brand exports use separate namespaces; the in-app renderer is only Logo — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
- Typed root manifest supplies Persian name/dir/lang and brand icons; display browser makes no offline/PWA/installability claim — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
- Default OG and Twitter cards: static 1200×630 PNGs with matching .alt.txt files use Next metadata conventions; designed brand graphics are not substitutes for the required real photographic content — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Static-card decision: ImageResponse documents ttf/otf/woff, not WOFF2, and the reviewed API docs do not establish correct Persian joining/bidi for this design; the expressly allowed static option avoids an unsupported shaping claim — https://nextjs.org/docs/app/api-reference/functions/image-response
- Social-card Persian subtitle is shaped with the same official font using fa/arab/rtl HarfBuzz and converted with SVGPathPen/TransformPen before rasterization; only glyph joining was inspected in the authoring artifact, not a browser; external cached authoring tools are not project dependencies — https://uharfbuzz.readthedocs.io/reference.html ; https://fonttools.readthedocs.io/en/stable/pens/svgPathPen.html ; https://fonttools.readthedocs.io/en/stable/pens/transformPen.html ; https://cairosvg.org/documentation/
- Metadata: validated metadataBase, title template, Persian default description, fa_IR OG, Twitter large card and optional Google verification; current review adds explicit noindex/nofollow/self canonical and unique title/description; no fabricated business/review schema — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Viewport preserves browser zoom, adds safe-area viewportFit cover and media-based light/dark themeColor; browser chrome/icon media follows OS preference rather than the manually selected site theme — https://nextjs.org/docs/app/api-reference/functions/generate-viewport
- Loading reuses the full static Review with identical boxes/copy instead of a generic spinner; the full reusable skeleton system is still in remaining Phase 2 work — https://nextjs.org/docs/app/api-reference/file-conventions/loading

### Asset and naming record

- Removed `/logo-preview`, Gallery, Specimen, Concept, the unselected concept definitions, proof styles and the preview route constant. Selection history stays in git and this document, not live routes.
- `src/content/brand.ts` is the single typed geometry/wordmark source for Logo and records the selected default form; exports under public/brand are standalone downloadable assets, not duplicate runtime renderers.
- Font source and full license are shipped under src/fonts. Icon/apple/manifest/OG/Twitter filenames are required Next conventions. No added project scripts, dependency, generic utils file, barrels, extra src level, auth stub or DB code.
- Authored component filenames match named PascalCase exports; all are one component per file, and section Review is reused by the page and loading route. Default framework exports and native shadcn Button/buttonVariants/Comp names follow the stated exceptions. Handwritten props types are Props; booleans isLockup/isDark; handler handleToggle. No any, unsafe non-null assertion or time/random/browser read during render.
- All 22 hues are present: violet, purple, fuchsia, magenta, rose, coral, orange, amber, gold, mint, emerald, teal, cyan, sky, azure, indigo, periwinkle, lavender, blush, peach, plum, ink.
- All 16 gradient names are present: Aurora, Sunrise, Lagoon, Orchid, Cotton Candy, Peach Glow, Ocean, Twilight, Mint Dew, Golden Hour, Dream, Nebula, Berry, Meadow, Dusk, Coral Reef.

### Token contrast calculations

These are WCAG relative-luminance arithmetic from authored tokens, **not rendered/browser sampling**, and do not certify every future surface/state/photo/chart or full-site AA conformance. Decorative dividers are not relied on as control boundaries; outline buttons use the stronger input token. Accent swatches contain no text; captions use solid card surfaces.

| Pair | Light ratio | Dark ratio |
| --- | --- | --- |
| foreground / background | 15.53 | 17.48 |
| foreground / card | 16.36 | 15.63 |
| muted-foreground / card | 6.67 | 9.25 |
| muted-foreground / background | 6.33 | 10.35 |
| primary-foreground / primary | 7.10 | 9.42 |
| secondary-foreground / secondary | 9.42 | 11.23 |
| accent-foreground / accent | 7.35 | 9.92 |
| destructive-foreground / destructive | 7.31 | 8.54 |
| success-foreground / success | 6.97 | 8.28 |
| warning-foreground / warning | 7.39 | 9.92 |
| input / card | 3.83 | 5.00 |
| input / background | 3.64 | 5.60 |
| ring / card | 7.10 | 9.23 |
| ring / background | 6.74 | 10.33 |
| action foreground / complete gradient (conservative bound) | >=5.47 | >=6.84 |

For the light action gradient, sRGB-channel luminance convexity bounds the brightest point by the brightest endpoint. For dark action, the component-wise minimum RGB across all stops supplies a lower luminance bound against the dark text. Existing logo gradient calculations from Phase 1 remain applicable to the white/ink exports. Full contrast of all future components stays pending — https://www.w3.org/TR/WCAG22/#dfn-relative-luminance ; https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

### Part 1 zero-flicker reasoning

| Area | Implemented strategy / remaining limitation |
| --- | --- |
| Theme | next-themes prepaint root class; two CSS-switched icons; one documented root warning suppression; no mounted gate. |
| Fonts | Local preloaded optional font, adjusted Arial fallback; no late swap period; slow connections may keep fallback. First-paint timing is UA-dependent, not universally guaranteed. Logo/social lettering is outlined. |
| Auth | No session UI in the current design-only route; exact server-resolved auth chrome remains Phase 2/7 work, not a signed-out imitation. |
| Hydration | Stable server markup, useId, no render-time Date/random/document/theme selection; document read only on click. |
| Images | Logo has explicit viewBox/width/height and CSS height. Social/icon images are metadata assets; photographic wrappers and load fades are still pending. |
| Widgets | No initialized carousel/calendar/dropdown yet. Their CSS-first geometry must be implemented with the full showcase. |
| Loading | Page and loading use the identical Review component and content; no spinner or replacement-sized placeholder. |
| Chrome | Fixed 80px review top row, 40/44px logo, 44px theme target, stable scrollbar gutter; full header/sidebar/overlays are pending. |
| Animation | No initial entrance, hidden content, layout animation or scroll writes; state-only transform/shadow/gradient-position transitions; reduced-motion static. |
| State/live | Only genuine asset download anchors and theme switching; no fake submit/booking/login actions, toast claims or live data. |
| Third parties | No external browser font/image/widget requests; all brand resources are local. |
| Verification | Only TypeScript, ESLint, DB-independent build and permitted dependency audit, with source/asset-authoring reasoning; no browser/flicker/CLS/live/SEO-tool verification. |

**Zero-flicker check: met by design reasoning for this partial static review, with the documented optional-font tradeoff; not visually verified. Full Phase 2/sitewide check: not met yet because chrome, photos, Motion/widgets and other skeletons are unfinished.**

### Part 1 SEO checklist

**SEO checklist: met for the temporary review, by source inspection only.** Server HTML, one h1, logical headings, unique Persian title/description, self canonical, noindex/nofollow, fa_IR OG/Twitter image/alt, metadataBase and icons/manifest are implemented. This is not a protected route. **Sitewide SEO checklist: not met yet**: designed 404, robots/security/JSON-LD foundation and the comprehensive review remain next part; request-time DB sitemap belongs to Phase 7 and final validation to Phase 11. No public clinical claims beyond the user's provided identity/role, license fabrication or review/rating schema.

### Phase 2 workstream checklist (partial delivery)

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Approved light/dark/mono emblem and outlined lockup SVG assets | Met |
| 2 | Single server Logo, accessible home link, 40/44 height, minimum/clear-space guidance | Met |
| 3 | Brand icons, manifest and default Persian social assets | Met |
| 4 | Delete Phase 1 preview route/components/content/styles/link | Met |
| 5 | Official local variable font, complete license and documented no-late-swap strategy | Met |
| 6 | Prepaint light/dark/system theme and stable theme control | Met |
| 7 | Full 22 hue scales, 16 gradient families and Tailwind/shadcn semantic tokens | Met |
| 8 | Central elevation/glow/focus/motion-value tokens and CLI-based Button foundation | Met |
| 9 | Honest noindex foundation review with dimension-identical loading and actual downloads | Met |
| 10 | Naming rules, official sources, complete client register and allowed code/build checks | Met |
| 11 | Motion/LazyMotion/MotionConfig, RTL DirectionProvider, remaining primitives and interactive/form states | Not met; next part |
| 12 | Fixed server header, five links, mobile fullscreen menu and desktop/mobile account menus | Not met; next part; real auth wiring remains Phase 7 |
| 13 | Pure server footer, custom social icons, contact/booking card, crisis/confidentiality/legal band | Not met; next part |
| 14 | SectionSurface, decorations, typed sample content, real local photos/manifests and reusable skeletons | Not met; next part |
| 15 | Designed 404 and remaining sitewide SEO/robots/security/JSON-LD foundations | Not met; next part; DB sitemap remains Phase 7 |
| 16 | Comprehensive noindex design-system showcase and full Phase 2 review | Not met; next part; remove after approval |

**Checklist: 10 of 16 met.** This is the promised coherent partial delivery, not completion of Phase 2. No new deviations needing approval; the previously accepted tooling exceptions remain, and optional-font fallback is explicitly documented rather than claimed as a universal font-first-paint guarantee. Stop for «ادامه» before completing the remaining Phase 2 work. Do not begin Phase 3.

### Verification and delivery record

- The official Button CLI produced one component file and did not change package.json, package-lock.json or components.json; all exact pins/strict-peer decisions remain unchanged. No new project dependency.
- First typecheck encountered an obsolete `.next/types` reference to the deleted Phase 1 route. Stopped the old production server, removed generated .next output, rebuilt, then reran TypeScript/ESLint successfully; this was stale generated code, not a hidden source failure.
- Final allowed commands: `npm run typecheck`, `npm run lint`, `NEXT_TELEMETRY_DISABLED=1 npm run build`; all pass on Node 24.21.0 / npm 11.19.0. Build has only `/`, framework not-found and five brand metadata routes. No DB module/connection exists.
- `npm audit --json`: 0 vulnerabilities, including 0 high/critical, at this delivery; accepted EOL/prerelease development exceptions remain disclosed and are not cleared by that count.
- No database connection/ping/script/seed/live handler, browser test, test suite, SEO validator or Core Web Vitals measurement ran. The only raster inspection was Persian shaping in a static authored brand card.
- Delivery: restarted the final built production server on 0.0.0.0:3000; `/` now serves the Phase 2 foundation review with genuine downloads. Server readiness is delivery evidence only, not browser/visual verification.


## Phase 2 part 2 — shared shell and interactions

Continuation authorized by «ادامه», within Phase 2 only. Package.json, package-lock.json and the installed version set remain unchanged. No Calendar/Persian add-on or Chart dependency downgrade was installed.

### Official sources and decisions

- shadcn official CLI generated Sheet, DropdownMenu, Accordion, Tabs, Carousel, Sonner, Input, Textarea, Label, Badge, Skeleton and Command; generated multi-component files were split into native-named one-component files and unused exports pruned. Existing branded Button/Input/Textarea were preserved when Command added its dependencies. Unused Dialog/InputGroup scaffolding was removed, not shipped — https://ui.shadcn.com/docs/cli ; https://ui.shadcn.com/docs/components/radix/command ; https://ui.shadcn.com/docs/components/radix/carousel
- RTL uses native DirectionProvider with its required `dir` prop; semantic CSS is logical and breakpoint decisions are CSS-first — https://ui.shadcn.com/docs/rtl/next
- Radix Dialog/Dropdown retain focus/keyboard/portal behavior; controlled forceMount permits Motion to own presence transitions, without native CSS entrance classes — https://www.radix-ui.com/primitives/docs/components/dialog ; https://www.radix-ui.com/primitives/docs/components/dropdown-menu ; https://www.radix-ui.com/primitives/docs/guides/animation
- Tabs/Accordion use their native composition rather than custom keyboard/ARIA reimplementations — https://ui.shadcn.com/docs/components/radix/tabs ; https://ui.shadcn.com/docs/components/radix/accordion
- Motion uses strict LazyMotion/domAnimation plus `motion/react-m`, system reduced motion, AnimatePresence initial=false for post-load menus, transform-based hover/tab/progress effects and scoped load animation; no initial viewport content is hidden — https://motion.dev/docs/react-lazy-motion ; https://motion.dev/docs/react-motion-config ; https://motion.dev/docs/react-animate-presence ; https://motion.dev/docs/react-use-reduced-motion ; https://motion.dev/docs/react-use-scroll ; https://motion.dev/docs/react-use-animate ; https://motion.dev/docs/react-use-in-view
- Embla 8.6.0 is the mandated native slide transport; autoplay starts only after the explicit eligibility gates, stops on interaction/focus/hover and cleans up. Hosted autoplay docs returned 404, so the official version-pinned repository docs were used — https://github.com/davidjerleke/embla-carousel/tree/v8.6.0/packages/embla-carousel-docs/src/content/pages/plugins ; https://www.embla-carousel.com/api/events/ ; https://www.embla-carousel.com/api/options/
- Carousel scrollability uses useSyncExternalStore, a memoized subscription with cleanup, primitive immutable snapshots and a deterministic server snapshot; this replaces synchronous effect state updates without lint suppression — https://react.dev/reference/react/useSyncExternalStore
- cmdk provides local ranking/keyboard selection; CommandDemo only routes to its four static fragment destinations, not untrusted input or DB search — https://github.com/dip/cmdk ; https://nextjs.org/docs/app/api-reference/functions/use-router
- Next getImageProps supports native picture/art direction; explicit source dimensions, ratio boxes, lazy image gallery and a visible loading base reserve geometry. Photo state only handles load fade and error; no blur placeholder or client-only mount gate — https://nextjs.org/docs/app/api-reference/components/image
- RHF plus zodResolver/messageSchema validates the local demo; inline errors reserve space and the message explicitly says nothing was sent. Sonner uses CSS semantic colors rather than a hydration-time theme branch; its own animation is disabled — https://ui.shadcn.com/docs/forms/react-hook-form ; https://react-hook-form.com/docs/useform ; https://github.com/react-hook-form/resolvers ; https://zod.dev/api ; https://ui.shadcn.com/docs/components/radix/sonner ; https://sonner.emilkowal.ski/toaster
- Loading shares the actual server Showcase geometry but is inert and accompanied by a visible/live status, preventing duplicate usable forms/menu controls while navigation is pending — https://nextjs.org/docs/app/api-reference/file-conventions/loading ; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert
- Root not-found is the stable native convention, no experimental global-not-found. A Metadata export supplies a unique Persian title/description/noindex. In addition to the convention docs, the installed official Next 16.3.8 implementation was inspected: `dist/lib/metadata/resolve-metadata.js` resolves error-convention exports and `dist/server/app-render/app-render.js` asks for the not-found boundary metadata — https://nextjs.org/docs/app/api-reference/file-conventions/not-found ; https://nextjs.org/docs/app/api-reference/functions/generate-metadata ; https://registry.npmjs.org/next/16.3.8
- JSON-LD is server-rendered and escapes `<`; WebSite/Person/Service refer to the given individual, not a clinic or Physician. Schema.org published release 30.1 (2026-09-16) is the stable term source; provider explicitly permits Person. No false root-fragment BreadcrumbList or Review/AggregateRating was added — https://nextjs.org/docs/app/guides/json-ld ; https://schema.org/version/30.1/ ; https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/30.1/schemaorg-current-https.jsonld
- Headers are native Next config; poweredByHeader=false, general nosniff/referrer/permissions headers, HTTPS-forwarded-only HSTS without preload/subdomain commitment, canonical-host-only anti-framing so the preview iframe remains usable. The production proxy must sanitize x-forwarded-proto. The frame-ancestors policy is not represented as a full script CSP — https://nextjs.org/docs/app/api-reference/config/next-config-js/headers ; https://nextjs.org/docs/app/api-reference/config/next-config-js/poweredByHeader ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Frame-Options ; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
- Native robots excludes private/auth/API paths; it is not an authorization mechanism, and no premature static DB sitemap is emitted — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Narrow react-remove-scroll-bar body-margin compensation override accompanies stable scrollbar-gutter; official package source unconditionally adds margin compensation. This needs manual scrollbar/focus/overlay verification, not an assumed browser pass — https://github.com/theKashey/react-remove-scroll-bar
- The requested CSS scroll-driven reveal uses feature queries for both timeline/range and stays visible at every frame; browsers without support receive static content. All authored CSS transitions on buttons/nav were removed; the only authored CSS animation is this explicit exception — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline

### Assets, assumptions and naming

- Seven JPEG exports represent four fictional photographic subjects. Landscape originals were 1672×941; portrait original was 928×1152. Final 2400×1350 / mobile 1080×1440 / portrait 1280×1600 sizes are upsampled/art-directed exports, not native-resolution claims. All generation prompts, ratios and intended use are in public/images/README.md; src/content/images.ts is the typed manifest. These are not authentic doctor/client/office photos. No new image generator/runtime dependency was installed.
- Contacts, social URLs, address and license remain null rather than fabricated. Header defaults to guest until Phase 7 session resolution; the visibly labeled account specimen is fictional, its count is not live, and logout is disabled. Upcoming links intentionally reach 404. Local demo validation is not a successful contact submission.
- Footer year is a server-module snapshot using fixed Persian/Tehran formatting, not a render-time random/date/client read; static deployment needs a Persian-New-Year rebuild.
- One component per file, named PascalCase/kebab-case alignment, local Props types, no barrels/generic utils, no any/unsafe non-null assertion, and no extra project scripts/dependencies. Native shadcn names are retained, including DirectionProvider/Toaster and longer compound primitive names. The context-only carousel-context module is not a second component. Naming is met by source review, not a separate test suite.
- Reusable shell/surfaces/photos/skeletons are implemented now; actual page-specific backgrounds, services/articles/course/testimonial photos and booking CTA layout still belong to the specified page phases. No Phase 3 or admin route was built early.

### Phase 2 deviations needing approval

1. **Calendar runtime prerequisite, not installed:** official v10 upgrade documentation removes `react-day-picker/persian` and requires the separate `@daypicker/persian` add-on. Registry latest is **10.0.2**, with React/@types React peers >=16.8.0 and a hard dependency on **date-fns-jalali 4.1.0-0**, plus @daypicker/react 10.0.2 and @date-fns/tz. @daypicker/react 10.0.2 itself depends on existing react-day-picker 10.0.2 and requires Node >=18. Its peers/engine fit the pinned stack, but the Jalali dependency violates the blanket no-prerelease rule. `date-fns-jalali/latest` is 4.4.0-0, also prerelease and not the add-on's required exact version. Smallest proposal: permit only the required runtime 4.1.0-0 exception and add exact @daypicker/persian 10.0.2; do not silently override/downgrade/change date handling. This is distinct from accepted development-only Phase 0 exceptions — https://daypicker.dev/upgrading ; https://registry.npmjs.org/@daypicker/persian/10.0.2 ; https://registry.npmjs.org/@daypicker/react/10.0.2 ; https://registry.npmjs.org/date-fns-jalali/latest
2. **Chart generation, not performed:** the official radix-nova registry declares recharts@3.8.0, whereas the compatible pinned project is 3.10.1. CLI 4.21.0 help has dry-run/view/diff but no skip-install. Smallest proposal: use the same CLI against a temporary copy of the official registry with only that dependency declaration changed to 3.10.1, keeping source provenance and then applying the same approved local component styling/splitting. No dependency downgrade, override or new package is proposed — https://ui.shadcn.com/r/styles/radix-nova/chart.json ; https://ui.shadcn.com/docs/cli

Both proposals await explicit approval. Neither was treated as authorized by the earlier «ادامه». All nonblocked parts of the shared-shell continuation were completed; the next continuation stays in Phase 2.

### Updated Phase 2 workstream checklist

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Approved light/dark/mono emblem and outlined lockup SVG assets | Met |
| 2 | Single server Logo, accessible home link, 40/44 height, minimum/clear-space guidance | Met |
| 3 | Brand icons, manifest and default Persian social assets | Met |
| 4 | Delete Phase 1 preview route/components/content/styles/link | Met |
| 5 | Official local variable font, complete license and documented no-late-swap strategy | Met |
| 6 | Prepaint light/dark/system theme and stable theme control | Met |
| 7 | Full 22 hue scales, 16 gradient families and semantic tokens | Met |
| 8 | Central elevation/glow/focus/motion-value tokens and CLI Button foundation | Met |
| 9 | Honest noindex review with dimension-identical inert loading and real downloads | Met |
| 10 | Naming, official sources, complete client register and allowed checks | Met |
| 11 | Motion/RTL, primitives and interactive/form states | Not met: Calendar and Chart await decisions; remaining primitives, including Command, implemented |
| 12 | Fixed-height server header, five links, fullscreen menu, desktop/mobile account menus | Met for Phase 2 UI; real session/action wiring remains Phase 7 |
| 13 | Server footer, custom social icons, contact/booking card, crisis/confidentiality/legal band | Met; unverified contact/license fields deliberately null |
| 14 | SectionSurface/decorations, typed samples, local photographic assets/manifests and skeletons | Met with fictional/upsampled image disclosure |
| 15 | Designed 404 and sitewide SEO/robots/security/JSON-LD foundations | Met by source inspection; DB sitemap/real page schema and deployment validation remain later phases |
| 16 | Comprehensive noindex showcase and full Phase 2 review | Not met: Calendar/Chart specimens and final full-phase review remain |

**Checklist: 14 of 16 met.** Unmet items are exactly 11 and 16 above; naming is not an outstanding item. Do not remove the temporary showcase or start Phase 3 yet.

### SEO and zero-flicker reasoning

**SEO checklist: met for the temporary noindex route and Phase 2 foundations by source inspection, not SEO-tool verification.** Sitewide completion is not claimed: real pages, their visible breadcrumbs/canonicals/schema and request-time sitemap arrive in later phases.

**Zero-flicker check: not met for complete Phase 2/sitewide delivery**, because Calendar/Chart are pending and no browser verification is permitted. Implemented safeguards: next-themes prepaint + CSS icons; optional local font with persistent-fallback tradeoff; fixed header and CSS-selected mobile/desktop menus; identical page/loading boxes with inert fallback; reserved art-directed image boxes and no hidden initial image; CSS-first carousel geometry and deterministic scrollability server snapshot; fixed specimen/skeleton card-body heights; fixed command results area; reserved form error feedback; stable count badge; static reduced-motion treatment; no render-time Date/random/viewport/theme-dependent branch; one html suppression; no scroll-position writes or external browser assets. Native overlay scrollbar compensation remains a manual-review risk. Current guest first HTML is deliberate Phase 2 scaffolding, not validated authenticated chrome.

### Allowed verification

TypeScript, ESLint and DB-independent production build passed on pinned Node 24.21.0/npm 11.19.0. Build generated nine static outputs including designed framework not-found, robots and brand metadata routes. npm audit reported **0 vulnerabilities** at every severity. Package/lock versions are unchanged. These checks are not proof of responsive/visual/focus/animation/zero-flicker behavior. No browser, test suite, DB connection/ping/seed/script, live handler, SEO validator or Core Web Vitals measurement ran.

Delivery: stopped the previous part-1 server and started the freshly built production app on 0.0.0.0:3000. The process reported ready with no preview-blocking warning. This is server-readiness evidence only, not a browser/interaction check.


## Phase 2 part 3 — calendar, chart and phase review

The user's «ادامه» following the two narrowly stated proposals was taken as permission to execute those proposals only. This is not blanket permission for prereleases, alternate date libraries, registry forks or dependency downgrades. Phase 3 has not started; the temporary noindex showcase remains for approval.

### Dependency and CLI provenance

- Before installation, rechecked npm latest manifests for @daypicker/persian, @daypicker/react, react-day-picker and Recharts: all remain 10.0.2 / 10.0.2 / 10.0.2 / 3.10.1. React/@types >=16.8.0 and Node >=18 fit the exact installed React 19.3.0 and Node 24.21.0; Recharts peers include React 19. No force/legacy-peer-deps/overrides/experimental flags — https://registry.npmjs.org/@daypicker/persian/10.0.2 ; https://registry.npmjs.org/@daypicker/react/10.0.2 ; https://registry.npmjs.org/react-day-picker/10.0.2 ; https://registry.npmjs.org/recharts/3.10.1
- Installed exact @daypicker/persian 10.0.2 with `--save-exact --strict-peer-deps --engine-strict`. The lock adds only this direct dependency and its new @daypicker/react 10.0.2 / date-fns-jalali 4.1.0-0 transitives. Existing @date-fns/tz 1.5.0 satisfies ^1.4.1 and did not change. The exact required Jalali runtime prerelease is the previously proposed limited exception, not replaced with the also-prerelease latest 4.4.0-0 — https://registry.npmjs.org/date-fns-jalali/4.1.0-0 ; https://registry.npmjs.org/@date-fns/tz/1.5.0
- Official DayPicker v10 moved Persian support to its separate package; the shadcn calendar page's old react-day-picker/persian import is superseded by the current library migration guide. Existing react-day-picker is still the documented compatibility package and supplies TZDate/types/helpers without adding another direct package — https://daypicker.dev/upgrading ; https://daypicker.dev/localization/persian ; https://daypicker.dev/localization/setting-time-zone
- Generated Calendar and Chart through pinned shadcn CLI 4.21.0. For Chart, a temporary cached copy of the official radix-nova registry changed exactly one dependency declaration, recharts@3.8.0 to recharts@3.10.1, before the CLI ran. Registry component source was unchanged at that step; afterward it underwent the normal local styling/splitting. Original generated files were kept only in authoring cache, not duplicate application files. Branded Button was restored after Calendar's native dependency generation — https://ui.shadcn.com/docs/cli ; https://ui.shadcn.com/r/styles/radix-nova/chart.json ; https://ui.shadcn.com/docs/components/radix/calendar ; https://ui.shadcn.com/docs/components/radix/chart
- No unrs-resolver install-script permission was granted. npm repeated its previously recorded allowScripts warning; successful audit/build does not imply this separate tooling exception was removed.

### Calendar decisions and official sources

- Native DayPicker and faIR come from @daypicker/persian. Required `today: Date`, fixed demonstration dates and explicit Asia/Tehran avoid browser clock/timezone defaults. Shared formatDate is native Intl with calendar=persian/timeZone=Asia/Tehran, used by captions, digits, day data attributes and selected-date feedback. Native internal date-fns-jalali is confined to the documented Calendar implementation — https://daypicker.dev/localization/persian ; https://daypicker.dev/localization/setting-time-zone ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- Fixed six weeks prevent month-to-month card-height changes; startMonth/endMonth and disabled matchers define only the disclosed sample range, not booking availability. No experimental noonSafe or native CSS animation is enabled — https://daypicker.dev/docs/appearance ; https://daypicker.dev/docs/navigation ; https://daypicker.dev/docs/selection-modes
- CalendarDayButton preserves the generated native focused-modifier effect, but requests preventScroll to avoid changing document scroll. No initial autoFocus. CalendarChevron follows the native Nav orientation and flips horizontally once for RTL, without the generated duplicate RTL transforms — https://daypicker.dev/guides/custom-components ; https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus ; installed official react-day-picker 10.0.2 `dist/esm/components/Nav.js` and `useFocus.js`
- Calendar keeps the original discriminated DayPicker props union, intersected with required today. An initial Omit erased the mode-specific selected/onSelect fields; TypeScript caught it and the union-preserving type fixed it without assertions/suppression. Calendar, CalendarDayButton and CalendarChevron each have their own named file; unused generated Root/WeekNumber render callbacks were not retained.

### Chart decisions and official sources

- Native ChartContainer/ChartStyle/context/Tooltip/Legend were split into individual native-named files. Config values are authored code, not DB/user CSS. ChartStyle uses a style text node instead of raw HTML and escapes `<`; ids come from useId and a stable safe-character normalization. Tooltip uses type-narrowed scalar values, no any/unsafe payload access, and Persian Intl digits — https://ui.shadcn.com/docs/components/radix/chart ; https://react.dev/reference/react/useId
- ResponsiveContainer uses ResizeObserver to measure its parent; initialDimension alone does **not** establish the final browser geometry on the server. Recharts native graphical item state also depends on client registration. Rather than claim a fully measured server graph or use a mount gate, the default is the complete accessible data table. The chart mounts only after the user's explicit tab selection; nothing is automatically hidden/replaced after hydration. Both panels reserve 288px. This choice is for the showcase, not an early implementation of the admin dashboard — https://recharts.github.io/en-US/api/ResponsiveContainer/ ; https://recharts.github.io/en-US/guide/sizes/ ; installed official Recharts 3.10.1 `es6/cartesian/Bar.js` and `es6/component/ResponsiveContainer.js`
- The chart uses native BarChart/Bar/CartesianGrid/XAxis/YAxis, reversed X axis, right Y axis, Persian label/value text, native accessibilityLayer and a Persian SVG aria-label. Tooltip/legend are native shadcn composition. Bar and Tooltip animations are explicitly disabled so there is no second authored animation system — https://recharts.github.io/en-US/api/BarChart/ ; https://recharts.github.io/en-US/api/Bar/ ; https://ui.shadcn.com/docs/components/radix/chart
- The guessed Recharts accessibility-guide URL returned 404; accessibility behavior is referenced only to the documented BarChart API and installed RootSurface implementation, not an invented guide. No browser keyboard/tooltip result is asserted.

### Updated complete Phase 2 checklist

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Approved light/dark/mono emblem and outlined lockup SVG assets | Met |
| 2 | Single server Logo, accessible home link, dimensions and usage guidance | Met |
| 3 | Icons, manifest and default Persian sharing assets | Met |
| 4 | Remove Phase 1 logo preview and rejected concepts | Met |
| 5 | Local official variable font/license and no-late-swap tradeoff | Met |
| 6 | Prepaint light/dark/system theme with stable control | Met |
| 7 | All hue scales, gradient families and semantic tokens | Met |
| 8 | Shared elevation/glow/focus/motion tokens and CLI Button | Met |
| 9 | Honest noindex review, identical inert loading and downloads | Met |
| 10 | Naming, one component per file, official sources, 31-entry client register and allowed checks | Met; native compound shadcn names are the specified exception |
| 11 | Motion/RTL, required primitives, Calendar/Chart and interactive/form states | Met; two limited dependency/registry proposals applied |
| 12 | Server header, five links, fullscreen mobile and account menus | Met for UI; real session/logout/live count remains Phase 7 |
| 13 | Server footer/social/contact/booking and crisis/confidentiality/legal bands | Met; unavailable contact/license values remain null |
| 14 | Surfaces/decorations, typed samples, photographic assets/manifests and reusable skeletons | Met; earlier fictional/upsampled image disclosure unchanged |
| 15 | Designed 404 and global SEO/robots/security/JSON-LD foundation | Met for phase scope; DB sitemap and page-specific SEO remain later |
| 16 | Comprehensive temporary noindex showcase and phase source review | Met; awaiting user design approval, not browser-tested |

**Checklist: 16 of 16 met for Phase 2 implementation scope. No unmet naming item.** This is not whole-site completion, production publication, real booking/auth/live implementation or visual certification. Keep the showcase until approval; only the next authorized phase replaces it with Home.

**SEO checklist: met for this temporary review and Phase 2 foundations by source reasoning.** Existing noindex/canonical/metadata, server HTML/h1, images, icons and escaped truthful schema are preserved. Calendar/table data are explicitly fictional UI specimens and have no clinical/Review/AggregateRating markup. DB sitemap, actual content page metadata and deployment validation remain their specified later phases.

**Zero-flicker check: met by design reasoning for the current showcase, not browser verification or a universal guarantee.** Previous font/theme/chrome/loading/image/carousel safeguards remain. Calendar uses deterministic TZDate samples, required today, six rows, stable selected feedback and no initial autofocus. Chart begins as complete HTML table and only changes on user choice, with equal-height panels; it is not hidden pending hydration and is not a post-mount automatic replacement. Native animations are off. Optional-font fallback may persist and scrollbar compensation still needs manual review; signed-in/backend/sidebar/live behavior is not implemented or validated yet.

**Deviations needing approval: none new.** Accepted narrowly scoped date-fns-jalali runtime exception and registry declaration adjustment are recorded above; earlier tooling exceptions and image/font disclosures remain. No extra project scripts, tests, config flags or dependencies beyond the approved calendar add-on were added.

### Allowed checks and delivery

`npm run typecheck`, `npm run lint` and `NEXT_TELEMETRY_DISABLED=1 npm run build` all passed after the changes; nine static outputs, no DB module/access. `npm audit --json` returned 0 info/low/moderate/high/critical vulnerabilities. Lockfile changes are exactly the approved direct package plus two new transitives; no existing package downgrade. No browser, test suite, DB connection/ping/seed/script, SSE/live handler, SEO validator or Core Web Vitals measurement was run.

Delivery: the previous server was stopped and the final Phase 2 production build restarted on 0.0.0.0:3000. It reported ready without preview-blocking warnings; readiness is not browser/interaction verification. Calendar and the user-selected chart are available in the new «زمان و داده» section. No Phase 3 work has begun.


## Phase 3 — Home

The user's «ادامه» after the completed Phase 2 review was treated as approval of that design system and authorization for Phase 3 only. No About/Services/content/auth/booking/admin page or data layer was implemented early. Package.json, package-lock.json, framework config and all approved dependency exceptions are unchanged.

### Official sources and implementation decisions

- The Home route and static Metadata export remain server-only; Home sections and repeatable cards produce server HTML. Interactive behavior stays in the previously registered Photo, Lift, SlideRail, chrome and native Radix leaves. Server cards are passed as children, not imported into a page-wide client component — https://nextjs.org/docs/app/getting-started/server-and-client-components ; https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Replaced the noindex design showcase with Home and removed its seven files, local-only message schema and specimen-specific CSS. Approved shared primitive skins, brand/font and shared skeleton/heading foundations remain; no duplicate native registry files or alternate preview route were added. Navigation keeps ordinary crawlable links and prefetch=false for still-unbuilt targets — https://nextjs.org/docs/app/api-reference/components/link
- Only Hero sets loading=eager/fetchPriority=high; it does not fade. Native getImageProps/picture selects existing separate mobile crops. No deprecated priority prop or redundant simultaneous preload. All other images are lazy, dimensioned and keep their solid reserved base/error state — https://nextjs.org/docs/app/api-reference/components/image
- Home and loading render the same server component/content and CSS geometry. Loading is inert with a separate visible/live message; it is not a mount gate, blank screen or randomly sized spinner. The mobile booking bar and footer bottom space are selected before hydration by CSS, including safe-area padding — https://nextjs.org/docs/app/api-reference/file-conventions/loading ; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert ; https://nextjs.org/docs/app/api-reference/functions/generate-viewport
- Embla selected index and snap count now use a stable primitive useSyncExternalStore snapshot with select/reInit cleanup. Autoplay eligibility is rechecked on reInit, including no playback when fewer than two snaps exist; containment trims impossible snaps when loop cannot be satisfied. Dot targets beyond available snaps are disabled without shifting their reserved area. With exactly three cards on desktop, CSS omits unnecessary controls from the first paint while retaining their space. No viewport read or client-only first render — https://react.dev/reference/react/useSyncExternalStore ; https://raw.githubusercontent.com/davidjerleke/embla-carousel/v8.6.0/packages/embla-carousel-docs/src/content/pages/api/methods.mdx ; https://github.com/davidjerleke/embla-carousel/tree/v8.6.0/packages/embla-carousel-docs/src/content/pages/api
- The hosted Embla methods URL returned 404; the official tag-pinned 8.6.0 repository supplied scrollSnapList/on/off/reInit documentation. No internalEngine API, unsupported loop patch, runtime viewport guess or added carousel dependency is used.
- Courses/articles use the existing reduced-aware Motion Lift with visible initial content. The requested CSS scroll-driven enhancement remains transform-only on the below-fold service CTA, with a visible fallback. Removed the remaining generated AccordionTrigger transition-shadow utility; no new authored CSS animation or alternate motion library — https://motion.dev/docs/react-lazy-motion ; https://motion.dev/docs/react-use-reduced-motion ; https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline ; https://www.radix-ui.com/primitives/docs/components/accordion
- Home has unique Persian title/description, self canonical, public index/follow metadata, fa_IR sharing metadata and the existing Persian social assets. The design-preview noindex setting is gone only from Home; 404/privacy-role conventions are unchanged. This is crawlability configuration, not approval to publish unfinished professional content on a real domain — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Escaped native JSON-LD describes WebSite, the supplied Person identity and the four visibly described Service subjects. No clinic/Physician/Organization, fictional portrait-as-Person-image, fake breadcrumb, Article/Course markup for unpublished topics, Review/AggregateRating, offers, fabricated prices or availability schema — https://nextjs.org/docs/app/guides/json-ld ; https://schema.org/version/30.1/ ; https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/30.1/schemaorg-current-https.jsonld

### Content and asset integrity

Home includes Hero/About/four-service bento/three-step guide/course carousel/article carousel/testimonial-layout carousel/FAQ/final invitation, plus a server mobile BookingBar. The booking CTA appears in Hero, after services, final invitation and the mobile bar; secondary links are quieter. Only Hero/final invitation are full-bleed photographic sections, with different SectionSurface gradients elsewhere. The layout is identical between themes; accents/overlays inherit semantic tokens. Headline Persian text is not artificially letter-spaced.

Nine new AI-generated illustrative assets were exported locally: six subject-specific landscape photos (1448×1086 originals → 1200×900) and three distinct Iranian portrait illustrations (1254×1254 originals → 640×640). No new image was upsampled. Existing Hero/mobile/final-CTA exports keep their prior upsampling disclosure. Image subjects/alt/ratios/dimensions/placements are typed in content/images.ts; every full English generation prompt and export origin is in public/images/README.md. Related service/course/article subjects intentionally share appropriate photographs; testimonial portraits are unique. No hotlinks, SVG photo stand-ins or external browser font/widget scripts. The existing Hero image alone was opened for asset-composition/crop authoring, not a browser or UI visual test.

Professional claims are restricted to the user-provided name/role. No degree, institution, years of experience, outcome statistic, therapy modality, fee, course schedule, publication date or estimated reading time was invented. Course/article entries are explicitly proposed topics awaiting their page phases. Testimonial cards are labeled layout placeholders with non-quote privacy copy; they are not fictional praise attributed to real clients. Their synthetic faces are labeled and no ratings appear. Unknown contacts/license remain null. All of this is stated visibly on the page and in README.

### Naming and client review

- One component per file, kebab-case filename matching its PascalCase named export, local Props and typed readonly content. Home sections live only two levels inside components (`sections/home`); repeatable cards and heading are shared because each is used repeatedly. Default route exports and unchanged native shadcn names retain their allowed exceptions.
- Removed showcase/calendar-demo/chart-demo/command-demo/message-demo/state-demo/faq-demo and their local validation schema; no barrels, new generic utils, any, unsafe non-null assertions or project scripts were added. New photo filenames describe subjects/colors, not version markers.
- The complete current register at the top lists 26 authored client entry files (31 minus five specimen entries). Home, Hero, About, Services, Steps, Courses, Articles, Testimonials, Faq, Invitation, BookingBar, SectionHeading and all four repeatable card components are server files. No new client entry, auth provider, backend query or live subscriber.

### Phase 3 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Remove approved temporary design showcase and specimen-only code | Met |
| 2 | Server-first Home and typed section/card content | Met |
| 3 | Hero portrait background/art direction, personal identity and primary CTA | Met; disclosed synthetic image, only high-priority image |
| 4 | About teaser, framed portrait and About link | Met; no invented credentials |
| 5 | Four-service responsive bento and post-service booking CTA | Met |
| 6 | Three-step booking timeline/guide | Met as guide, not a working booking flow |
| 7 | Courses carousel with subject photos and quieter links | Met; disclosed unpublished topic previews |
| 8 | Articles carousel with unique Latin slugs and subject photos | Met; article bodies/routes await Phase 5 |
| 9 | Testimonial carousel with distinct Iranian portrait placeholders | Met as disclosed layout; no genuine reviews invented |
| 10 | Four native accessible FAQ entries | Met by source reasoning, not keyboard-tested |
| 11 | Final invitation with second full-bleed photo and booking CTA | Met |
| 12 | Mobile sticky booking bar, safe-area and footer clearance | Met by CSS design, not device-tested |
| 13 | Local images, complete typed manifest/prompts and honest sample content | Met |
| 14 | Home metadata/canonical/OG/Twitter/h1 and truthful escaped JSON-LD | Met for page implementation; deployment/whole-site SEO pending |
| 15 | Same-geometry inert loading, CSS-first RTL/breakpoints/theme, reduced-aware motion | Met by design reasoning, not zero-flicker certification |
| 16 | Naming, current client register, sources/README and allowed checks | Met |

**Checklist: 16 of 16 met for Phase 3 implementation scope; no unmet naming item.** Still unimplemented by deliberate phase order: destination pages, real bookings/contact/auth, dynamic content and SSE. Four-tap/sub-minute booking has **not** been achieved or measured. Whole-site completion is not claimed.

**SEO checklist: met for Home implementation by source review.** Initial server content has one h1 and logical section/card headings, accessible image descriptions/reserved dimensions, crawlable links, unique metadata/canonical and truthful eligible schema. Full publication readiness is not met: targets currently 404, samples need confirmation/replacement, request-time sitemap comes in Phase 7 and deployment validation in Phase 11. Home metadata is now index/follow; this staging build should not be deployed as a finished professional site.

**Zero-flicker check: met by design reasoning for Home, not visually verified.** Existing optional-font/prepaint-theme tradeoffs remain. Fixed header, initial responsive photo/card boxes, CSS mobile/desktop bar selection, bottom clearance, visible first content, no initial viewport entrance and matching inert loading prevent intentional geometry swaps. Hero skips fades; other images fade only after loading. Carousel snapshots are deterministic for SSR/hydration; snap updates keep control space. Review cards share stretched track height rather than clipping longer privacy text. No browser measurement, cache-throttled refresh, authenticated chrome or live-update check has run; the documented font fallback and scrollbar compensation still need manual review.

**Deviations needing approval: none new.** Existing dependency exceptions, generated-photo disclosures and unavailable professional details remain recorded. The staged placeholders do not authorize publishing false clinical claims. Next phase after approval/«ادامه»: Phase 4 About and Services only.

### Allowed verification

Pinned Node 24.21.0/npm 11.19.0: TypeScript, ESLint and DB-independent Next production build passed; nine static outputs, with Home replacing the showcase. npm audit reported 0 at all severities. Package/lock diff is empty. No database connection/ping/script/seed, live handler/bus, browser test, test suite, SEO validator or Core Web Vitals measurement ran.

Delivery: stopped the Phase 2 production process and restarted the completed Home build on 0.0.0.0:3000. The process reported ready without preview-blocking warnings. This is server readiness only, not a browser/visual/interaction validation. The next authorized work remains Phase 4.


## Phase 4 — About and Services

The user's latest «ادامه» approved Phase 3 and authorized only About and Services. No Phase 5 article/course page, booking/contact form, auth, repository, DB query or live behavior was built. Package/lock/config are unchanged. No new asset or dependency was needed.

### Official sources and decisions

- Refreshed Next static Metadata documentation before implementation: each static server page exports its own Persian title/description, self canonical, index/follow and fa_IR OG/Twitter values. Root file-based sharing images, icons, locale and title template remain in place; no new metadata helper or package — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Refreshed loading convention: each new route has its own nearest loading boundary rendering its exact page template, made inert with an out-of-flow live status. Group-level Home fallback is retained for `/`; the public layout has no newly added asynchronous/layout work outside the inner boundaries. Native static routes do not require a loading delay or artificial Promise — https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Native server JSON-LD continues to escape `<`. Only loaded content emits schema; inert loading copies do not emit duplicate structured-data scripts. AboutPage points to the same Person identity as Home. Services uses WebPage and the same four Service identities, each linked to its real anchor. No clinic/medical-organization inference, fabricated degree, synthetic Person image, fee, availability, Review or AggregateRating — https://nextjs.org/docs/app/guides/json-ld
- Used published Schema.org 30.1 terms, not development-only extensions; inspected AboutPage/BreadcrumbList/ListItem/Service/Person and mainEntity/breadcrumb/isPartOf/provider definitions in the previously downloaded official stable release dataset before use — https://schema.org/version/30.1/ ; https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/30.1/schemaorg-current-https.jsonld
- Each inner page has visible PageHeading breadcrumbs and matching two-position BreadcrumbList: Home then current page, with absolute URLs and integer positions. Service hashes are sections, not extra breadcrumb levels. Google documentation is guidance only; no eligibility or rich-result validation is claimed — https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Services uses native hash anchors with the existing root scroll-padding for the fixed header, no scroll writes, active-section observer or new client navigation layer. Existing Home service links now reach actual sections; unavailable booking destinations retain prefetch=false. Home's previous all-other-destinations disclosure was corrected — https://nextjs.org/docs/app/api-reference/components/link
- Lucide remains named, tree-shakable inline SVG imports with decorative aria-hidden. Icons supplement visible labels; no icon loader, new library or logo change — https://lucide.dev/guide/react/
- Reused local Photo/getImageProps leaves with reserved 4:5 and 4:3 ratios and existing reduced-motion-aware post-load opacity only. No above-fold entrance, full-bleed photo section or new high-priority image; only Home Hero keeps high priority. Reused SectionSurface semantic gradients and elevation tokens in both themes — https://nextjs.org/docs/app/api-reference/components/image ; https://motion.dev/docs/react-use-reduced-motion

### Implementation and content integrity

About has five server sections: framed profile introduction, three collaboration principles, transparent professional-details panel, three-part collaboration guide and a quiet final booking invitation. Only supplied name/role are stated as identity. The license remains null, and education/experience are explicitly awaiting supplied and verified information. The draft collaboration copy identifies principles and questions, not a claimed treatment method or guaranteed result. The final copy and real credentials need owner approval before publication.

Services has four crawlable anchor links and four detailed sections with matching photos, bounded descriptions, discussion/preparation lists and safety/privacy notes. Online is explicitly a delivery format whose suitability must be considered; the website does not claim a video-call platform. Fees, duration, capacity and dates are not invented. Preparation guidance does not diagnose or prescribe. BookingPrompt is genuinely shared by both new pages; BookingBar remains a server component and its footer-clearance rule now uses the booking-page class shared by Home/About/Services only. The 404 layout does not inherit extra booking-bar padding.

The four service records and their type moved from content/home.ts to content/services.ts; Home cards/schema and Services details/schema now share that source. No duplicate service content model, generic CRUD layer, single-use helper, barrel or placeholder backend was added. Images were reused unchanged; manifest placements and public/images/README.md record reuse. The honest synthetic-photo labels remain beside the framed images. No new forms, contact links or invented professional credentials.

Naming: one component per file, matching PascalCase export/kebab-case filename; local Props; all new names are one or two words. Section files stay at components/sections/about and components/sections/services (two levels). Routes contain only page/loading conventions. No any, unsafe non-null assertion, browser render branch or new use-client directive. The complete current client register remains 26; all ten new component files are server files (nine page sections/compositions and one shared BookingPrompt).

### Phase 4 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Only authorized About/Services scope and existing hierarchy | Met |
| 2 | Personal About introduction and framed local portrait | Met; disclosed synthetic sample |
| 3 | Principles, privacy boundaries and collaboration guide | Met; no invented modality/outcome |
| 4 | Transparent professional identity/credential state | Met; unknown details explicitly pending |
| 5 | Four complete service sections with relevant local photos | Met |
| 6 | Native accessible service anchor navigation | Met by source reasoning; not browser-tested |
| 7 | Preparation/suitability guidance without fees or diagnosis | Met |
| 8 | Booking invitations, quieter crosslinks and mobile bar | Met as UI; real booking remains Phase 8 |
| 9 | Single shared service source and corrected Home disclosure | Met |
| 10 | Unique Persian metadata/canonical/OG/Twitter and one h1 per page | Met by source review |
| 11 | Visible matching breadcrumbs and escaped truthful JSON-LD | Met by source review |
| 12 | Route-specific same-geometry loading and CSS-first RTL/themes | Met by design reasoning |
| 13 | Naming, server-first boundaries, reuse and unchanged client register | Met |
| 14 | README/sources, allowed checks and phase-boundary handoff | Met |

**Checklist: 14 of 14 met for Phase 4 implementation scope; no unmet naming item.** Still pending by explicit phase order: article/course pages, remaining public pages, real bookings/contact/auth, repositories and SSE. Missing real photo/credential/contact information is disclosed, not fabricated. No four-tap/sub-minute booking claim.

**SEO checklist: met for About/Services page implementation by source review.** Server content, unique Persian metadata, one h1, meaningful heading order, matching breadcrumbs/schema, crawlable links and reserved image boxes are implemented. This is not publication approval or an SEO-tool result. Request-time DB sitemap is Phase 7; complete destination coverage, confirmed professional content and deployment validation remain pending.

**Zero-flicker check: met by implementation reasoning, not visual verification.** Existing prepaint theme/optional font, fixed chrome, stable gutter and deterministic Intl numbers remain. Each new segment owns its matching inert loading with a fixed status outside layout flow; initial content is visible and image boxes reserve ratios before load. Both themes share markup/geometry. Native hash navigation uses existing header clearance; no viewport branch, initial Motion entry, artificial delay or scroll fighting. Mobile booking-bar clearance is CSS-selected from first paint. Existing font fallback and scrollbar caveats, route transition/loading behavior and both themes still require the manual throttled/cache-disabled review in README. Signed-in and live refresh checks are not possible before their phases.

**Deviations needing approval: none new.** Existing narrow dependency exceptions remain unchanged. Stop after handoff; next phase only after approval/«ادامه» is Phase 5: Articles, article detail and Courses.

### Allowed verification

Pinned Node 24.21.0/npm 11.19.0: TypeScript and ESLint passed; DB-independent Next 16.3.8 production build passed with eleven static outputs, including `/about` and `/services`. npm audit reports 0 at every severity. Package/lock diff is empty. No database connection/ping/seed, live handler/bus, test suite, browser, visual test, SEO validator or Core Web Vitals measurement was run. These are build/source checks, not rendered-UI or clinical-content verification.

Delivery: stopped the Phase 3 production process and restarted the final Phase 4 build on 0.0.0.0:3000. The server reported ready without preview-blocking warnings; readiness alone does not validate UI or interactions. Final TypeScript, ESLint, DB-independent build and diff whitespace checks passed after all code changes. No Phase 5 work has begun.


## Phase 5 — Articles and Courses

The latest «ادامه» authorized Phase 5 only after the Phase 4 handoff. This delivers Articles, three article details and Courses. Phase 6 public/contact/legal pages, auth, repositories, DB and live behavior remain untouched. No package, lockfile, framework config or approved dependency exception changed. Existing cached authoring tools produced sharing graphics; no new runtime or authoring dependency was installed.

### Official sources and implementation decisions

- Await native Promise params/searchParams in server route conventions. Lists use request-time URL state; no useSearchParams-driven client filtering or top-level client page. Dynamic list metadata only reads query keys to set noindex on variants — https://nextjs.org/docs/app/api-reference/file-conventions/page ; https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Three existing Latin article slugs are generated solely from local fixtures with generateStaticParams and stable dynamicParams=false; unknown content calls notFound before the content Suspense boundary. Phase 7 must remove this fixture-only build strategy before introducing repositories, because production DB reads and newly published slugs must remain request-time — https://nextjs.org/docs/app/api-reference/functions/generate-static-params ; https://nextjs.org/docs/app/api-reference/functions/not-found
- loading components receive no parameters and parent loading boundaries also cover descendants. Removed the public-group Home fallback rather than allowing it to flash during a detail/list navigation. Home uses a local Suspense fallback; query lists and article detail resolve URL identity first and use explicit same-template inert fallbacks with matching data. No extra route group, artificial delay, client path guess or experimental Suspense prop. While identity resolves, navigation can retain prior content; an instant unknown-destination skeleton is deliberately not claimed. Local fixtures may never activate the fallback — https://nextjs.org/docs/app/api-reference/file-conventions/loading ; https://react.dev/reference/react/Suspense
- The only new client entry is shared SearchForm. Native method=get/action remains a non-JS fallback; RHF defaultValues plus an explicit native defaultValue keep the query in SSR HTML. The registered input uses zodResolver and a shared Zod string limit; server catalogSchema also validates all URL parameters. Hidden native category/sort fields preserve GET state — https://react-hook-form.com/docs/useform ; https://raw.githubusercontent.com/react-hook-form/resolvers/v5.9.1/README.md ; https://zod.dev/api
- Search navigation uses a typed local path and URLSearchParams-encoded query, never an untrusted href. A transition exposes pending state without a changing button label; useId supplies stable accessible descriptions. Search/filter/sort preserve scroll; normal native anchors/page links handle deliberate target navigation. No effect-based input reset or browser read during render — https://nextjs.org/docs/app/api-reference/functions/use-router ; https://react.dev/reference/react/useTransition ; https://react.dev/reference/react/useId
- Source selection, Persian normalization, alphabetical Intl.Collator ordering and six-record pagination are server-side and shared between the two actual catalogs. Only real result counts create page links; with three records, there is one page, not fake pagination. Invalid URL fields show a recoverable notice; no raw validation exception is displayed — https://nextjs.org/docs/app/api-reference/file-conventions/page ; https://zod.dev/api ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
- New detail metadata is Persian, self-canonical, OG article/Twitter large-image, with an individual static graphic. Drafts are noindex/follow; catalog query variants are noindex/follow with base canonical. No invented author, publication/modification date or reading duration. The default sharing asset remains inherited by lists — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Article/BreadcrumbList use native escaped JSON-LD and visible content. Schema.org 30.1 Article/Course/citation/articleSection/mainEntityOfPage definitions were consulted. creativeWorkStatus was discovered to be a pending vocabulary term and was removed; draft status instead appears in visible copy, description and noindex metadata. No pending vocabulary is shipped — https://nextjs.org/docs/app/guides/json-ld ; https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/30.1/schemaorg-current-https.jsonld
- Google's Article documentation recommends truthful applicable fields and does not require inventing missing dates/authors. The draft's image is its relevant photo, not the logo/title graphic. The page links to About while explicitly declining to attribute the draft to the doctor. There is no claim of rich-result eligibility, particularly for intentionally noindex drafts. Course/Offer markup is withheld because these are unapproved outlines without an actual educational offering or confirmed provider — https://developers.google.com/search/docs/appearance/structured-data/article
- Three 1200×630 title graphics reuse approved photographs and the approved lockup, with locally shaped Persian glyph outlines. Existing cached HarfBuzz/fontTools/CairoSVG/Pillow authoring tools are outside the project. One asset was opened for glyph/composition inspection, not a rendered-UI test. Font, filename, subject, dimensions, ratios and provenance are recorded in the image manifest/README — https://uharfbuzz.readthedocs.io/reference.html ; https://fonttools.readthedocs.io/en/stable/pens/svgPathPen.html ; https://fonttools.readthedocs.io/en/stable/pens/transformPen.html ; https://cairosvg.org/documentation/ ; https://pillow.readthedocs.io/en/stable/reference/ImageOps.html

### Editorial sources and integrity

These are original Persian **AI-assisted drafts**, not certified translations, published clinical guidance by Dr. Khorsand or patient-specific advice. Prominent draft labels appear in the index, Home, detail heading, author-status box and sharing images. Approval of a design phase is not clinical approval. No author/reviewer identity, credential, publish date, guaranteed outcome or reading-time statistic was fabricated.

- First-session draft: credential/approach/goal/confidentiality/fee questions draw from the official NIMH psychotherapy guide. The draft adds ordinary optional preparation and privacy suggestions, not a claim about this particular practitioner's actual session process — https://www.nimh.nih.gov/health/topics/psychotherapies
- Everyday-stress draft: varied mind/body experience, routine, social contact, activity and limiting distressing news come from WHO's current public Q&A. It explicitly rejects self-diagnosis and encourages appropriate professional support for persistent impairment — https://www.who.int/news-room/questions-and-answers/item/stress
- Evening-routine draft: general sleep environment/routine guidance and seeking help for ongoing impairment draw from NHS Insomnia. No supplement/medicine regimen is recommended; the text discourages self-directed medicine changes and driving while sleepy. The old how-to-get-to-sleep URL redirected to the topic index, so it is not used as the article's source — https://www.nhs.uk/conditions/insomnia/
- The sources are linked in Persian labels at each article's end and identified as English. Their US/UK service numbers, referral systems and specific licensing arrangements were not transposed onto an Iranian website. The site's existing local-emergency disclaimer remains.

The three courses remain proposals: audience, tentative syllabus, boundaries and explicit unavailable enrollment/unknown teacher/format/duration/date/price. No misleading disabled checkout, fake free price, video player, certificate, rating, enrollment count or payment feature was added. Courses are informational outlines only.

### Architecture and naming review

Article/Course types and records moved from content/home.ts into content/articles.ts and content/courses.ts, reused by Home cards and actual routes. Article bodies are typed text/section arrays, not unsafe HTML, a new markdown dependency or generic content renderer. CatalogFilters/CatalogResults/SearchForm and catalog functions have two real consumers. PageHeading gained optional parent links for the three-level article trail without breaking existing breadcrumbs. All new sections are within components/sections/articles, article or courses (two levels).

All authored names remain one or two words; framework-mandated generateStaticParams retains its convention name. One component per file, matching kebab-case/PascalCase, local Props, verb-first functions and typed readonly records. No new generic utils/barrel, any, unsafe non-null assertion, DB module or test suite. Input and Badge's leftover native transition-shadow class was removed; no new CSS animation system was introduced. Existing reduced-aware Photo and Lift are reused. The client register is 27, with only SearchForm newly client-marked; content/card/page/metadata rendering stays server-first.

### Phase 5 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Authorized Articles/detail/Courses scope only | Met |
| 2 | Shared typed records, Home/card links and corrected disclosures | Met |
| 3 | Responsive server article index with local subject image/cards | Met |
| 4 | URL server search/category/order/pagination | Met by implementation; one real page with current fixtures |
| 5 | RHF + resolver + shared Zod, SSR query and adjacent privacy notice | Met |
| 6 | Pending/error/empty/results states without fabricated content | Met by source reasoning |
| 7 | Three complete bounded Persian drafts with official sources | Met; professional review pending |
| 8 | Native contents anchors, related articles and transparent About/byline status | Met; no false authorship |
| 9 | Three course outlines, local subject photos and matching hash targets | Met |
| 10 | Truthful enrollment/price/date/teacher/credential state | Met; real course offering not supplied |
| 11 | Individual Persian article sharing assets and complete manifest | Met |
| 12 | Unique metadata/canonical/h1/OG/Twitter and intentional draft/query noindex | Met by source review |
| 13 | Visible matching BreadcrumbList and eligible truthful Article schema | Met; Course intentionally ineligible/omitted |
| 14 | Known static slugs, notFound path and no build-time DB | Met by source/build; HTTP response not live-tested |
| 15 | Correctly scoped, resolved-state same-geometry fallback strategy | Met by reasoning; no instant unknown-state fallback claim |
| 16 | CSS-first RTL/theme/reserved images/mobile bar and reduced-aware reuse | Met by implementation; no responsive/visual certification |
| 17 | Naming, server-first boundaries, unchanged packages and current register | Met |
| 18 | README/sources, allowed checks and approval-boundary handoff | Met |

**Checklist: 18 of 18 met for Phase 5 implementation scope; no unmet naming item.** Remaining content/publication requirements: real professional authorship/review, approved publication dates, confirmed actual courses and their teacher/format/terms; these are not supplied and were not fabricated. Remaining application phases: Phase 6 public/contact/legal pages; Phase 7 DB/auth/SSE/sitemap; Phase 8 functional booking and later account/admin work. Four-tap/sub-minute booking is not achieved or measured.

**SEO checklist: met for implemented page code, not publication readiness.** Unique Persian metadata, canonicals, per-article sharing graphics, visible hierarchy/breadcrumbs, server body text, real crawlable links and truthful escaped schema are present. Draft detail pages deliberately remain noindex, without invented author/date fields. Course/Offer and review markup are not eligible for the supplied samples. Real professional approval, DB-driven sitemap and deployment validators remain outstanding. No rich-result or search-engine result is claimed.

**Zero-flicker check: met by implementation reasoning, not browser verification.** Prepaint theme/optional font, fixed header/gutter, CSS-only breakpoints, reserved images and footer/bar clearance persist. No initial hidden content or added entrance effect. Home is no longer an inherited fallback; explicit list/detail boundaries receive resolved query/slug and the same page content. Until identity resolves there is no immediate destination fallback; the previous route may stay visible. Native query state is in the first HTML and keyed only on server URL changes, with a reserved status line and fixed button label. Intentional filter result height changes are not presented as same-height data. Form submit/filter/sort avoid forced scrolling; hash targets use existing header clearance. Dynamic shell timing, native back/forward, focus, font fallback and cache-disabled/throttled/theme cases remain manual checks, not tested claims.

**Deviations needing approval: none new.** The explicit Suspense strategy uses the requested same-geometry state without unsupported loading props or an extra route group. Existing dependencies/photo/credential caveats persist. Stop after handoff; next work only after approval is Phase 6: Testimonials, FAQ, Contact, Privacy and Terms.

### Allowed verification

Pinned Node 24.21.0/npm 11.19.0: final TypeScript and ESLint passed; DB-independent Next 16.3.8 build passed (static generation reported 16/16, including the three known article slugs; Articles/Courses indexes are request-time server-rendered because of searchParams). npm audit reports 0 at all severities. Package/lock diff is empty. No database access, live handler/bus, test suite, browser, rendered-site visual check, SEO validator or Core Web Vitals measurement ran. Only a generated social asset was opened as an authoring artifact.

Delivery: stopped the Phase 4 production process and restarted the final Phase 5 build on 0.0.0.0:3000. The process reported ready without preview-blocking warnings. This is readiness only, not a route/interaction/visual check. Final source whitespace and unchanged package/lock checks passed. Phase 6 has not begun.


## Phase 6 — Public information pages

The user's «ادامه» authorized Testimonials, FAQ, Contact, Privacy and Terms only. All five pages are implemented. Phase 7/8 auth, DB, live behavior and real message/booking submission have not begun. **One acceptance item remains unmet: supported/non-deprecated development lint tooling.** The existing ESLint pin was found to be EOL during restoration; the smallest compatible exception is proposed below and is not yet approved.

### Environment restoration and official support conflict

The workspace snapshot did not contain node_modules or the prior cached Node binary. Restored the already pinned Node 24.21.0 from its official archive, verified the tarball using the official SHA256 list, then ran npm ci with strict peers, strict engines and ignore-scripts. No lockfile/package/config version changed, no package was added, and no new postinstall permission was granted — https://nodejs.org/dist/v24.21.0/SHASUMS256.txt ; https://nodejs.org/dist/v24.21.0/node-v24.21.0-linux-x64.tar.xz

npm reported eslint@9.39.5 deprecated. The official support page confirms v9 EOL on 2026-08-06. Current latest is 10.11.0 and its engine accepts the pinned Node, but three latest plugins in Next's preset still exclude ESLint 10. Next's own broad eslint >=9 peer and TypeScript-ESLint's ^10 support do not override those narrower plugin contracts. No upgrade attempt, force/legacy-peer-deps, override, new package or removal of lint rules was used — https://eslint.org/version-support/ ; https://registry.npmjs.org/eslint/latest

| Official package inspected | Version | Relevant peer / engine |
| --- | --- | --- |
| eslint | 10.11.0 latest; 9.39.5 installed/EOL | Node ^20.19.0 or ^22.13.0 or >=24 |
| eslint-config-next | 16.3.8 | eslint >=9.0.0 |
| typescript-eslint / parser / plugin | 8.71.0 | eslint ^8.57.0 or ^9.0.0 or ^10.0.0; TS >=4.8.4 <6.1.0 |
| eslint-plugin-react | 7.37.5 latest and installed | eslint ^3 or ^4 or ^5 or ^6 or ^7 or ^8 or ^9.7; no 10 |
| eslint-plugin-jsx-a11y | 6.10.2 latest and installed | eslint ^3 through ^9; no 10 |
| eslint-plugin-import | 2.32.0 latest and installed | eslint ^2 through ^9; no 10 |

Official manifests: https://registry.npmjs.org/eslint-config-next/16.3.8 ; https://registry.npmjs.org/typescript-eslint/latest ; https://registry.npmjs.org/eslint-plugin-react/latest ; https://registry.npmjs.org/eslint-plugin-jsx-a11y/latest ; https://registry.npmjs.org/eslint-plugin-import/latest . Installed peer declarations were also read, not bypassed. npm's suggestion to upgrade npm itself was not followed: the approved Node-bundled npm 11.19.0 remains in use.

**Deviations needing approval:** allow the existing **development-only ESLint 9.39.5 temporarily**, retaining strict-peer compatibility and all existing rules, until a supported stable compatible chain is available. This is smaller than replacing Next's preset, dropping checks, adding a third-party fork or forcing invalid peers. It does not assert that EOL is safe or supported; audit reporting zero does not restore maintenance. No approval is presumed from earlier phase approvals. Stop for this decision before Phase 7.

### Official sources and implementation decisions

- Five static server pages export unique Persian Metadata, self canonicals, fa_IR OG/Twitter and inherited brand sharing assets. Contact/FAQ are index/follow; sample Testimonials and the two unapproved legal drafts are noindex/follow, like the existing article drafts — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Each new leaf route has its own native loading.tsx, rendering the exact same page/policy content with inert/aria-busy and an out-of-flow status. The removed inherited Home fallback is not reintroduced. These static leaf routes do not need parameter guesses, a new route group or an artificial delay — https://nextjs.org/docs/app/api-reference/file-conventions/loading
- BreadcrumbSchema is a small server component actually reused by all five new pages; it delegates to the existing escaped native JsonLd renderer. Breadcrumb labels match PageHeading. ContactPage describes a contact page only, with no made-up telephone, email, address, hours, ContactPoint or clinic entity. Definitions were read from the official stable 30.1 dataset again after the old cache was unavailable — https://nextjs.org/docs/app/guides/json-ld ; https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/releases/30.1/schemaorg-current-https.jsonld
- Twelve FAQ records are shared with the Home four-question excerpt, grouped under four stable native hash targets. The existing Radix Accordion supports RTL, multiple open answers and native keyboard behavior. forceMount keeps answer text in server HTML, while data-state=closed CSS prevents a flash of all answers. No height animation, FAQPage rich-result eligibility claim or new custom client wrapper — https://www.radix-ui.com/primitives/docs/components/accordion
- Contact's only new client leaf uses useForm/Controller with empty deterministic defaults, zodResolver and a typed messageSchema. Ref/value/onChange/onBlur are explicitly connected. Native DOM name attributes are deliberately not passed until real sending is authorized, while Controller retains its internal identities — https://react-hook-form.com/docs/usecontroller/controller ; https://react-hook-form.com/docs/useform ; https://raw.githubusercontent.com/react-hook-form/resolvers/v5.9.1/README.md ; https://zod.dev/api
- The native form action is only /contact with GET, but its text controls and submit button have no name. WHATWG's form entry-list algorithm skips unnamed fields, so an unhydrated/no-JS native submit carries none of the entered values; after hydration RHF prevents native submission and only validates locally. The noscript note explains the reload behavior. This is source/spec reasoning, not an executed network test — https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-entry-list
- Contact success wording means only valid format, never sent/delivered/booked. Edits or validation failure clear the checked indicator; fixed explanatory copy, a reserved short status line and per-field error space avoid intentional geometry changes. Textarea's leftover transition-shadow/field-sizing-content were removed in favor of fixed initial geometry and user-controlled vertical resize. No request, email transport, console logging, session, DB write or persistent draft store is added.
- Privacy describes the actual next-themes localStorage preference, not hypothetical session cookies. It distinguishes current app behavior from unknown preview/hosting logs and future auth/message behavior. Defaults/storage behavior were refreshed against the official pinned next-themes README — https://raw.githubusercontent.com/pacocoursey/next-themes/v0.4.6/next-themes/README.md
- Legal copy is an implementation-aware draft, not jurisdiction-specific legal advice or a representation of GDPR/HIPAA/Iranian-law compliance. It does not invent retention deadlines, refund/cancellation terms, effective dates, blanket intellectual-property ownership, guaranteed security or a contact channel. Owner and appropriate legal review remain necessary before operations/publication. No statute or unsupported legal entitlement is asserted as verified.

### Content, privacy and asset integrity

Testimonials has a genuine empty-state statement, three prospective consent/privacy principles and the already-disclosed synthetic layout samples. There are no real-client quotations, star ratings, totals, outcome statistics or Review/AggregateRating markup. The public review intake/moderation system is still unimplemented. Stories moved from content/home.ts into content/stories.ts and are reused, not copied into a second dataset.

FAQ adds current-stage answers for booking, fee, cancellation, local message checking, urgent help, courses, article drafts and sample portraits. Questions moved into content/questions.ts; Home uses the same first four records. Future phases must update these stage-sensitive answers when capabilities actually change.

Contact reuses the portrait in a bounded 4:5 frame. Telephone/WhatsApp retain existing null-based unavailable states, and address/hours/response time are expressly unconfirmed rather than fabricated. There is no map or newsletter. The emergency disclaimer is prominent before the form and remains in the server footer. Confidentiality guidance and a Privacy link are adjacent to the form. Validation accepts an optional name (up to 80), an email (up to 254) and a short message (20–1200); these are sample UI limits, not an implemented server action. Pre-hydration naming precautions are not an authorization to collect real sensitive data.

Privacy/Terms share the server PolicyPage because both need the same summary/contents/reading layout, but have separate typed content, titles, descriptions, canonical URLs and status. They explain local-only message validation versus server-visible GET search queries; theme preference versus not-yet-existing account cookies; possible hosting logs versus no app analytics; no confirmed intake/retention/contact process; general content versus individual clinical care; and unavailable booking/course/payment/refund behavior. Both explicitly require review and remain noindex drafts. Future backend enablement must update these documents at the same time, not leave misleading inactive-service statements.

No image file or generation was added. Contact and Testimonials reuse the approved portrait/three distinct sample faces, with honest captions and reserved ratios. Manifest placements and public/images/README.md were updated. Only Home Hero retains eager/high-priority loading; no new full-bleed photo section or external image/font resource.

### Naming and client register

Six new component files: Testimonials, Faq, Contact, MessageForm, BreadcrumbSchema and PolicyPage. Only MessageForm is client-marked; the complete register is **28**, including the two existing context-only modules and retaining vendor-boundary qualifications. One component per file, kebab-case/PascalCase match, one/two-word authored names, local Props, verb-first functions/handle events, boolean prefixes and readonly typed content. No barrel, generic utils, any, unsafe non-null assertion, test suite or single-use abstraction. Page routes contain only page/loading conventions. All section files remain within two levels of components; shared policy/schema components each have multiple genuine consumers.

### Phase 6 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Only five authorized public routes, no early backend work | Met |
| 2 | Honest Testimonials empty state and labeled existing sample cards | Met |
| 3 | Consent/privacy/outcome boundaries without fake reviews | Met |
| 4 | Twelve grouped FAQs with native anchor navigation and Home reuse | Met |
| 5 | Native accordion semantics and server-present answer content | Met by source reasoning, not keyboard-tested |
| 6 | Contact identity/photo and unconfirmed channel/hour/address states | Met |
| 7 | RHF/Controller/resolver/Zod local form with error/checked states | Met by implementation; not interaction-tested |
| 8 | No real send, no persistence and unnamed native field precaution | Met by source/spec; no network validation run |
| 9 | Adjacent confidentiality, contact/footer emergency notice | Met |
| 10 | Privacy draft reflects current app and unknown hosting behavior | Met as draft; operational/legal confirmation pending |
| 11 | Terms draft without invented financial or clinical conditions | Met as draft; operational/legal confirmation pending |
| 12 | Unique metadata/h1/canonical, matching breadcrumbs and truthful schema | Met by source review |
| 13 | Independent matching page loading without inherited Home flash | Met by design reasoning |
| 14 | Existing CSS-first RTL/themes, reserved images and mobile bar reuse | Met by source; not visually certified |
| 15 | Naming, complete 28-entry client register, README/sources/asset records | Met; no unmet naming rule |
| 16 | Permitted type/lint/build/audit verification and approval boundary | Met |
| 17 | Supported/non-deprecated lint dependency chain | **Not met: ESLint 9 EOL; stable ESLint 10 conflicts with three latest plugin peer ranges** |

**Checklist: 16 of 17 met.** The sole unmet phase acceptance item is #17; the proposed temporary development-only exception awaits user approval. Professional license/contact details, real consented reviews, clinical review of articles, legal review, actual course/fee/retention information and future backend phases remain unprovided/unimplemented and are explicitly disclosed rather than claimed complete.

**SEO checklist: met for Phase 6 page implementation by source review.** Each page has server content, one h1, logical headings, matching visible/schema breadcrumbs, unique Persian metadata/canonical, reserved image geometry and truthful schema. ContactPage does not assert an active contact channel; FAQ and sample reviews do not claim rich-result eligibility. Sample Testimonials and unapproved legal drafts remain noindex. Publication approval, real credentials/channels, DB sitemap and deployment/validator review remain pending.

**Zero-flicker check: met by implementation reasoning, not visual verification.** Each new loading boundary uses its destination's exact template and starting state; schema scripts are omitted from inert copies. Existing prepaint theme, optional font, fixed header/gutter, deterministic IDs, image ratios and safe-area/mobile-bar clearance remain. Form defaults are present from SSR, error/status space is reserved, and no mount gate, viewport render branch, initial entrance or post-hydration value fill is added. Textarea has fixed first geometry; deliberate user resize/accordion expansion are user-driven layout changes. forceMount answers use first-paint closed CSS. Manual hard-refresh/throttled/cache-disabled/theme/focus/no-JS checks are still required and have not run.

### Allowed verification and next boundary

Pinned Node 24.21.0/npm 11.19.0 were restored with approved exact manifests and scripts disabled. TypeScript, ESLint and DB-independent Next 16.3.8 build passed; generation reported 21/21 including the five new static pages. npm audit reports zero vulnerabilities. The EOL warning remains a support-policy failure despite these passing checks. No browser, UI/network interaction test, test suite, DB connection/ping/seed/script, live handler/bus, SEO validator or Core Web Vitals measurement ran. No source artwork was visually reopened in this phase.

Next, only after the pending tooling decision and phase approval: Phase 7 repositories, Better Auth/session/actions/SSE, the two manual DB scripts and request-time database sitemap. MongoDB remains exclusively on the user's machine and will not be contacted here.


## Phase 7 — Data foundation (partial)

Historical Part 1 record; current status and acceptance are in the Part 2 section below.

### Scope and approval boundary

The user's «ادامه» following the Phase 6 handoff is treated as acceptance of that review and the smallest explicitly proposed temporary development-only ESLint 9 retention. Latest 10.11.0 still conflicts with the latest react 7.37.5, jsx-a11y 6.10.2 and import 2.32.0 plugin peers. No force, overrides or dropped lint rules. This supersedes the historical “pending approval” text in the Phase 6 record; EOL is not relabeled as upstream support.

This is a coherent **partial delivery of Phase 7**, using the user's permission to split large phases: database read foundation, native-auth configuration/access guards and the two manual setup scripts. No Phase 8 work. The implementation has not activated database-backed website behavior. The remaining six workstreams below must be completed before Phase 7 is considered delivered. In particular there is no fake successful login, mock session or placeholder API standing in for real auth.

### Current stable dependencies and restoration

The snapshot again lacked dependencies/toolchain binaries. Restored Node 24.21.0 using its official tarball and verified SHASUMS256; npm remains bundled 11.19.0. Restored the old lock with strict engines/peers and scripts disabled before checking current official manifests — https://nodejs.org/dist/v24.21.0/SHASUMS256.txt ; https://nodejs.org/dist/v24.21.0/node-v24.21.0-linux-x64.tar.xz

Current registry latest is **Better Auth 1.7.7**, not the previous 1.7.6. Its release fixes the critical Magic Link/OAuth-state issue GHSA-965c-763c-88jm, plus other auth fixes. This app has never enabled Magic Link/social OAuth, so the documented exploit prerequisites do not describe an enabled feature here; nevertheless the paired packages were upgraded to the current patched release. No migration or provider was added — https://github.com/better-auth/better-auth/releases/tag/v1.7.7 ; https://github.com/better-auth/better-auth/security/advisories/GHSA-965c-763c-88jm

Before installation, checked exact/latest package engines, dependencies, peerDependencies and optional-peer metadata. Better Auth 1.7.7 accepts Next 16, React/React DOM 19 and MongoDB 7; the matching Mongo adapter requires core ^1.7.7 and utils 0.4.2. Utils latest 0.5.0 is not that compatible peer, so the required transitive 0.4.2 remains. MongoDB 7.7.0 requires Node >=20.19.0, satisfied by 24.21.0. No optional framework/ORM/provider peers were newly installed — https://registry.npmjs.org/better-auth/1.7.7 ; https://registry.npmjs.org/@better-auth/mongo-adapter/1.7.7 ; https://registry.npmjs.org/@better-auth/core/1.7.7 ; https://registry.npmjs.org/@better-auth/utils/0.4.2 ; https://registry.npmjs.org/mongodb/7.7.0

The first strict in-place install and targeted npm update refused the stale 1.7.6 peer tree. No suggested peer bypass was used. Saved the prior lock/install in ignored workspace cache, set both direct exact pins to 1.7.7, and generated a fresh lock with normal `npm install --strict-peer-deps --engine-strict --ignore-scripts`. It succeeded with 747 packages/748 audited and zero reported vulnerabilities. Lock version comparison shows **only eight existing Better Auth-family nodes changed 1.7.6→1.7.7**: better-auth, core, mongo-adapter, telemetry, drizzle-adapter, kysely-adapter, memory-adapter and prisma-adapter. The latter adapters are existing upstream dependencies, not application ORM use. Direct dependency sets are unchanged; integrity/resolution and peer requirements in the lock are updated. The only deprecated node remains the approved temporary ESLint; pre-existing approved prereleases are unchanged — https://docs.npmjs.com/cli/v11/commands/npm-update ; https://registry.npmjs.org/@better-auth/telemetry/1.7.7 ; https://registry.npmjs.org/eslint/latest ; https://registry.npmjs.org/eslint-plugin-react/latest ; https://registry.npmjs.org/eslint-plugin-jsx-a11y/latest ; https://registry.npmjs.org/eslint-plugin-import/latest

### Official APIs and design decisions

- `server/db.ts` caches one MongoClient on globalThis across HMR. Neither import nor client.db() opens the DB; the driver automatically connects on the first operation. No connect/ping/init call, eager promise, import-time auth instance, watcher or startup index hook. Bounded pool and selection/connect timeouts avoid unbounded waiting; they are configuration, not evidence of successful access — https://www.mongodb.com/docs/drivers/node/current/connect/mongoclient/ ; https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/
- `server/auth.ts` is a lazy `betterAuth` factory using the official Mongo adapter and the documented `better-auth/minimal` entry because the adapter is supplied. No ORM configuration, custom hash/signature/token code, social provider, magic link, joins flag or extra plugin. Omitting adapter client leaves transactions disabled for the user's standalone MongoDB — https://www.better-auth.com/docs/installation ; https://www.better-auth.com/docs/adapters/mongo
- Secret validation is deferred until auth is actually requested; minimum 32 characters is a length check, not proof of entropy. Base URL is an exact origin: HTTPS except explicit local loopback HTTP. trustedOrigins contains only that origin. Native cookie protections/CSRF remain enabled; cookie caching is off. No auth secret was created here or added to .env.local — https://www.better-auth.com/docs/installation ; https://www.better-auth.com/docs/concepts/cookies
- Email/password enablement and native password length bounds are configured. Role is a native additional field with `input:false`, `defaultValue:client`; phone is an optional additional field with Zod input validation and no implied ownership verification. Account/password/profile endpoints and first-admin bootstrap are not connected yet — https://www.better-auth.com/docs/authentication/email-password ; https://www.better-auth.com/docs/concepts/database#extending-core-schema
- Rate limiting uses Better Auth's database storage, including development, with stricter sign-in/sign-up/password paths. Important: native `auth.api` server calls **bypass** this limiter, so the later auth UI must use native request handling or explicitly preserve its limits rather than claim server actions are automatically covered. IP limits also require a trustworthy sanitized proxy header/origin firewall at deployment; no permissive proxy trust was added — https://www.better-auth.com/docs/concepts/rate-limit
- `server/session.ts` uses the official native cookie-presence helper only as an anonymous fast path, then Better Auth's actual getSession with cookie-cache bypass and no RSC refresh. Cookie presence is never proof of identity/role. requireSession/requireAdmin sit beside private repository operations; records are constrained by session.user.id, not caller-supplied ownership. No app-owned auth-token query — https://www.better-auth.com/docs/integrations/next ; https://www.better-auth.com/docs/concepts/session-management ; official installed 1.7.7 `better-auth/dist/cookies/index.d.mts` and `api/routes/session.d.mts`
- React cache wraps a function without executing it and scopes results to an RSC request; session data is not placed on globalThis or shared between users. Global caching is limited to the connection/auth configuration, not identities — https://react.dev/reference/react/cache
- Next's native `server-only` poison imports guard auth/session/query/repository entry points, with **no new package**: installation is optional and Next handles/types these imports. The driver module remains usable by the two native scripts, which cannot import Next's poison module outside a React-server context. It imports Node-only MongoDB, never a client component — https://nextjs.org/docs/app/getting-started/server-and-client-components#preventing-environment-poisoning
- Read repositories use the native collection generics, find/findOne/countDocuments, explicit projections, bounded skip/limit, escaped literal search terms and stable tie-break sort. Public catalog strings use MongoDB's Persian collation; indexes for that publication query use the same locale. No regex supplied by a user, arbitrary query document or client-selected projection is accepted — https://www.mongodb.com/docs/drivers/node/current/crud/query/retrieve/ ; https://www.mongodb.com/docs/drivers/node/current/crud/configure/#collation ; https://www.mongodb.com/docs/drivers/node/current/indexes/
- Shared Zod schemas define models/inputs and validate seeded source content. Enum values come from the shared constants, not duplicated magic role/status strings. Publication requires professional review and a real nonempty author/instructor; approved reviews require consent and non-sample status. These checks are data constraints, not a claim that any record has been reviewed — https://zod.dev/api
- Native Node TypeScript is stable on the pinned 24.21.0 (stable since 24.12.0). The two `.mts` entry points and their import graph use explicit relative `.ts` extensions and type-only imports, with no alias rewriting, runner or experimental flag. `allowImportingTsExtensions` permits tsc to check those imports. Package `type:module` makes transitive .ts files explicit ESM; next.config.ts's env import now has its real extension. No CommonJS config file needed conversion — https://nodejs.org/api/typescript.html ; https://nodejs.org/docs/latest-v24.x/api/cli.html#--env-filefile ; https://nextjs.org/docs/app/api-reference/config/typescript#using-nodejs-native-typescript-resolver-for-nextconfigts

### Collection ownership and read boundaries

| Repository | Collection / current behavior |
| --- | --- |
| clients.ts | users; admin-only business projection and escaped name/email/phone search; never credentials/tokens |
| appointments.ts | appointments; current-user list, owner-or-admin detail, admin calendar window; public occupied date/slot projection only |
| articles.ts | articles; published/reviewed/due-date public list and slug lookup, separate guarded administrative listing |
| courses.ts | courses; same visibility boundary, separate typed collection, not a generic repository |
| testimonials.ts | testimonials; public approved/consented/non-sample/due-date projection, guarded moderation listing |
| messages.ts | messages; admin-only status-filtered list and detail; no public inbox read or send operation |
| settings.ts | settings; admin full document and separately projected public schedule |

Better Auth owns its sessions/accounts/verification/rateLimit collections through the official adapter; separate handwritten auth repositories would duplicate its security implementation and were not added. Users are read only through a minimal business projection or the native session API. These repositories currently implement **reads only**, not completed CRUD. Write paths, action results, optimistic revision checks, event publishing and cache invalidation are explicitly pending. Existing `revision` fields are preparation for those checks, not an implemented conflict protocol.

Public catalog reads require status=published, isReviewed=true and an actual BSON Date publishedAt <= request time; null, draft and future records do not qualify. There are no build-time DB lookups or DB static params. Read results stay server-side (ObjectIds are not claimed to be client-serializable DTOs); later action/presentation boundaries must explicitly pick/serialize fields. Count and page reads are not a transactional snapshot. Time keys are intended as Gregorian YYYY-MM-DD / HH:mm for Asia/Tehran storage; visible dates remain Intl Persian. The actual schedule/slot-generation, startsAt/key consistency, race-safe booking action and nearest-offer selection belong to the upcoming action/booking work, not to these read methods.

Private reads authenticate before querying their business collection. Public occupied-time queries reveal neither user ID nor appointment ID/note/status. Date windows are bounded to at most 32 inclusive calendar days; over 4000 matching appointment rows fail closed rather than silently presenting truncated availability. Page sizes are capped at 50; catalog public pages remain six records. No sensitive information is logged by authored repository code. Database exceptions are not swallowed as an empty list; Persian typed action/UI errors still need the remaining boundary implementation.

### Manual indexes and seed — written, never executed here

Exactly two executable scripts exist, neither referenced by npm lifecycle hooks. `setup-indexes.mts` creates unique user email, session token, provider/account identity, rate-limit key, article/course slug and **date+slot only for isReserved:true**. Cancellation will release that unique slot by changing the same document's reservation state; the future write must change status and isReserved atomically. An active unique index prevents duplicate exact slot keys, not all possible overlaps between differently aligned sessions. The later schedule grid must enforce that distinction — https://www.mongodb.com/docs/manual/core/index-partial/ ; https://www.mongodb.com/docs/manual/core/write-operations-atomicity/

TTL is only on native BSON-Date expiresAt for sessions/verification, with expireAfterSeconds=0. TTL deletion is asynchronous, not an authorization check or a policy for retaining clinical/user/message records. Rate-limit lastRequest is numeric, so no ineffective TTL was attached. Manual setup can fail on duplicates or existing incompatible definitions; the script does not drop indexes, erase conflicting records, repair data silently or seed automatically. Existing expired auth documents may be purged after TTL creation, and the README warns of that — https://www.mongodb.com/docs/manual/core/index-ttl/

The adapter's official published source was read for ObjectId conversion, transaction defaults and index behavior: `@better-auth/mongo-adapter/dist/index.mjs`, `dist/index.d.mts`; core's `db/get-tables.mjs` and `db/database-index.mjs`, now all 1.7.7. Names/types align with configured collection names. The adapter has a native lazy table-index ensure mechanism when schema indexes exist; it was not invoked here. No application-owned startup migration/index hook was written. Framework-owned index enforcement must not be confused with execution of the manual scripts.

`seed.mts` first requires nonpartial/nonsparse unique slug indexes, then performs only $setOnInsert upserts. Three existing article drafts, three existing course proposals and singleton site settings are the entire seed. Existing edits/statuses are never overwritten, there is no truncate/drop/reset command, and timestamps represent actual insertion time rather than invented publication dates. publishedAt remains null; author empty; isReviewed false; booking disabled; hours empty; duration null; contact/license remain unknown. No default admin, password, clients, appointments, messages or real reviews are invented. Both scripts close their process-owned pool in finally and report a generic Persian failure without URI/document/secret dumps — https://www.mongodb.com/docs/manual/reference/operator/update/setOnInsert/ ; https://www.mongodb.com/docs/drivers/node/current/indexes/

`content/seed.ts` reuses the existing content modules and image manifest through plain relative imports. Only their import spelling changed; no page text, photo, metadata, timestamp, fake author or sample-review promotion was introduced. Sources remain the Phase 5/6 documented drafts. No script, seed-module runtime import, client factory, session lookup, collection operation, schema migration or auth handler was executed as a verification method.

### Phase 7 acceptance — overall, not just this partial

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered coherent partial; no Phase 8 or database execution | Met |
| 2 | Current compatible auth/security pins and explicit limited dependency exceptions | Met within approved exceptions; ESLint 9 remains EOL |
| 3 | Lazy, hot-reload-safe native Mongo connection foundation | Met by code; no connection test |
| 4 | Typed models, shared validation and collection/status constants | Met for the read/seed foundation |
| 5 | Seven typed read repositories, projections, bounds and private guards | Met by code; no query test |
| 6 | Native Better Auth email/password/role/phone/cookie/rate configuration | Met as dormant server configuration only |
| 7 | Verified-session/role guard foundation near private data access | Met by code; no real session tested |
| 8 | Manual unique/auth/query/expiry index script | Met as delivered source, unexecuted |
| 9 | Manual idempotent draft-only seed and alias-free native import graph | Met as delivered source, unexecuted |
| 10 | Naming/depth/no-any, 28-entry client register, source/README records | Met; no unmet naming rule |
| 11 | Permitted typecheck/lint/DB-free build/audit | Met |
| 12 | Auth routes and combined RHF/Zod Login/Register with route SEO/loading | **Not met — next partial** |
| 13 | Real first-HTML header session, account controls and logout | **Not met — next partial** |
| 14 | Account/password/profile operations with shared validation and typed action errors | **Not met — next partial** |
| 15 | Repository mutations/actions, optimistic revisions, publish/invalidate | **Not met — next partial** |
| 16 | Native authorized SSE route/bus and debounced visibility-aware subscriber | **Not met — next partial** |
| 17 | Request-time DB content/metadata and published database sitemap | **Not met — next partial** |

**Checklist: 11 of 17 met.** All six unmet items are listed, not hidden by declaring the whole phase finished. **Deviations needing approval: none new.** The previously proposed ESLint exception is treated as approved by the continuation, not widened. Splitting the phase follows the already-authorized partial-delivery rule.

**SEO checklist: not met for completed Phase 7.** Existing public pages/metadata are unchanged; new login metadata/noindex and request-time content/sitemap remain unfinished. No publication/DB/SEO-validator claim.

**Zero-flicker check: not met for Phase 7's authenticated path.** That path and server-resolved account chrome are not connected yet. For existing public pages, this partial adds no JSX, client module, CSS, image or mount-time state and preserves the previous code strategy, but it is not visual proof. The only app content changes are equivalent module import paths and exposing the existing normalization function for seed/search reuse. Signed-in cache-disabled hard-refresh review remains required after integration.

Pinned typecheck and lint passed with the final 1.7.7 pair; DB-independent Next 16.3.8 build generated the same 21/21 pages. npm audit reports zero. No browser/test suite/database/ping/script execution/auth/live handler or SEO/Core Web Vitals tool ran. No secret was printed or fabricated, and .env.local was left unchanged. Continue only within the remaining Phase 7 scope; do not start Phase 8 from this partial delivery.


## Phase 7 — Authentication and live foundation (Part 2)

Historical Part 2 record; current status, build caveat and acceptance are in Part 3 below.

### Scope and official sources

The user's «ادامه» authorized the remaining Phase 7 work, not Phase 8. This is a second coherent partial: native authentication, a combined login/register page, verified first-HTML account chrome and the authorized live transport. The three remaining workstreams below are not relabeled as complete. No new dependency, config flag, bundler switch, default credential, third script or backend infrastructure was added.

- Native Next integration: toNextJsHandler mounts GET/POST at api/auth/[...all]; the same-origin createAuthClient performs real HTTP sign-in/sign-up/sign-out. Direct server auth.api calls bypass HTTP rate limiting and are used here only for verified session reads, not user mutations — https://www.better-auth.com/docs/integrations/next
- Hooks: shared Zod validation strips unexpected input; invalid fields raise APIError rather than trusting the browser. Supported mutation after-hooks publish/invalidate only after non-error results. Sign-out captures a native verified session before deletion because its endpoint does not set context.session itself; the hook explicitly returns the updated context. No cookie parsing, password hashing or custom auth protocol was authored — https://www.better-auth.com/docs/concepts/hooks ; official installed better-auth 1.7.7 dist/api/routes/sign-out.mjs
- Profile/password boundaries use native update-user/change-password with shared schemas; change-password forces revokeOtherSessions:true. A complete typed field-error operation layer is still pending; no account UI, recovery flow or email verification sender was invented — https://www.better-auth.com/docs/concepts/users-accounts ; https://www.better-auth.com/docs/authentication/email-password
- The optional inferAdditionalFields client plugin was reviewed but is **not used**: this partial's browser calls require only built-in fields. Removing that unnecessary client-plugin barrel preceded a successful default build after an earlier compilation timeout. This observation is not a general diagnosis of Better Auth or Turbopack. The SDK stays minimal and no server module is imported into it — https://www.better-auth.com/docs/concepts/typescript ; https://www.better-auth.com/docs/guides/optimizing-for-performance
- connection() is the stable request-time barrier before Viewer reads. React cache memoizes only within the RSC request; native sessions disable cookie cache and RSC refresh writes. A cookie is a fast absence check, never authorization. A present cookie plus invalid Auth configuration raises an unavailable error rather than pretending the visitor is a guest — https://nextjs.org/docs/app/api-reference/functions/connection ; https://www.better-auth.com/docs/concepts/session-management
- Native mutation hooks invalidate the root layout; best-effort notification failure cannot retroactively turn a committed native mutation into a reported failure. router.refresh merges RSC without deliberately resetting unaffected client state or scrolling — https://nextjs.org/docs/app/api-reference/functions/revalidatePath ; https://nextjs.org/docs/app/api-reference/functions/use-router
- The documented stable serverExternalPackages option was reviewed during build troubleshooting but **not configured**; no exception or alternative build script was needed — https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
- RHF Controller binds value/ref/onChange/onBlur explicitly; no native input name can leak credentials through the pre-hydration GET fallback. Both forms start with the same deterministic empty defaults; schema errors are Persian and password is cleared only after a verified success — https://react-hook-form.com/docs/usecontroller/controller ; prior Phase 6 native form/name sources
- Native RTL Tabs use forceMount with explicit inactive-panel CSS, preserving typed values when switching tabs rather than hydrating a different tree. All decorative surfaces use existing server components/tokens — https://www.radix-ui.com/primitives/docs/components/tabs
- Native EventSource handles named change/reset events, SSE framing, close/reconnect and heartbeat comments. Response headers prevent caching/transformation and request no proxy buffering; upstream streaming support must still be configured by the owner — https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- Visibilitychange closes hidden-tab streams/timers and reconnects once visible. Refresh is debounced and deferred while editing/submitting, not driven by server polling — https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- The Node EventEmitter uses on/off/emit/setMaxListeners behind a lazy globalThis instance. Subscriptions, identity admission counts and idempotent releases survive HMR together, but not process restart — https://nodejs.org/docs/latest-v24.x/api/events.html

### Account, privacy and transport boundaries

Missing/invalid secret or origin disables the login form and returns native-wrapper 503 without constructing Auth or reaching Mongo. No secret was generated here. Read failures after configuration are not converted into null/zero; the new required Next client error boundary shows a safe Persian retry state without raw exception details. getViewer resolves id/name/email/normalized role and the count of the current user's upcoming pending/confirmed appointments through the guarded appointment repository. No component contains a DB query. Account links and role-only admin link use that server projection; destinations remain future phases, not fake account/admin pages.

Login's header and page share request-local session/Viewer reads. Sign-in/register success is announced only after the native getSession response confirms a user, then the router refreshes. Logout is a native HTTP mutation with a reserved failure/pending area. HTTP rate limits retain the existing database storage and defaults; reverse-proxy IP trust and operational rate behavior require owner-side validation before publication. The single-node bus publishes only minimal topic/id payloads. Current mutation hooks cover sign-in, sign-up, sign-out, update-user and change-password, not every automatic native session refresh. That exclusion avoids an invalidation feedback loop.

Notice is discriminated so public audiences can only carry content/slots topics, user audiences account/appointments, and admin audience admin. Scope is schema-validated; account requires a native verified session and admin requires its actual server role. Origins are compared with validated configured Auth origin, not an arbitrary forwarded Host; cross-site Fetch Metadata is rejected. Private messages reverify identity/role before sending; the 20-second heartbeat also checks revocation. Limits are 4 per authenticated user, 64 shared anonymous streams, 256 process-wide, 32 queued messages per stream. Slow-reader backpressure closes rather than growing an unbounded buffer; abort/cancel/lifetime cleanup removes listeners, timers and admission exactly once. Maximum lifetime is five minutes.

Client reconnection is bounded to a 30-second delay after errors. Only the first error of a continuous failure queues an RSC refresh; successful reconnect queues a catch-up refresh. A reset has its own five-second reconnect, covering native session changes that retain the same user ID. Stale EventSource callbacks are ignored after replacement/visibility/disposal. Timers checking editing state are local DOM checks, not network polling. Refresh has a 400ms debounce and does not push routes or force scroll. Delivery is not durable/replayed; reconnect refresh is recovery. All this is source implementation, not a security/runtime/load-test claim.

Home/FAQ/Privacy/Terms no longer falsely state that /login is a 404 or sessions are unimplemented. Privacy now describes configured account submission, native password hashing, necessary session cookie, seven-day lifetime/day-based renewal, possible IP/user-agent and rate counters, and the absence of email verification/recovery. No retention duration, legal approval, contact channel, clinician credential or guarantee was invented. Services cannot accept real data responsibly before those owner decisions. README includes owner-only local bootstrap guidance: create a normal account, independently verify the exact identity, manually change only that users record's application role, then sign out/in. No bootstrap script/default admin or live database command was run.

### SEO, loading and zero-flicker reasoning

Login has independent Persian title/description/canonical, fa_IR OG/Twitter, noindex/nofollow, one h1 and matching breadcrumb JSON-LD. Robots already blocks login/private/API routes. It uses the existing Phase 5 resolved-context Suspense pattern: first resolve the server Viewer, then use the same Login template/Viewer as the inert loading fallback. An auth-blind loading.tsx would risk rendering a guest form before a signed-in panel, so none was added; an immediate loading skeleton before auth resolution is not promised. Public content/metadata/sitemap are **not** database-backed yet.

The fixed server header never starts with a browser-derived guest guess. No useSession provider, mounted guard, hidden initial content or extra suppressHydrationWarning was introduced. Existing prepaint theme/font-optional strategy is unchanged. Form name/reminder slots, field errors and statuses reserve CSS space, tabs are hidden with server-delivered CSS, and controlled values persist across unaffected RSC refreshes. Long real names wrap; the account badge has a fixed slot and caps its visible count at 99+ while retaining an exact accessible count. These are code-level precautions, not visual confirmation or a universal pixel/CLS claim. The README retains cache-disabled/throttled hard-refresh instructions in both themes and both auth states.

**SEO checklist: met for the new login implementation, not met for completed Phase 7** because request-time DB content/metadata/sitemap remain. **Zero-flicker check: met for the scoped auth code strategy, not met for completed Phase 7** because the remaining data/action paths have not been implemented or reviewed. No browser, SEO validator or Core Web Vitals tool ran.

### Current Phase 7 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered coherent partial; no Phase 8 or DB execution | Met |
| 2 | Compatible exact dependency/security pins and limited approved exceptions | Met within prior exceptions; ESLint 9 remains EOL |
| 3 | Lazy HMR-safe native Mongo foundation | Met by code; not connected |
| 4 | Typed models/shared schemas/collection-role-status-topic constants | Met for delivered boundaries |
| 5 | Seven typed read repos, projections, bounded queries/private guards | Met by code; not queried |
| 6 | Native Better Auth email/password/role/phone/cookie/rate configuration | Met by code; real HTTP handler now mounted, not executed here |
| 7 | Native verified-session/role guards near private data access | Met by code; no real session tested |
| 8 | Manual unique/auth/query/expiry index script | Met as unexecuted source |
| 9 | Manual idempotent draft-only seed/native import graph | Met as unexecuted source |
| 10 | Naming/depth/no-any, complete 32-entry client register and docs | Met; no unmet naming rule identified |
| 11 | Permitted typecheck/lint/DB-independent default build/audit | Met |
| 12 | Native Auth routes, combined RHF/Zod Login/Register, SEO/resolved-state fallback | Met by code; no login/browser exercise |
| 13 | First-HTML verified account header/count and native logout | Met by code; no real session exercise |
| 14 | Complete typed account/profile/password operation/field-error layer | **Not met; shared native-hook schemas are only partial preparation** |
| 15 | Business repository mutations/actions, optimistic revisions, publish/invalidate | **Not met; auth notifications do not complete business writes** |
| 16 | Authorized native SSE/bus/debounced visibility-aware subscriber | Met by code; no handler/bus/browser exercise |
| 17 | Request-time published DB content/metadata/sitemap | **Not met; local fixtures still used** |

**Checklist: 14 of 17 met. Deviations needing approval: none new.** All three unmet items remain within Phase 7; no Phase 8 work is authorized by this partial's completion.

### Allowed verification

The SHA256-verified Node 24.21.0/npm 11.19.0 toolchain was restored; strict npm ci with strict peers/engines and ignored scripts installed 747 packages, audited 748 and reported zero vulnerabilities. Current official registry latest for Next/Better Auth/Mongo adapter was rechecked as 16.3.8/1.7.7/1.7.7. No package or lockfile pin changed. The known ESLint EOL warning remains accurately disclosed under the prior limited exception.

Initial static checks found a nullable captured release function and two prefer-const timer declarations; these were fixed without non-null assertions or lint suppression. The first default compile timed out while using an unnecessary client-plugin barrel; the lingering build process was stopped. After removing that unused import, the **unchanged default Turbopack build succeeded**, followed by another successful build. No alternative bundler/configuration/experimental flag was applied. The generated route report marks all HTML pages dynamic via the server Viewer request barrier; metadata assets stay static. That is not a claim that public content now comes from DB.

Final permitted checks after the implementation/documentation update passed: tsc --noEmit, ESLint, default Next 16.3.8 Turbopack build (generation stage 22/22), npm audit (zero vulnerabilities), source inventory (32 client directives) and git diff --check. No database, auth HTTP request, SSE handler, event bus, manual script, browser, test suite, SEO or performance tool was executed for verification. No environment secret was generated/printed; .env.local remains ignored. Review README, this section, the /login implementation, native API routes and server/live.ts. Continue within the three remaining Phase 7 workstreams only.


## Phase 7 — Typed operations and repository writes (Part 3)

### Scope and verified sources

This continuation stays in Phase 7. It implements the two pending operation/write workstreams; request-time public content/metadata/sitemap remain pending. No Phase 8 page/contact wiring, Phase 9/10 editor, new runtime package, third executable script, database collection, transaction infrastructure or application config flag was added. The default build did not complete in this constrained environment; the diagnostic Webpack success is separately recorded and is not used to silently mark default-build verification complete.

- Native updateUser and changePassword own the account/password mutation. Client HTTP calls preserve Better Auth's HTTP rate limiting/cookie behavior; revokeOtherSessions remains enforced by the server hook. Additional phone is sent as a validated object through the standard SDK; no unused client-plugin barrel or server import is introduced. Tokens are not returned to UI form state — https://www.better-auth.com/docs/concepts/users-accounts ; https://www.better-auth.com/docs/concepts/typescript
- The existing native before-hook now includes structured fieldErrors in APIError; local and server validation share the schema. The installed official @better-auth/core 1.7.7 error codes confirm INVALID_PASSWORD, mapped to currentPassword rather than printing a raw exception — https://www.better-auth.com/docs/concepts/hooks ; installed @better-auth/core/dist/error/codes.mjs
- Zod safe parsing and flattenError shape the typed top-level field map; nested editor errors belong to the record group. English default library messages and submitted values are not echoed to UI. Optional current/native schema fields remain stripped/validated rather than mass-assigned — https://zod.dev/error-formatting ; https://zod.dev/api#safeextend
- Dedicated use-server modules export only async Server Functions. Inputs are untrusted, the DAL rechecks authorization/validation, and returns only UI-required receipts. Default Next Origin/Host protection and 1MB body limit are unchanged; unused actions without consumers may be eliminated and are not claimed as active endpoints — https://nextjs.org/docs/app/api-reference/directives/use-server ; https://nextjs.org/docs/app/guides/server-actions ; https://nextjs.org/docs/app/guides/data-security
- Single-document atomic writes use _id plus expected revision, with $set and $inc. No stale-edit upsert, transaction on standalone Mongo, application retry loop or read-then-unconditional overwrite — https://www.mongodb.com/docs/manual/core/write-operations-atomicity/ ; https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/
- Typed insertOne and deleteOne use acknowledgment/matched/deleted checks; new ObjectIds are generated by the official driver constructor, not supplied by the caller for new records. Deletes filter the expected revision, and write errors are returned as bounded Persian outcomes — https://www.mongodb.com/docs/drivers/node/current/crud/insert/ ; https://www.mongodb.com/docs/drivers/node/current/crud/delete/
- A unique multikey index prohibits a minute key from occurring in two different reserved appointment documents; repeated keys within one document are not a substitute for deriving a correct interval. The array is generated from minute-aligned server times, not accepted from browser input — https://www.mongodb.com/docs/manual/core/indexes/index-types/index-multikey/
- Partial uniqueness applies only to isReserved:true. Changing status/reservation/interval keys within one document atomically releases or replaces its coverage. The requested date+slot uniqueness is retained as a separate constraint — https://www.mongodb.com/docs/manual/core/index-partial/ ; https://www.mongodb.com/docs/manual/core/write-operations-atomicity/
- Intl formatToParts with explicit Asia/Tehran, gregory/latn and h23 converts storage keys with a round-trip check. No fixed Tehran offset, host-local timezone arithmetic or extra date dependency. Visible presentation remains the existing fa-IR/Persian formatter — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts
- notifyChange centralizes post-acknowledgment bus publishing and root-layout invalidation. Each signal is best effort; its failure cannot change a confirmed mutation into a false failed-save response. The existing source for revalidatePath/refresh still applies — https://nextjs.org/docs/app/api-reference/functions/revalidatePath
- Build diagnostics use the documented stable Next --webpack CLI, not an experimental flag or custom bundler package. npm passes it with a double dash; default scripts/config remain untouched — https://nextjs.org/docs/app/api-reference/cli/next
- The official memory guide was reviewed. No experimental memory option, disabled TypeScript check, inspector, heap profile, analyzer or browser tool was used. A one-command V8 heap cap did not resolve the stalled default compile and was not persisted — https://nextjs.org/docs/app/guides/memory-usage

### Operation contracts and authorization

lib/result.ts defines Result<Value, Field>, safe Failure, minimal Receipt and public Slot. Validation results have a schema-derived key union; nested content fields flatten to record. Access failures remain distinct from stale-version conflicts, occupied slots, limits and unavailable/uncertain results. Unknown database/network errors contain no raw driver exception, URI, submitted text, token or stack. Unavailable does not prove a write was rolled back: the UI must re-read before offering a retry. There is no automatic resubmission. requireWrite rejects unacknowledged write results before notifications or a success receipt; failed expected-revision filters cannot claim a save.

lib/account.ts provides createAccount, loginAccount, logoutAccount, updateProfile and changePassword through the same-origin native SDK. The existing login form and account links now consume typed results; server field errors populate the existing reserved error slots. Login/signup still confirm the native session before success; profile/password wrappers discard native returned session/token data. These are native HTTP operations rather than server actions that would bypass native HTTP rate limits. Better Auth retains its own profile concurrency semantics; no fictional auth revision column was invented. Account editing UI is explicitly Phase 8.

server/actions contains only content, appointments and messages action boundaries. Each delegates to a collection-specific repository with its own guard and schema recheck. There is no generic CRUD repository, component query, caller-selected role, caller-selected booking owner, raw Mongo document return, storage of credentials outside Better Auth or new account/admin page. Default action origin/body protections are not relaxed. Booking/contact/editor actions have no UI consumers yet; existing Contact remains local-only validation, so its disclosure remains accurate.

| Collection | Write/read boundary delivered |
| --- | --- |
| articles | Admin create/edit/delete; unique slug precondition, normalized search, reviewed/attributed publication, first actual publication timestamp and revision-filtered writes |
| courses | Separate typed admin create/edit/delete repository with the same publication/slug safeguards, not a generic content collection |
| testimonials | Admin create/edit/delete/moderation; approved requires real/non-sample/consented record, and a generated portrait cannot be presented as that real person's photo |
| messages | Public validated creation with a shared single-process rate budget; admin-only versioned status changes; no public inbox read or unrequested deletion policy |
| settings | Admin versioned update of the manual-seeded singleton, no upsert or reset; enabling booking requires the booking indexes |
| appointments | Verified-user creation/own future cancellation; admin-only confirmation/cancellation/completion/rescheduling; minute coverage, revision guards and bounded real alternatives |
| users / native auth | Client repository remains a guarded business projection; self name/phone/password updates go through native Auth, never handcrafted credential writes |

Publishing is after a confirmed write. Content drafts send only an admin event; a publish/unpublish/published edit/delete signals the public content collection rather than exposing a private draft ID. Appointment public events contain only a validated day key, while owner/admin notices carry appointment ID. Inbox notifications are admin-only. Root invalidation covers old/new slugs and the future sitemap without interpolating untrusted routes. Notification/cache exceptions do not erase or falsify a committed result.

### Booking consistency and operational limits

The input accepts only service/date/slot/scheduleRevision; userId comes from the verified native session, and status/startsAt/endsAt/minutes are server-derived. Slots use only validated configured hours/duration in a bounded 32-calendar-day rolling window, excluding started slots and overlapping occupied intervals. Day numbers use Sunday=0 through Saturday=6; future Persian week UI must map to this storage convention. No hours, price, payment, clinical retention, email delivery or cancellation fee was invented. Slot output is ISO/public time data, not an appointment identity or status.

A reservation's minutes array is the half-open UTC minute interval from start inclusive to end exclusive. It is bounded to 15–180 entries and does not use a second collection. A unique partial minutes index therefore protects different start times/durations that overlap, not merely identical date+slot keys. Cancellation changes status and isReserved in one revision-filtered update. Rescheduling replaces start/end/date/slot/minutes in one update, so a duplicate-key rejection preserves the previous interval by Mongo's single-document contract. Concurrent changes to the same appointment fail the revision filter. This is implementation grounded in the documented database contract, not a tested concurrency claim.

The existing manual setup-indexes script now preflights reserved records for matching Tehran date/slot and canonical minute coverage before DDL. Missing/legacy/inconsistent minute arrays cause a failure, not a silent migration/drop/backfill. Existing real data must be independently reconciled by the owner after backup. Fresh seed creates no appointments. Runtime requireIndexes only inspects definitions and fails closed on missing slot/minute or slug prerequisites; it never creates indexes and does not globally cache an assumption about them. Running neither script here remains an absolute constraint.

A request validates the selected schedule revision and stores it with the appointment. Settings changes do not automatically move existing appointments. Because standalone Mongo does not provide a cross-document transaction here, an already-in-flight reservation may finish with the earlier settings snapshot; disabling booking is not claimed as a global serializable barrier for requests already accepted. The independent unique minute constraint still protects overlap. There is no unsupported lease/fencing scheme or hidden replica-set requirement.

Up to three nearest future alternatives are re-read after a duplicate-key conflict, sorted by absolute time distance within the current rolling window. They are offers, not holds; submission must validate again. A failed suggestion read preserves a known occupied-slot error. Unknown write outcomes instead return unavailable and ask for a fresh state check. Admin rescheduling can exclude only its already-authorized current document from availability; the public reader has no caller-controlled exclusion ID.

Users cancel only their own future pending/confirmed record. Admin transitions are pending to confirmed/cancelled, confirmed to cancelled/completed, with completion only after the interval ends; terminal states are not reopened. These are technical backend rules, not an owner-approved financial cancellation policy. The source contains no invented cancellation charge/deadline; owner decisions remain required before Phase 8's real public acceptance.

The shared single-node limiter bounds active buckets to 512, with one-minute expiry; public messages share ten requests/minute, authenticated creation ten/user/minute and own cancellation twenty/user/minute. It does not trust arbitrary forwarding headers, impersonate a reliable per-IP limiter, survive process restart or coordinate multiple workers. Auth keeps its existing separate native DB-backed rate limiter. No distributed-abuse-proof claim is made.

### SEO, zero-flicker and naming

No new page/layout/loading, CSS, photo, font, mounted guard or client directive was introduced. The register remains 32 entries. Existing forms use deterministic defaults/useId and reserved feedback; failed operations do not reset inputs. The existing live subscriber defers refresh while editing/submitting. Optimistic UI state/rollback and admin/client screens still belong to their ordered page phases; this partial delivers the receipt/revision/error contracts for them, not a fabricated visual verification.

**SEO checklist: not met for complete Phase 7.** Public reads, metadata and sitemap remain fixture-based/unimplemented as previously listed. **Zero-flicker check: not met for complete Phase 7.** The current auth code preserves the earlier strategy, but public database presentation and its loading/error/empty contracts remain pending. No browser, visual, accessibility, SEO or performance tool was run.

Names remain short/domain-specific, components retain one export/file, and Next server-action modules contain only async functions. New server files stay within two folder levels; exactly two scripts remain. All added authored booleans use is/has/can, handlers use handle, code/comments are English and user-facing outcomes Persian. No barrel, ORM, any, non-null assertion, lint suppression, extra package or collection was added. No unmet naming rule was identified by source review/type/lint; this is not an automated all-project naming-certification claim.

### Current Phase 7 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered coherent partial; no Phase 8 or database execution | Met |
| 2 | Exact compatible pins / limited prior support exceptions | Met under existing ESLint 9 exception; no pin changed |
| 3 | Lazy hot-reload-safe native Mongo foundation | Met by code; no connection |
| 4 | Shared models/schemas/role-status-topic/result constants | Met for delivered boundaries |
| 5 | Seven typed read repos/projections/guards and bounded access | Met by code; no query execution |
| 6 | Native Better Auth account/cookie/password/role/rate setup | Met by code; not exercised |
| 7 | Native verified-session/role checks near private access | Met by code; no session exercise |
| 8 | Manual unique/auth/expiry indexes, now overlap minute constraint | Met as source; script never executed |
| 9 | Manual draft-only idempotent seed/native import graph | Met as source; unchanged and unexecuted |
| 10 | Naming/depth/no-any, 32-entry client register and docs | Met; no unmet naming rule identified |
| 11 | Type/lint/audit plus agreed default DB-independent build verification | **Not met in full: type/lint/audit and diagnostic stable Webpack build pass; default Turbopack compile did not finish** |
| 12 | Native Auth routes, combined form, SEO and resolved-state fallback | Met by source; native form behavior not exercised |
| 13 | First-HTML verified account/count and native logout | Met by source; no DB/session exercise |
| 14 | Typed account/profile/password results and shared field validation | Met by source; account editing UI remains Phase 8 |
| 15 | Business writes/actions, optimistic revisions, publish/invalidate | Met as backend contracts; no live mutation/concurrency exercise |
| 16 | Authorized native SSE/bus and visibility-aware refresh leaf | Met by source; publisher wiring extended, never executed |
| 17 | Request-time published DB content/metadata/sitemap | **Not met; next Phase 7 implementation boundary** |

**Checklist: 15 of 17 met.** Two implementation workstreams advanced, but default-build verification is now explicitly incomplete rather than borrowing Part 2's successful result. The only unmet workstreams are 11 and 17. No Phase 8 work follows automatically.

**Deviations needing approval:** the smallest proposal is temporary use of the official stable `npm run build -- --webpack` for subsequent build verification in this constrained workspace. Diagnostic executions succeeded, but acceptance of that temporary alternative is requested rather than changing the project's default command. No permanent bundler switch, new configuration, dependency, experimental optimization or ignored type check was applied. Prior ESLint 9 development-only approval remains unchanged.

### Allowed verification and limitations

SHA256-verified Node 24.21.0/npm 11.19.0 were restored. Strict npm ci with strict engines/peers and ignored scripts installed 747 packages, audited 748 and reported zero vulnerabilities. The known ESLint EOL warning and npm's optional update notice did not trigger unapproved package/toolchain changes. package.json, package-lock.json and next.config.ts remain unchanged.

Static checks caught one ZodError union-inference error in the native hook; an explicit unknown error type at the serialized HTTP error boundary fixed it without any/non-null assertions. Repeated tsc --noEmit and ESLint checks then passed. The default Turbopack build stalled at compilation, including a diagnostic attempt with a temporary 768MB V8 old-space cap. Around 1953MB used out of 1984MB total system memory was observed, but no heap profile or definitive root-cause diagnosis was produced. Timed-out next-build processes were stopped; no app server was started.

The documented stable `npm run build -- --webpack` subsequently completed twice with generation 22/22, followed by a successful final run of tsc --noEmit, ESLint, the same Webpack build (22/22), npm audit (zero vulnerabilities) and git diff --check. That validates this alternative compiler/build path, not the default Turbopack path, DB connectivity or mutation behavior. All HTML routes remain request-time because of the existing Viewer connection barrier; static metadata assets remain static. No public fixture was silently connected to Mongo during build.

No DB, ping, seed/index script, API/Server Action, bus, browser, test suite, profiler or SEO/Core Web Vitals tool was executed. No secret was generated/printed, no default admin was created, and .env.local remains ignored. Review README, shared results/account operations, the action/repository files and the manual index diff. Continue only within the remaining Phase 7 work after the limited build decision.


## Phase 7 — published content and metadata (part 4)

Date: 2026-10-01. The user's continuation after Part 3's explicit proposal is treated as approval of temporary stable Webpack verification in this constrained workspace. No permanent bundler/configuration/dependency change follows from that approval. Part 3's 15/17 status is historical; this section supersedes it. No Phase 8 UI or form submission wiring was started.

### Official sources and decisions

- Next connection: await the stable request barrier before public DB work, excluding those reads from prerender; no experimental flags or module-time queries — https://nextjs.org/docs/app/api-reference/functions/connection
- React cache: share an imported memoized reader with primitive arguments between RSC consumers/metadata; invalidation is per server request and errors are cached too, not a shared application content cache — https://react.dev/reference/react/cache
- Next generateMetadata: async params/searchParams and shared React cache for non-fetch data; notFound is supported, and metadata can be streamed by Next — https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next sitemap convention: return MetadataRoute.Sitemap from the built-in route; request-time API avoids the default static metadata-route behavior; no SEO package or handwritten XML — https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Mongo distinct: filter category choices by publication eligibility at the collection, then sort them using the fixed topic order before rendering — https://www.mongodb.com/docs/drivers/node/current/crud/query/distinct/
- Google Article: use applicable visible headline/image/author and actual ISO publication/modification timestamps; an author URL identifies that author, not a blanket attribution to the site owner; no rich-result guarantee — https://developers.google.com/search/docs/appearance/structured-data/article
- Google sitemaps: absolute canonical URLs, 50,000 URLs/50MB per file, and only reliably accurate lastmod; omit aggregate/static-page dates rather than manufacture today's date — https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Schema.org Course describes an educational course, not necessarily an available scheduled instance; the implementation emits only reviewed/published descriptions with actual visible dates and no offer/instance/price/certificate claims. The official latest release summary explicitly identifies stable 30.1, published 2026-09-16; no experimental vocabulary is used — https://schema.org/Course ; https://schema.org/version/latest/#term_Course
- Stable CLI fallback and its limited meaning remain grounded in the previously fetched Next CLI/memory guides; default Turbopack was not retried — https://nextjs.org/docs/app/api-reference/cli/next ; https://nextjs.org/docs/app/guides/memory-usage

### Public boundary and publication contracts

lib/published contains public-only Article/Course/Review/Profile and collection shapes. server/published awaits connection before every database read, delegates queries to the appropriate existing repository and validates/project fields into those shapes. ObjectId values, search text, revisions, consent/moderation internals, slot configuration and private account data are not passed as content props. A published review ID becomes a string key; dates become ISO strings and images resolve through the local manifest. No public component queries Mongo. The sitemap also explicitly awaits connection and requires a valid settings record before returning links. React memoization is not assumed to function or persist in a route handler.

Public article/course predicates require published status, professional review and a BSON publication Date no later than the read's cutoff. Full visible records are checked with the shared write schema, including the real author/teacher requirement. Missing/invalid slugs, drafts, unreviewed and future-dated articles are absent; readArticle returns null only for ineligible/missing keys, and the route calls notFound. Database/validation failures are not caught as null/empty/fixtures. Sitemap projections validate slug and stored dates; database records are expected to follow the existing write/seed contracts. There is no promise to repair arbitrary direct-DB edits.

Catalog filtering/search/title sort/pagination remains server URL-driven, with six records/page, deterministic tie-breaks and categories drawn only from public records. Category presentation uses the constant topic order, not an unspecified Mongo distinct order. Page links are clamped to the existing maximum of 1,000 pages per selection, rather than generating a page the input schema rejects; count is the actual match count, not an unlimited-archive promise. Related articles are at most two eligible records in the same category, excluding the current slug. Counts, entries and distinct categories are separate bounded queries, not a multi-document transaction or an atomic collection snapshot. React cache keeps the same article/profile lookup consistent within a render; it does not serialize concurrent writes.

Testimonials require approved status, explicit consent, isSample=false and a real nonfuture publication Date. Public display validates the projected content and rejects sample images even if a record bypassed normal writes. Null photo uses the existing reserved avatar box and initials, never a generated face standing in for a real person. Home and the paginated public page display actual empty states when there are no eligible records. No Review/AggregateRating is emitted, including for real reviews. The obsolete stories fixture was deleted; its approved design photos remain labelled as retained, unrendered design assets in the manifest/image README.

Article/course/profile seed values remain for the existing manual seed only; static editorial service/FAQ/policy/notice text is not falsely represented as database-managed content. Nothing seeds a published article, a real review, a user or an appointment. The seed/index scripts were not modified or executed here. Public runtime now requires Mongo and the seeded settings singleton even without Auth configuration; missing settings is an explicit setup failure. No demo-mode switch or fallback profile hides this dependency. Public settings exclude hours/revision; WhatsApp is converted from the validated stored Iranian phone to a wa.me HTTPS link. Existing immutable logo/site brand remains Dr. Kiana Khorsand, while editable professional text comes from settings. Contact displays the stored address without inventing an office or response hours.

### Metadata, sitemap and loading

Home/About/Services/Contact metadata consumes the same request-local profile used in visible content/chrome. Article metadata and body use the same readArticle(slug). The visible author is stored, not assumed to be the doctor; only an exact match to the profile name adds the About author link/URL. Published/modified ISO dates are the stored dates, rendered in Persian with the fixed Tehran timezone. Publication date is never the seed date or current render time. Root brand assets/titles remain the established personal brand, not a claim of mutable clinic identity.

Prebuilt title-bearing draft social images are not reused automatically after arbitrary DB title edits. Article OG/Twitter uses the same local cover photo as the visible article; the Persian title is in textual metadata. No new image renderer, external image fetch or title-overlay shaping claim is introduced. Course markup only describes the validated published course introduction; delivery, enrollment, price, dates of teaching and qualifications are not inferred from publication status. The page explicitly says online enrollment is unavailable. JSON-LD continues to use the existing escaped server component and is absent from loading output.

Sitemap is request-time and includes seven indexable base pages, the testimonial base page only when actual eligible reviews exist, and eligible article URLs. Private/auth/API, query variants, draft legal documents, unpublished/future articles and the unbuilt booking route are excluded. Article lastModified is its stored updatedAt. Aggregate pages omit lastModified: the latest surviving record timestamp cannot accurately represent deletions, so it is not used as a false aggregate update clock. A bounded projection allows 49,990 article links plus base pages, failing explicitly above the limit rather than silently truncating. Larger deployments need a separately approved split sitemap; no speculative infrastructure was added. robots declares the absolute sitemap URL. Empty testimonials are noindex; base testimonials become indexable with an eligible review. Query variants remain noindex/canonical-base. No HTTP response, crawler or sitemap endpoint was requested here.

**SEO checklist: met for the Phase 7 source implementation, not publication readiness or search-engine validation.** Owner-approved professional facts/content/legal policies and post-deploy checks remain prerequisites for launch. NotFound/status behavior and native metadata output were not exercised against a running application.

**Zero-flicker check: met as a reasoned source strategy, not visual validation.** Public DTOs resolve before the page template; the explicit Home/article/catalog/testimonial fallbacks reuse the same resolved values and URL selection, never seeded cards or an assumed first page. About/Services/Contact loading templates read the same request-cached profile. Testimonials' old parameter-blind loading file was removed in favor of its query-correct explicit fallback. Tradeoff: these resolved-data fallbacks do not cover the preceding DB wait; an immediate skeleton is not promised. First display can wait longer, and navigation can retain the preceding page. This is preferable to knowingly flashing wrong content/count/profile. There is no claim that every possible populated, empty and error result has the same total document height. Requested result changes and explicit error transitions can change it. The safe error boundary keeps the emergency disclaimer if profile/chrome fail.

Theme prepaint, optional local font, CSS-first carousel sizing, image ratios, header geometry, deterministic server formatting and existing useId/input-state strategy are unchanged. No new Client directive, viewport render branch, mounted gate, initial opacity-zero entrance, client timestamp or post-mount data fill exists. Review initials use the existing fixed avatar dimensions. Existing visibility-aware debounced live refresh now rereads published content instead of fixtures; delivery and input/scroll preservation remain untested runtime contracts, not measured guarantees. The complete register above remains 32 authored client files. Filename/depth/one-component rules were reviewed; no unmet naming rule was identified. Exactly the two manual scripts remain; no package, lockfile, env example or configuration change was introduced.

### Current Phase 7 acceptance

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered phase, no Phase 8 or database execution | Met |
| 2 | Exact compatible pins / approved support exceptions | Met under existing ESLint 9 exception; no pin changed |
| 3 | Lazy hot-reload-safe native Mongo foundation | Met by code; no connection |
| 4 | Shared models/schemas/role-status-topic/result constants | Met |
| 5 | Seven typed read repos/projections/guards and bounded access | Met by code |
| 6 | Native Better Auth account/cookie/password/role/rate setup | Met by code; unexercised |
| 7 | Verified-session/role checks near private access | Met by code; unexercised |
| 8 | Manual unique/auth/expiry and overlap-minute indexes | Met as source; never run |
| 9 | Manual draft-only insert-only seed/native import graph | Met as source; never run |
| 10 | Naming/depth/no-any, complete 32-entry client register/docs | Met; no unmet naming rule identified |
| 11 | Type/lint/audit and approved DB-independent build path | Met with temporary stable Webpack approval, not default Turbopack |
| 12 | Native Auth routes/combined form/metadata/resolved-state fallback | Met by source; form behavior unexercised |
| 13 | First-HTML verified account/count and native logout | Met by source; unexercised |
| 14 | Typed account/profile/password results/shared validation | Met by source; editing UI remains Phase 8 |
| 15 | Authorized writes/actions/revisions/publish/invalidate | Met as backend contracts; unexercised |
| 16 | Authorized native SSE/bus/visibility-aware refresh | Met by source; no stream or publisher execution |
| 17 | Request-time published DB content/profile/metadata/sitemap | Met by source; no DB read execution |

**Checklist: 17 of 17 met within the Phase 7 implementation and allowed-verification scope.** This does not mean all website phases, launch policies, browser checks or database/live workflows have passed. The prior two unmet workstreams are closed under the explicitly limited build approval. **Deviations needing approval:** none new; the temporary Webpack choice is not a permanent command switch, and ESLint's existing development-only EOL exception remains limited.

### Allowed verification and handoff

The pinned Node 24.21.0 binary was SHA256-verified and restored with npm 11.19.0. Strict npm ci installed 747 packages, audited 748 and reported zero vulnerabilities; no package/lockfile changed. Typecheck and ESLint passed. Stable Webpack completed with generation 20/20 and lists public pages, dynamic article slugs and sitemap.xml as request-time; former fixture slug prerender entries are gone. A first diff check caught one trailing blank line in catalog.ts; it was corrected. Final source verification then passed in one command: npm run typecheck, npm run lint, npm run build -- --webpack (20/20), npm audit (zero vulnerabilities), and git diff --check; exit 0. Static inventory confirmed 32 Client files, exactly the two manual scripts, no remaining public seed-content imports/static article params, and no package/lock/config/script changes. Subsequent edits are documentation-only.

No Mongo connection/ping, seed/index script, API/action/stream/publisher, application server, browser, test suite, visual/SEO/performance tool or runtime/concurrency exercise was run. No secret was generated or output, no default admin created, and .env.local remains ignored. Review the public DTO/read boundary, public pages/metadata/sitemap and README operational prerequisites. Stop for approval; Phase 8 is next only after the user's continuation.


## Phase 8 — private account (part 1)

Date: 2026-10-01. Authorized by continuation after completion of Phase 7. This coherent partial implements the private account area before public intake UI; it does not begin Phase 9. Phase 7's previous 17/17 is historical and is not reused as the Phase 8 count.

### Official sources and decisions

- Next route groups organize shared chrome without changing URL paths; `(account)` uses the existing root layout and introduces no second root/document — https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- Next redirect throws; a missing verified session redirects to login outside a catch, while database/configuration failures propagate to the safe error boundary — https://nextjs.org/docs/app/api-reference/functions/redirect
- Next data security recommends server-only authorized DAL reads and minimal DTOs; reusable layouts are not relied on as the sole authorization boundary — https://nextjs.org/docs/app/guides/data-security
- Next router.refresh merges the fresh server tree while preserving unaffected client/browser state; explicit refresh does not navigate or force scroll, and is not a transaction or browser-history erasure guarantee — https://nextjs.org/docs/app/api-reference/functions/use-router
- React useTransition supplies pending state around a non-blocking route refresh; controlled text input updates themselves stay urgent — https://react.dev/reference/react/useTransition
- RHF reset/defaultValues and formState: supply all initial values from SSR, reset only after confirmed save or explicit user choice, and subscribe to isDirty/isSubmitting to pause ordinary refresh — https://react-hook-form.com/docs/useform/reset ; https://react-hook-form.com/docs/useform/formstate
- Better Auth updateUser and changePassword remain the native HTTP operations; currentPassword and revokeOtherSessions=true use the existing validated wrappers, not custom password/session storage — https://www.better-auth.com/docs/concepts/users-accounts
- Radix Dialog/Sheet supports controlled open state, modal focus handling and accessible Title/Description; existing Motion-based Sheet is reused; dismissal does not cancel a dispatched mutation — https://www.radix-ui.com/primitives/docs/components/dialog
- Next revalidatePath in a Server Function can immediately update the affected UI, independently of a client SSE pause; cancelling an upcoming row can unmount its confirmation component — https://nextjs.org/docs/app/api-reference/functions/revalidatePath
- Sonner success/error notifications use the existing root Toaster so a generic confirmed receipt is not lost when the row unmounts; notification is emitted only from the actual result and contains no appointment identity/time — https://sonner.emilkowal.ski/toast
- Request-time connection/cache/metadata and the allowed stable Webpack fallback retain the official Phase 7 contracts; no new package or experimental API is introduced.

### Private reads and page boundaries

Three request-time pages were added: /account, /account/appointments and /account/settings. Each independently enters server/member, whose readMember awaits connection and resolves the real Viewer/session; absence redirects to login, but an unavailable/invalid session read is never fabricated as a guest. The private group layout only composes the existing Header/Footer and noindex defaults. Metadata has generic Persian titles/descriptions, self canonicals and noindex/nofollow; no email/name/appointment is in metadata, JSON-LD or sitemap. Existing robots disallow /account remains unchanged. Robots/noindex are not access controls.

readVisits awaits the same member guard, then the repository rechecks requireSession and filters userId from that session. No caller-supplied user ID or admin override exists in this own-account list. The repository projects only appointment ID, revision, service, status and start/end dates; the boundary validates them and returns ISO dates plus server-computed canCancel. Minute arrays, other clients, provider credentials, sessions/tokens, clinical notes and private message data do not reach the form props. Profile phone/email/verification are from the verified native session, not the public therapist profile.

The existing listAppointments reader now supports scope=upcoming|past|all and page=1..1000 with six records/page. Upcoming requires future starts and pending/confirmed; past includes already-started records or cancelled/completed states; all includes every own state. Sort is nearest first for upcoming and latest first otherwise, with an ID tie-break. The actual stored status is never automatically promoted to completed by elapsed time. Count and page read are separate operations; no collection snapshot or exact simultaneity with the header count is claimed. Invalid/repeated URL fields fall back to the default with a Persian notice. Invalid stored data raises the safe error, not a fake empty list. All three pages use resolved-data explicit Suspense fallbacks rather than a parameter-blind first-page placeholder.

### Mutations, concurrency and privacy

Cancellation captures the displayed ID/revision/time before confirmation, uses RHF/Zod, and calls the existing cancelBooking action. The repository still checks current identity, expected revision, pending/confirmed status and future time in the atomic update. No optimistic success is shown. Pending disables resubmission, but keeps native Escape/close available with explicit non-abort wording; conflict, uncertain and authorization outcomes require a state check instead of an automatic retry. Friendly text distinguishes cancellation from refunds or account deletion. No financial cutoff/fee was invented. A global generic Sonner receipt also reports the result because Server Action revalidation may remove the upcoming card and its Sheet before local state displays. The normal SSE pause does not promise to suppress native RSC revalidation or preserve a row that no longer matches the filter.

ProfileForm and PasswordForm use the existing typed native Better Auth HTTP wrappers, preserving native cookies, password handling and rate limiting. Phone remains optional and validated; neither phone ownership nor email verification is invented. Email editing/recovery is not enabled. Password changes require the current password and request invalidation of other sessions. No token is retained as form state. Profile uses server defaults and a confirmed/explicitly-selected baseline; a known different server profile blocks overwriting until the user explicitly replaces local text. Its own confirmed save is reconciled through a transition refresh. Native profile updates have no custom CAS: concurrent writes not yet observed by the UI remain a last-write/native-service limitation. This is not advertised as multi-tab edit serialization.

Passwords are initially empty, cleared on confirmed success and otherwise retained in component memory. Profile fields do not auto-reset on ordinary incoming props. Settings forms are keyed by user identity, never revision, so a known identity replacement remounts their state. Unknown outcomes block further submission and offer an explicitly labelled full reload/state check; this intentionally discards unsaved inputs only on the user's choice. There is no localStorage draft, autosave, logging of inputs or named DOM input fallback that would put credentials/phone/IDs into a GET URL. All three forms include the confidentiality notice; cancellation also avoids claiming a monetary policy. Existing native sign-out is reused in settings; remote revocation/browser-history erasure is not newly guaranteed.

The existing single EventSource subscriber now delays normal refresh while any data-live-pause=true surface exists (dirty/submitting settings or open cancellation confirmation), in addition to the prior focused-input/busy-form check. Session reset and an observed different user ID from the native HTTP session read force authorization refresh even during editing; security revalidation can discard inputs/redirect to login. Hidden-tab pause, bounded reconnect, single-process bus limits and minimal event payloads remain unchanged. This does not add a second EventSource or a client session provider. Manual refresh is available with a reserved-width button; read failures do not produce fabricated values. Server Action revalidation and explicit user navigation are not covered by the ordinary-SSE editing pause.

### Design, SEO, copy and loading scope

Account pages reuse the approved Aurora, Cotton Candy and Mint Dew surfaces, warm semantic tokens, shared logical RTL spacing and existing server chrome. The overview uses initials rather than an invented personal photo. Server navigation has three links; appointment cards have explicit Persian states, real Tehran times, a fixed minimum card/action space and read/empty/error handling. Settings use the established reserved field-error geometry; Sheet reuses the native focus trap/labels, safe-area padding and Motion-only post-interaction animation. No CSS animation, viewport render read, mount gate or new photo/illustration was introduced. A static source review corrected an initially mistyped elevation token to the existing elevation-soft. No claim of measured contrast, responsive rendering, keyboard focus or CLS is made.

Home/login now describe the available account area and the still-unbuilt booking/contact submission. Login's confirmed state links to the account rather than describing it as unavailable. FAQ/Privacy/Terms distinguish technical cancellation from a financial agreement, describe actual name/phone/password operations, and remove stale claims that public articles/reviews are always design fixtures. Legal documents remain explicitly draft/noindex; no date of effect, retention term, cancellation charge, verified professional fact or approved legal policy was fabricated.

**SEO checklist: not met for complete Phase 8.** These private pages implement noindex/nonpersonal metadata, server authorization, RTL HTML and logical headings; the public booking route and final intake copy/metadata remain pending. **Zero-flicker check: not met for complete Phase 8.** The delivered private area follows the existing resolved-data/no-fake-skeleton strategy and preserves dirty values across ordinary refresh, but booking/message flows are not delivered. DB wait is before the resolved fallback and may delay first display. Error/remote-conflict message lengths and removal of a cancelled card can change document height/focus; universal equal-height transitions or measured zero CLS are not asserted. No browser or live-flow check was performed.

Four client entries bring the complete register above to 36. The page/section/card/navigation files remain server components; typed DTO modules are reused, with no extra barrel, singleton library, package or collection. English code/comments and short kebab/Pascal names are retained; no any/non-null assertion or lint suppression was introduced. No unmet naming rule was identified by source/type/lint review. Existing approved dependency exceptions and the temporary Webpack verification choice are unchanged.

### Phase 8 acceptance ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered coherent Phase 8 partial; no Phase 9 / DB execution | Met |
| 2 | Private route guards, minimal DTOs and noindex metadata | Met by code |
| 3 | Own-account overview and real upcoming appointments | Met by code |
| 4 | Own appointments, URL scopes/pages and stored statuses | Met by code |
| 5 | Explicit cancellation / revisions / truthful outcomes | Met by code; not exercised |
| 6 | Native name/phone form with shared validation | Met by code; not exercised |
| 7 | Native current/new password form and other-session revocation request | Met by code; not exercised |
| 8 | Reused native sign-out and account navigation | Met by code; not exercised |
| 9 | Public short booking flow and login continuation | **Not met; next Phase 8 part** |
| 10 | Live selectable slots / occupied alternatives in booking UI | **Not met; backend exists, UI pending** |
| 11 | Real contact submission and synchronized intake copy | **Not met; contact remains local validation** |
| 12 | Private loading/empty/error/pending states and live-refresh integration | Met by source strategy; no runtime/focus assertion |
| 13 | Naming/depth/client register/docs and official sources | Met; no unmet naming rule identified |
| 14 | Approved type/lint/build/audit verification | Met with temporary Webpack, not default Turbopack |

**Checklist: 11 of 14 met.** The three unmet items are 9, 10 and 11. This ledger covers Phase 8 implementation, not the entire website or launch policy approval. **Deviations needing approval:** no new technical exception. Real intake still requires owner decisions on actual response channel, session/cancellation terms and data retention/deletion; the minimal safe approach is to keep these as launch prerequisites rather than invent a policy or imply legal approval. Nothing was activated on a real host.

### Allowed verification and handoff

Restored the SHA256-verified pinned Node 24.21.0/npm 11.19.0 toolchain; strict npm ci with strict peers/engines and ignored scripts installed 747 packages, audited 748, zero vulnerabilities. Package/lock/config/env example and the two manual scripts are unchanged. Final source verification (including the non-aborting, dismissible cancellation Sheet) passed typecheck, ESLint, stable Webpack build (23/23) with all three private paths request-time, npm audit (zero vulnerabilities) and git diff --check. No type/lint suppression or compiler configuration change was needed. Remaining edits after that run are documentation only; the final staging diff check is separate.

No database connection/ping, manual index/seed/migration, API/action/stream/bus, app server, browser, test suite, visual/accessibility/SEO/performance tool or concurrency scenario was run. No secret/default admin or fictional user/appointment was created. No booking/contact/admin UI submission was secretly activated. Review README, the new private pages/read boundary and small forms; continue within Phase 8 only after the user's next continuation.


## Phase 8 — booking and contact (part 2)

The user's continuation after commit 0ddbd47 authorizes the remaining Phase 8 work only. This section supersedes the part-1 pending statuses above. No Phase 9 UI, database setup, runtime invocation or new dependency is included.

### Official sources and decisions

- Controlled single selection, disabled matchers and explicit selection callbacks reuse the existing Calendar — https://daypicker.dev/docs/selection-modes (official redirect to /selections/selection-modes).
- Explicit Asia/Tehran and stable TZDate inputs align visible/local days with the server's Gregorian storage keys; the documented experimental noonSafe option is deliberately not used — https://daypicker.dev/docs/time-zone (official redirect to /localization/setting-time-zone).
- Controlled month/onMonthChange, startMonth/endMonth and animate=false retain user navigation without render-time browser dates; the event Date is converted to TZDate — https://daypicker.dev/docs/navigation.
- Initially reviewed watch, then replaced it with useWatch after the installed React lint rule warned about incompatible memoization. No suppression, Compiler flag or new dependency was added; defaults and subscription precede event-based setValue — https://react-hook-form.com/docs/useform/watch ; https://react-hook-form.com/docs/usewatch.
- setValue supports these form-held fields without named DOM inputs; date/time/revision are updated explicitly, shouldValidate/shouldDirty are scoped, and incoming props never reset the form — https://react-hook-form.com/docs/useform/setvalue.
- Event-dispatched Server Actions run inside async startTransition; actions remain untrusted entry points with shared server Zod/session/role checks. Native revalidation can update RSC in the action response independently of SSE — https://nextjs.org/docs/app/guides/server-actions ; https://react.dev/reference/react/useTransition (reviewed in part 1).
- Native Location.assign loads a fresh same-origin document after the existing HTTP session-verification wrapper succeeds; allowlisting is server-side, and a verified-state native link remains as a navigation fallback. This is not history erasure — https://developer.mozilla.org/en-US/docs/Web/API/Location/assign.
- Existing Next request-time connection/metadata/sitemap, private noindex, escaped Breadcrumb and repository/unique-index conventions remain unchanged; their official source records are in Phases 5–7 and part 1. No third-party SEO, routing or datetime package was introduced.

### Reader and booking contract

The request-local cached server/booking reader waits for connection, requires the actual settings document, validates its enabled flag and delegates availability to the appointment repository. A missing document or failed read throws into the existing safe boundary, never a fabricated empty calendar or guest. Disabled scheduling is explicitly disabled. Only enabled state, bounded server day range and public Slot values cross into the form; occupied records and identities do not. Settings and capacity are separate reads rather than a transaction; the authoritative submission rechecks schedule revision, future time, session, rate and required unique indexes. Existing in-flight schedule-change and single-process limitations still apply.

Four choices for an already-signed-in user are service/day/time/submit. No timing measurement or four-tap guarantee across login, scrolling, month navigation, stale capacity or errors is claimed. There is no intake history, fee, checkout, automatic confirmation or slot hold. The root subscriber already includes public slot events for public/account/admin scopes. Booking leaves ordinary selection live and pauses only while submitting; selected values/revision and the controlled month survive ordinary RSC refresh. A stale or missing slot disables submission and requires explicit fresh selection. At most three repository conflict offers are displayed and become selectable only if present in the refreshed availability at the same revision. For a locally observed stale choice without a mutation response, the UI suggests up to three later available slots without labelling them nearest. Time expiry without a business event may remain visible until a read; manual refresh is provided and the action always uses server time.

Creation success means an acknowledged pending record, not a confirmed consultation. Inputs remain visible and the submit control is locked after acknowledgment; the user can inspect their private appointments. Unknown/unavailable/transport outcomes retain selection and block retry, with a warning that absence from an immediate read is not proof of no write. This is an in-memory per-form guard, not durable idempotency or a cross-tab exactly-once guarantee. Normal revalidation keeps the form mounted even when the last slot disappears or booking is switched off; its key is only the server viewer ID (guest otherwise), not schedule revision or capacity. Identity replacement/security reset can discard drafts.

### Login continuation and privacy

The server reconstructs next from a fixed relative allowlist: the three private account paths or /booking with only validated service/date/slot. External/protocol-relative/backslash/hash destinations fall back to the account; unknown query fields are stripped, invalid/duplicate public values drop selection, and an out-of-horizon day is cleared by the booking page with an explanation. Schedule revision, IDs, contact details, notes and credentials are never return parameters. Public choices may remain in browser/history/host logs; the Privacy draft now discloses that limitation. After native sign-in/up and session verification, full-document navigation establishes fresh identity-dependent HTML; no reservation is submitted by login. A confirmed local state disables repeated authentication while navigating and supplies a native fallback link. This does not promise clearing bfcache, back-history or browser memory.

### Contact and synchronized copy

The existing MessageForm now invokes sendMessage with the shared schema, optional name, required email and short message. It uses a pending transition plus event-only ref guard, reserved field errors and retained values. Native fields remain unnamed, so pre-hydration/no-JS GET does not serialize personal contents. Acknowledgment alone produces the stored-message receipt; it is not read receipt, email delivery, session booking or response-time promise. Unknown outcome blocks resend and preserves the text. There is no public receipt lookup or durable idempotency endpoint; the copy suggests only verified-contact/manual reconciliation, never reload/resend as proof of failure. The admin-only repository and shared ten-per-minute public budget are unchanged; there is no admin inbox UI yet.

Contact headings/metadata, Home hero/disclosure, FAQ answers, account link, login text, mobile booking bar, reusable BookingPrompt and draft Privacy/Terms now describe actual capabilities. Real intake remains a launch prerequisite requiring owner-approved professional facts, response channel, session/cancellation terms and retention/deletion arrangements. No fees, availability fixtures, legal approval, response guarantee or emergency support were invented. Emergency and confidentiality notices remain visible beside the relevant forms and in the existing footer/error boundary.

### SEO and geometry status

**SEO checklist: met by source for Phase 8**, not tool-validated. Booking has unique nonpersonal Persian metadata, query-free canonical and visible-matching escaped Breadcrumb. A query-bearing booking URL or disabled schedule is noindex; dynamic sitemap includes only the enabled query-free route. Login/account stay noindex and out of sitemap. Metadata and sitemap reads wait for requests; no build-time database call is introduced. Content/capacity read failures do not become indexable invented content. No sample Review/AggregateRating or extra professional claim was added.

**Zero-flicker check: not met as complete acceptance.** Source strategies include server viewer/data defaults, stable useId, explicit Tehran today/month, six calendar weeks, existing no-swap theme/font strategy, reserved status geometry, CSS-first breakpoints, no viewport/mounted branches, no initial animation, and preserving selections across ordinary updates. The booking page uses the same resolved DTO in its explicit inert Suspense fallback, not a separate loading.tsx unable to know searchParams. This trades initial DB wait/TTFB for no wrong-selection skeleton; it does not promise immediate loading UI. Arbitrary message lengths, changing slot counts, action errors, identity replacement and disappearing appointment cards are not proven equal-height/focus-stable. Neither CLS nor visual flicker was measured.

At widths below 360px, the same actual available dates use a two-column Persian button list instead of shrinking seven 44px calendar targets or reading viewport JS. The calendar is CSS-hidden there and appears from 360px; this accounts for classic scrollbar space at 320px. The normal and compact choices share one RHF state. The same submit element is fixed on mobile with safe-area padding, not duplicated or portalled; desktop keeps it in the summary. Calendar animation remains disabled, the existing theme/Motion foundations are unchanged, and no fresh imagery was needed. Responsive/zoom/contrast/keyboard/safe-area behavior still needs permitted manual review; source sizing is not a visual test.

### Final Phase 8 implementation ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered Phase 8 delivery; no Phase 9 or DB execution | Met |
| 2 | Private guards, minimal DTOs and noindex metadata | Met by code |
| 3 | Own overview and upcoming appointments | Met by code |
| 4 | Owner-only appointments, URL scopes/pages/status | Met by code |
| 5 | Explicit cancellation, captured revisions, truthful outcomes | Met by code; not exercised |
| 6 | Native name/phone with shared validation | Met by code; not exercised |
| 7 | Native password verification/change and other-session revocation request | Met by code; not exercised |
| 8 | Reused native sign-out/account navigation | Met by code; not exercised |
| 9 | Public short booking flow and allowlisted login continuation | Met by code; duration not measured |
| 10 | Selectable live slot props, explicit stale choices and conflict offers | Met by code; SSE/concurrency not exercised |
| 11 | Real Contact action wiring and synchronized intake copy | Met by code; no message was sent |
| 12 | Loading/disabled/empty/error/pending/uncertain states and live integration | Met by source strategy; not universal equal-height/focus acceptance |
| 13 | Naming/depth/client register/docs/official sources | Met; 37 entries, no unmet naming rule identified |
| 14 | Permitted TS/lint/build/audit/diff verification | Met using approved temporary Webpack |

**Checklist: 14 of 14 met for implementation.** No implementation-ledger row remains open. Complete zero-flicker acceptance and runtime/visual/timing evidence are not met/claimed by that count; the prescribed final audit phase remains ahead. **Deviations needing approval:** no new technical exception. Launch still needs the previously identified owner decisions; no actual host/intake was activated here. Phase 9 requires the next continuation.

### Verification record

The restored SHA256-verified Node 24.21.0/npm 11.19.0 and strict peer/engine npm ci were reused. Typecheck, lint, DB-independent Webpack build (24/24 static-generation progress; booking is request-time), audit zero and diff whitespace checks passed during implementation. An initial JSX fragment typo and Date/TZDate callback type were fixed; an RHF watch memoization warning was resolved with documented useWatch, and RHF callbacks touching event-only refs are created on submit rather than passed through an unknown function during render. No suppression or config change was used. After all edits, the final permitted verification is recorded below.

No DB connection/ping, seed/index/migration script, action/API/stream/bus invocation, app server, browser, test suite, visual/accessibility/SEO/performance tool or scenario simulation was run. No package/lock/config/env example changes and no new manual script/collection were needed. Existing limited dependency and temporary Webpack approvals are unchanged.


Booking/contact also reuse the already-reviewed root Sonner receipt API (https://sonner.emilkowal.ski/toast, reviewed in part 1): generic acknowledged/uncertain feedback remains visible when the mobile summary is below the viewport or native revalidation removes a local form. No personal values or raw exceptions enter toasts. The local receipt remains authoritative for details; receiving no response still cannot prove no write. Extra mobile footer padding accommodates the fixed action's explanatory line. No new animation or client boundary is introduced.
Final post-edit verification (including root receipts, compact-date layout, mobile footer reserve, verified-login fallback, Hero copy and booking share metadata) completed successfully: `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check`, exit 0, 35.208 seconds; build progress 24/24, audit zero, no lint warnings. Only this documentation record and staging checks followed; no runtime/DB scenario was executed.


## Phase 9 — admin shell and dashboard (part 1)

The user's continuation after Phase 8 commit 3b67e58 authorizes Phase 9. This is a coherent partial: the private admin shell and read-only operational dashboard, not a finished appointments/client management suite. Phase 10 has not started. Unbuilt navigation is explicitly unavailable rather than pointing to fabricated pages or invoking preview-only mutations.

### Official references and implementation decisions

- Next's DAL guidance requires authorization next to data and safe minimal DTOs; layout protection alone is insufficient. readAdmin gates layout/page/reader and each new repository method independently calls requireAdmin — https://nextjs.org/docs/app/guides/data-security.
- Await cookies in the layout; write only inside an authorized Server Action. Native cookie mutation can return fresh RSC without a parallel optimistic shell/localStorage preference — https://nextjs.org/docs/app/api-reference/functions/cookies.
- The existing runAction/shared Zod and event-transition conventions remain those reviewed in Phase 8; the new cookie action validates a boolean and never accepts a role/identity/session override — https://nextjs.org/docs/app/guides/server-actions ; https://react.dev/reference/react/useTransition.
- Mongo aggregation is performed only in the appointments repository, using a bounded date match and daily grouping; no DB operation was executed during this work — https://www.mongodb.com/docs/drivers/node/current/aggregation/.
- $group does not imply ordering, so the daily aggregation sorts explicitly; $sum:1 counts records rather than summing an optional field. Six recent candidates from each of the two collections suffice before merging six recent record versions — https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/ ; https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/.
- shadcn Chart remains a composition over Recharts, with a fixed-height ChartContainer, CSS token colors and optional tooltip. The existing Radix variant is retained; the generic docs redirected to Base UI but no stack migration was performed — https://ui.shadcn.com/docs/components/radix/chart.
- Bar and Tooltip native animations are explicitly disabled; Recharts accessibility/axes/data props are used with deterministic IDs and the existing initialDimension contract — https://recharts.github.io/en-US/api/Bar/ ; the existing Phase 2 Chart source record covers ResponsiveContainer.
- Motion useSpring starts at the supplied server count, .set handles subsequent targets and .jump handles reduced motion; useTransform supplies Persian rounded text. The live numerical state never starts from a fabricated zero — https://motion.dev/docs/react-use-spring ; https://motion.dev/docs/react-use-transform.
- cmdk supports local filtering of supplied items and the documented Ctrl/Cmd+K pattern. Command uses existing primitives inside the existing native Sheet rather than introducing a second dialog abstraction — https://ui.shadcn.com/docs/components/command ; https://github.com/dip/cmdk.
- KeyboardEvent.code represents physical position and is not universally available; the physical KeyK option supports a Persian layout alongside the ordinary key comparison and a clickable button. Composition/repeated/default-prevented events and other modal/menu contexts are not hijacked — https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code.
- Notifications compose Popover from the already-pinned radix-ui aggregate package: controlled root, trigger/content/close, force-mounted portal for Motion exit, collision handling and native focus/dismissal. No wrapper library or dependency was added — https://www.radix-ui.com/primitives/docs/components/popover.
- Existing server-first Sheet/Logo/Photo/theme/account, safe request-time readers, private noindex and single-stream lifecycle conventions remain the previously documented stable APIs. The greeting uses the already-approved local desk/desk-mobile assets in the image manifest; no new generation or external image was needed.

### Security and query semantics

/admin lives in the URL-neutral (admin) group. Missing verified session redirects to login; a non-admin account redirects to its private account page. Authentication/database failures are not converted into guest data, empty previews or zero statistics. Metadata is nonpersonal and noindex/nofollow; the existing robots disallow and public-only sitemap already exclude admin. No schema exposing private records is emitted. Page/layout guards are backed by independently authorized repository methods. There is no default admin, elevated signup, custom crypto, direct database access in a component or third administrative script.

New repository methods remain in the existing appointments/clients/messages collection files. Appointments return counts, six active records from the whole Tehran day, five active records after today, six latest updated records and at most seven day groups. Messages return unread count, four latest unread previews and six latest updated previews. Users provide client-role counts and bounded ID/name projections only. The request-cached reader validates stored projections/counts, resolves current display names and serializes minimal DTOs. Email/phone/body/credential/session/minutes fields do not cross into these dashboard leaves. The existing account menu still receives the logged-in administrator's own Viewer, as required by its earlier contract.

The seven-day request metric uses createdAt from Tehran midnight six days ago through the captured request clock, compared with the preceding seven full days. Current day is incomplete and the UI says so. New-client comparison uses the same windows; total clients counts accounts with the client role, not treated people or clinical outcomes. Today's active count includes pending/confirmed records even when their time has passed; the greeting's pending count is future only. The chart groups all statuses by scheduled session day, not completed sessions or creation day. These metrics intentionally need not match. Missing successful day groups become zero; read/schema errors do not.

Counts, lists, names and messages are separate reads, not a transaction. Current names are not historical names and updatedAt does not identify an actor or establish an audit trail. Recent activity merges current record versions from appointments/messages only, with a displayed limitation; no events collection was invented. Cached reads are request-local, reused by layout and page, not shared between administrators or persisted across requests. Query-plan/performance/index behavior is unmeasured; existing manual index scripts are unchanged.

### Shell, cookie, live and interaction boundaries

The first desktop grid is determined by the server's admin-sidebar cookie. Only collapsed/expanded values influence presentation, never authorization. The cookie is host-only, HttpOnly, SameSite=Lax, path=/admin, Secure on HTTPS, with one year maximum from explicit choice. It may be shared by users of one browser. Unknown values choose expanded. A validated admin-only Server Action changes the cookie; native RSC then changes both the grid and logo variant together. There is no client width guess, localStorage, mounted gate, CSS width animation or optimistic competing state. Unknown result disables another toggle and offers a labelled reload; no cross-tab CAS/persistence guarantee is made. The Privacy draft describes this technical preference without declaring legal compliance.

AdminHeader replaces rather than nests the public Header, so its optional visible LiveRefresh is the same single subscriber. Initial transport state is disconnected; onopen alone marks connected. Display state is associated with server viewer ID/role, preventing an old scope's green state from presenting as the new scope's connection. Hidden-tab pause, errors and reset mark disconnected, and security reset still overrides ordinary interaction pauses. The green dot is not a promise of DB health, fresh data or complete event delivery. Existing single-process/application-mutation limitations are unchanged.

Mobile drawer and Command reuse the native Sheet and server-rendered navigation. Notifications is a native nonmodal Popover, with Persian name, close button and Motion-only post-open presence. Open overlays defer ordinary SSE refresh; forced identity recheck still takes precedence. Viewing previews does not mark messages read, send email or promise a response; no Phase 10 inbox operation was implemented. Portal stacking is below modal sheets, and the admin drawer uses a scoped logical-start placement for the RTL right edge.

Command currently searches static shortcuts only. It sends no form/query/PII to the server, performs no appointment/client search and has no hidden autosave. This is an interaction widget rather than a submitted form; no new intake/search form bypasses the RHF/Zod rule. All destinations are fixed known links/anchors. Record search is explicitly part of the remaining Phase 9 work. Native keyboard, Escape, focus return and resize behavior were not exercised in a browser.

### Presentation, SEO and zero-flicker status

Dashboard is server-composed: date/greeting with the existing art-directed desk photo, Aurora/Peach Glow/Mint Dew/Golden Hour statistics, distinct Cotton Candy/Lagoon/Peach Glow/Mint Dew/Dream panels, real read/empty states, today/upcoming previews, operational chart, messages, latest versions and real quick links. Unbuilt management operations are not represented as working controls. The reused account trigger now has an explicit Persian accessible name so CSS compacting it cannot reduce its accessible name to hidden initials.

LiveNumber is the only numerical-animation leaf; the first server and client number agree, subsequent changes use the approved soft spring and reduced motion jumps immediately. The assistive text reports the actual target, not intermediate numbers. VisitChart is the chart-only leaf, seeded with a deterministic ID, prepared Persian labels and fixed 18rem geometry. Recharts animations are off and an actual-number HTML table is provided. The tooltip's old generic “sample data” fallback now says “statistics”, so a real chart is not falsely labelled sample. Only the already-approved greeting photo is full bleed; it is not eager/priority and is explicitly labelled conceptual.

**SEO checklist: not met for complete Phase 9.** Delivered /admin implements the private metadata/robots/sitemap/authorization strategy, but the appointments and clients pages remain absent. No SEO tool was used and no metadata contains a client's or administrator's name.

**Zero-flicker check: not met for complete acceptance.** Server cookie/identity/time/data, CSS-first widths, reserved chrome/chart/error slots, stable IDs, no first-viewport entrance and reduced-aware updates follow the source strategy. The page uses an inert fallback of the same resolved Dashboard DTO rather than a parent loading.tsx that would flash Dashboard for future admin subroutes. This means DB wait before initial display, not an instant guessed skeleton. Responsive chart measurement, variable record/message lengths, live row changes and overlay focus have not been proven equal-geometry/flicker-free. No CLS, AA contrast, responsive/keyboard or visual measurement is claimed.

Six new authored client entries bring the register to 43; remaining new presentation files are server components. Names are one/two-word kebab/Pascal exports (with Next conventions unchanged), boolean/event/schema names follow the standing conventions, and no new any/non-null assertion, lint suppression, barrel, extra package/config/collection or script was introduced. No unmet naming rule was found in source/type/lint review.

### Phase 9 acceptance ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered Phase 9 partial and role-only guarded server reads | Met by code; no Phase 10/DB execution |
| 2 | Cookie-based desktop collapse with correct initial server geometry | Met by code; persistence not exercised |
| 3 | RTL mobile drawer, breadcrumbs, theme and native account menu | Met by source; focus not exercised |
| 4 | Command palette and Ctrl/Cmd+K for available shortcuts | Met by code |
| 5 | Server-backed appointment/client search in Command | **Not met; next Phase 9 part** |
| 6 | Single live subscriber/visible transport state and actual notifications | Met by code; no stream execution |
| 7 | Greeting/photo, defined real statistics and updated counters/trends | Met by code; no statistical query execution |
| 8 | Today/upcoming/messages/recent versions and real quick links | Met by code; bounded read-only previews |
| 9 | Real-data chart and Persian text-table alternative | Met by source; chart rendering unmeasured |
| 10 | Admin appointments table and URL filter/sort/pagination | **Not met; next Phase 9 part** |
| 11 | Admin week/month calendar views | **Not met; next Phase 9 part** |
| 12 | Detail Sheet, confirm/cancel/reschedule, safe optimistic state and action shortcuts | **Not met; next Phase 9 part** |
| 13 | Clients list and per-client history Sheet | **Not met; next Phase 9 part** |
| 14 | Private noindex and truthful loading/empty/error/pending states | Met by delivered source strategy, not universal geometry acceptance |
| 15 | Naming/depth/client register/official sources/documentation | Met; 43 entries, no unmet naming rule identified |
| 16 | Permitted type/lint/build/audit/diff verification | Met with approved temporary Webpack |

**Checklist: 11 of 16 met.** Unmet rows are 5, 10, 11, 12 and 13; the count is implementation scope, not measured SEO/zero-flicker/clinical or launch acceptance. **Deviations needing approval:** no new technical exception. The previously recorded dependency/build exceptions and owner launch-policy prerequisites remain. Continue within Phase 9 only after the user's next continuation.

### Allowed verification

The workspace snapshot lacked tools, so SHA256-verified Node 24.21.0/npm 11.19.0 was restored from the official distribution and strict-peer/engine npm ci with ignored scripts installed 747 packages/audited 748 with zero vulnerabilities. The known approved ESLint 9 EOL warning remains; the suggested npm upgrade was not installed and no dependency was changed. No install script was authorized or run.

Typecheck and ESLint passed without warnings; a DB-independent approved Webpack build completed with 25/25 static-generation progress and /admin request-time; audit was zero and whitespace checks passed. The final source verification after the static review/copy/layout adjustments is recorded at handoff. Default Turbopack was neither altered nor retried.

No DB connection/ping, manual seed/index/migration script, API/action/SSE/bus invocation, app server, browser, tests, visual/accessibility/SEO/performance tool or scenario execution occurred. There is no fake admin, synthetic dashboard dataset, new secret, live deployment or hidden activation of the future management interfaces.

Final post-review verification: `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` completed with exit 0 in 57.676 seconds, no lint warnings, 25/25 build progress and zero vulnerabilities. This includes the six-per-collection recent-version merge, keyboard/layout refinements, cookie privacy wording and greeting image sizing. Only documentation and staging review followed; no runtime or DB operation was performed.


## Phase 9 — appointments and clients (part 2)

Date: 2026-10-01. The user's continuation after c25551e authorizes the five remaining Phase 9 workstreams, not Phase 10. This section supersedes the part-1 pending rows and search limitations. No dependency/config/collection/script change, app server, database or runtime invocation was authorized or performed.

### Official references and decisions

- Next page/searchParams — https://nextjs.org/docs/app/api-reference/file-conventions/page — await the plain-object Promise; validate string/array inputs, reject duplicate numeric queries, keep filter/sort/page in server-owned URL state.
- Next usePathname — https://nextjs.org/docs/app/api-reference/functions/use-pathname — current-route state belongs to a tiny client link leaf; AdminNav remains a server composition; no rewrites, post-mount fallback or new middleware.
- React useOptimistic — https://react.dev/reference/react/useOptimistic — pure reducer, setter only inside transition; temporary proposed operation is explicitly unconfirmed, never a fabricated persisted row/status.
- React useTransition — https://react.dev/reference/react/useTransition — async action pending state for reads/writes; separate transitions and a synchronous event-only send guard, no fetch/render effects or stale-response override.
- RHF useForm — https://react-hook-form.com/docs/useform — cached defaults/reset only on explicit opening/submission, not server refresh; typed input/output generics for coerced/defaulted Zod queries.
- RHF useWatch — https://react-hook-form.com/docs/usewatch — subscribe to action/date/slot in the small mutation leaf, not a client agenda/calendar tree.
- MongoDB Node cursor ordering/pagination — https://www.mongodb.com/docs/drivers/node/current/crud/query/specify-documents-to-return/ — apply sort/skip/limit/project before iteration, deterministic _id tie-break, explicit caps rather than silently truncated calendars. The guessed /sort/ and /skip/ URLs returned 404 and were replaced by this actual documentation page.
- MDN Intl.DateTimeFormat — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat — explicit fa-IR/persian/Asia/Tehran; Persian month identity and bounded Gregorian-key walking, no additional date library/browser clock or locale default.
- MongoDB $lookup research — https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/ — researched but not used; name-only bounded join and exact appointment-ID search avoid a new aggregation/abstraction.
- Existing recorded Next Actions/data-security, Radix Sheet/cmdk, RHF resolver/Zod and Sonner references remain applicable: independent reader/repository/action authorization, minimal explicit DTOs, native mutation receipts and shared toast without a new notification system.

### Data, interaction and safety contracts

`/admin/appointments` and `/admin/clients` use request-time readers and independently authorized repositories. Appointment projection omits minute arrays and user credentials/contact; the name-only join is now bounded to 4000 IDs for calendars (the dashboard still requests only its own small candidate set). Client projection is restricted to account/contact metadata; search returns only ID/name or an appointment label/ID. DTOs validate stored enum/date/revision/identity fields; errors do not masquerade as empty results. Pages/components never query MongoDB.

Table pages contain eight rows; client list pages eight accounts, each with at most six server-rendered appointment history entries. All use stable ID sort tie-breaks. Pagination is capped at 1000 pages with a visible narrowing instruction rather than claiming unlimited traversal. Name order is database character order, not promised Persian linguistic collation. Contact regex search uses the existing escape function. Counts, page rows, histories and shell statistics are separate reads, not a transaction; sizes/query latency are unmeasured. No synthetic rows or placeholder counts are used.

The default table spans anchor date through +31 days; exact appointment ID removes only that table date constraint. Calendar ID search stays bounded. Calendar weeks start Saturday; a Persian month is found by comparing explicitly formatted year/month identities in a maximum 31-day scan. Date anchors are validated to Gregorian 2000–2100 and visible dates use Persian/Tehran. Calendar reads stop at 4001 as a detection sentinel; count>4000 or sentinel detection produces a dedicated unavailable-calendar message and table link, never a partial calendar with apparently empty days. The table has its own 32-day span; switching from a week/month intentionally changes the span and displays it. The exact-ID table copy explains the ignored date range.

Command has two clear parts: local static shortcuts and submitted authorized record search. Clients match name/email/phone (max six); appointments match only a complete ID (max one), not an undocumented fuzzy/name search. The search expression is sent by native action, not appended to a URL; selecting a result uses a fixed internal destination with encoded ID. Closing/reopening/input changes invalidate superseded responses; no auto-search logs or persisted query store were added. URL filter forms disclose browser history/host log implications. Command's native POST fallback does not promise functional search without JavaScript.

VisitSheet opens only on deliberate interaction and captures a revision snapshot. Refresh cannot replace form edits; changed revision blocks submission. Native changeStatus/moveAppointment retain server transition/time checks, revision CAS and unique-minute indexes. Completion is available only after end time and requires explicit staff confirmation; no automatic clinical outcome inference. Optimistic feedback is a labelled proposed operation/time while the Action is pending, not an acknowledged status update or row removal. Global Sonner receipt still works if native revalidation removes the filtered row first.

Move-time reads independently require admin/current revision/future active appointment and use existing readSlots excluding the appointment's own reservation. The 32-day authorized rolling schedule is fetched only by explicit button, not eagerly for every row. Missing schedule is an error; disabled/no-capacity schedule returns no selectable times. Response tokens discard closed/superseded reads. checkedAt/revision changes invalidate options without resetting the selected date/time; explicit re-read is required. Selected scheduleRevision is taken from the freshly read matching option. Server writes recheck it; reads do not reserve time. The existing non-transactional schedule-revision limitation remains documented, not silently fixed or claimed safe under all races.

Mutation/pending/uncertain state lives outside the Sheet Portal. Closing does not cancel a write or unlock an uncertain outcome. A confirmed success also requires an explicit full read before another operation. This local guard is not durable idempotency across tab closure/navigation. Ctrl/Cmd+Enter is scoped to the actual active form, composition/repeat/Alt guarded, and submits only when eligible; Escape uses the existing native dialog behavior. Only writing pauses ordinary live updates for the whole VisitSheet; input focus follows the existing subscriber rule. Security reset remains higher priority. Read-only ClientSheet has server children and stable account keys; URL history pagination is designed to preserve its open state, not browser-verified.

AdminNav now links the real Phase 9 routes with pathname-correct aria-current; per-page server breadcrumbs identify the page. Dashboard quick links are real; Phase 10 entries remain disabled. No public header/second EventSource, auto-open modal, mount gate, random/render-time client clock or synthetic audit/clinical record was added.

### Source acceptance and remaining verification

**SEO checklist: met for the delivered Phase 9 private-page implementation**, not measured crawl/metadata output. All three admin routes have nonpersonal titles/descriptions/canonicals/OG/Twitter, noindex/nofollow, inherited admin robots exclusion and no sitemap inclusion. Private pages do not invent public Article/Review JSON-LD.

**Zero-flicker check: not met for complete acceptance.** Same-resolved-DTO Suspense fallbacks preserve query/content geometry if used, but do not cover the initial database wait. CSS-first chrome/calendar breakpoints and explicit Sheet interaction avoid mount-gated views; variable rows/calendar height, chart measurement, history reconciliation and focus restoration remain unmeasured. No visual, AA, CLS, Core Vitals, timing or runtime correctness claim is made.

Five added client files bring the complete register to 48. Form/query/model names and one/two-word kebab/Pascal files follow the established structure; no new any, unsafe nonnull, barrel, lint/type suppression or dependency/config/script was introduced. No unmet naming rule identified. ESLint initially rejected passing ref-reading event callbacks directly through RHF's render-time factory calls; submission factories are now invoked inside DOM submit events, and query invalidation runs in an input event, without suppression.

### Completed Phase 9 acceptance ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered Phase 9 and role-only guarded readers/repos/actions | Met by source; no Phase 10/runtime invocation |
| 2 | Cookie-first collapsed desktop sidebar | Met by part 1 source |
| 3 | RTL drawer, breadcrumbs, theme/account | Met by source; focus unmeasured |
| 4 | Command shortcuts and Ctrl/Cmd+K | Met by source |
| 5 | Server-backed client/appointment search | Met; bounded client fields / exact appointment ID |
| 6 | One SSE subscriber, transport indicator and notifications | Met by source; stream not run |
| 7 | Greeting/photo, real stats/trends/counters | Met by part 1 source |
| 8 | Today/upcoming/messages/recent versions/quick links | Met; actual Phase 9 destinations added |
| 9 | Chart and Persian HTML data alternative | Met by part 1 source; rendering unmeasured |
| 10 | Appointments table and URL filter/sort/page | Met by source |
| 11 | Week/month calendar views | Met by source; no availability inference/truncation |
| 12 | Detail Sheet, confirm/cancel/reschedule, optimistic preview/shortcuts | Met by source; existing authoritative CAS preserved |
| 13 | Clients list and history Sheet | Met by source; read-only account/appointment history |
| 14 | Private noindex, truthful loading/empty/error/pending/success | Met by source strategy, not universal geometry acceptance |
| 15 | Naming/depth/register/official sources/documentation | Met; 48 entries, no unmet naming rule identified |
| 16 | Permitted type/lint/build/audit/diff verification | Met; final exit 0, 27/27 build, audit zero |

**Checklist: 16 of 16 met for implementation.** No Phase 9 implementation workstream remains pending; zero-flicker acceptance and owner-side operational/visual/security/interaction checks remain unmet/unperformed, not hidden inside the implementation count. **Deviations needing approval:** no new technical exception; existing dependency/build exceptions, single-process SSE restrictions and owner launch-policy approvals remain. The next phase is Phase 10, only after a fresh continuation.

### Allowed verification

Toolchain was restored once from the official SHA256-verified Node 24.21.0/npm 11.19.0 distribution; strict-peer/engine npm ci with ignored scripts installed 747 packages/audited 748, zero vulnerabilities (23.770 seconds). No version upgrade or package change. Intermediate typecheck/lint passed after event callback corrections; an intermediate approved Webpack build completed 27/27 with both new admin routes request-time. This is not database/application execution. Final comprehensive checks follow below.

No DB connection/ping, seed/index/migration script, action/API/SSE/bus execution, app/dev server, test suite, browser/visual/accessibility/SEO/performance tool or operational scenario was run. Owner-side review instructions are in README; these are future instructions, not test results.

Final post-review verification: `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` completed with **exit 0 in 53.254 seconds**, no lint warnings, **27/27** build progress, all three admin routes request-time, and **zero vulnerabilities**. Only documentation/static inventory/staging review followed. No runtime/DB/browser/test execution occurred.


## Phase 10 — article and course editors (part 1)

Date: 2026-10-01. Authorized by continuation after Phase 9 commit c2e618a. This is a coherent Phase 10 partial: real article/course listing, creation, editing and publication. It does not start Phase 11 or pretend that review moderation, split inbox or settings editors are built.

### Official sources and decisions

- RHF useFieldArray — https://react-hook-form.com/docs/usefieldarray — fixed sections/sources names, complete append values and native field.id keys; article-only leaf, no unsupported flat field arrays or unregister-on-unmount. Reordering is explicit, not drag-library work.
- RHF Controller — https://react-hook-form.com/docs/usecontroller/controller — controlled string-array textareas with stable defaults/ref/blur/change and no duplicate registration; blank line separates paragraphs, one line separates points/outline.
- Zod API, discriminated unions — https://zod.dev/api#discriminated-unions — article/course discriminator selects the existing shared edit schema through safeExtend; repositories/actions retain their independent schemas and authorization. No custom validation library or codec package.
- Next Forms — https://nextjs.org/docs/app/guides/forms — native Server Actions, independently verified auth/role and explicit validation/error/pending receipts. The old guessed /app/getting-started/updating-data URL returned 404; the current Forms guide above was used instead.
- Next Server Actions configuration — https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions — keep default same-origin handling and 1 MB raw request cap; no experimental option, new allowlist or raised body-size setting. A 900,000-byte UTF-8 JSON preflight leaves conservative overhead room but is not a proof of final transport size.
- MDN TextEncoder.encode — https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode — event-time UTF-8 byte count, not character-count assumptions for Persian text; a too-large editor submission is rejected locally before calling the action.
- MongoDB cursor ordering/pagination — https://www.mongodb.com/docs/drivers/node/current/crud/query/specify-documents-to-return/ — projection before cursor iteration, deterministic _id tie-break and bounded skip/limit; use the existing fa collation for title ordering.
- MDN aria-current — https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current — exact list route is page, nested editor is current location; dashboard/home do not become falsely current for every descendant, CSS styles both states.
- Previously recorded Next page/params/metadata/notFound/usePathname/data-security, React transitions and RHF useForm/useWatch references remain in force: await URL inputs, request barrier before DB, nonpersonal private metadata, no props-driven dirty-form reset, no browser clock/render branch.

### Delivered source contracts

Four route patterns are added: /admin/articles, /admin/articles/[id], /admin/courses and /admin/courses/[id]. The literal new ID produces empty form defaults, never a database insert. Existing IDs are validated before lookup; unauthorized users are resolved before missing-record notFound. Private metadata uses generic titles/descriptions and canonical route IDs only, not record text/query/author. Metadata does not read content or confirm record existence. List/card/editor-shell templates stay server components; only actual form/array interactions become new client boundaries.

Each repository owns its collection queries and independently requires admin. List queries use the existing normalized title/description/topic search and escaped regex, status/category filters, fa title collation or updatedAt order, stable _id tie-break and eight-row pagination. There is a visible 1000-page cap. Summary projections omit article/course bodies. The single editor lookup is converted through shared schemas to an explicit serializable DTO; DB types and credentials never reach the client. Counts/page reads/shell summaries are not one transaction. No execution-time query cost or payload timing was measured.

The shared editor discriminates the two existing models rather than introducing a storage model. Article fields cover title, slug, summary, author, category, cover/social image, introduction, sections (key/title/paragraphs/optional points), takeaway and source titles/HTTPS URLs. Course fields cover shared publication fields, audience, outline and boundary. Text remains plain, React-rendered text, not arbitrary HTML/Markdown. Paragraph textarea separators are blank lines; points/outline are line-separated. Editing those fields normalizes that textarea into the corresponding arrays; existing unchanged values are retained. All field limits/required minima still come from the existing shared record schema, even for drafts.

useFieldArray is mounted only for articles and uses its native opaque keys only for reconciliation, not DOM IDs or persistent section slugs. useId provides DOM IDs; the author explicitly enters unique Latin section keys. Sections can be added/removed/reordered; sources can be added/removed. Local changes are persisted only on successful explicit save. There is no new permanent-delete UI, upload endpoint, file host, image generator, external rich editor, autosave, local draft store or generic navigation blocker. Existing server deletion actions are unchanged and not invoked.

Cover/social selection uses the existing local image manifest; preview boxes are reserved at 4:3. All retained images are conceptual/sample, with their original truthful alt. Text-bearing social cards are not retitled; copy warns to choose a matching card or a text-free photo. No new asset or image-processing dependency was added.

A form captures its initial DTO/revision once; the client key is kind/id, not revision. Live RSC cannot overwrite edits. A newer server revision blocks submit. The same existing writeArticle/writeCourse actions enforce full schema, admin, unique slug index and revision CAS, maintain server timestamps and publish/invalidate existing admin/public channels. The shared live subscriber is unchanged and no second stream is added. Ordinary refresh pauses while dirty/pending; security reset retains priority. Mutation receipts use the existing root Sonner even if RSC changes around the form.

Confirmed save locks repeat submission until explicit full reload of the acknowledged ID. Uncertain create links back to the list, not a fresh duplicate insert; revision/access/unknown failures lock, while a specifically reported unique-slug field conflict allows local correction without losing text. Server record-group field errors are displayed in the form status rather than discarded. Synchronous event-only send guards prevent double-submit before render; they are not durable idempotency after navigation/tab closure. Native fallback is POST to the list, not a URL containing edited body, and is explicitly not advertised as working save without JavaScript.

Any other field/array change clears the local isReviewed confirmation. Publishing requires explicit review and an actual author/instructor name through the existing server schema; the checkbox is not a clinical/legal audit record. Saving draft also withdraws a formerly published record; it is not a separate staged revision leaving the old version public. Slug changes have no automatic redirects and the UI says so. Existing publication-date semantics remain unchanged. No sample was published or configured as reviewed here.

### Acceptance, limitations and owner review

**SEO checklist: not met for full Phase 10.** The four delivered patterns are server-rendered private/noindex/nofollow with nonpersonal title/description/canonical/OG/Twitter, inherited admin robots exclusion and no sitemap entry. Review/message/settings routes remain absent. No SEO tool or metadata output inspection was run.

**Zero-flicker check: not met for complete acceptance.** Same-DTO inert Suspense fallbacks do not cover initial DB latency; they avoid a guessed list/editor skeleton. Initial snapshots/IDs/dates and reserved image boxes follow the source strategy. Variable text, array/error heights, focus after reorder and live/navigation reconciliation are unmeasured. No CLS/AA/keyboard/visual/performance/response-time claim is made.

Three client entries bring the complete register to 51. No new dependency, package/config change, collection, script, asset, any/unsafe nonnull/lint suppression or barrel. Short kebab/Pascal files and server/component depth are retained; no unmet naming rule identified. The new publishing schema/reader and shared editor are reused by the two requested content types, not a speculative framework.

Owner-only future review: guest/client/admin and role revocation; invalid IDs and missing records; URL filters, title order, duplicates and Back/Forward; empty/draft/published lifecycle for both kinds; all article arrays/source URLs and course fields; slug collision, two admins with one revision, retained dirty input, response loss after write, unknown-create reconciliation; body limit and line endings; public/admin SSE and hidden-tab/reconnect; both themes, reduced motion, cold cache/throttled refresh, 320–1920+ widths and keyboard/focus. These are review instructions, not executed tests.

### Phase 10 implementation ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered Phase 10 partial; independently guarded data/actions | Met by source; no Phase 11/runtime invocation |
| 2 | Article/course server lists and thumbnails | Met by source |
| 3 | URL search/category/status/sort/pagination | Met by source; bounded queries |
| 4 | Complete article model creation/editing | Met by source; structured text/arrays/sources |
| 5 | Complete course model creation/editing | Met by source; audience/outline/boundary |
| 6 | Unique Latin slug and local cover/social selection | Met by source; no uploads or redirect claim |
| 7 | Saved/dirty/pending/error/uncertain states and review/publication | Met by source; explicit saves, no autosave |
| 8 | Existing live/invalidation path and preserved input/CAS | Met by source; no stream/action execution |
| 9 | Testimonial review/moderation UI | **Not met; remaining Phase 10** |
| 10 | Split message inbox | **Not met; remaining Phase 10** |
| 11 | Professional profile settings editor | **Not met; remaining Phase 10** |
| 12 | Visual hours/schedule editor | **Not met; remaining Phase 10** |
| 13 | Settings social/contact tabs | **Not met; remaining Phase 10** |
| 14 | Delivered private metadata/states/naming/register/docs | Met by source strategy; 51 entries, full SEO/flicker acceptance separate |
| 15 | Permitted type/lint/build/audit/diff verification | Met; final exit 0, 29/29 build, audit zero |

**Checklist: 10 of 15 met for implementation.** Remaining rows 9–13 are explicit, not replaced by disabled buttons or backend-only actions. Full-phase SEO and universal zero-flicker acceptance remain not met. **Deviations needing approval:** no new technical exception; earlier dependency/build exceptions and owner launch-policy prerequisites remain. The next continuation is still Phase 10, not Phase 11.

### Allowed verification

Snapshot toolchain was absent. Restored the official SHA256-verified Node 24.21.0 distribution and bundled npm 11.19.0; npm ci --strict-peer-deps --engine-strict --ignore-scripts installed 747/audited 748 with zero vulnerabilities, exit 0 in 24.640 seconds. Known approved ESLint 9 EOL warning remains; npm upgrade notice was not acted on. No dependency changed or install script ran.

Intermediate TypeScript/ESLint and approved temporary Webpack build passed (29/29 progress; all four new route patterns dynamic). No DB connection/ping, manual seed/index/migration script, API/action/SSE/bus execution, dev/app server, browser, test suite or visual/accessibility/SEO/performance tool was run. Final verification is recorded below after the remaining source review.

Final post-review verification: `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` completed with **exit 0 in 59.984 seconds**, no lint warnings, **29/29** build progress and **zero vulnerabilities**. Both lists and both dynamic editor routes are request-time. Only documentation/static inventory/staging followed; no runtime, database, browser or test operation was performed.


## Phase 10 — moderation, inbox and settings (part 2)

Date: 2026-10-01. Authorized by continuation after e3e74ca. This section completes the five remaining Phase 10 workstreams and supersedes part-1 pending statuses; it does not begin Phase 11. No live host, database, publication, messaging transport or schedule was activated here.

### Official sources and decisions

- Radix Tabs — https://www.radix-ui.com/primitives/docs/components/tabs (both chunks) — controlled RTL/manual activation, forceMount, data-state=inactive CSS hiding before hydration and native keyboard semantics; retain installed Radix shadcn primitives, not a new tabs library.
- RHF useFieldArray — https://react-hook-form.com/docs/usefieldarray — fixed record.hours path, native stable keys, full empty-row values, explicit bounded append/remove; no unregister-on-tab-switch or flat primitive field arrays.
- RHF handleSubmit — https://react-hook-form.com/docs/useform/handlesubmit — separate valid/error callbacks, disable fieldsets rather than losing values, error callback opens the relevant preserved tab; do not focus hidden fields or let async exceptions escape.
- Next Forms — https://nextjs.org/docs/app/guides/forms — native actions and independent server authentication/authorization, shared validation and explicit pending/error responses; action execution is never triggered by GET/selection.
- MDN time input — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time — HH:mm storage with minute step=60, browser/OS-dependent widget appearance; validate empty/format/range again in shared schema, show Persian textual preview rather than promising native widget localization.
- MongoDB atomicity — https://www.mongodb.com/docs/manual/core/write-operations-atomicity/ — preserve expected revision in update filters and increment it; whole settings record is one-document atomic write, not a cross-collection booking transaction or an atomic count/list/detail read.
- Existing recorded RHF Controller/useWatch/useForm, Next page/searchParams/data-security/metadata, Mongo projection/pagination, React transitions and Radix Popover references still apply. No new dependency/API transport, experimental flag, package version or configuration was introduced.

### Data and operations

/admin/messages, /admin/reviews and /admin/settings are request-time guarded pages. Queue readers, selected-record lookups and repositories independently check admin; settings is read through the existing guarded singleton repository. Lists return eight projected ID/name/status/date summaries, with deterministic createdAt/_id sort and visible 1000-page cap. Sender search uses escaped literal regex (message name/email, review display name), not full-body search. Query kind/status compatibility, duplicate numeric input, IDs and enums are shared-Zod validated; invalid URL inputs produce an explicit default-view warning.

Only the explicitly selected record gets a full-text DTO. There is no automatic first selection or implicit read receipt. Selection outside the current page/filter is read independently with a visible explanation; missing selection is distinct from an unselected or empty list, and DB failures do not become empty data. Counts, lists, selected rows and shell summaries are separate reads, not a transaction. No payload/latency/cache behavior was measured. URL query/selection can enter history/host logs and the forms disclose that; message/review text is not placed into query strings.

MessageState wraps the pre-existing changeMessage action, which independently validates role/schema/revision and changes only internal status. Reading/GET/link activation never marks read. Archived is not deleted and read does not mean answered. No SMTP, reply composer, provider, external API or outgoing mail was added; the UI explicitly says replies are not sent. Dashboard/notification links open the actual inbox selection; the Popover closes on explicit link activation without writing read state.

The new moderateTestimonial action uses moderationSchema; the repository requires admin, loads the current revision and merges only status, consent and optional image removal into that server record. It delegates to the pre-existing saveReview schema/CAS path, preserving name, quote and isSample. It cannot turn a seed/sample into genuine testimony or rewrite a client's words. Approval requires consent and non-sample provenance; a sample image cannot accompany an approved real review. Image removal is explicit and cannot be undone by merely unchecking the later null-image form. All current assets are samples, so real published reviews currently use no image. The consent checkbox is not legal evidence or an audit log. No creation/deletion/provenance-changing review UI was added or promised by the requested moderation scope.

Message/review action leaves capture a revision snapshot and do not reset on RSC changes; server-rendered read-only text can refresh independently. New revision blocks submit. Validation is correctable, but revision/access/unknown outcomes lock until explicit full read. Successful receipt also locks duplicate submission; the global existing Sonner is used. The local event send guard is not durable idempotency across navigation/tab closure. A new selection can discard unsubmitted choices; no navigation blocker, local draft storage or resend loop was introduced. Dirty/pending state uses the existing subscriber pause, with security reset retaining priority.

Settings reads the owner-initialized singleton and throws a safe setup error if absent; no upsert, defaults, environment editor or automatic seed. Its DTO contains only the shared settings fields, revision and server updatedAt. Four preserved tabs cover public professional name/title/introduction/license, hours/duration/booking switch, phone/WhatsApp/address and Instagram/Telegram. They are not authentication name/role/password settings. Empty optional Controllers map to null; external URLs require HTTPS without credentials, and saving makes no external request. Validation opens the first affected tab and reports a Persian status instead of trying to focus hidden inputs. Native tab focus behavior is not claimed browser-tested.

HoursEditor uses the existing 0–6 weekday model shown Saturday-first, at most 14 same-day nonoverlapping HH:mm intervals, 15–180-minute duration and existing enabled-schedule refinement. New rows have empty start/end, not guessed office hours. Seven static-width tracks and Persian text reflect current valid field values only; overlapping inputs may be visible but cannot pass the shared schema. These are not availability/capacity or saved-state guarantees. Shorter-than-duration intervals yield no full session; cross-midnight/date exceptions/dragging were not added. Browser time widgets may vary by locale/OS; all authored labels and textual summaries are Persian.

Saving all settings tabs delegates to existing writeSettings/saveSettings as one expected-revision update. Enabling checks the existing required appointment indexes. No existing visit is cancelled/moved by schedule edits or disabling booking. The earlier schedule/appointment cross-document concurrency caveat is unchanged: settings CAS does not make a competing booking validation and insert transactional. Existing content/slots/admin notifications and root revalidation are reused; SSE remains single-process and application-mutation-only. No new event stream, cache layer, index or collection was added.

### Source acceptance and remaining operational evidence

**SEO checklist: met for Phase 10 private-page implementation**, not measured SEO output. All delivered patterns have generic nonpersonal metadata/canonicals/noindex/nofollow and remain under admin robots exclusion/outside the public sitemap. No message, review body, sender contact or search expression enters page metadata. No Review/AggregateRating structured data or fabricated public content was added.

**Zero-flicker check: not met for complete acceptance.** The existing server-first identity/data strategy and same-resolved-DTO Suspense fallbacks are retained; these do not mask initial DB wait. Settings force-mounted inactive panels are CSS-hidden before hydration and preserve values; preview tracks have stable geometry, but detail/validation/hour-row heights, widget locale, focus and live reconciliation are unmeasured. No CLS/AA/performance/visual/responsive/runtime authorization claim is made.

Five client files bring the complete register to 56. No new package, config, asset, collection, index script, barrel, any/unsafe nonnull or lint/type suppression. Server and component depth and short kebab/Pascal names are retained; no unmet naming rule identified. The shared queue schema/reader/filter/frame serves the two requested queues; mutation leaves remain separate because message status and testimony consent have different authority and validation contracts.

Owner-only future review: guest/client/admin and revocation; empty vs failed DB, missing/out-of-filter selection, invalid/duplicate query and Back/Forward; no auto-read, unread count refresh and archive semantics; sample/consent/image approval and withdrawal; two editors on one revision and response loss; nullable settings, all tabs, error-tab selection, interval overlap/adjacency/empty/short duration, enabled/disabled schedule without changing existing visits; schedule revision changes during booking, public/admin SSE and hidden-tab reconnect; keyboard/focus, two themes, reduced motion, cache-disabled throttled hard refresh at 320–1920+. These scenarios were not executed. Phase 11 remains for a fresh continuation.

### Completed Phase 10 implementation ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered Phase 10; independently guarded readers/repos/actions | Met by source; no Phase 11/runtime invocation |
| 2 | Article/course server lists and thumbnails | Met by part 1 source |
| 3 | URL search/category/status/sort/pagination | Met; now includes inbox/moderation queues |
| 4 | Article creation/editing | Met by part 1 source |
| 5 | Course creation/editing | Met by part 1 source |
| 6 | Unique slug and local cover/social selection | Met by part 1 source |
| 7 | Saved/dirty/pending/error/uncertain and publication states | Met; distinct receipts and shared validations |
| 8 | Existing SSE/invalidation, retained input and CAS | Met by source; no stream/action execution |
| 9 | Testimonial review/moderation | Met; constrained decision/consent/image removal |
| 10 | Split message inbox | Met; explicit internal status, not an email sender |
| 11 | Professional profile settings | Met; not authentication profile/role settings |
| 12 | Visual hours/schedule editor | Met; validated bounded weekly rows and bar/text preview |
| 13 | Social/contact settings tabs | Met; preserved RTL tabs and nullable values |
| 14 | Private metadata/states/naming/register/docs | Met; 56 entries, full zero-flicker acceptance separate |
| 15 | Permitted type/lint/build/audit/diff verification | Met; final exit 0, 32/32 build, audit zero |

**Checklist: 15 of 15 met for implementation.** No Phase 10 workstream remains open. Operational security/concurrency/live/browser/accessibility/performance evidence, universal zero-flicker acceptance and owner launch-policy decisions remain unresolved/unmeasured, not counted as complete by this ledger. **Deviations needing approval:** no new technical exception; previous dependency/build exceptions and launch prerequisites remain. Next phase is 11 only after the user's next continuation.

### Allowed verification

The snapshot lacked the restored toolchain/dependencies. Official Node 24.21.0 tarball SHA256 matched the official SHASUMS; bundled npm 11.19.0 strict-peer/engine ci with ignored scripts installed 747/audited 748 with zero vulnerabilities, exit 0 in 19.445 seconds. Approved ESLint 9 EOL warning remains; no npm upgrade, version/config change or install script execution.

Intermediate typecheck/lint/approved Webpack build passed with 32/32 progress and the three new routes request-time. Additional post-build source checks fixed explicit notification-link dismissal and kept moderation validation errors Persian. Final comprehensive allowed verification is recorded below. No database/ping/seed/index/migration, API/action/SSE/bus invocation, app/dev server, test, browser or visual/SEO/accessibility/performance tool was executed.

Final post-review verification: `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` completed with **exit 0 in 44.252 seconds**, no lint warnings, **32/32** build progress and **zero vulnerabilities**. The inbox, moderation and settings routes are request-time. Only documentation/static inventory/staging followed; no database, runtime, browser or test operation was performed.

The earlier full pass took 50.650 seconds. A final source review then made all seven Phase 10 route-pattern descriptions distinct and nonpersonal (including the part-1 list/editor descriptions). The 44.252-second final pass above includes those metadata-copy refinements; no SEO output/browser inspection is implied.

## Phase 11 — final source audit

Date: **2026-10-01**. Authorized by the user's next «ادامه» after Phase 10 commit `0a83067`. This is the final permitted **source audit**, not a launch, browser acceptance, database exercise or universal zero-flicker certification. The current version table, client register and README supersede historical phase descriptions where explicitly noted below.

### Official references refreshed before decisions

- Next security index and September 30 bulletin — https://nextjs.org/blog ; https://nextjs.org/blog/september-2026-security-release — installed `16.3.8` is the listed patched Active LTS release; no experimental feature or security downgrade introduced.
- Next Metadata/OG guide, both chunks — https://nextjs.org/docs/app/getting-started/metadata-and-og-images — server metadata/generateMetadata, promise params, request-local shared reads, inherited static assets and route-specific social metadata. The initially guessed `/docs/app/guides/metadata-and-og-images` returned 404 and was not used as evidence.
- Next data-security guide — https://nextjs.org/docs/app/guides/data-security — DAL/server-only boundaries, independent authorization, minimal client DTOs; RSC placement alone is not authorization.
- Better Auth basic usage — https://better-auth.com/docs/basic-usage — native client getSession returns data/error and native HTTP handles cookie renewal; no custom session token or mounted useSession gate added.
- MDN SSE — https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events — named events, error/close/reconnect lifecycle and same-origin HTTP/1.1 connection constraints; client error alone does not establish whether authentication or transport failed.
- Radix Tabs — https://www.radix-ui.com/primitives/docs/components/tabs — actual orientation prop, data-orientation and active/inactive data-state, preserved content and native keyboard semantics. Wrapper selectors must target attributes Radix really emits.
- Motion upgrade guide and changelog — https://motion.dev/docs/react-upgrade-guide ; https://motion.dev/changelog — retain existing Motion 13 React API and domAnimation/reduced-motion architecture, not new AnimateView/experimental APIs. The fetched changelog lagged the registry; exact stable version selection is from the official npm latest response, not inferred from changelog order.
- Official shadcn release — https://github.com/shadcn-ui/ui/releases/tag/shadcn%404.21.1 — this stable patch moves the CLI registry engine into required `@shadcn/registry`; existing users need no source regeneration. No CLI init/add, new UI feature or optional AI tool was run.
- Node releases — https://nodejs.org/en/about/previous-releases ; https://nodejs.org/dist/v24.21.0/SHASUMS256.txt — retain pinned Node 24.21.0 Active LTS instead of Current 26, verify restored official binary checksum; bundled npm remains 11.19.0, not auto-updated to npm latest.
- typescript-eslint support — https://typescript-eslint.io/users/dependency-versions/ — supported TypeScript range `>=4.8.4 <6.1.0`; current registry TypeScript 7.0.2 is outside the compatible set. Keep exact 6.0.3, with no peer bypass or suppression.
- ESLint support — https://eslint.org/version-support/ — ESLint 9 reached EOL 2026-08-06. The previously approved temporary development-only exception remains necessary because the Next toolchain's react/import/jsx-a11y plugin peers still exclude ESLint 10; zero npm advisories do not restore upstream maintenance.
- WCAG contrast minimum — https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html ; https://www.w3.org/TR/WCAG22/#dfn-relative-luminance — 4.5:1 normal text/3:1 large text, no rounding a failing ratio up. Opaque token arithmetic is not whole-page rendered contrast/AA certification.

### Dependencies and reproducibility

The official npm `/<package>/latest` endpoint was read for **every direct dependency and devDependency**, including engines and peerDependencies, before the update. All unchanged direct packages match that stable registry response except the documented compatible TypeScript/ESLint pins. The two compatible available changes were `motion` 13.4.6 → **13.5.0** (React/ReactDOM ^18 || ^19; no Node engine restriction declared) and `shadcn` 4.21.0 → **4.21.1** (Node >=20.18.1; no peer dependency restriction declared). Exact version sources: https://registry.npmjs.org/motion/13.5.0 ; https://registry.npmjs.org/shadcn/4.21.1 ; https://registry.npmjs.org/typescript/latest ; https://registry.npmjs.org/eslint/latest . Registry latest observed: TypeScript 7.0.2, ESLint 10.11.0.

Installed Next `eslint-config-next@16.3.8` still resolves `typescript-eslint@8.71.0` and its parser/plugin family with TypeScript `<6.1.0`; `eslint-plugin-react@7.37.5`, `eslint-plugin-import@2.32.0` and `eslint-plugin-jsx-a11y@6.10.2` restrict ESLint to 9 or earlier. These are concrete lockfile/package peer constraints, not an unsupported assertion that Next itself rejects every newer compiler/linter. No forced major upgrade, override, legacy-peer-deps or prerelease direct pin was used.

Restoration used the SHA256-verified official Node archive and `npm ci --strict-peer-deps --engine-strict --ignore-scripts`: 747 added, 748 audited, zero advisories; the existing ESLint EOL warning was retained. Updates used `npm install --save-exact --strict-peer-deps --engine-strict --ignore-scripts motion@13.5.0` and the equivalent `--save-dev shadcn@4.21.1`; final audit covers 755 packages. `npm ls --all` exited 0 with no invalid peer tree.

**Required transitive tooling flagged:** the shadcn patch adds `@shadcn/registry@0.1.0` plus nested cn 0.2.6, fast-glob 3.3.3, glob-parent 5.1.2, tsconfig-paths 4.2.0, zod 3.25.76 and type-fest 4.41.0. All declared engines admit Node 24.21.0; strict-engine installation succeeded. This is the official CLI's required engine split, not a new direct application dependency. The only prerelease lock entries remain the previously approved date-fns-jalali 4.1.0-0, gensync 1.0.0-beta.2 and resolve 2.0.0-next.7. No new prerelease, dependency name in package.json, project configuration, collection, index or script was added. Lockfile is committed with exact root pins.

### Source findings corrected

1. **Article social selection was disconnected.** Phase 7 intentionally used visible cover art to avoid automatically applying stale draft-title artwork. Phase 10 subsequently introduced an explicit reviewed social-image selector, but the public projection still omitted that choice. Phase 11 maps the validated social key to its local manifest asset, includes it in the typed public Article DTO and uses it in OG/Twitter. Visible cover and Article JSON-LD remain the visible cover. The publisher must ensure that a static title-bearing image matches the article or select text-free art; there is no generated dynamic title renderer or assumption that arbitrary edits rewrite image pixels. This supersedes the old Phase 7 cover-only social policy.
2. **Rejected SSE reconnect could miss a security refresh while editing.** Previously, client native getSession was only read on a successful open; an expired/revoked hidden-tab session could reconnect with 401/403 and remain behind the ordinary dirty-form pause. Now private open/error paths perform a non-overlapping native session check, compare both user ID and role, and force guarded RSC reauthorization on verified mismatch/absence or first uncertain failure of an outage. Transport errors are not asserted to mean signed out. A persistent unverified outage does not create a new periodic RSC poll; reconnect still waits 30 seconds, while a newly observed identity/role change takes priority. The server also sends reset on unverifiable sessions before closing. No event body gains personal data, no new stream/provider is added, and no UI-local check grants authority; server guards remain decisive. Security refresh can discard edits, as already documented.
3. **Tabs had mismatched native attributes.** The wrapper set a data attribute instead of passing the orientation prop, and class selectors used data-active/data-horizontal/data-vertical rather than Radix's data-state/data-orientation. Corrected the prop and selectors in the existing three files; removed the two independent CSS transition utilities. Existing controlled RTL, preserved settings panels and inactive-panel CSS remain. Keyboard/visual behavior has not been executed.
4. **Obsolete, unreferenced code remained.** Static TypeScript symbol-reference inventory identified eight obsolete repository readers, four unused exported content Actions and the now-unreachable three deletion repository methods; these were removed, along with inboxSchema, unused imports and four unconsumed component files (CardSkeleton, ChartLegendContent, ChartLegend, SheetFooter) and their orphaned CSS. Public create/edit/draft/publish, constrained moderation, inbox status, booking and account operations remain. Permanent deletion had no UI and is not claimed as a delivered feature. No stored record or asset was deleted. After cleanup the same inventory reports no single-reference non-route exported declarations, no explicit any and no non-null assertion. This is a source/reference inventory, not a runtime reachability proof.

### Audit evidence and its limits

- **SEO:** 26 page.tsx patterns have metadata/generateMetadata; public Persian titles/descriptions, self canonicals, fa_IR OG/Twitter and root metadataBase/viewport remain. Private routes have generic noindex metadata, excluded robots paths and no sitemap entries. Request barriers protect published reads and sitemap; only published/reviewed records and genuine consenting reviews become public DTOs. Article updatedAt is not replaced with build/current time. No Review/AggregateRating, fake clinician credential, price or teaching schedule is invented. Static legal drafts remain noindex. Escaped JSON-LD, Person/Service/WebSite/Article/Course/Breadcrumbs, visible author/related links and page-heading conventions were reviewed. No crawler, deployed metadata output, rich-result eligibility or response status was measured.
- **Data/live:** request-local cache only for session/viewer/public reads, independently guarded private readers/repos/actions, minimized list DTOs, expected revision writes, explicit acknowledgment and safe failure shapes were reviewed. No component query or ORM was found. Existing single-process bus, 4/user–64/anonymous–256/process cap, heartbeat, queue cap, abort teardown and minimal topic/id messages remain. Native Better Auth owns credentials/cookies/session renewal and role is not registration input. No DB, action or bus was invoked. Cross-collection schedule/booking races, native profile last-write behavior, local-only uncertain-result locks and lack of durable event replay remain documented limitations, not solved by an audit.
- **Prepaint/loading:** exactly one root suppressHydrationWarning and one authored EventSource constructor; no added mounted guard, first-viewport hidden entrance, random rendering or CSS utility transition. next-themes prepaint, CSS-switched icons, optional preloaded local font, fixed chrome/cookie sidebar, stable Intl/IDs, reserved images and CSS carousel widths remain. Six loading.tsx conventions and 20 explicit Suspense page fallbacks are present. Same-resolved-DTO fallbacks are not immediate DB-wait skeletons or a proof of equal geometry across errors/results. Full zero-flicker and the requested every-route immediate exact skeleton acceptance remain **not met**.
- **Performance/assets:** 271 authored TS/TSX files, 156 component TSX files; 55 client boundaries, no top-level client page. Assets are local, 19 manifest image paths exist with declared desktop/mobile dimensions; total JPEG bytes 3,088,121 is an asset inventory, not transferred page weight. Hero alone requests eager/high priority; other photos use reserved local optimized srcSet/picture geometry and lazy loading. Font licensing and 16 gradient families remain. No hotlinked photo, external font, map or analytics was introduced. The known 2400/1080 upscaling provenance and generated/sample disclosure remain; no claim of real clinician/client photography, native source resolution, measured bundle speed or Core Web Vitals.
- **Accessibility/responsive:** source includes Persian lang/RTL, logical spacing, 16px base text, minimum 44px authored primary controls, labels/legends/error status/confidentiality, crisis disclaimer, keyboard-capable native primitives, CSS breakpoints/safe areas/dvh, reduced-motion and carousel pause controls. Opaque source-color arithmetic reconfirmed light/dark foreground/background 15.528/17.484, muted/muted 5.839/8.595, input/card 3.831/5.003 and focus-ring/card 7.105/9.235. These are unrounded pass comparisons with displayed rounded ratios, not rendered photographic/gradient/hover/focus compositing, nontext contrast of every control, screen-reader/keyboard verification, AA certification or 320–1920+ layout validation. The quick-booking tap/time goal is unmeasured.
- **Names/architecture:** source top level remains exactly app/components/content/fonts/lib/server, components/server depth and short custom kebab filenames match named Pascal exports; shadcn native multiword names retain the documented exception. No barrel or component database import was found; no any, unsafe nonnull, @ts-ignore/@ts-expect-error or ESLint suppression was added/found. Exactly two manual scripts remain; .env.local stays ignored. No unmet naming issue was identified in this source audit, not a proof against all future changes.
- **Owner/deployment:** real identity/license/contact/hours, lawful retention/deletion/response/cancellation terms, real image permission, content consent, secrets, original domain, trusted proxy IP/HTTPS and streaming behavior require the owner. HSTS/frame-ancestors remain conditional documented headers, not a full nonce CSP or deployment audit. No default administrator, seed execution, email sender, direct-DB live watcher, multi-instance broker or automatic launch was introduced.

### Final acceptance ledger

| # | Workstream | Result |
| --- | --- | --- |
| 1 | Ordered final phase; obey prohibited-runtime boundary | Met |
| 2 | SEO/metadata/structured-data source audit and share-selection repair | Met; implementation only |
| 3 | Security/data/live source audit and reconnect reauthorization repair | Met; implementation only |
| 4 | Prepaint/loading source audit and documented geometry limitations | Met as audit, not zero-flicker acceptance |
| 5 | Performance/client/asset source inventory | Met as inventory, not speed measurement |
| 6 | Accessibility/RTL/responsive source audit and Radix repair | Met as source review, not AA/browser acceptance |
| 7 | Naming/depth/dead-code audit and cleanup | Met; no naming issue identified |
| 8 | Official current dependency/security/compatibility audit | Met within prior approved exceptions |
| 9 | Complete client register | Met; 55/55, including two context modules |
| 10 | Current documentation and owner-only launch/review checklist | Met |
| 11 | Allowed type/lint/DB-independent build/audit/diff checks | Met; final evidence below |
| 12 | Universal zero-flicker and immediate exact loading geometry | **Not met**; DB-wait strategy gap and unmeasured state/focus/CLS |
| 13 | Operational DB/Auth/SSE/concurrency correctness | **Not met**; execution expressly prohibited here |
| 14 | Whole-site AA/responsive/performance and booking tap/time target | **Not met**; browser/measurement expressly prohibited here |
| 15 | Deployed SEO/social previews/headers and Search Console | **Not met**; no deployment or external validation |
| 16 | Owner identity/content/policies/real assets/launch approval | **Not met**; owner decisions and supplied real material required |

**Checklist: 11 of 16 met. SEO checklist: met for source implementation, not deployed acceptance. Zero-flicker check: not met for complete acceptance.** All permitted audit work is complete; the five outstanding acceptance rows are not silently recategorized as passed. **Deviations needing approval:** no new technical exception requested; prior EOL/prerelease/Webpack exceptions remain explicit. The minimal safe next step is owner review, not speculative policy, a new phase, automatic deployment or prohibited verification.

### Allowed verification

Intermediate typecheck/lint found six obsolete imports after source deletion; those imports were removed without suppression, and the next typecheck/lint completed cleanly. After all code/dependency changes, `npm ls --all` and `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` completed with exit 0 in the 82.533-second tool run, no lint warnings, 32/32 build progress and zero audit vulnerabilities. All 26 pages, auth/live and sitemap remain request-time in the build summary; the 32 progress count is framework build work, not a claim of 32 public pages. Final documentation/register checks follow below.

No application/dev server, browser, test suite, visual/accessibility/SEO/performance tool, DB connection/ping/index/seed/migration, live route/action/bus invocation or real publication was performed. Static source/AST inspections and image-header/token arithmetic did not import/execute application code. No scratch audit script or additional deliverable file was added to the project.

Final post-documentation/source pass: `npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` completed with **exit 0 in the 56.186-second tool run**, no lint warnings, **32/32** build progress and **zero vulnerabilities**. This includes removal of the last orphaned sample-body media rule. An earlier second pass took 58.568 seconds; the 82.533-second run above was the first complete post-code pass. Only evidence documentation/static register/staging checks followed this final run.

Final static inventory: **55 client files / 55 registered paths, missing [] and stale []**; 33 direct exact stable pins (23 runtime and 10 development), with compatible compiler/linter exceptions documented; 271 source TS/TSX files, 156 component TSX files, 26 page patterns, six loading conventions, 20 explicit page Suspense fallbacks, 19 existing manifest image paths and exactly two unexecuted manual scripts. `.env.local` is ignored. No config, asset, content fixture or script changed in Phase 11.


## Post-Phase 11 — initialization diagnostics and script warning

The user supplied repeated `Site settings have not been initialized` errors from `readProfile()` plus a React client-side script warning. This authorized a targeted source correction, not a database connection, automatic setup or browser exercise. The prior Phase 11 launch limitations remain.

### Official evidence

- MongoDB `$setOnInsert` — https://www.mongodb.com/docs/manual/reference/operator/update/setoninsert/ — applies inserted defaults only when the upsert inserts; it must not overwrite an existing singleton, booking state or published article.
- Next JSON-LD — https://nextjs.org/docs/app/guides/json-ld — retain a native application/ld+json script with `<` escaped; next/script is for JavaScript loading/execution and template is not a substitute for structured data.
- Next server/client boundaries — https://nextjs.org/docs/app/getting-started/server-and-client-components — server-only provides a compile-time client-import guard; Next resolves the marker internally without a new dependency.
- React script reference — https://react.dev/reference/react-dom/components/script — distinguish inline/external script behavior from ordinary page data; do not infer from a generic warning that every script should execute.
- Official pinned React source — https://raw.githubusercontent.com/facebook/react/v19.3.0/packages/react-dom-bindings/src/client/ReactFiberConfigDOM.js — the warning is in client-side script creation and excludes data-block scripts. The same `isScriptDataBlock(newProps)` exclusion was inspected, without executing React, in the installed react-dom and Next-compiled react-dom development bundles.
- Pinned next-themes source — https://github.com/pacocoursey/next-themes/tree/v0.4.6 — its ThemeProvider injects an executable inline script for prepaint theme selection; the installed dist source confirms that script. It is a plausible warning source after client remount/error recovery, not a proven runtime diagnosis without the user's component stack. No vendor patch, mounted guard, script deferral or warning suppression was applied.
- Next env guide — https://nextjs.org/docs/app/guides/environment-variables — root env files, existing process values and .env.development.local can override .env.local; the two native Node manual scripts explicitly read only the supplied env file (plus existing process environment). The same configured DB/host must be used on both paths.

### Correction and limits

`getProfile()` finds the settings collection's `_id: site` singleton. Reaching its null check identifies a missing record on the selected database/host, not a Mongo socket error or a problem with GOOGLE_SITE_VERIFICATION. It does not establish whether seed was never run, partially failed or ran against a different target. Several consumers can propagate the same missing-profile failure; repeated logs are not proof of multiple independent database defects.

The existing constants module now contains a nonsecret actionable setup message. The public profile, booking schedule and admin settings readers use it **only** for a missing record. The message names the two existing manual scripts and environment consistency check. Connection failures still propagate safely; errors are not converted to a guest identity, empty data or sample profile. Production public error UI remains generic; no credentials, URI or raw database exception is exposed by this change.

The existing manual seed now checks its required slug indexes, then creates the missing settings singleton **before** inserting draft article/course content. A later content-write failure therefore does not defer initial settings creation to the end. Every updateOne acknowledgment is checked before announcing success. The selected validated DB name is printed, never the URI or secret, and a distinct message says whether settings were inserted or already existed. Existing records are not validated/repaired by this message and are never overwritten. Failure logs identify the current setup stage without serializing a raw Mongo exception; partial success and safe manual rerun are explicit. Close failure is reported without claiming committed writes were rolled back. Existing booking state is no longer incorrectly described as disabled after a no-op seed; only newly inserted settings are disabled. Initial module/fixture validation still happens before any writes; this is not a transactional migration or automatic startup hook.

The shared JsonLd file gains a server-only import guard and otherwise preserves the official escaped native-script implementation. It does not eliminate all client DOM insertion of server content and is **not claimed to fix the reported executable-script warning**. A normal successful SSR followed by hydration may avoid the error-recovery remount, but that outcome has not been observed here. README asks the owner to hard reload after successful setup and supply the warning's component stack and triggering navigation/refresh if it persists. The current pinned framework's data-block exemption argues against changing the valid JSON-LD based solely on that warning.

README now contains a guarded PowerShell sequence for D:\kiana-khorsand: stop the server; check/backup the intended DB; run setup-indexes, stop on nonzero exit; run seed with the same .env.local, stop on nonzero exit; then start the local app. These are instructions for the user's own machine, not commands executed in the agent workspace. Exactly two scripts remain. No dependency, lockfile, config, collection, index definition, new file or client boundary was added. The 55-entry client register remains current and no naming exception was introduced.

### Allowed verification and remaining work

The cached toolchain was absent after workspace restore. Node 24.21.0 was downloaded from the official distribution and verified against SHASUMS256; `npm ci --strict-peer-deps --engine-strict --ignore-scripts` restored 754 packages/audited 755 with zero advisories. The previously approved ESLint 9 EOL warning remains. No dependency version changed and no install script was run.

`npm run typecheck && npm run lint && npm run build -- --webpack && npm audit && git diff --check` passed with **exit 0 in the 78.413-second tool run**, no lint warnings, **32/32** build progress and **zero vulnerabilities**. Build did not invoke either manual script; request-time DB barriers are unchanged. Only documentation and static inventory/staging followed.

**Checklist: 4 of 6 met for this targeted correction:** (1) diagnosed missing singleton/actionable diagnostics, (2) safer ordered/manual seed with acknowledgment and truthful status, (3) script-source audit and server-only JSON-LD guard, (4) allowed checks/docs/register complete. **Not met:** (5) actual initialization on the owner's machine and (6) browser-confirmed disappearance of the script warning. **SEO checklist: source implementation preserved. Zero-flicker check: not met for complete acceptance. Deviations needing approval: none new.** No DB connection/ping/query/index/seed/migration, app server, handler/action/bus, browser or test was run here. The user's database is not claimed repaired by editing files.
