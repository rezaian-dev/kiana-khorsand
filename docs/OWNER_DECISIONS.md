# One-time owner decisions — Phase 0

Business facts only; no API keys, passwords, credentials or private client information in chat. Real secrets belong in the owner's local environment or deployment secret manager.

| Fact requested once | Safe interim decision |
|---|---|
| SMS provider (and email transport if wanted) | No invented vendor/account/key/price. Interface + explicit development-only test adapter; production sending not configured, never report delivery success |
| Deployment target | Keep single-process bus assumption explicit until owner selects single Node vs multiple/serverless; shared transport must precede multi-instance launch |
| Domain | Local development origin only; no invented production domain/canonical |
| Real portrait/photos | No borrowed reference photos or generated person presented as the doctor's identity; owner-approved assets only |
| Real bio/credentials | Name/title supplied in product vision retained; no education/years/awards invented; other claims await admin approval |
| License/registration | No visible line until a real value is supplied |
| Working hours | Empty/unset; booking disabled until validated owner-entered hours and exceptions |
| Session types/durations | Owner-authored service data; no invented minutes or available slots |
| Pricing display policy | Hide pricing by default; no invented amount, refund or deadline |
| Telegram/Instagram/WhatsApp URLs | Null/hidden until values supplied; no fake href |
| Booking without account | Preserve current account requirement as safe default until owner chooses |

Owner can leave content/schedule/URLs for admin entry later; those production-content/launch rows remain unfinished, not filled with demo records. Missing public content collapses. Open factual decisions must stay visible in Handoff/launch docs, never be turned into credentials or public filler. Safety/emergency copy is not added to footer; a separate page/warning is not added without owner decision.

## Answers recorded — 2026-10-03 (do not ask again)

- SMS: not selected. Email transport not supplied. Production delivery remains unconfigured; only explicit dev/test adapter is permitted.
- Hosting: **VPS / one permanent Node process**. Production domain not supplied.
- Public facts approved now: name and role only. No real portrait, biography/credentials or license supplied.
- Hours/types/durations: unset; keep booking disabled. Do not invent slots. Prices remain hidden.
- Telegram/Instagram/WhatsApp: no URLs; no social icons/links rendered.
- Guest booking: **not allowed**; account required.

These are deliberate safe defaults, not requests to fabricate later. Feature tests may use explicitly isolated test-only inputs/records, never seed production content. Future admin entry can supply real content without repeating the one-time questionnaire. Actual SMS provider/domain/portrait/schedule are open launch requirements. No secrets were requested or collected.
