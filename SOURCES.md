# Version table

| Package / tool | Exact version | Official version source |
| --- | --- | --- |
| Node.js (Active LTS) | 24.21.0 | https://nodejs.org/dist/index.json ; https://github.com/nodejs/Release/blob/main/schedule.json |
| npm (bundled with Node) | 11.19.0 | https://nodejs.org/dist/index.json |
| create-next-app (one-off scaffolder) | 16.3.8 | https://registry.npmjs.org/create-next-app/16.3.8 |
| `@better-auth/mongo-adapter` | 1.7.6 | https://registry.npmjs.org/@better-auth/mongo-adapter/1.7.6 |
| `@daypicker/persian` (Phase 2 approved calendar add-on) | 10.0.2 | https://registry.npmjs.org/@daypicker/persian/10.0.2 |
| `@daypicker/react` (transitive compatibility facade) | 10.0.2 | https://registry.npmjs.org/@daypicker/react/10.0.2 |
| `date-fns-jalali` (approved transitive runtime prerelease exception) | 4.1.0-0 | https://registry.npmjs.org/date-fns-jalali/4.1.0-0 |
| `@hookform/resolvers` | 5.9.1 | https://registry.npmjs.org/@hookform/resolvers/5.9.1 |
| `better-auth` | 1.7.6 | https://registry.npmjs.org/better-auth/1.7.6 |
| `class-variance-authority` | 0.7.1 | https://registry.npmjs.org/class-variance-authority/0.7.1 |
| `cmdk` | 1.1.1 | https://registry.npmjs.org/cmdk/1.1.1 |
| `cn` | 0.4.0 | https://registry.npmjs.org/cn/0.4.0 |
| `date-fns` | 4.4.0 | https://registry.npmjs.org/date-fns/4.4.0 |
| `embla-carousel-autoplay` | 8.6.0 | https://registry.npmjs.org/embla-carousel-autoplay/8.6.0 |
| `embla-carousel-react` | 8.6.0 | https://registry.npmjs.org/embla-carousel-react/8.6.0 |
| `lucide-react` | 1.49.0 | https://registry.npmjs.org/lucide-react/1.49.0 |
| `mongodb` | 7.7.0 | https://registry.npmjs.org/mongodb/7.7.0 |
| `motion` | 13.4.6 | https://registry.npmjs.org/motion/13.4.6 |
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
| `shadcn` (development) | 4.21.0 | https://registry.npmjs.org/shadcn/4.21.0 |
| `tailwindcss` (development) | 4.3.3 | https://registry.npmjs.org/tailwindcss/4.3.3 |
| `tw-animate-css` (development) | 1.4.0 | https://registry.npmjs.org/tw-animate-css/1.4.0 |
| `typescript` (development) | 6.0.3 | https://registry.npmjs.org/typescript/6.0.3 |
| Vazirmatn (local variable WOFF2 and outline source) | 33.003 | https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003 |
| `gensync` (transitive development; prerelease) | 1.0.0-beta.2 | https://registry.npmjs.org/gensync/1.0.0-beta.2 |
| `resolve` (transitive development; prerelease) | 2.0.0-next.7 | https://registry.npmjs.org/resolve/2.0.0-next.7 |

## Client Component register

Updated in Phase 2 part 3 (2026-10-01). **31 authored client entry files**, including two context-only modules. This lists directives, not a claim that imported dependency code is server-only.

