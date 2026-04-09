# Story 5.2: Visa rotationslista for varor som bor kontrolleras

Status: review

## Story

As a hushallsansvarig,
I want to se vilka artiklar som snart bor anvandas eller ersattas,
so that mitt lager inte forlorar varde over tid.

## Acceptance Criteria

1. Givet att lagerartiklar har bast fore-datum, nar rotationsvyn oppnas, sa markeras artiklar som snart utgaende enligt en enkel regel.
2. Givet att artiklar saknar datum, nar listan visas, sa markeras de inte felaktigt som problem.
3. Givet att storyn verifieras, nar tester kors, sa finns tackning for urvalet av rotationskandidater och underhallsvyn.

## Tasks / Subtasks

- [x] Skapa enkel rotationsregel baserad pa best-before inom 30 dagar
- [x] Filtrera bort artiklar utan datum och nyligen kontrollerade artiklar
- [x] Bygg en skannbar rotationslista i underhallsvyn
- [x] Verifiera rotationsurvalet med utility-test och route-test

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/web test`
- `pnpm test`

### Completion Notes List

- Added a rotation candidate calculator and a dedicated review list for items nearing their best-before date.
- Kept the rule intentionally transparent and avoided false positives for items without dates.

### File List

- `_bmad-output/implementation-artifacts/5-2-show-rotation-list-for-items-to-review.md`
- `apps/web/src/features/reminders/utils/get-rotation-candidates.ts`
- `apps/web/src/features/reminders/components/rotation-review-list.tsx`
- `apps/web/src/features/reminders/components/maintenance-overview.tsx`
- `apps/web/src/app/routes/maintenance-route.tsx`
- `apps/web/src/features/reminders/__tests__/get-rotation-candidates.test.ts`
- `apps/web/src/features/reminders/__tests__/maintenance-route.test.tsx`

### Change Log

- 2026-04-09: Implemented Story 5.2 with a local rotation list and clear date-based prioritization.
