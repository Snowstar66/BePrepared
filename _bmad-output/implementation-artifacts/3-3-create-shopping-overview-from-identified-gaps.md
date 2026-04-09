# Story 3.3: Skapa inkopsoversikt fran identifierade gap

Status: review

## Story

As a hushallsansvarig,
I want to fa en inkopsoversikt over det som saknas,
so that I can agera direkt pa mina viktigaste brister.

## Acceptance Criteria

1. Givet att gap-analysen innehaller brister, nar anvandaren skapar en inkopsoversikt, sa genereras en lista over saknade artiklar eller kategorier med prioritet.
2. Givet att inkopsoversikten genereras, nar anvandaren valjer att spara den, sa lagras den lokalt for fortsatt anvandning offline.
3. Givet att lagret uppdateras efter ett inkop, nar inkopsoversikten oppnas igen, sa visas en uppdaterad sammanstallning baserat pa aktuella gap och tydlig feedback om vad som inte langre saknas.
4. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for generering, sparning och feedback om uppdaterade gap.

## Tasks / Subtasks

- [x] Etablera inkopsoversiktens featurestruktur
  - [x] Skapa `apps/web/src/features/shopping-overview/` med komponenter, repository, service och tester
  - [x] Skapa en dedikerad route for inkopsoversikten och koppla den till befintlig router
  - [x] Lank till inkopsoversikten fran gap-analysen
- [x] Implementera generering och lokal sparning
  - [x] Ateranvand gap-analysen som grund for shoppingrader och prioritet
  - [x] Skapa lokal lagring for en sparad oversikt eller snapshot
  - [x] Visa tydligt om oversikten ar nyskapad eller senast sparad
- [x] Hantera uppdaterade gap efter lagerforandringar
  - [x] Jamfor nuvarande oversikt mot senast sparad snapshot
  - [x] Visa vad som inte langre saknas efter uppdateringar
  - [x] Hall feedbacken lugn och konkret utan att simulera framtida avancerad listlogik
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for shopping-generatorn
  - [x] Lagga till UI-test for sparning och laddning
  - [x] Lagga till test for feedback om borttagna gap

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 3.3 ar lokal inkopsoversikt baserad pa gap, inte delning, print eller avancerad synk.
- Prioritet far vara enkel och transparent, till exempel hog for saknade grundkategorier och mellan for osakra eller delvisa gap.
- Hall oversikten kategori- eller gapdriven tills produkten har mer detaljerad varukatalog.

### Previous Story Intelligence

- Story 3.1 levererar gap-analysen och kategoriresultat for vatten och mat.
- Story 3.2 levererar statuskort och nasta steg pa hemvyn.
- All data ar redan local-first via Dexie och ska fortsatt lagras lokalt.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 3`, `Story 3.3`
- `_bmad-output/planning-artifacts/prd.md` - `US-10 Skapa inkopsoversikt over det som saknas`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `GapSummaryCard`, `NextStepPrompt`
- `_bmad-output/implementation-artifacts/3-1-compare-needs-against-inventory.md`
- `_bmad-output/implementation-artifacts/3-2-show-preparedness-status-and-next-steps.md`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 3.3 extracted from `epics.md`
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a routed shopping overview that turns active gap categories into prioritized local shopping rows.
- Persisted the saved shopping snapshot in Dexie and compare it against the latest gap analysis to show what no longer needs action.
- Verified generator logic, route behavior, local saving and resolved-gap feedback with focused and workspace-wide regression runs.

### File List

- `_bmad-output/implementation-artifacts/3-3-create-shopping-overview-from-identified-gaps.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/shopping-overview-route.tsx`
- `apps/web/src/shared/lib/dexie/app-db.ts`
- `apps/web/src/features/preparedness-gap/components/preparedness-gap-analysis.tsx`
- `apps/web/src/features/shopping-overview/schemas/shopping-overview-schema.ts`
- `apps/web/src/features/shopping-overview/repository/shopping-overview-repository.ts`
- `apps/web/src/features/shopping-overview/utils/create-shopping-overview.ts`
- `apps/web/src/features/shopping-overview/services/shopping-overview-service.ts`
- `apps/web/src/features/shopping-overview/components/shopping-overview.tsx`
- `apps/web/src/features/shopping-overview/__tests__/create-shopping-overview.test.ts`
- `apps/web/src/features/shopping-overview/__tests__/shopping-overview.test.tsx`

### Change Log

- 2026-04-09: Implemented Story 3.3 with local shopping overview generation, Dexie snapshot saving and resolved-gap feedback.
