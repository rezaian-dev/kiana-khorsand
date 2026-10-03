# Official documentation log — updated 2026-10-03

Package versions come from package.json + lockfile and authoritative npm latest endpoints in `evidence/stack-versions.json`. Dependency tree is currently absent. Reading a doc is not a runtime proof; exact type checks before new API use remain required. No package/lockfile change in Phase0.

| Package | locked / latest stable | Official URL read (or queued) | APIs / pattern | Status / changes avoided |
|---|---|---|---|---|
| @better-auth/mongo-adapter | 1.7.7 / 1.7.7 | https://better-auth.com/docs/adapters/mongodb | Preserve native BetterAuth adapter ownership | Version registry verified; adapter official API review still unverified |
| @daypicker/persian | 10.0.2 / 10.0.2 | https://daypicker.dev/localization/persian | Persian calendar/locale/RTL/numerals | 10.0.2 registry; docs read; runtime/time-zone/types pending |
| @hookform/resolvers | 5.9.1 / 5.9.1 | https://react-hook-form.com | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| better-auth | 1.7.7 / 1.7.7 | https://better-auth.com/docs/plugins/phone-number | sendOtp/verify/consumePhoneNumberOTP/requireVerification/recovery, custom verifyOTP | Official docs + exact1.7.7 types/source read; default plaintext OTP storage found; no auth operation run |
| class-variance-authority | 0.7.1 / 0.7.1 | https://github.com/joe-bell/cva#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| cmdk | 1.1.1 / 1.1.1 | https://github.com/pacocoursey/cmdk#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| cn | 0.4.0 / 0.4.0 | https://github.com/shadcn-ui/cn#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| date-fns | 4.4.0 / 4.4.0 | https://registry.npmjs.org/date-fns/latest | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| embla-carousel-autoplay | 8.6.0 / 8.6.0 | https://www.embla-carousel.com | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| embla-carousel-react | 8.6.0 / 8.6.0 | https://www.embla-carousel.com | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| lucide-react | 1.49.0 / 1.51.0 | https://lucide.dev | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| mongodb | 7.7.0 / 7.7.0 | https://www.mongodb.com/docs/drivers/node/current/crud/transactions/; https://www.mongodb.com/docs/drivers/node/current/monitoring-and-logging/change-streams/ | withTransaction/session; watch single iterator OR event mode; close resources | 7.7 API links match; no DB operation; replica/index details/type checks pending |
| motion | 13.5.0 / 14.0.0 | https://github.com/motiondivision/motion#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| next | 16.3.8 / 16.3.8 | https://nextjs.org/docs/app/api-reference/functions/use-router; https://nextjs.org/docs/app/api-reference/components/font | refresh merges unaffected RSC/client state but not server caches; local src/weight/style/swap/preload/variable/fallback/adjustFontFallback | 16.3.8 docs read; other Next APIs and installed type checks pending |
| next-themes | 0.4.6 / 0.4.6 | https://github.com/pacocoursey/next-themes#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| radix-ui | 1.6.7 / 1.6.7 | https://radix-ui.com/primitives | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| react | 19.3.0 / 19.3.0 | https://react.dev/reference/react/useActionState | Action context, serializable state, pending and progressive permalink | React19 docs read; exact19.3 type/API usage audit pending |
| react-day-picker | 10.0.2 / 10.0.2 | https://daypicker.dev/localization/persian | Dedicated @daypicker/persian with faIR and usual DayPicker API | v10 docs read; renamed @daypicker/react versus compatibility package requires exact types audit |
| react-dom | 19.3.0 / 19.3.0 | https://react.dev/reference/react/useActionState | Form Actions integration | React19 docs partial; DOM APIs pending |
| react-hook-form | 7.89.0 / 7.89.0 | https://react-hook-form.com | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| recharts | 3.10.1 / 3.10.1 | https://github.com/recharts/recharts | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| sonner | 2.0.8 / 2.0.8 | https://sonner.emilkowal.ski/ | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| zod | 4.6.5 / 4.6.5 | https://zod.dev/v4/changelog | error parameter, issues, safeParse; avoid deprecated message/flatten/format and removed APIs | 4.6 docs read; full source/schema use audit pending |
| @tailwindcss/postcss | 4.3.3 / 4.3.3 | https://tailwindcss.com/docs/theme | Tailwind v4 CSS pipeline | Theme docs partial; exact plugin config docs pending |
| @types/node | 26.6.3 / 26.6.4 | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| @types/react | 19.3.0 / 19.3.0 | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| @types/react-dom | 19.3.0 / 19.3.0 | https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| eslint | 9.39.5 / 10.12.0 | https://eslint.org | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| eslint-config-next | 16.3.8 / 16.3.8 | https://nextjs.org/docs/app/api-reference/config/eslint | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| shadcn | 4.21.1 / 4.21.1 | https://ui.shadcn.com | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| tailwindcss | 4.3.3 / 4.3.3 | https://tailwindcss.com/docs/theme | CSS-first @import/@theme top-level font/color namespaces | v4.3 docs read; scanning/dark details pending |
| tw-animate-css | 1.4.0 / 1.4.0 | https://github.com/Wombosvideo/tw-animate-css#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| typescript | 6.0.3 / 7.0.2 | https://www.typescriptlang.org/ | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| vitest | not installed / 5.0.3 | https://vitest.dev/guide/ | define config; vitest run; .test/.spec naming | Latest5.0.3 requires Node>=22.12 and Vite>=6.4; not installed/run |
| @playwright/test | not installed / 1.63.0 | https://playwright.dev/docs/test-configuration | defineConfig/testDir/use/projects/webServer/globalSetup/outputDir | Latest1.63.0 registry; official docs read; not installed/run |
| prettier | not installed / 3.9.9 | https://prettier.io | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| axe-core | 4.13.0 / 4.13.0 | https://www.deque.com/axe/ | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| @axe-core/playwright | not installed / 4.13.0 | https://github.com/dequelabs/axe-core-npm#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |
| @lhci/cli | not installed / 0.15.1 | https://github.com/GoogleChrome/lighthouse-ci#readme | API not yet used in this extension | UNVERIFIED API documentation/types; authoritative version metadata only |

## Font / tooling sources

- Official Vazirmatn v33.003 repo/release read: https://github.com/rastikerdar/vazirmatn. Existing binary SHA256 matches official file; variable100900 and Persian/Latin coverage inspected. OFL retained. Browser/OG checks not run.
- Initial daypicker `/docs/persian` was a 404; correct official page redirects to `/localization/persian`. Do not reuse the obsolete URL as evidence.
- Phone exact package inspection: `verification/docs-sources/better-auth-1.7.7/{routes.mjs,types.d.mts,index.d.mts}`. Only extracted text inspected; no package imported/auth endpoint/DB executed.
- fontTools/Brotli used in isolated sandbox inspection only; no app dependency added.

## Not yet verified

Next caching/actions/proxy/image/metadata/stream specifics, Better Auth custom plugin/session/admin APIs, phone single-use race control, Mongo index/replica prerequisites, React useOptimistic/use/ref patterns, Radix form/reset/Sheet semantics, cmdk/RHF/Sonner/motion/embla/lucide APIs, rich-text sanitizer and media storage, CI/Lighthouse exact compatibility remain future due rows. Major upgrades require official release/type review, not memory.
