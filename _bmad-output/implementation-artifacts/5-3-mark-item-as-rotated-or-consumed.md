# Story 5.3: Markera vara som roterad eller forbrukad

Status: review

## Story

As a hushallsansvarig,
I want to markera en artikel som forbrukad eller ersatt,
so that lager, rotation och framtida gap forblir korrekta.

## Acceptance Criteria

1. Givet att en artikel finns i rotationslistan, nar anvandaren markerar den som roterad, sa uppdateras dess lokala rotationsstatus.
2. Givet att anvandaren markerar en artikel som forbrukad, nar handlingen sparas, sa uppdateras mangd eller post i lagret.
3. Givet att storyn verifieras, nar tester kors, sa finns tackning for consume/rotate-handlingar och lugn feedback i UI:t.

## Tasks / Subtasks

- [x] Utoka inventory service med rotate- och consume-handlingar
- [x] Spara lokal rotationsstampel per artikel
- [x] Koppla handlingarna till rotationslistans UI
- [x] Visa tydlig feedback efter uppdaterad lagerpost
- [x] Verifiera flodet via underhalls-test

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/web test`
- `pnpm test`

### Completion Notes List

- Added item-level actions for marking inventory as rotated or consumed directly from the maintenance flow.
- Consumption updates quantity or removes the final unit, while rotation suppresses the item from the urgent list for a short review period.

### File List

- `_bmad-output/implementation-artifacts/5-3-mark-item-as-rotated-or-consumed.md`
- `apps/web/src/features/inventory/schemas/inventory-item-schema.ts`
- `apps/web/src/features/inventory/services/inventory-service.ts`
- `apps/web/src/features/reminders/components/rotation-review-list.tsx`
- `apps/web/src/features/reminders/utils/get-rotation-candidates.ts`
- `apps/web/src/features/reminders/__tests__/maintenance-route.test.tsx`

### Change Log

- 2026-04-09: Implemented Story 5.3 with inventory rotate/consume actions from the maintenance view.
