# Read-only gap audit — v2 extension — 2026-10-03

## Baseline and safety

Repo `ef426ad`, existing 83-path v5 worktree preserved. Phase 0 touched only docs/evidence and ignored inspection tools. No application code, models, auth, DB, seed, indexes, dependencies or lockfile changed. Last ten commits inspected. No v2 verified commit exists.

## Actual gate

`npm run verify` was executed and returned **exit 1: Missing script: verify** (`evidence/phase-0-verify.log`). The dependency tree is absent in this fresh workspace. Existing scripts are only dev/build/start/lint/typecheck. Audit, unit, smoke, format, verify and CI are not implemented. Historical v5 fixture evidence does not count as v2 product verification. Phase 0 gate has not passed; no slice commit or later phase started.

## Reuse, do not rebuild

The app already has App Router groups, Persian RTL shell/themes, local variable font/OFL, public layouts, email/password Better Auth, role/owner guarded server actions, appointment conflict-minute constraints, article/course publishing, moderation, contact inbox, settings/hours, admin dashboard/agenda/clients and scoped SSE. Shared choice controls and v5 design are reusable. These remain `in-progress` rather than done-verified until the full v2 gates prove them.

## Material gaps

| Area | Source finding | Required vertical slice |
|---|---|---|
| Public routes | Service details are anchors; no course-detail/category route | Preserve old links, add admin-backed detail/category routes |
| Content | Services/FAQ static; local image-choice catalog; empty public sections remain visible | Admin-backed services/FAQ/media; empty real-content sections collapse |
| Auth | Only email/password; optional unverified phone | Hashed phone OTP, verified updates, recovery, sessions, brute-force protection |
| Appointments | pending/confirmed/cancelled/completed only | requested/proposed/declined migration, proposals/acceptance/reschedule-request rules |
| Account | Dashboard, own appointment list, profile/password | Detail, prefs, private messages, own review lifecycle, session controls, export/delete |
| Admin | Agenda/clients/article/course/moderation/contact/settings | Queue, exceptions, services/FAQ, rich text/uploads, private replies, roles, audit log |
| Reminders | No provider/outbox/scheduler/templates | Provider interface, real chosen binding, explicit dev-only delivery adapter, retries/preferences |
| Real-time | Local bus seam; caps per process; core fixtures but not all persisted scenarios | Deployment-appropriate cross-instance fan-out, distributed limits where needed, real nine-scenario E2E |
| Security | Existing guards/rates/headers, no strict CSP or comprehensive tests | CSP, sanitization, OTP atomicity, privacy/export/delete, secret/log/ownership tests |
| Font | Local loader uses optional, not v2 swap | Switch in foundation only; repeat slow-font/layout/own-origin checks |
| Toolchain | Five pins behind npm latest: lucide, motion, TS, ESLint, Node types | Compatibility/read-changelog audit before stable upgrades; no blind major bump |
| Seed | Current seed inserts hard-coded draft articles/courses; does not create env admin | Structure + env admin only, no demo content; never run the old seed for this extension |
| Launch docs | Historical README claims files/tests not present; .env.example absent | Truthful setup/env/ADRs/admin guide/launch pack |

## Documentation-driven auth finding

The official Better Auth 1.7.7 phone plugin package source writes `value: code + ':0'` into verification. Its documented `verifyOTP` override does **not** by itself prevent this plain-text send-path write. Therefore enabling the plugin default and claiming hashed OTP would be a defect. Plan a documented custom OTP/plugin integration with hashed atomic challenge storage and blocked unsafe default endpoints; verify exact types before coding. Evidence: `verification/docs-sources/better-auth-1.7.7/routes.mjs:149–180`, `types.d.mts` and official phone-number docs. No auth/DB operation was run.

## Unverified / blockers

All v2 business/DB/auth/provider/runtime/performance/AT checks remain unrun. Production SMS/email and deployment require owner choice. Full manifest contains future-phase routes; literal all-route audit before construction would deadlock the gates. The due-phase/final-strict interpretation is documented in ADRs, not silently reported as complete.
