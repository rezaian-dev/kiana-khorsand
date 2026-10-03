# Data model and migrations — written, not run

No DB connected, queried, seeded, indexed or migrated in Phase 0. Existing model/collection definitions were read only. UI → action → service → repository → validated local DB boundary; Server Components call projection services, not driver collections.

## Existing collections and retention

users, sessions, accounts, verification, rateLimit, appointments, settings, articles, courses, testimonials, messages. Better Auth owns credential/token models. Keep compatibility and safeguards; add explicit schema versions/migrations and no implicit writes on import/build. Profile default exists but real content must be admin-entered/approved; static services/FAQ move through an explicit owner-approved migration, not demo seed.

## Planned additions / projections

| Collection | Minimum information / constraints |
|---|---|
| users | Name, normalized verified phone, optional verified email, role; never expose internal auth identifiers as contact facts |
| OTP challenges | HMAC/hash only, purpose/phone pseudonym/salt/expiry/attempts/consumed marker; atomic one-time consumption; no code logs |
| services / faq | Owner-authored content, slug/order/publish/approval/revision; no invented professional assertions |
| appointments | User/guest policy, UTC ranges + Tehran local keys, state/revision/idempotency/reservation keys; no clinical notes |
| availabilityExceptions | Date-local closed/override ranges, duration/type settings from admin |
| appointmentChanges | Proposal/reschedule request lifecycle, prior reservation preserved until accepted |
| messageThreads/privateMessages | Doctor-client ownership, short messages, minimal unread/read metadata; never publicly indexed |
| notificationPreferences | Channel consent/preferences and destination verified status |
| auditEvents | Actor opaque id/action/resource opaque id/time/outcome; no message, diagnosis, phone, OTP or secret |
| mediaAssets | Authorized owner, validated MIME/size/storage key/neutral alt/licensing provenance; no arbitrary remote URL |
| notificationOutbox | Idempotency/status/due UTC/retry/provider reference; sensitive destinations and transient payload protected |
| dataRequests | Authenticated export/delete request/status; no credential/session export |
| aggregateMetrics | Anonymous aggregate counts/timings, no identity/code/search/message text or session replay |

Schema validation runs server/client. Rich text is allowlisted/sanitized before projection. Every write gets role/owner guards and revision/conflict tests. Unique indexes: user verified phone/email where applicable, slug, idempotency key, reservation-minute allocation, provider delivery id. TTL only on true BSON Date fields (not Better Auth numeric lastRequest); OTP/session/outbox cleanup follows actual expiry. Data erasure/soft delete/retention is proposed to owner; no automatic business-data purge or compliance claim. Multidocument audit/outbox consistency should use replica-set transactions where supported; deployment decision remains open.

## Seed restriction

Replace the current draft-content seed with structure + env-supplied admin only. No articles, courses, reviews, prices, hours or fake client content. Test datasets live only in isolated `tests/` and a disposable project-owned test DB, never production paths.
