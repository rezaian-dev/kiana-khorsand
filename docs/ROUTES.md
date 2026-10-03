# Existing and planned route/state inventory

No existing route removed. Each new route has its own manifest row and state/role tests. Register/logout/recovery shared UI can be reused, but an unwired redirect/button is not feature completion. Existing `/admin/appointments` remains valid while a day/week `/admin/agenda` is added.

| id | route/state | phase | current evidence |
|---|---|---:|---|
| EX-001 | (account)/account/appointments/page.tsx | 5 | `src/app/(account)/account/appointments/page.tsx` — source exists; v2 gate not run |
| EX-002 | (account)/account/page.tsx | 5 | `src/app/(account)/account/page.tsx` — source exists; v2 gate not run |
| EX-003 | (account)/account/settings/page.tsx | 5 | `src/app/(account)/account/settings/page.tsx` — source exists; v2 gate not run |
| EX-004 | (account)/layout.tsx | 5 | `src/app/(account)/layout.tsx` — source exists; v2 gate not run |
| EX-005 | (admin)/admin/appointments/page.tsx | 6 | `src/app/(admin)/admin/appointments/page.tsx` — source exists; v2 gate not run |
| EX-006 | (admin)/admin/articles/[id]/page.tsx | 6 | `src/app/(admin)/admin/articles/[id]/page.tsx` — source exists; v2 gate not run |
| EX-007 | (admin)/admin/articles/page.tsx | 6 | `src/app/(admin)/admin/articles/page.tsx` — source exists; v2 gate not run |
| EX-008 | (admin)/admin/clients/page.tsx | 6 | `src/app/(admin)/admin/clients/page.tsx` — source exists; v2 gate not run |
| EX-009 | (admin)/admin/courses/[id]/page.tsx | 6 | `src/app/(admin)/admin/courses/[id]/page.tsx` — source exists; v2 gate not run |
| EX-010 | (admin)/admin/courses/page.tsx | 6 | `src/app/(admin)/admin/courses/page.tsx` — source exists; v2 gate not run |
| EX-011 | (admin)/admin/messages/page.tsx | 6 | `src/app/(admin)/admin/messages/page.tsx` — source exists; v2 gate not run |
| EX-012 | (admin)/admin/page.tsx | 6 | `src/app/(admin)/admin/page.tsx` — source exists; v2 gate not run |
| EX-013 | (admin)/admin/reviews/page.tsx | 6 | `src/app/(admin)/admin/reviews/page.tsx` — source exists; v2 gate not run |
| EX-014 | (admin)/admin/settings/page.tsx | 6 | `src/app/(admin)/admin/settings/page.tsx` — source exists; v2 gate not run |
| EX-015 | (admin)/layout.tsx | 6 | `src/app/(admin)/layout.tsx` — source exists; v2 gate not run |
| EX-016 | (auth)/layout.tsx | 4 | `src/app/(auth)/layout.tsx` — source exists; v2 gate not run |
| EX-017 | (auth)/login/page.tsx | 4 | `src/app/(auth)/login/page.tsx` — source exists; v2 gate not run |
| EX-018 | (public)/about/loading.tsx | 3 | `src/app/(public)/about/loading.tsx` — source exists; v2 gate not run |
| EX-019 | (public)/about/page.tsx | 3 | `src/app/(public)/about/page.tsx` — source exists; v2 gate not run |
| EX-020 | (public)/articles/[slug]/page.tsx | 3 | `src/app/(public)/articles/[slug]/page.tsx` — source exists; v2 gate not run |
| EX-021 | (public)/articles/page.tsx | 3 | `src/app/(public)/articles/page.tsx` — source exists; v2 gate not run |
| EX-022 | (public)/booking/page.tsx | 3 | `src/app/(public)/booking/page.tsx` — source exists; v2 gate not run |
| EX-023 | (public)/contact/loading.tsx | 3 | `src/app/(public)/contact/loading.tsx` — source exists; v2 gate not run |
| EX-024 | (public)/contact/page.tsx | 3 | `src/app/(public)/contact/page.tsx` — source exists; v2 gate not run |
| EX-025 | (public)/courses/page.tsx | 3 | `src/app/(public)/courses/page.tsx` — source exists; v2 gate not run |
| EX-026 | (public)/faq/loading.tsx | 3 | `src/app/(public)/faq/loading.tsx` — source exists; v2 gate not run |
| EX-027 | (public)/faq/page.tsx | 3 | `src/app/(public)/faq/page.tsx` — source exists; v2 gate not run |
| EX-028 | (public)/layout.tsx | 3 | `src/app/(public)/layout.tsx` — source exists; v2 gate not run |
| EX-029 | (public)/page.tsx | 3 | `src/app/(public)/page.tsx` — source exists; v2 gate not run |
| EX-030 | (public)/privacy/loading.tsx | 3 | `src/app/(public)/privacy/loading.tsx` — source exists; v2 gate not run |
| EX-031 | (public)/privacy/page.tsx | 3 | `src/app/(public)/privacy/page.tsx` — source exists; v2 gate not run |
| EX-032 | (public)/services/loading.tsx | 3 | `src/app/(public)/services/loading.tsx` — source exists; v2 gate not run |
| EX-033 | (public)/services/page.tsx | 3 | `src/app/(public)/services/page.tsx` — source exists; v2 gate not run |
| EX-034 | (public)/terms/loading.tsx | 3 | `src/app/(public)/terms/loading.tsx` — source exists; v2 gate not run |
| EX-035 | (public)/terms/page.tsx | 3 | `src/app/(public)/terms/page.tsx` — source exists; v2 gate not run |
| EX-036 | (public)/testimonials/page.tsx | 3 | `src/app/(public)/testimonials/page.tsx` — source exists; v2 gate not run |
| EX-037 | error.tsx | 3 | `src/app/error.tsx` — source exists; v2 gate not run |
| EX-038 | layout.tsx | 2 | `src/app/layout.tsx` — source exists; v2 gate not run |
| EX-039 | not-found.tsx | 3 | `src/app/not-found.tsx` — source exists; v2 gate not run |
| ROUTE-040 | /services/[slug] | 3 | Planned `src/app/(public)/services/[slug]/page.tsx` |
| ROUTE-041 | /courses/[slug] | 3 | Planned `src/app/(public)/courses/[slug]/page.tsx` |
| ROUTE-042 | /articles/category/[category] | 3 | Planned `src/app/(public)/articles/category/[category]/page.tsx` |
| ROUTE-043 | /register | 4 | Planned `src/app/(auth)/register/page.tsx` |
| ROUTE-044 | /verify | 4 | Planned `src/app/(auth)/verify/page.tsx` |
| ROUTE-045 | /recovery | 4 | Planned `src/app/(auth)/recovery/page.tsx` |
| ROUTE-046 | /recovery/reset | 4 | Planned `src/app/(auth)/recovery/reset/page.tsx` |
| ROUTE-047 | /logout | 4 | Planned `src/app/(auth)/logout/page.tsx` |
| ROUTE-048 | /account/appointments/[id] | 5 | Planned `src/app/(account)/account/appointments/[id]/page.tsx` |
| ROUTE-049 | /account/preferences | 5 | Planned `src/app/(account)/account/preferences/page.tsx` |
| ROUTE-050 | /account/messages | 5 | Planned `src/app/(account)/account/messages/page.tsx` |
| ROUTE-051 | /account/reviews | 5 | Planned `src/app/(account)/account/reviews/page.tsx` |
| ROUTE-052 | /account/reviews/[id] | 5 | Planned `src/app/(account)/account/reviews/[id]/page.tsx` |
| ROUTE-053 | /account/sessions | 5 | Planned `src/app/(account)/account/sessions/page.tsx` |
| ROUTE-054 | /account/data | 5 | Planned `src/app/(account)/account/data/page.tsx` |
| ROUTE-055 | /admin/queue | 6 | Planned `src/app/(admin)/admin/queue/page.tsx` |
| ROUTE-056 | /admin/agenda | 6 | Planned `src/app/(admin)/admin/agenda/page.tsx` |
| ROUTE-057 | /admin/availability | 6 | Planned `src/app/(admin)/admin/availability/page.tsx` |
| ROUTE-058 | /admin/services | 6 | Planned `src/app/(admin)/admin/services/page.tsx` |
| ROUTE-059 | /admin/services/[id] | 6 | Planned `src/app/(admin)/admin/services/[id]/page.tsx` |
| ROUTE-060 | /admin/faq | 6 | Planned `src/app/(admin)/admin/faq/page.tsx` |
| ROUTE-061 | /admin/faq/[id] | 6 | Planned `src/app/(admin)/admin/faq/[id]/page.tsx` |
| ROUTE-062 | /admin/users | 6 | Planned `src/app/(admin)/admin/users/page.tsx` |
| ROUTE-063 | /admin/users/[id] | 6 | Planned `src/app/(admin)/admin/users/[id]/page.tsx` |
| ROUTE-064 | /admin/audit | 6 | Planned `src/app/(admin)/admin/audit/page.tsx` |
| BOUNDARY-public-loading | public shared loading boundary | 3 | Planned `src/app/(public)/loading.tsx` |
| BOUNDARY-public-error | public shared error boundary | 3 | Planned `src/app/(public)/error.tsx` |
| BOUNDARY-auth-loading | auth shared loading boundary | 4 | Planned `src/app/(auth)/loading.tsx` |
| BOUNDARY-auth-error | auth shared error boundary | 4 | Planned `src/app/(auth)/error.tsx` |
| BOUNDARY-account-loading | account shared loading boundary | 5 | Planned `src/app/(account)/loading.tsx` |
| BOUNDARY-account-error | account shared error boundary | 5 | Planned `src/app/(account)/error.tsx` |
| BOUNDARY-admin-loading | admin shared loading boundary | 6 | Planned `src/app/(admin)/loading.tsx` |
| BOUNDARY-admin-error | admin shared error boundary | 6 | Planned `src/app/(admin)/error.tsx` |
| GLOBAL-ERROR | Global root error fallback | 3 | Planned `src/app/global-error.tsx` |
| EX-API-1 | src/app/api/auth/[...all]/route.ts | 4 | `src/app/api/auth/[...all]/route.ts` — source exists; v2 gate not run |
| EX-API-2 | src/app/api/live/route.ts | 7 | `src/app/api/live/route.ts` — source exists; v2 gate not run |
