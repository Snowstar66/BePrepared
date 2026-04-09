# Story 4.2: Modellera och exponera publicerat guideinnehall

Status: review

## Story

As a innehallsredaktor,
I want att publicerat guideinnehall har tydlig metadata och kan hamtas konsekvent av klienten,
so that hushallen kan lita pa att guiderna ar begripliga, kallmarkta och uppdaterade.

## Acceptance Criteria

1. Givet att guideinnehall publiceras, nar innehall sparas i appens kontrakt, sa finns metadata for kalla, granskningsstatus, uppdateringsdatum och version.
2. Givet att klienten eller tester behover publicerat guideinnehall, nar API-kontraktet anropas, sa finns konsekventa endpoints under `/api/v1/content/guides`.
3. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for kontrakt, routehantering och fel vid saknad guide.

## Tasks / Subtasks

- [x] Skapa delade guidekontrakt i shared-paketet
- [x] Modellera publicerade guider med metadata
- [x] Exponera guideindex och guide-detalj i API:t
- [x] Verifiera API-kontrakt och 404-fall med tester

## Dev Notes

- MVP-versionen anvander delat publicerat innehall i `packages/shared` och ett Express-API som exponerar samma kontrakt.
- Den godkanda scopekorrigeringen gjorde att vi haller governance och publiceringsmotor tunna i denna story.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/api test`
- `pnpm test`

### Completion Notes List

- Added shared guide contracts and published guide content with source metadata and versioning.
- Added `/api/v1/content/guides` endpoints with traceable 404 handling for missing guides.

### File List

- `_bmad-output/implementation-artifacts/4-2-model-and-expose-published-guide-content.md`
- `packages/shared/src/contracts/guide-contract.ts`
- `packages/shared/src/content/published-guides.ts`
- `packages/shared/src/index.ts`
- `apps/api/src/app.ts`
- `apps/api/src/features/content/routes/guides-routes.ts`
- `apps/api/src/features/content/routes/guides-routes.test.ts`

### Change Log

- 2026-04-09: Implemented Story 4.2 with shared guide contracts and versioned content endpoints.
