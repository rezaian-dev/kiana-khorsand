# Phase 0 — read-only audit (baseline ef426ad)

Source edits started only after this audit. Baseline `npm run typecheck` and `npm run lint` both passed with Node 24.21.0. Installed tooling is isolated; application dependencies/lockfile unchanged. No database was connected, read or modified; no seed/index scripts run.

## Reference: exactly 15 observations
1. Floating, rounded, white-85 translucent header; 1280px inner width and compact pill navigation.
2. Reference head exports Material-style colors; raw config is preserved in `reference-tokens.json` as evidence, not application code.
3. Canvas conflict resolved to ivory #FBF8F3; blue-charcoal ink #1F2430 and muted #5B6475 per the requested corrections.
4. Hero is a 12-column 7+5 split, text at the RTL start and an arch-framed 3:4 portrait at the end.
5. Hero headline 56/76, mobile 36/50, weight 800; one gradient phrase and a compact CTA row.
6. Portrait has translucent floating chips; no unverifiable experience/credential chip will be carried over.
7. Services are white bento cards: 7+5 then 5+7; icon, heading, description and arrow link, no photo-led cards.
8. About is an image/text 5+7 split in a larger pastel surface; three inset value rows.
9. Process has a centered heading and three equal soft white cards with differently hued number tiles.
10. Articles use a three-card carousel row with 16:10 covers, topic chip, title, summary and arrow.
11. Testimonials use a three-card carousel language; reference names, stars, durations and portraits are forbidden content.
12. FAQ is a centered 960px reading-width stack of separated white accordion cards.
13. Final invitation is a rounded mesh banner with text and one CTA, not a full-bleed photograph.
14. Footer is three columns (5+3+4), social icons, quick links and a booking card, then a slim bottom row.
15. Premium feel: generous 64–96px section rhythm, six-hue pastel ambience, dual cool-charcoal shadows, glass chips, leaf contours and organic dashed connectors; hover lift/shadow, border tint, image/icon scale and arrow movement.

Reference was rendered from the attached local file at 1440 and 390px in Chromium; all its network assets loaded. Optional DESIGN.md and screen.png were absent; none requested. Captures are in the isolated verification folder. No reference text, remote images, fonts, scripts, CDN or logo is imported into the app.

## Confirmed differences from the supplied findings
- CSS is 2,675 lines, not ~1,800; a recent warm/magenta/gold override competes with prior spectrum tokens. Legacy color scales are unused by application utilities.
- Input geometry is already 44px; required work is re-skinning and consistent states, not widening/removing validation.
- RefreshButton file, imports and CSS are already absent. Manual *instructions* remain in appointment/queue empty/error states and will be removed.
- LiveRefresh already uses 250ms debounce, single-flight, jittered exponential retry, renew, visibility/pageshow/online catch-up, useDraft and dirty/submitting markers. Focus alone does not block.
- notifyChange no longer root-revalidates; published/viewer/member/admin readers use `connection()` and request-local React cache, not persistent Next caches.
- clients.ts is read-only. All client writes are Better Auth hooks, which already emit account + admin notices. Adding notices to reads would be wrong.
- In-process fan-out and in-process caps are still insufficient for multiple workers. Deployment docs explicitly describe a single long-lived Node process; no container/serverless/shared-bus config exists.
- Messages are anonymous one-way contact submissions, with admin-only status moderation. No client inbox, replies, message userId or cross-side client read exists; adding any would change models/business rules.
- Default social URLs are null. Stored settings cannot be inspected under the database prohibition; icons must be conditional, not disabled invented links.

## Route / layout / loading / error inventory
| File | Template | Scope |
|---|---|---|
| `src/app/(account)/account/appointments/page.tsx` | T5 | Existing route, no additions |
| `src/app/(account)/account/page.tsx` | T5 | Existing route, no additions |
| `src/app/(account)/account/settings/page.tsx` | T4 | Existing route, no additions |
| `src/app/(account)/layout.tsx` | Shell | Existing route, no additions |
| `src/app/(admin)/admin/appointments/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/articles/[id]/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/articles/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/clients/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/courses/[id]/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/courses/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/messages/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/reviews/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/admin/settings/page.tsx` | T6 | Existing route, no additions |
| `src/app/(admin)/layout.tsx` | Shell | Existing route, no additions |
| `src/app/(auth)/layout.tsx` | Shell | Existing route, no additions |
| `src/app/(auth)/login/page.tsx` | T4 | Existing route, no additions |
| `src/app/(public)/about/loading.tsx` | T7 | Existing route, no additions |
| `src/app/(public)/about/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/articles/[slug]/page.tsx` | T3 | Existing route, no additions |
| `src/app/(public)/articles/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/booking/page.tsx` | T4 | Existing route, no additions |
| `src/app/(public)/contact/loading.tsx` | T7 | Existing route, no additions |
| `src/app/(public)/contact/page.tsx` | T4 | Existing route, no additions |
| `src/app/(public)/courses/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/faq/loading.tsx` | T7 | Existing route, no additions |
| `src/app/(public)/faq/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/layout.tsx` | Shell | Existing route, no additions |
| `src/app/(public)/page.tsx` | T1 | Existing route, no additions |
| `src/app/(public)/privacy/loading.tsx` | T7 | Existing route, no additions |
| `src/app/(public)/privacy/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/services/loading.tsx` | T7 | Existing route, no additions |
| `src/app/(public)/services/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/terms/loading.tsx` | T7 | Existing route, no additions |
| `src/app/(public)/terms/page.tsx` | T2 | Existing route, no additions |
| `src/app/(public)/testimonials/page.tsx` | T2 | Existing route, no additions |
| `src/app/error.tsx` | T7 | Existing route, no additions |
| `src/app/layout.tsx` | Shell | Existing route, no additions |
| `src/app/not-found.tsx` | T7 | Existing route, no additions |

