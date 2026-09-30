# Version table

| Package / tool | Exact version | Official version source |
| --- | --- | --- |
| Node.js (Active LTS) | 24.21.0 | https://nodejs.org/dist/index.json ; https://github.com/nodejs/Release/blob/main/schedule.json |
| npm (bundled with Node) | 11.19.0 | https://nodejs.org/dist/index.json |
| create-next-app (one-off scaffolder) | 16.3.8 | https://registry.npmjs.org/create-next-app/16.3.8 |
| `@better-auth/mongo-adapter` | 1.7.6 | https://registry.npmjs.org/@better-auth/mongo-adapter/1.7.6 |
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

Updated in Phase 2 part 1. Exactly two authored client boundaries:

| File / named component | Client reason and boundary |
| --- | --- |
| `src/components/layout/theme.tsx` / Theme | Minimal next-themes context and prepaint script; server-rendered children remain server children. No mount gate or theme-based render branch. |
| `src/components/layout/theme-toggle.tsx` / ThemeToggle | useTheme and click event; renders both CSS-switched icons with a stable accessible label. Reads document only in the click handler. |

`src/components/ui/button.tsx` / Button has no client directive: the same shadcn primitive is server-rendered for download links and enters the client graph only beneath ThemeToggle. Native buttonVariants/Slot names are preserved. Vendor next-themes ThemeProvider, Radix Slot (for asChild), lucide icons and Next Link are dependency components, not additional authored boundaries. Logo, Review, every page/loading/layout and all metadata conventions remain server files. There is no auth provider, form, browser effect, Motion provider or live subscriber yet.

Historical Phase 0/1 records below describe their state at that time; Phase 2 changes and accepted Phase 0 exceptions supersede the earlier pending statements.

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
