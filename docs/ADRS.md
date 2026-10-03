# Architecture decision records — Phase 0 proposals

## ADR-001 — Extend, do not rebuild
Owner chose extend existing project. Preserve v5 look/shared components, existing routes, auth records and validated reservations. No destructive reset or silent reseed. New route/data/auth behavior requires explicit migrations, tests and evidence. Last verified v2 commit none.

## ADR-002 — Phase gate bootstrap / future route paradox
The literal prompt requires audit to fail on every absent manifest route, while listing future routes in Phase0 and forbidding next-phase work before verify. The repo also lacks verify. A final-all-routes gate cannot be green before construction. Proposed executable policy: full immutable manifest, gates enforce all items due through current phase and any row claimed done; future todo rows are reported, never called complete. Phase9/final mode is strict and blocks on every unchecked row. Phase0 is currently **blocked** by missing verify; this proposal is documented, not a successful gate. Foundation must bootstrap tooling without using fake runtime proof.

## ADR-003 — No production stubs; explicit development notification adapter
The scope specifically permits a development reminder adapter, while no-stubs forbids production stubs. Resolve narrowly: test/dev adapter only, unreachable in production; no mocked public/user data or no-op success handler. A real provider binding and provider delivery evidence remain launch blockers. No OTP/code/PII console output. Provider secrets never requested in chat.

## ADR-004 — Hashed OTP must not use unsafe default storage
Better Auth1.7.7 phone plugin default writes plaintext verification values, even when verifyOTP override exists. Read exact official tag/types and use documented custom OTP/auth plugin integration; only HMAC/hash challenges with expiry/atomic attempts/consumption may persist. Disable unsafe alternate send/reset routes. Keep email/password compatibility; temporary auth-email identifiers, if needed by documented schema, are opaque internal IDs, never invented contact information in UI.

## ADR-005 — Local/dev DB only
New v2 scope allows only project-owned local/dev/test DB. Phase0 performs none. Future test setup must bind loopback, require a scoped disposable database name and refuse remote/prod URIs before any query/cleanup. No existing env credential guessing. Replica-set transactions for atomic domain/audit/outbox are a planned deployment-dependent choice; not provisioned.

## ADR-006 — Font and reduced motion supersession
Reuse verified local Vazirmatn. v2 requests swap and connector off under reduced motion; implement those later with measured regression checks. Preserve v5 design outside explicit new requirements; zero CLS/performance/AA are measured, not presumed from font options.

## ADR-007 — Legal review and content integrity
No false law-compliance/policy-finality claims. Owner legal review status belongs to admin settings and launch checklist; no public WIP/sample disclaimers or footer clutter. Preserve internal genuine-review/consent integrity guards. Audit distinguishes code identifiers and unrendered integrity messages from public rendered fake/demo language; default denials are explicit, not broad exclusion patterns.

## ADR-008 — Stable upgrades, compatibility first
Official npm latest metadata read2026-10-03. Next/React/BetterAuth/Mongo/Zod/Tailwind pins are current; lucide/motion/TS/ESLint/Node-types have newer stable versions. Read breaking changes and compatible peer ranges before Phase1 upgrades. Do not blindly upgrade major versions to make a checklist green. Each new dev tool must have manifest row, official docs, maintenance/bundle justification and lockfile evidence.

## ADR-009 — Owner selected one permanent Node

Record2026-10-03: VPS / one process. Redis is not justified merely to satisfy a checklist. Existing process-local invalidation is conditional on all active writers/jobs sharing that process. A separate reminder/retention CLI cannot silently write and assume its private in-memory bus reaches the app; use an in-process scheduler or acknowledged durable outbox observed by the application. Multi-instance or externally running writers would require shared fan-out and distributed caps before launch. No infrastructure configured in Phase0.

## Publication snapshot — explicit owner request

Owner requested GitHub push on 2026-10-03. Publish the current v5 changes and v2 planning documents without marking failed gates or unchecked manifest rows as verified. No v2 business feature, provider delivery or DB test is implied by these commits. Authentication credential is used ephemerally, never stored in remote URL or repository files.
