# Story 4.3: Visa guide for stromavbrott

Status: review

## Story

As a anvandare,
I want to oppna en kort guide for stromavbrott,
so that I know vilka atgarder hushallet bor ta direkt.

## Acceptance Criteria

1. Givet att anvandaren valjer scenariot stromavbrott, nar guiden oppnas, sa visas korta prioriterade steg i begriplig ordning.
2. Givet att guiden visas, nar anvandaren granskar innehallsytan, sa syns kalla och senast granskad eller uppdaterad tidpunkt.
3. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for stromavbrottsguiden i webben.

## Tasks / Subtasks

- [x] Koppla stromavbrottsscenariot till guide-routen
- [x] Rendera guideartikel med prioriterade steg
- [x] Visa kallmetadata och granskningsstatus
- [x] Verifiera stromavbrottsguiden med route-test

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/web test`
- `pnpm test`

### Completion Notes List

- Implemented the routed power-outage guide with calm step ordering and visible source metadata.

### File List

- `_bmad-output/implementation-artifacts/4-3-show-power-outage-guide.md`
- `packages/shared/src/content/published-guides.ts`
- `apps/web/src/app/routes/guide-route.tsx`
- `apps/web/src/features/guides/components/guide-article.tsx`
- `apps/web/src/features/guides/services/guide-catalog-service.ts`
- `apps/web/src/features/guides/__tests__/guide-route.test.tsx`

### Change Log

- 2026-04-09: Implemented Story 4.3 with the routed power-outage guide.
