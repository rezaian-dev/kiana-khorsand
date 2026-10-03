# Completeness manifest — v2 extension of the existing v5 project

## Handoff — 2026-10-03

- Current phase: Phase 0, read-only gap audit. Product code and DB unchanged.
- Original baseline: `ef426ad`; v5 publication snapshot commit: `7387994`. Last v2 verified commit: **none**. The owner explicitly requested publishing the current work; this is not a passed v2 gate.
- Next three unchecked rows: `P0-DOCS` (remaining exact-version API/type review), `F1-VERIFY` (gate bootstrap), `F1-AUDIT` (due-phase audit). Phase0 remains blocked; do not silently skip to product slices.
- Gate actually run: `npm run verify` → **exit 1, Missing script: verify**. Evidence: `docs/evidence/phase-0-verify.log`.
- Risks: dependency tree absent; full v2 routes/features/auth/statuses absent; no configured project-owned test DB; provider/domain/real content unset; gate bootstrap required. Owner selected single permanent Node, no socials/hours/prices, account-required booking.
- Owner answers: `docs/evidence/owner-decisions.json` and `docs/OWNER_DECISIONS.md`; asked once, do not ask again.
- Exact next commands: read this manifest and `docs/DOCS_LOG.md`; inspect package.json and docs/evidence; do not run seed/index/DB operations in Phase 0.
- Every row requires wired states, responsive RTL/two-theme/keyboard behavior and machine/runtime proof before `done-verified`. Code existence is not proof. Historical v5 checks are supporting evidence only, not v2 completion.

### Exact resumption commands (read-only baseline)

```bash
cd /home/user/kiana-khorsand
git log -10 --oneline
node --version
npm run verify
```

The last command currently fails with missing script. Do not treat this as a passed phase. Read `docs/ADRS.md` ADR-002 before bootstrapping gate tooling; no product slice or verified commit until an honest gate is available. Source hashes are in `docs/evidence/phase-0-plan-audit.json`. Never run the existing draft-content seed; its replacement is an explicit unchecked row.

## Checklist

