# Story 4.4: Visa guide for vattenbrist

Status: review

## Story

As a anvandare,
I want to oppna en kort guide for vattenbrist,
so that I know hur hushallet bor prioritera vatten och hygien.

## Acceptance Criteria

1. Givet att anvandaren valjer scenariot vattenbrist, nar guiden oppnas, sa visas korta prioriterade steg i begriplig ordning.
2. Givet att guiden visas, nar anvandaren granskar innehallsytan, sa syns kalla och senast granskad eller uppdaterad tidpunkt.
3. Givet att storyn verifieras, nar automatiserade tester och regressionskorningar kors, sa fungerar guide-routen konsekvent aven for vattenbrist.

## Tasks / Subtasks

- [x] Publicera vattenbristsguide i delat innehall
- [x] Koppla scenariot till guide-routen via scenario-id
- [x] Ateranvand samma guideartikel och metadata-block
- [x] Verifiera vattenbrist via snabbhjalpsflodets regressionskorningar

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added the published water-shortage guide on the same routed guide surface and ensured it travels through the shared guide contract.

### File List

- `_bmad-output/implementation-artifacts/4-4-show-water-shortage-guide.md`
- `packages/shared/src/content/published-guides.ts`
- `apps/web/src/features/guides/components/guide-article.tsx`
- `apps/web/src/features/guides/services/guide-catalog-service.ts`
- `apps/web/src/features/guides/components/quick-help-index.tsx`

### Change Log

- 2026-04-09: Implemented Story 4.4 with the water-shortage guide in the shared guide flow.
