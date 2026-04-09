# Story 4.1: Oppna snabbhjalp fran startskarmen

Status: review

## Story

As a anvandare,
I want to na snabbhjalp direkt fran startskarmen,
so that I can hitta ratt guide inom hogst tva interaktioner nar jag ar stressad.

## Acceptance Criteria

1. Givet att anvandaren oppnar hemvyn, nar startskarmen visas, sa finns tydliga ingangar till hushallsstatus och snabb hjalp.
2. Givet att snabbhjalpen oppnas, nar scenarierna visas, sa presenteras minst stromavbrott, vattenbrist och allman kris som tydliga scenariokort.
3. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for hemvans vag in i snabbhjalp och scenarioindexet.

## Tasks / Subtasks

- [x] Lagg till tydlig snabbhjalpsingang pa hemvyn
- [x] Skapa dedikerad route for snabbhjalp
- [x] Bygg scenarioindex med tre primara krisscenarier
- [x] Verifiera home-to-guide-ingangen med tester

## Dev Notes

- Snabbhjalpen ar oppen aven utan hushallsprofil eller lagerdata.
- Implementation ligger i `apps/web/src/app/routes/home-route.tsx`, `apps/web/src/app/routes/quick-help-route.tsx` och `apps/web/src/features/guides/components/quick-help-index.tsx`.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a dedicated quick-help entry from the home route with direct navigation to the scenario overview.
- Implemented a calm, mobile-first scenario index for `stromavbrott`, `vattenbrist` and `allman kris`.

### File List

- `_bmad-output/implementation-artifacts/4-1-open-quick-help-from-home-screen.md`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/app/routes/quick-help-route.tsx`
- `apps/web/src/app/router.tsx`
- `apps/web/src/features/guides/components/quick-help-index.tsx`
- `apps/web/src/features/guides/components/guide-scenario-card.tsx`
- `apps/web/src/features/guides/__tests__/quick-help-route.test.tsx`

### Change Log

- 2026-04-09: Implemented Story 4.1 with routed quick-help access from the home screen.