| id | item | owner phase | status | evidence |
|---|---|---:|---|---|
| P0-MANIFEST | Phase 0 manifest | 0 | in-progress | `docs/MANIFEST.md` — source exists; v2 gate not run |
| P0-DOCS | Phase 0 docs | 0 | in-progress | `docs/DOCS_LOG.md` — source exists; v2 gate not run |
| P0-BRIEF | Phase 0 brief | 0 | in-progress | `docs/PRODUCT_BRIEF.md` — source exists; v2 gate not run |
| P0-ROUTES | Phase 0 routes | 0 | in-progress | `docs/ROUTES.md` — source exists; v2 gate not run |
| P0-DATA | Phase 0 data | 0 | in-progress | `docs/DATA_MODEL.md` — source exists; v2 gate not run |
| P0-STATE | Phase 0 state | 0 | in-progress | `docs/APPOINTMENT_STATES.md` — source exists; v2 gate not run |
| P0-LIVE | Phase 0 live | 0 | in-progress | `docs/REALTIME_COVERAGE.md` — source exists; v2 gate not run |
| P0-CHOICES | Phase 0 choices | 0 | in-progress | `docs/CONTROLS.md` — source exists; v2 gate not run |
| P0-FONT | Phase 0 font | 0 | in-progress | `docs/FONT_PLAN.md` — source exists; v2 gate not run |
| P0-DECISIONS | Phase 0 decisions | 0 | in-progress | `docs/OWNER_DECISIONS.md` — source exists; v2 gate not run |
| P0-GAPS | Phase 0 gaps | 0 | in-progress | `docs/GAP_AUDIT.md` — source exists; v2 gate not run |
| P0-VERSIONS | Phase 0 versions | 0 | in-progress | `docs/evidence/stack-versions.json` — source exists; v2 gate not run |
| P0-ADRS | Phase 0 adrs | 0 | in-progress | `docs/ADRS.md` — source exists; v2 gate not run |
| EX-001 | (account)/account/appointments/page.tsx | 5 | in-progress | `src/app/(account)/account/appointments/page.tsx` — source exists; v2 gate not run |
| EX-002 | (account)/account/page.tsx | 5 | in-progress | `src/app/(account)/account/page.tsx` — source exists; v2 gate not run |
| EX-003 | (account)/account/settings/page.tsx | 5 | in-progress | `src/app/(account)/account/settings/page.tsx` — source exists; v2 gate not run |
| EX-004 | (account)/layout.tsx | 5 | in-progress | `src/app/(account)/layout.tsx` — source exists; v2 gate not run |
| EX-005 | (admin)/admin/appointments/page.tsx | 6 | in-progress | `src/app/(admin)/admin/appointments/page.tsx` — source exists; v2 gate not run |
| EX-006 | (admin)/admin/articles/[id]/page.tsx | 6 | in-progress | `src/app/(admin)/admin/articles/[id]/page.tsx` — source exists; v2 gate not run |
| EX-007 | (admin)/admin/articles/page.tsx | 6 | in-progress | `src/app/(admin)/admin/articles/page.tsx` — source exists; v2 gate not run |
| EX-008 | (admin)/admin/clients/page.tsx | 6 | in-progress | `src/app/(admin)/admin/clients/page.tsx` — source exists; v2 gate not run |
| EX-009 | (admin)/admin/courses/[id]/page.tsx | 6 | in-progress | `src/app/(admin)/admin/courses/[id]/page.tsx` — source exists; v2 gate not run |
| EX-010 | (admin)/admin/courses/page.tsx | 6 | in-progress | `src/app/(admin)/admin/courses/page.tsx` — source exists; v2 gate not run |
| EX-011 | (admin)/admin/messages/page.tsx | 6 | in-progress | `src/app/(admin)/admin/messages/page.tsx` — source exists; v2 gate not run |
| EX-012 | (admin)/admin/page.tsx | 6 | in-progress | `src/app/(admin)/admin/page.tsx` — source exists; v2 gate not run |
| EX-013 | (admin)/admin/reviews/page.tsx | 6 | in-progress | `src/app/(admin)/admin/reviews/page.tsx` — source exists; v2 gate not run |
| EX-014 | (admin)/admin/settings/page.tsx | 6 | in-progress | `src/app/(admin)/admin/settings/page.tsx` — source exists; v2 gate not run |
| EX-015 | (admin)/layout.tsx | 6 | in-progress | `src/app/(admin)/layout.tsx` — source exists; v2 gate not run |
| EX-016 | (auth)/layout.tsx | 4 | in-progress | `src/app/(auth)/layout.tsx` — source exists; v2 gate not run |
| EX-017 | (auth)/login/page.tsx | 4 | in-progress | `src/app/(auth)/login/page.tsx` — source exists; v2 gate not run |
| EX-018 | (public)/about/loading.tsx | 3 | in-progress | `src/app/(public)/about/loading.tsx` — source exists; v2 gate not run |
| EX-019 | (public)/about/page.tsx | 3 | in-progress | `src/app/(public)/about/page.tsx` — source exists; v2 gate not run |
| EX-020 | (public)/articles/[slug]/page.tsx | 3 | in-progress | `src/app/(public)/articles/[slug]/page.tsx` — source exists; v2 gate not run |
| EX-021 | (public)/articles/page.tsx | 3 | in-progress | `src/app/(public)/articles/page.tsx` — source exists; v2 gate not run |
| EX-022 | (public)/booking/page.tsx | 3 | in-progress | `src/app/(public)/booking/page.tsx` — source exists; v2 gate not run |
| EX-023 | (public)/contact/loading.tsx | 3 | in-progress | `src/app/(public)/contact/loading.tsx` — source exists; v2 gate not run |
| EX-024 | (public)/contact/page.tsx | 3 | in-progress | `src/app/(public)/contact/page.tsx` — source exists; v2 gate not run |
| EX-025 | (public)/courses/page.tsx | 3 | in-progress | `src/app/(public)/courses/page.tsx` — source exists; v2 gate not run |
| EX-026 | (public)/faq/loading.tsx | 3 | in-progress | `src/app/(public)/faq/loading.tsx` — source exists; v2 gate not run |
| EX-027 | (public)/faq/page.tsx | 3 | in-progress | `src/app/(public)/faq/page.tsx` — source exists; v2 gate not run |
| EX-028 | (public)/layout.tsx | 3 | in-progress | `src/app/(public)/layout.tsx` — source exists; v2 gate not run |
| EX-029 | (public)/page.tsx | 3 | in-progress | `src/app/(public)/page.tsx` — source exists; v2 gate not run |
| EX-030 | (public)/privacy/loading.tsx | 3 | in-progress | `src/app/(public)/privacy/loading.tsx` — source exists; v2 gate not run |
| EX-031 | (public)/privacy/page.tsx | 3 | in-progress | `src/app/(public)/privacy/page.tsx` — source exists; v2 gate not run |
| EX-032 | (public)/services/loading.tsx | 3 | in-progress | `src/app/(public)/services/loading.tsx` — source exists; v2 gate not run |
| EX-033 | (public)/services/page.tsx | 3 | in-progress | `src/app/(public)/services/page.tsx` — source exists; v2 gate not run |
| EX-034 | (public)/terms/loading.tsx | 3 | in-progress | `src/app/(public)/terms/loading.tsx` — source exists; v2 gate not run |
| EX-035 | (public)/terms/page.tsx | 3 | in-progress | `src/app/(public)/terms/page.tsx` — source exists; v2 gate not run |
| EX-036 | (public)/testimonials/page.tsx | 3 | in-progress | `src/app/(public)/testimonials/page.tsx` — source exists; v2 gate not run |
| EX-037 | error.tsx | 3 | in-progress | `src/app/error.tsx` — source exists; v2 gate not run |
| EX-038 | layout.tsx | 2 | in-progress | `src/app/layout.tsx` — source exists; v2 gate not run |
| EX-039 | not-found.tsx | 3 | in-progress | `src/app/not-found.tsx` — source exists; v2 gate not run |
| ROUTE-040 | /services/[slug] | 3 | todo | Planned `src/app/(public)/services/[slug]/page.tsx` |
| ROUTE-041 | /courses/[slug] | 3 | todo | Planned `src/app/(public)/courses/[slug]/page.tsx` |
| ROUTE-042 | /articles/category/[category] | 3 | todo | Planned `src/app/(public)/articles/category/[category]/page.tsx` |
| ROUTE-043 | /register | 4 | todo | Planned `src/app/(auth)/register/page.tsx` |
| ROUTE-044 | /verify | 4 | todo | Planned `src/app/(auth)/verify/page.tsx` |
| ROUTE-045 | /recovery | 4 | todo | Planned `src/app/(auth)/recovery/page.tsx` |
| ROUTE-046 | /recovery/reset | 4 | todo | Planned `src/app/(auth)/recovery/reset/page.tsx` |
| ROUTE-047 | /logout | 4 | todo | Planned `src/app/(auth)/logout/page.tsx` |
| ROUTE-048 | /account/appointments/[id] | 5 | todo | Planned `src/app/(account)/account/appointments/[id]/page.tsx` |
| ROUTE-049 | /account/preferences | 5 | todo | Planned `src/app/(account)/account/preferences/page.tsx` |
| ROUTE-050 | /account/messages | 5 | todo | Planned `src/app/(account)/account/messages/page.tsx` |
| ROUTE-051 | /account/reviews | 5 | todo | Planned `src/app/(account)/account/reviews/page.tsx` |
| ROUTE-052 | /account/reviews/[id] | 5 | todo | Planned `src/app/(account)/account/reviews/[id]/page.tsx` |
| ROUTE-053 | /account/sessions | 5 | todo | Planned `src/app/(account)/account/sessions/page.tsx` |
| ROUTE-054 | /account/data | 5 | todo | Planned `src/app/(account)/account/data/page.tsx` |
| ROUTE-055 | /admin/queue | 6 | todo | Planned `src/app/(admin)/admin/queue/page.tsx` |
| ROUTE-056 | /admin/agenda | 6 | todo | Planned `src/app/(admin)/admin/agenda/page.tsx` |
| ROUTE-057 | /admin/availability | 6 | todo | Planned `src/app/(admin)/admin/availability/page.tsx` |
| ROUTE-058 | /admin/services | 6 | todo | Planned `src/app/(admin)/admin/services/page.tsx` |
| ROUTE-059 | /admin/services/[id] | 6 | todo | Planned `src/app/(admin)/admin/services/[id]/page.tsx` |
| ROUTE-060 | /admin/faq | 6 | todo | Planned `src/app/(admin)/admin/faq/page.tsx` |
| ROUTE-061 | /admin/faq/[id] | 6 | todo | Planned `src/app/(admin)/admin/faq/[id]/page.tsx` |
| ROUTE-062 | /admin/users | 6 | todo | Planned `src/app/(admin)/admin/users/page.tsx` |
| ROUTE-063 | /admin/users/[id] | 6 | todo | Planned `src/app/(admin)/admin/users/[id]/page.tsx` |
| ROUTE-064 | /admin/audit | 6 | todo | Planned `src/app/(admin)/admin/audit/page.tsx` |
| STATES-EX-001 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (account)/account/appointments/page.tsx | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-002 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (account)/account/page.tsx | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-003 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (account)/account/settings/page.tsx | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-005 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/appointments/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-006 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/articles/[id]/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-007 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/articles/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-008 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/clients/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-009 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/courses/[id]/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-010 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/courses/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-011 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/messages/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-012 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-013 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/reviews/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-014 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (admin)/admin/settings/page.tsx | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-017 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (auth)/login/page.tsx | 4 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-019 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/about/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-020 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/articles/[slug]/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-021 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/articles/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-022 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/booking/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-024 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/contact/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-025 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/courses/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-027 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/faq/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-029 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-031 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/privacy/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-033 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/services/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-035 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/terms/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-EX-036 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for (public)/testimonials/page.tsx | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-040 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /services/[slug] | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-041 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /courses/[slug] | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-042 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /articles/category/[category] | 3 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-043 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /register | 4 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-044 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /verify | 4 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-045 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /recovery | 4 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-046 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /recovery/reset | 4 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-047 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /logout | 4 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-048 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/appointments/[id] | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-049 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/preferences | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-050 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/messages | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-051 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/reviews | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-052 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/reviews/[id] | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-053 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/sessions | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-054 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /account/data | 5 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-055 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/queue | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-056 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/agenda | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-057 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/availability | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-058 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/services | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-059 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/services/[id] | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-060 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/faq | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-061 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/faq/[id] | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-062 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/users | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-063 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/users/[id] | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| STATES-ROUTE-064 | Loading/empty/error/success, 320–1440 RTL/light/dark/keyboard for /admin/audit | 6 | todo | Not implemented / not run; Wired state evidence and a runtime test required; static-page empty state may be documented not applicable |
| BOUNDARY-public-loading | public shared loading boundary | 3 | todo | Planned `src/app/(public)/loading.tsx` |
| BOUNDARY-public-error | public shared error boundary | 3 | todo | Planned `src/app/(public)/error.tsx` |
| BOUNDARY-auth-loading | auth shared loading boundary | 4 | todo | Planned `src/app/(auth)/loading.tsx` |
| BOUNDARY-auth-error | auth shared error boundary | 4 | todo | Planned `src/app/(auth)/error.tsx` |
| BOUNDARY-account-loading | account shared loading boundary | 5 | todo | Planned `src/app/(account)/loading.tsx` |
| BOUNDARY-account-error | account shared error boundary | 5 | todo | Planned `src/app/(account)/error.tsx` |
| BOUNDARY-admin-loading | admin shared loading boundary | 6 | todo | Planned `src/app/(admin)/loading.tsx` |
| BOUNDARY-admin-error | admin shared error boundary | 6 | todo | Planned `src/app/(admin)/error.tsx` |
| GLOBAL-ERROR | Global root error fallback | 3 | todo | Planned `src/app/global-error.tsx` |
| EX-API-1 | src/app/api/auth/[...all]/route.ts | 4 | in-progress | `src/app/api/auth/[...all]/route.ts` — source exists; v2 gate not run |
| EX-API-2 | src/app/api/live/route.ts | 7 | in-progress | `src/app/api/live/route.ts` — source exists; v2 gate not run |
| API-health | health endpoint and authorization | 8 | todo | Planned `src/app/api/health/route.ts` |
| API-media | media endpoint and authorization | 6 | todo | Planned `src/app/api/media/route.ts` |
| API-delivery-webhook | delivery-webhook endpoint and authorization | 7 | todo | Planned `src/app/api/notifications/[provider]/route.ts` |
| API-metrics | metrics endpoint and authorization | 8 | todo | Planned `src/app/api/metrics/route.ts` |
| F1-ENV | Central validated env and tracked template | 1 | in-progress | `src/lib/env.ts` — source exists; v2 gate not run |
| F1-NODE | Node runtime and reproducible pinned install | 1 | in-progress | `package.json` — source exists; v2 gate not run |
| F1-TS | Strict TypeScript and aliases | 1 | in-progress | `tsconfig.json` — source exists; v2 gate not run |
| F1-LINT | ESLint and justified suppressions | 1 | in-progress | `eslint.config.mjs` — source exists; v2 gate not run |
| F1-FORMAT | Prettier check/configuration | 1 | todo | Not implemented / not run |
| F1-VERIFY | Full verification orchestrator | 1 | todo | Planned `scripts/verify.mjs` |
| F1-AUDIT | Manifest/source/link/font/content executable audit | 1 | todo | Planned `scripts/audit.mjs` |
| F1-UNIT | Vitest unit harness | 1 | todo | Planned `vitest.config.ts` |
| F1-E2E | Real-app Playwright harness | 1 | todo | Planned `playwright.config.ts` |
| F1-CI | CI verification gate | 1 | todo | Planned `.github/workflows/verify.yml` |
| F1-LOCALDB | Own disposable local/dev/test DB boundary | 1 | todo | Not implemented / not run |
| F1-FONT | Local variable Vazirmatn/OFL/swap/fallback/Tailwind | 1 | in-progress | `src/fonts/vazirmatn.woff2` — source exists; v2 gate not run |
| F1-DIGITS | Persian digits/Jalali/Tehran; UTC persistence | 1 | in-progress | `src/lib/format.ts` — source exists; v2 gate not run |
| F2-TOKENS | Six-hue light/dark design tokens | 2 | in-progress | `src/app/globals.css` — source exists; v2 gate not run |
| F2-BUTTONS | Button/link/icon hover-focus-active | 2 | in-progress | `src/components/ui/button.tsx` — source exists; v2 gate not run |
| F2-FIELDS | 44px fields/labels/errors/checkbox/radios | 2 | in-progress | `src/components/ui/input.tsx` — source exists; v2 gate not run |
| F2-SELECT | Select form/reset/portal semantics | 2 | in-progress | `src/components/ui/select.tsx` — source exists; v2 gate not run |
| F2-COMBO | Searchable Combobox | 2 | in-progress | `src/components/ui/combobox.tsx` — source exists; v2 gate not run |
| F2-RADIOS | Segmented/radio/date/time chips | 2 | in-progress | `src/components/ui/segmented-control.tsx` — source exists; v2 gate not run |
| F2-DIALOG | Dialog/Sheet keyboard/focus/dismissal | 2 | in-progress | `src/components/ui/sheet.tsx` — source exists; v2 gate not run |
| F2-MENUS | RTL accessible menus | 2 | in-progress | `src/components/ui/dropdown-menu.tsx` — source exists; v2 gate not run |
| F2-TABS | Tabs and animated indicator | 2 | in-progress | `src/components/ui/tabs.tsx` — source exists; v2 gate not run |
| F2-ACCORDION | Accordion semantics/reduced motion | 2 | in-progress | `src/components/ui/accordion.tsx` — source exists; v2 gate not run |
| F2-CALENDAR | Jalali calendar | 2 | in-progress | `src/components/ui/calendar.tsx` — source exists; v2 gate not run |
| F2-COMMAND | Search list semantics | 2 | in-progress | `src/components/ui/command.tsx` — source exists; v2 gate not run |
| F2-TOAST | Sonner accessible notifications | 2 | in-progress | `src/components/ui/sonner.tsx` — source exists; v2 gate not run |
| F2-CARDS | Hand-crafted card/chip/stat/empty/avatar shapes | 2 | in-progress | `src/components/shared/service-card.tsx` — source exists; v2 gate not run |
| F2-MOTION | CSS-first motion, fine pointer, reserved space | 2 | in-progress | `src/components/motion/motion.tsx` — source exists; v2 gate not run |
| F2-HEADER | All-page header/settings-only social/single entry | 2 | in-progress | `src/components/layout/header.tsx` — source exists; v2 gate not run |
| F2-MOBILE | Full-height Sheet navigation | 2 | in-progress | `src/components/layout/mobile-menu.tsx` — source exists; v2 gate not run |
| F2-FOOTER | Three-column minimal footer | 2 | in-progress | `src/components/layout/footer-content.tsx` — source exists; v2 gate not run |
| F2-THEME | Pre-hydration theme stability | 2 | in-progress | `src/components/layout/theme.tsx` — source exists; v2 gate not run |
| F3-HOME | Full Home composition; absent real sections collapse | 3 | in-progress | `src/components/sections/home/home.tsx` — source exists; v2 gate not run |
| F3-SERVICES | Admin-backed list/detail, not static catalog | 3 | in-progress | `src/components/sections/services/details.tsx` — source exists; v2 gate not run |
| F3-COURSES | Approved course list/detail/teacher/outline | 3 | in-progress | `src/components/sections/courses/courses.tsx` — source exists; v2 gate not run |
| F3-ARTICLES | Category/list/detail/reading time/related | 3 | in-progress | `src/components/sections/article/article.tsx` — source exists; v2 gate not run |
| F3-REVIEWS | Genuine consented approved reviews only | 3 | in-progress | `src/server/published.ts` — source exists; v2 gate not run |
| F3-FAQ | Admin-backed FAQ and truthful schema | 3 | in-progress | `src/components/sections/faq/faq.tsx` — source exists; v2 gate not run |
| F3-CONTACT | Minimized contact with anti-abuse | 3 | in-progress | `src/components/sections/contact/message-form.tsx` — source exists; v2 gate not run |
| F3-LEGAL | Settings-backed privacy/terms and admin legal review | 3 | in-progress | `src/components/shared/policy-page.tsx` — source exists; v2 gate not run |
| F3-METADATA | Every public route title/canonical/OG/Twitter | 3 | in-progress | `src/app/layout.tsx` — source exists; v2 gate not run |
| F3-OG | Per-page Persian shaping with local font | 3 | todo | Not implemented / not run |
| F3-SITEMAP | Published-content sitemap | 3 | in-progress | `src/app/sitemap.ts` — source exists; v2 gate not run |
| F3-ROBOTS | Robots indexing policy | 3 | in-progress | `src/app/robots.ts` — source exists; v2 gate not run |
| F3-SCHEMA | Real Article/Person/Breadcrumb/FAQ schema, no ratings | 3 | todo | Not implemented / not run |
| F4-OTP | Hashed expiring single-use phone OTP | 4 | todo | Not implemented / not run |
| F4-PRIMARY | Documented email/password secondary auth | 4 | in-progress | `src/server/auth.ts` — source exists; v2 gate not run |
| F4-SIGNUP | Verified signup/onboarding without invented identity | 4 | todo | Not implemented / not run |
| F4-RECOVERY | Recovery and credential reset | 4 | todo | Not implemented / not run |
| F4-RATE | IP and phone attempt/resend/brute-force limits | 4 | in-progress | `src/server/rate.ts` — source exists; v2 gate not run |
| F4-SESSION | Secure cookies/rotation/revocation/session list | 4 | in-progress | `src/server/session.ts` — source exists; v2 gate not run |
| F4-RBAC | Server role/owner check on every action/API/stream | 4 | in-progress | `src/server/viewer.ts` — source exists; v2 gate not run |
| F4-AVAILABILITY | Hours/exceptions/reservations Tehran/UTC | 4 | in-progress | `src/server/booking.ts` — source exists; v2 gate not run |
| F4-REQUEST | Conflict-safe idempotent booking | 4 | in-progress | `src/server/repos/appointments.ts` — source exists; v2 gate not run |
| F4-PROPOSE | Alternative-time proposal/acceptance | 4 | todo | Not implemented / not run |
| F4-STATUSES | requested/proposed/confirmed/completed/cancelled/declined | 4 | todo | Not implemented / not run |
| F4-RULES | Configurable cancellation/rescheduling, no invented fees | 4 | todo | Not implemented / not run |
| F4-GUEST | Owner-selected account/guest policy | 4 | todo | Not implemented / not run |
| F5-DASH | Real client dashboard | 5 | in-progress | `src/components/sections/account/account.tsx` — source exists; v2 gate not run |
| F5-APPTS | List/detail/cancel/reschedule request | 5 | in-progress | `src/server/actions/appointments.ts` — source exists; v2 gate not run |
| F5-PROFILE | Minimum profile and verified phone update | 5 | in-progress | `src/server/member.ts` — source exists; v2 gate not run |
| F5-PREFS | Persist notification preferences | 5 | todo | Not implemented / not run |
| F5-MESSAGES | Private two-way doctor conversation | 5 | todo | Not implemented / not run |
| F5-REVIEWS | Own submit/edit/withdraw and consent | 5 | todo | Not implemented / not run |
| F5-EXPORT | Own authenticated export, exclude credentials/third parties | 5 | todo | Not implemented / not run |
| F5-DELETE | Authenticated deletion/withdrawal, retention-aware | 5 | todo | Not implemented / not run |
| F6-DASH | Real today/pending/quick actions | 6 | in-progress | `src/server/admin.ts` — source exists; v2 gate not run |
| F6-QUEUE | Confirm/propose/decline queue | 6 | todo | Not implemented / not run |
| F6-AGENDA | Day/week and preserve /admin/appointments | 6 | in-progress | `src/server/agenda.ts` — source exists; v2 gate not run |
| F6-CLIENTS | Minimum directory/history | 6 | in-progress | `src/server/clients.ts` — source exists; v2 gate not run |
| F6-HOURS | Working hours plus exceptions | 6 | in-progress | `src/server/preferences.ts` — source exists; v2 gate not run |
| F6-PUBLISH | Article/course/service/FAQ CRUD/publish | 6 | in-progress | `src/server/publishing.ts` — source exists; v2 gate not run |
| F6-RICHTEXT | Validated sanitized rich-text editing | 6 | todo | Not implemented / not run |
| F6-MEDIA | Authorized upload type/size/storage controls | 6 | todo | Not implemented / not run |
| F6-MODERATE | Consent/immutable testimony moderation | 6 | in-progress | `src/components/sections/queue/review-form.tsx` — source exists; v2 gate not run |
| F6-MESSAGES | Private replies/unread real-time | 6 | todo | Not implemented / not run |
| F6-SETTINGS | Name/role/bio/contact/social/SEO/approvals | 6 | in-progress | `src/server/repos/settings.ts` — source exists; v2 gate not run |
| F6-ROLES | Protected role management/revocation | 6 | todo | Not implemented / not run |
| F6-AUDIT | Append-only redacted audit events | 6 | todo | Not implemented / not run |
| F7-TRANSPORT | Appropriate cross-instance transport | 7 | in-progress | `src/server/live-transport.ts` — source exists; v2 gate not run |
| F7-SSE | Origin/session/role/caps/heartbeat/close | 7 | in-progress | `src/app/api/live/route.ts` — source exists; v2 gate not run |
| F7-WRITERS | Confirmed-only coverage including new jobs | 7 | in-progress | `src/server/changes.ts` — source exists; v2 gate not run |
| F7-CLIENT | 250ms/coalesced/single-flight/renew/backoff | 7 | in-progress | `src/components/shared/live-refresh.tsx` — source exists; v2 gate not run |
| F7-STATE | Dirty/scroll/focus/menu/Sheet/tab/slide protection | 7 | in-progress | `src/lib/use-draft.ts` — source exists; v2 gate not run |
| F7-FRESH | Documented fresh reads/cache invalidation | 7 | in-progress | `src/server/published.ts` — source exists; v2 gate not run |
| F7-ROWS | Stable persisted keys/soft insert-remove | 7 | todo | Not implemented / not run |
| F7-PROVIDER | SMS/email provider interfaces and production binding | 7 | todo | Not implemented / not run |
| F7-DEV | Explicit development-only notification adapter, never production | 7 | todo | Not implemented / not run |
| F7-OUTBOX | Idempotent retry/delivery, no PII logs | 7 | todo | Not implemented / not run |
| F7-JOBS | Preference-aware UTC reminders | 7 | todo | Not implemented / not run |
| F8-CSP | Tested strict CSP/security headers | 8 | in-progress | `next.config.ts` — source exists; v2 gate not run |
| F8-VALIDATE | Server/client Zod checks | 8 | in-progress | `src/lib/records.ts` — source exists; v2 gate not run |
| F8-SANITIZE | Rich-text sanitization tests | 8 | todo | Not implemented / not run |
| F8-SECRETS | No client-bundle/log secrets | 8 | todo | Not implemented / not run |
| F8-ABUSE | Accessible honeypot/rate controls | 8 | in-progress | `src/server/rate.ts` — source exists; v2 gate not run |
| F8-PRIVACY | Minimization/soft delete/retention | 8 | todo | Not implemented / not run |
| F8-INDEXES | Justified unique/TTL/query indexes | 8 | in-progress | `src/server/indexes.ts` — source exists; v2 gate not run |
| F8-METRICS | Private aggregate conversion/completion/CWV/admin-task metrics | 8 | todo | Not implemented / not run |
| F9-ENV | Production env/readiness checklist | 9 | todo | Planned `docs/LAUNCH.md` |
| F9-BACKUPS | Backup/restore and access/retention proposal | 9 | todo | Not implemented / not run |
| F9-MONITOR | Non-PII health/errors/monitoring suggestions | 9 | todo | Not implemented / not run |
| F9-ANALYTICS | Owner analytics choice; no unapproved external runtime | 9 | todo | Not implemented / not run |
| F9-CONTENT | Real owner content/credential/consent/URL supply | 9 | in-progress | `docs/OWNER_DECISIONS.md` — source exists; v2 gate not run |
| F9-README | Truthful setup/scripts/architecture/deployment | 9 | in-progress | `README.md` — source exists; v2 gate not run |
| F9-ADR | Decision records | 9 | in-progress | `docs/ADRS.md` — source exists; v2 gate not run |
| F9-GUIDE | Doctor-facing admin guide | 9 | todo | Planned `docs/ADMIN_GUIDE.md` |
| F9-FINAL | Full manifest versus files/routes/tests completeness audit | 9 | todo | Not implemented / not run |
| EX-ACT-bookAppointment | Existing action bookAppointment | 4 | in-progress | `src/server/actions/appointments.ts` — source exists; v2 gate not run |
| EX-ACT-cancelBooking | Existing action cancelBooking | 4 | in-progress | `src/server/actions/appointments.ts` — source exists; v2 gate not run |
| EX-ACT-moveAppointment | Existing action moveAppointment | 4 | in-progress | `src/server/actions/appointments.ts` — source exists; v2 gate not run |
| EX-ACT-changeStatus | Existing action changeStatus | 4 | in-progress | `src/server/actions/appointments.ts` — source exists; v2 gate not run |
| EX-ACT-getMoveTimes | Existing action getMoveTimes | 4 | in-progress | `src/server/actions/appointments.ts` — source exists; v2 gate not run |
| EX-ACT-writeArticle | Existing action writeArticle | 6 | in-progress | `src/server/actions/content.ts` — source exists; v2 gate not run |
| EX-ACT-writeCourse | Existing action writeCourse | 6 | in-progress | `src/server/actions/content.ts` — source exists; v2 gate not run |
| EX-ACT-writeSettings | Existing action writeSettings | 6 | in-progress | `src/server/actions/content.ts` — source exists; v2 gate not run |
| EX-ACT-moderateTestimonial | Existing action moderateTestimonial | 6 | in-progress | `src/server/actions/content.ts` — source exists; v2 gate not run |
| EX-ACT-sendMessage | Existing action sendMessage | 6 | in-progress | `src/server/actions/messages.ts` — source exists; v2 gate not run |
| EX-ACT-changeMessage | Existing action changeMessage | 6 | in-progress | `src/server/actions/messages.ts` — source exists; v2 gate not run |
| EX-ACT-findRecords | Existing action findRecords | 6 | in-progress | `src/server/actions/search.ts` — source exists; v2 gate not run |
| EX-ACT-saveSidebar | Existing action saveSidebar | 6 | in-progress | `src/server/actions/sidebar.ts` — source exists; v2 gate not run |
| NEW-ACT-sendPhoneCode | Action/service sendPhoneCode | 4 | todo | Not implemented / not run |
| NEW-ACT-verifyPhoneCode | Action/service verifyPhoneCode | 4 | todo | Not implemented / not run |
| NEW-ACT-requestRecovery | Action/service requestRecovery | 4 | todo | Not implemented / not run |
| NEW-ACT-resetCredential | Action/service resetCredential | 4 | todo | Not implemented / not run |
| NEW-ACT-acceptAppointmentProposal | Action/service acceptAppointmentProposal | 5 | todo | Not implemented / not run |
| NEW-ACT-requestReschedule | Action/service requestReschedule | 5 | todo | Not implemented / not run |
| NEW-ACT-saveNotificationPreferences | Action/service saveNotificationPreferences | 5 | todo | Not implemented / not run |
| NEW-ACT-sendPrivateMessage | Action/service sendPrivateMessage | 5 | todo | Not implemented / not run |
| NEW-ACT-submitOwnReview | Action/service submitOwnReview | 5 | todo | Not implemented / not run |
| NEW-ACT-editOwnReview | Action/service editOwnReview | 5 | todo | Not implemented / not run |
| NEW-ACT-withdrawOwnReview | Action/service withdrawOwnReview | 5 | todo | Not implemented / not run |
| NEW-ACT-exportOwnData | Action/service exportOwnData | 5 | todo | Not implemented / not run |
| NEW-ACT-requestOwnDeletion | Action/service requestOwnDeletion | 5 | todo | Not implemented / not run |
| NEW-ACT-proposeAppointment | Action/service proposeAppointment | 6 | todo | Not implemented / not run |
| NEW-ACT-declineAppointment | Action/service declineAppointment | 6 | todo | Not implemented / not run |
| NEW-ACT-replyPrivateMessage | Action/service replyPrivateMessage | 6 | todo | Not implemented / not run |
| NEW-ACT-saveService | Action/service saveService | 6 | todo | Not implemented / not run |
| NEW-ACT-saveFaq | Action/service saveFaq | 6 | todo | Not implemented / not run |
| NEW-ACT-uploadMedia | Action/service uploadMedia | 6 | todo | Not implemented / not run |
| NEW-ACT-changeUserRole | Action/service changeUserRole | 6 | todo | Not implemented / not run |
| NEW-ACT-saveDateException | Action/service saveDateException | 6 | todo | Not implemented / not run |
| NEW-ACT-saveSeoDefaults | Action/service saveSeoDefaults | 6 | todo | Not implemented / not run |
| NEW-ACT-appendAuditEvent | Action/service appendAuditEvent | 6 | todo | Not implemented / not run |
| DB-settings | Collection/schema/index/privacy: settings | 3 | in-progress | `src/server/models.ts` — source exists; v2 gate not run |
| DB-articles | Collection/schema/index/privacy: articles | 3 | in-progress | `src/server/models.ts` — source exists; v2 gate not run |
| DB-courses | Collection/schema/index/privacy: courses | 3 | in-progress | `src/server/models.ts` — source exists; v2 gate not run |
| DB-testimonials | Collection/schema/index/privacy: testimonials | 3 | in-progress | `src/server/models.ts` — source exists; v2 gate not run |
| DB-publicMessages | Collection/schema/index/privacy: publicMessages | 3 | in-progress | `src/server/models.ts` — source exists; v2 gate not run |
| DB-services | Collection/schema/index/privacy: services | 3 | todo | Not implemented / not run |
| DB-faq | Collection/schema/index/privacy: faq | 3 | todo | Not implemented / not run |
| DB-users | Collection/schema/index/privacy: users | 4 | todo | Not implemented / not run |
| DB-sessions | Collection/schema/index/privacy: sessions | 4 | todo | Not implemented / not run |
| DB-accounts | Collection/schema/index/privacy: accounts | 4 | todo | Not implemented / not run |
| DB-verification | Collection/schema/index/privacy: verification | 4 | todo | Not implemented / not run |
| DB-authRateLimit | Collection/schema/index/privacy: authRateLimit | 4 | todo | Not implemented / not run |
| DB-appRateBuckets | Collection/schema/index/privacy: appRateBuckets | 4 | todo | Not implemented / not run |
| DB-appointments | Collection/schema/index/privacy: appointments | 4 | in-progress | `src/server/models.ts` — source exists; v2 gate not run |
| DB-availabilityExceptions | Collection/schema/index/privacy: availabilityExceptions | 4 | todo | Not implemented / not run |
| DB-appointmentChanges | Collection/schema/index/privacy: appointmentChanges | 4 | todo | Not implemented / not run |
| DB-messageThreads | Collection/schema/index/privacy: messageThreads | 5 | todo | Not implemented / not run |
| DB-privateMessages | Collection/schema/index/privacy: privateMessages | 5 | todo | Not implemented / not run |
| DB-notificationPreferences | Collection/schema/index/privacy: notificationPreferences | 5 | todo | Not implemented / not run |
| DB-dataRequests | Collection/schema/index/privacy: dataRequests | 5 | todo | Not implemented / not run |
| DB-auditEvents | Collection/schema/index/privacy: auditEvents | 6 | todo | Not implemented / not run |
| DB-mediaAssets | Collection/schema/index/privacy: mediaAssets | 6 | todo | Not implemented / not run |
| DB-notificationOutbox | Collection/schema/index/privacy: notificationOutbox | 7 | todo | Not implemented / not run |
| DB-aggregateMetrics | Collection/schema/index/privacy: aggregateMetrics | 8 | todo | Not implemented / not run |
| TPL-sms-otp | sms otp template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-recovery | sms recovery template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-request-received | sms request-received template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-proposed | sms proposed template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-confirmed | sms confirmed template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-cancelled | sms cancelled template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-reminder | sms reminder template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-sms-private-message-notice | sms private-message-notice template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-otp | email otp template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-recovery | email recovery template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-request-received | email request-received template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-proposed | email proposed template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-confirmed | email confirmed template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-cancelled | email cancelled template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-reminder | email reminder template, no clinical detail | 7 | todo | Not implemented / not run |
| TPL-email-private-message-notice | email private-message-notice template, no clinical detail | 7 | todo | Not implemented / not run |
| SCRIPT-SEED | Explicit script scripts/seed.mts | 1 | in-progress | `scripts/seed.mts` — source exists; v2 gate not run |
| SCRIPT-INDEX | Explicit script scripts/setup-indexes.mts | 1 | in-progress | `scripts/setup-indexes.mts` — source exists; v2 gate not run |
| SCRIPT-MIGRATE | Explicit script scripts/migrate.mts | 4 | todo | Planned `scripts/migrate.mts` |
| SCRIPT-REMINDERS | Explicit script scripts/reminders.mts | 7 | todo | Planned `scripts/reminders.mts` |
| SCRIPT-RETENTION | Explicit script scripts/retention.mts | 8 | todo | Planned `scripts/retention.mts` |
| SCRIPT-OG | Explicit script scripts/render-og.mjs | 3 | todo | Planned `scripts/render-og.mjs` |
| SCRIPT-LAUNCH | Explicit script scripts/launch-audit.mjs | 9 | todo | Planned `scripts/launch-audit.mjs` |
| TEST-UNIT | schema/status/time/availability/rate/OTP/redaction | 1 | todo | Planned `tests/unit` |
| TEST-REPO | Own local DB repositories and conflict constraints | 4 | todo | Planned `tests/integration` |
| TEST-SMOKE | All due real app routes and roles, 320px, console/hydration | 1 | todo | Planned `tests/e2e/smoke.spec.ts` |
| TEST-AUTH | Phone/signup/recovery/session/RBAC | 4 | todo | Planned `tests/e2e/auth.spec.ts` |
| TEST-BOOK | Conflict/idempotency/propose/accept/decline/cancel | 4 | todo | Planned `tests/e2e/booking.spec.ts` |
| TEST-ACCOUNT | Prefs/messages/reviews/export/delete | 5 | todo | Planned `tests/e2e/account.spec.ts` |
| TEST-ADMIN | Publishing/media/roles/audit/tasks | 6 | todo | Planned `tests/e2e/admin.spec.ts` |
| TEST-A11Y | Axe/keyboard/focus/contrast | 8 | todo | Planned `tests/e2e/accessibility.spec.ts` |
| TEST-FONT | Own-origin/load/style/digits/Persian OG | 1 | todo | Planned `tests/e2e/fonts.spec.ts` |
| TEST-CLS | Load/theme/live/reduced/coarse stability | 8 | todo | Planned `tests/e2e/stability.spec.ts` |
| TEST-PERF | LHCI home+booking mobile LCP/INP/CLS | 8 | todo | Planned `lighthouserc.cjs` |
| TEST-SEC | CSRF/origin/role/ownership/CSP/secrets/rate | 8 | todo | Planned `tests/e2e/security.spec.ts` |
| TEST-LIVE | Actual persisted-writer live/state proof | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| TEST-WORDS | Rendered text/alt/aria/meta/links/native selects/CDN | 8 | todo | Planned `tests/e2e/content-audit.spec.ts` |
| R7-1 | Client booking updates queue/agenda/own list | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-2 | Admin confirm/move updates owner | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-3 | Anonymous content publish/edit/unpublish | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-4 | Settings/name/social all shells | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-5 | Two-way message delivery | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-6 | Revoked role loses access | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-7 | Native hidden tab catches up within 1s | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-8 | Native offline/online recovery | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| R7-9 | Dirty typing/layout/state protection | 7 | todo | Planned `tests/e2e/realtime.spec.ts` |
| GATE-0 | verify + evidence + Handoff + verified slice commit | 0 | todo | Not implemented / not run |
| GATE-1 | verify + evidence + Handoff + verified slice commit | 1 | todo | Not implemented / not run |
| GATE-2 | verify + evidence + Handoff + verified slice commit | 2 | todo | Not implemented / not run |
| GATE-3 | verify + evidence + Handoff + verified slice commit | 3 | todo | Not implemented / not run |
| GATE-4 | verify + evidence + Handoff + verified slice commit | 4 | todo | Not implemented / not run |
| GATE-5 | verify + evidence + Handoff + verified slice commit | 5 | todo | Not implemented / not run |
| GATE-6 | verify + evidence + Handoff + verified slice commit | 6 | todo | Not implemented / not run |
| GATE-7 | verify + evidence + Handoff + verified slice commit | 7 | todo | Not implemented / not run |
| GATE-8 | verify + evidence + Handoff + verified slice commit | 8 | todo | Not implemented / not run |
| GATE-9 | verify + evidence + Handoff + verified slice commit | 9 | todo | Not implemented / not run |