| File under `src/components` | Client reason and boundary |
| --- | --- |
| `layout/account-links.tsx` | AccountLinks — menu selection/logout callbacks; supplied Viewer only, no auth or data access. |
| `layout/account-menu.tsx` | AccountMenu — controlled Dropdown/Sheet; CSS-first breakpoint choice, no viewport render branch. |
| `layout/mobile-menu.tsx` | MobileMenu — controlled fullscreen Sheet, user-triggered Motion stagger, close events. |
| `layout/nav-links.tsx` | NavLinks — usePathname for the five active-link states; no rewrites or render-time browser reads. |
| `layout/theme-toggle.tsx` | ThemeToggle — useTheme/click; both icons and stable label present in SSR. |
| `layout/theme.tsx` | Theme — next-themes provider and prepaint script; server children stay server-rendered. |
| `motion/lift.tsx` | Lift — reduced-aware 8px hover transform; initial=false, server card children. |
| `motion/motion.tsx` | Motion — strict LazyMotion/domAnimation and system-reduced MotionConfig; passes server children. |
| `motion/scroll-progress.tsx` | ScrollProgress — useScroll; fixed transform-based track, no scroll writes. |
| `sections/showcase/command-demo.tsx` | CommandDemo — local cmdk filtering/keyboard selection, allowlisted hash destinations via useRouter; no global admin search yet. |
| `sections/showcase/message-demo.tsx` | MessageDemo — RHF/Zod client validation and truthful local-only Sonner feedback; no network/storage. |
| `sections/showcase/state-demo.tsx` | StateDemo — selected Radix tab and Motion indicator for empty/error/success specimens. |
| `shared/photo.tsx` | Photo — scoped useAnimate load fade and local error state; getImageProps/native picture, reserved geometry. |
| `shared/slide-rail.tsx` | SlideRail — Embla/autoplay lifecycle, viewport/reduced/focus/hover/visibility gates, pause and dots. |
| `ui/carousel-content.tsx` | CarouselContent — consumes carouselRef/orientation context; CSS-first slide geometry. |
| `ui/carousel-context.ts` | CarouselContext/useCarousel — client context/hook and CarouselApi types, not a component/barrel. |
| `ui/carousel-next.tsx` | CarouselNext — consumes scrollability/context and handles navigation. |
| `ui/carousel-previous.tsx` | CarouselPrevious — consumes scrollability/context and handles navigation. |
| `ui/carousel.tsx` | Carousel — native Embla hook/context and useSyncExternalStore select/reInit subscriptions; stable primitive snapshots and SSR default. |
| `ui/direction.tsx` | DirectionProvider — native shadcn/Radix RTL provider with dir=rtl. |
| `ui/dropdown-menu-content.tsx` | DropdownMenuContent — forceMount portal and controlled AnimatePresence for post-interaction Motion exit/entry. |
| `ui/sheet-content.tsx` | SheetContent — controlled forceMount portal/overlay/content, Motion presence, reduced-motion handling. |
| `ui/sonner.tsx` | Toaster — Sonner leaf with Persian region label, RTL, stable semantic CSS theme; native transitions/animations disabled. |
| `sections/showcase/calendar-demo.tsx` | CalendarDemo — selected date state; module-level fixed TZDate samples, not browser/current time; no persistence or availability claim. |
| `sections/showcase/chart-demo.tsx` | ChartDemo — explicit table/chart tab state and Recharts interaction; first SSR and hydration remain the same complete table, chart mounts only after user selection. |
| `ui/calendar.tsx` | Calendar — native interactive DayPicker with local component/formatter functions, enforced Persian/RTL/Tehran and required deterministic today prop; fixed weeks, native animation disabled. |
| `ui/calendar-day-button.tsx` | CalendarDayButton — native focus modifier and button ref effect with preventScroll; no autoFocus on initial page. |
| `ui/chart-context.ts` | ChartContext/useChart — native client context hook and config type; no component or barrel. |
| `ui/chart-container.tsx` | ChartContainer — useId, native chart context and ResponsiveContainer; fixed-height slot and deterministic initial dimensions. |
| `ui/chart-tooltip-content.tsx` | ChartTooltipContent — native chart context and active payload, safe type narrowing and Intl numeric formatting; no raw vendor payload read. |
| `ui/chart-legend-content.tsx` | ChartLegendContent — native chart context for authored Persian labels/colors. |

Header, Footer, Logo, ContactLinks, SocialIcon, PageHeading, SectionSurface, JsonLd, CardSkeleton, Showcase, FaqDemo, pages, loading, layouts and metadata conventions remain server files. The pure CLI Sheet/Dropdown/Accordion/Tabs/Command/Label wrappers no longer carry redundant client directives: their native Radix/cmdk controls retain vendor client boundaries, and wrappers enter the client graph when imported by an interactive leaf. CalendarChevron, ChartStyle, ChartTooltip and ChartLegend are directive-free native leaves consumed within their client parents; CarouselItem, Button, Input, Textarea, Skeleton and Badge are also directive-free. These are not claims that native widgets execute without JavaScript. Server content is passed through interactive leaves as children rather than imported by a top-level client page.

No auth provider, session lookup, DB module, live subscriber or live handler exists. Historical Phase 0/1/part-1 records below describe their state at that time; this register and the part-3 delivery record supersede those statuses.

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
