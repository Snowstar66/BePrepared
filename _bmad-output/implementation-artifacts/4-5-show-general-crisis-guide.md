# Story 4.5: Visa guide for allman kris

Status: review

## Story

As a anvandare,
I want to oppna en kort generell krisguide,
so that I can fa lugn vagledning nar situationen inte passar ett enskilt scenario.

## Acceptance Criteria

1. Givet att anvandaren valjer scenariot allman kris, nar guiden oppnas, sa visas korta prioriterade steg i begriplig ordning.
2. Givet att guiden visas, nar anvandaren granskar innehallsytan, sa syns kalla och senast granskad eller uppdaterad tidpunkt.
3. Givet att storyn verifieras, nar snabbhjalpsflodet kors i tester och build, sa fungerar den generella krisguiden utan beroende pa hushallsdata.

## Tasks / Subtasks

- [x] Publicera allman-kris-guide i delat innehall
- [x] Exponera scenariot i snabbhjalpsindexet
- [x] Visa guiden via samma route och metadata-komponent
- [x] Verifiera att guiden fungerar utan hushallsforutsattningar

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added the general crisis guide as a first-class quick-help scenario with the same calm article experience and metadata support as the other guides.

### File List

- `_bmad-output/implementation-artifacts/4-5-show-general-crisis-guide.md`
- `packages/shared/src/content/published-guides.ts`
- `apps/web/src/features/guides/components/quick-help-index.tsx`
- `apps/web/src/features/guides/components/guide-article.tsx`
- `apps/web/src/app/routes/quick-help-route.tsx`

### Change Log

- 2026-04-09: Implemented Story 4.5 with the general crisis guide in the quick-help flow.
