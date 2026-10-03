# Controls and primitives plan

Retain the 19 v5 migrations and the 13 prior shared-control behavior checks as supporting evidence, not v2 gate acceptance. Full matrix: `reports/phase-0-selects.json`. 2–4 options: native-radio segmented/chips; 5–12: Radix Select; growing searchable: Popover+Command; Jalali dates/calendar+pills; times: grid; weekdays: efficient chips. No authored native select.

New controls: appointment requested/proposed/declined states (Select); proposal date/time pills; service selection from admin data (Select or searchable as list grows); appointment rule modes and notification channels (native radios/checks); role choices client/admin (radio); publication/approval status (radio); services/FAQ/media search (Combobox). Maintain original names, GET/POST FormData, required/disabled/errors/ARIA/Controller/ref/reset/cancelled reset, numeric weekdays, Sheet-local portals and ≥44px rows.

Essential primitives only: Dialog/Sheet, DropdownMenu, Select, Popover, Command, Tabs, Accordion, Calendar, Sonner. Hand-crafted section/card/chip/stat/footer/avatar shapes; no new stock layout primitives. Existing Badge is re-skinned, not an excuse to add more. Installed-version types and docs must be read before editing each API. Private conversations and uploads need real wired actions/loading/empty/error/success, not button shells.