API handlers `/api/auth/[...all]` and `/api/live` are behavior/security boundaries, not presentation templates. Manifest, robots, sitemap, icon and OG/Twitter metadata remain unchanged. No separate register, verification, service-detail, course-detail or maintenance route exists; register is a login tab, service details are anchors, course outlines are in `/courses`.

## Select replacement plan — 19 controls, 9 files
| File | Field(s) | Replacement |
|---|---|---|
| agenda-filter | status (5), service (5) | shared Radix Select |
| agenda-filter | sort (2) | real radio segmented control |
| visit-sheet | action (4) | radio chips; existing per-action disabled flags |
| visit-sheet | date, slot | scrollable date pills + time chip grid; keep availability/revision callbacks |
| client-filter | sort (2) | segmented radios |
| hours-editor | weekday (7) | coherent weekday radio chips; native time inputs retained |
| content-filter | category; status (3), sort (2) | Select; segmented radios |
| content-form | category; image/social (16 each); publication (2) | Select; searchable Combobox; segmented radios |
| message-state | status (3) | segmented radios |
| queue-filter | status (4), sort (2) | segmented radios |
| review-form | status (3) | segmented radios, keep prohibited approval disabled |

Progressive enhancement must keep GET/POST form field names, values, required/disabled/ARIA and RHF/zod. Non-JS fallback will be native **radios in an accessible disclosure**, not a visible native select. Radix's internal hidden select for form submission is intentional, not a visible dropdown.

## R1 — complete reader/writer/audience matrix
| Data / all consumers | Required topics / audience | Confirmed writers / notices after successful write |
|---|---|---|
| profile: readProfile, every header/footer, Home/About/Services/Contact/article Person data | content:public | saveSettings → content:public + slots:public + admin:admin |
| articles: readArticles/readArticle/readRelated/readLinks; Home/catalog/detail/related/sitemap; admin list/editor | content:public + admin:admin | writeArticle → saveArticle → admin; public only if old or new status is published |
| courses: readCourses; Home/catalog/outlines; admin list/editor | content:public + admin:admin | writeCourse → saveCourse → admin; public if old or new status is published |
| reviews: readReviews; Home/testimonials; queue/detail | content:public + admin:admin | moderateTestimonial → moderateReview → saveReview → admin; public if old or new status is approved; consent/isSample guards untouched |
| booking capacity/readBooking/getMoveTimes; agenda/calendar/tables | slots:public + appointments:user + admin:admin | bookAppointment/cancelBooking/changeStatus/moveAppointment → corresponding appointment repos → announceAppointment, owner + admin + affected old/new valid day(s) |
| member/readVisits/getViewer/countAppointments; account, settings, own appointments, header appointment count | account:user + appointments:user | appointment writers above; Better Auth user create/update/delete and session/account hooks |
| clients/browseClients/listNames/summarizeClients/searchRecords; directory/history/dashboard/command search/agenda names | admin:admin + account:affected-user | all user create/update/delete writes occur in auth; hooks already notify both; repos/clients is read-only |
| readDashboard/summarizeAppointments/activity/schedule/charts/stats | admin:admin, plus public changes already forwarded | appointment writers + user hooks + messages/settings/content/review writers |
| readQueue/messages/getMessage/summarizeMessages; inbox, dashboard preview, notifications | admin:admin | sendMessage/createMessage and changeMessage/updateMessage → admin; sender gets immediate receipt, no client inbox exists |
| readPreferences/site settings/weekly hours/booking enablement | admin:admin + content/slots:public | writeSettings/saveSettings → all three, after acknowledged matched write |
| session/profile/role/password; getSession/viewer, account/admin gates | account:affected-user (+ admin for user record) | auth user create/update/delete → owner/admin; account update, session create/delete → owner; session rechecked at subscription, private events and heartbeat |
| sidebar cookie | browser-local UI only | saveSidebar authenticates, sets browser cookie, returns action value; no shared DB data or cross-viewer reader; no fan-out needed |
| rate buckets / stream counts / clocks | internal only | no UI writer; 60s read-only fallback converges clock-dependent eligibility; caps retained |

No missing persisted-data writer was found. Notifications do not need an independent topic: their reader is summarizeMessages and they receive admin. A bus interface will be made explicit; adding an unavailable broker or assuming replica-set support is prohibited.

## Word-search evidence
Full per-file/per-line contexts are in `phase-0-word-hits.json`. Visible hits: images.ts alts (all 13 portraits/photos), question group text + fee/message answers + stories item, policies privacy/terms statements, footer credit, About/Home portrait captions, service/article/course/contact/dashboard image captions, booking in-progress disclosure, testimonial empty text, publishing list/editor text, queue empty-state/manual instruction, weekday editor text. Also label “نام نمایشی” (neutral display-name meaning, not a false-data disclosure) in queue/testimonials/moderation; will normalize in rendered copy. Internal exceptions: profile.notices constant retained but not rendered; images subject/isSample metadata, published/review integrity guards and schema remain intact. Placeholder attributes and CSS `::placeholder` are not disclosures.

## Checks actually run
- Node 24.21.0; npm ci --ignore-scripts (no package/lock change).
- Phase 0 typecheck: PASS; lint: PASS.
- Reference screenshots: PASS, 1440/390, no failed assets.
- Database, R7 business scenarios and deployment traffic: NOT RUN.
