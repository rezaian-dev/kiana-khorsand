# Reads × topics × writers — v2 plan

Source-reviewed existing families and full baseline matrix: `reports/phase-0.md`. None of the persisted business scenarios below was executed in Phase 0. Local bus is not cross-instance proof.

| Read / audience | Topics | Existing writers | New writers needed |
|---|---|---|---|
| Home/shell/profile/services/FAQ/catalog/detail/sitemap / public | content | writeSettings/writeArticle/writeCourse/moderateTestimonial | saveService/saveFaq/saveSeoDefaults/media publish/legal approval |
| Availability/date/time pills / public | slots | bookAppointment/cancelBooking/moveAppointment/changeStatus/writeSettings | exceptions/propose/accept/decline/reschedule resolution |
| Own dashboard/appointment detail / owner | appointments/account | Existing appointment writers; Better Auth hooks | proposal acceptance, reschedule request, deletion |
| Admin queue/agenda/stats/clients / admin | admin | Appointment/settings/message/content/auth hooks | New content/roles/availability/audit/provider status writers |
| Private messages / owner and admin | messages (new, private) + admin | None; current messages are one-way public contact | sendPrivateMessage/replyPrivateMessage/read/withdraw/delete |
| My reviews / owner, moderation / admin, approved review / public | reviews (new private), admin, content when public visibility changes | moderateTestimonial | submit/edit/withdraw and consent invalidation |
| Profile/session/role / affected user, admin where appropriate | account/admin | Better Auth user/session/account hooks | verified phone/recovery/role/revoke/delete flows |
| Preferences/reminders / owner/admin operational | notifications (new private) + admin | None | preference update, outbox enqueue/worker/delivery webhook |
| Audit log / admin | audit (new private) | None | Every audited confirmed admin mutation, no PII payload |
| Aggregate metrics / admin | metrics (new private) | None | Validated aggregate ingest/retention |

Messages contain only validated topic, opaque resource id, audience, sequence/version as necessary; never records, names, phones, tokens, codes or form values. Emit only after acknowledged write/transaction commit. Every job/webhook/auth hook must be included. Client preserves UI/drafts with transition refresh and one-flight coalescing; focus alone never pauses. Renew/backoff/visible/pageshow/online catch-up remain required. Native hidden/BFCache and persisted nine-scenario E2E need a real browser/local test DB; no injected event may be called native proof.

Read freshness: Next router.refresh merges RSC but does not invalidate server caches. Retain request-local reads, or use documented cache tags/paths only if persistent caching is added. Stable persisted IDs for soft insert/remove; do not reset field arrays on no-op RSC object changes. Cross-worker broker and global cap leases depend on deployment decision; no shared infra provisioned.
