# Appointment status and migration plan — written, not run

Existing values: pending, confirmed, completed, cancelled. Planned values: requested, proposed, confirmed, completed, cancelled, declined. Preserve old records/URLs; explicit migration maps pending to requested only after the own local/dev DB tests pass. Never migrate an unknown or production DB automatically.

| From | To | Actor / invariant |
|---|---|---|
| none | requested | Verified client (or approved guest policy); conflict-safe reservation + idempotency key |
| requested | confirmed | Admin; acknowledged revision/owner and availability still valid |
| requested | proposed | Admin proposes valid alternative; preserve reservation invariant atomically |
| requested | declined | Admin; release reservation, audited reason category without sensitive text |
| requested | cancelled | Owner/admin under configured rules; release reservation |
| proposed | confirmed | Owner accepts exact proposal revision; allocate proposed range and release previous range atomically |
| proposed | requested/confirmed | Decline/withdraw proposal; restore previous valid state, do not lose original confirmed slot |
| confirmed | completed | Admin after end; no future completion |
| confirmed | cancelled | Owner/admin under configured cancellation rule |
| confirmed | proposed | Reschedule proposal; keep original slot until accepted unless explicit doctor cancellation |

Reschedule request is a separate append-only change request until resolved, not an unconfirmed immediate move. The original confirmed reservation must not vanish merely because a client asks to reschedule. Proposed/current range keys need atomic constraints or a transaction; unique UTC-minute allocation is retained. No arbitrary business deadline, fee or session length is invented. Configurable rules stay disabled/unset until owner admin data supplies them. Idempotency, authorization, optimistic revision, UTC↔Tehran round-trips, multi-document audit/outbox atomicity and confirmed-only notices require integration tests.
