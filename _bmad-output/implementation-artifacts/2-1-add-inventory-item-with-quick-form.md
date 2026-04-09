# Story 2.1: Lagg till lagerartikel med snabbformular

Status: review

## Story

As a hushallsansvarig,
I want to lagga till en lagerartikel via en snabb och enkel inmatningsyta,
so that I can registrera mitt hemmaforrad pa nagra sekunder.

## Acceptance Criteria

1. Givet att anvandaren valjer att lagga till en vara, nar snabbformularen oppnas, sa presenteras en `QuickAddItemSheet` med falt for namn, kategori och antal som obligatoriska uppgifter, och enhet och bast fore-datum ar valfria falt.
2. Givet att anvandaren fyller i formularen ofullstandigt, nar sparning forsoks, sa visas tydlig validering utan att redan ifyllda varden raderas, och formularet ar mobil-forst, tangentbords- och skarmlasarvanligt.
3. Givet att artikeln sparas korrekt, nar sparningen ar klar, sa visas en lugn bekraftelse att varan har lagts till, och den lokala lagerdatan uppdateras direkt.
4. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for schema, lokal lagring och snabbformularens beteende.

## Tasks / Subtasks

- [x] Etablera featurestruktur for inventory quick add
  - [x] Skapa `apps/web/src/features/inventory/` med minst `components/`, `schemas/`, `services/`, `repository/` och `__tests__/`
  - [x] Utoka Dexie-lagret med inventory items
  - [x] Lagga till en route for snabbregistrering av lagerartikel
- [x] Bygg QuickAddItemSheet for mobil-forst inmatning
  - [x] Definiera schema med namn, kategori och antal som obligatoriska falt
  - [x] Halla enhet och bast fore-datum valfria
  - [x] Sakerstall att valideringsfel visas utan att rensa tidigare input
- [x] Spara lagerartiklar lokalt
  - [x] Implementera repository och service for lokal inventory-lagring
  - [x] Visa lugn bekraftelse efter sparning
  - [x] Halla implementationen tunn utan att foregripa edit/delete eller kategorivy
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for schema
  - [x] Lagga till tester for repository/lokal lagring
  - [x] Lagga till UI-test for snabbformularens sparflode

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 2.1 ar att snabbt skapa lagerartiklar lokalt.
- Bygg inte kategorigrupperad oversikt eller redigering i denna story.
- Hall inmatningsytan snabb och latt, utan att introducera onodigt manga val.

### Previous Story Intelligence

- Epic 1 etablerade hushallsprofil, horisontval och behovsvy.
- Dexie-bas finns redan och har utokats stegvis mellan stories.
- Behovs- och profilvyerna kan nu leda vidare till lagerarbete.

### UX Notes

- `QuickAddItemSheet` ska kannas som en fokuserad mobil yta.
- Namn, kategori och antal ska vara det viktigaste.
- Bekraftelse efter sparning ska vara lugn och tydlig.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 2`, `Story 2.1`
- `_bmad-output/planning-artifacts/prd.md` - `US-05`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `QuickAddItemSheet`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 2.1 extracted from `epics.md`
- Quick-add requirements reviewed from PRD and UX spec
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added an inventory feature with schema, repository, service and a focused `QuickAddItemSheet`
- Extended Dexie with local inventory items and wired a dedicated `/forrad/ny` route for quick-add
- Added entry points from the home and needs flows so users can move directly into inventory capture
- Verified the story with focused web checks plus full workspace regression runs

### File List

- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/2-1-add-inventory-item-with-quick-form.md`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/app/routes/inventory-quick-add-route.tsx`
- `apps/web/src/features/preparedness-needs/components/preparedness-needs-overview.tsx`
- `apps/web/src/features/inventory/components/quick-add-item-sheet.tsx`
- `apps/web/src/features/inventory/repository/inventory-repository.ts`
- `apps/web/src/features/inventory/schemas/inventory-item-schema.ts`
- `apps/web/src/features/inventory/services/inventory-service.ts`
- `apps/web/src/features/inventory/__tests__/inventory-item-schema.test.ts`
- `apps/web/src/features/inventory/__tests__/inventory-repository.test.ts`
- `apps/web/src/features/inventory/__tests__/quick-add-item-sheet.test.tsx`
- `apps/web/src/shared/lib/dexie/app-db.ts`

### Change Log

- 2026-04-08: Implemented Story 2.1 with quick-add inventory capture, local persistence and mobile-first entry points.
