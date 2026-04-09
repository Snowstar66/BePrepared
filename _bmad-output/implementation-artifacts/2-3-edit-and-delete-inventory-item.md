# Story 2.3: Redigera och ta bort lagerartikel

Status: review

## Story

As a hushallsansvarig,
I want to kunna korrigera eller ta bort en registrerad lagerartikel,
so that min lageroversikt forblir korrekt och palitlig.

## Acceptance Criteria

1. Givet att en lagerartikel finns i oversikten, nar anvandaren valjer att redigera den, sa kan namn, kategori, antal, enhet och bast fore-datum andras, och andringen slar igenom direkt i lageroversikten efter sparning.
2. Givet att anvandaren valjer att ta bort en artikel, nar borttagningen bekraftas, sa tas artikeln bort fran lagret, och destruktiv handling kraver tydlig bekraftelse enligt knapphierarkin.
3. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for redigering, borttagning och bekraftelsebeteende.

## Tasks / Subtasks

- [x] Etablera edit/delete-sparet ovanpa befintlig inventory-feature
  - [x] Utoka repository och service med hamtning, uppdatering och borttagning for enskild artikel
  - [x] Skapa en dedikerad route for redigering av lagerartikel
  - [x] Lank edit-flodet fran befintlig inventory overview
- [x] Bygg redigeringsformularet
  - [x] Forifyll namn, kategori, antal, enhet och bast fore-datum
  - [x] Anvand samma valideringsregler som quick-add
  - [x] Visa lugn bekraftelse efter lyckad uppdatering
- [x] Bygg tydlig borttagningsbekraftelse
  - [x] Krav pa uttrycklig bekraftelse innan borttagning genomfors
  - [x] Ta bort artikeln lokalt och led tillbaka till lageroversikten
  - [x] Visa lugn och tydlig feedback utan att blanda in senare inventory-scope
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for repository/service update/delete
  - [x] Lagga till UI-test for redigering
  - [x] Lagga till UI-test for borttagning med bekraftelse

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 2.3 ar att korrigera och ta bort befintliga poster.
- Bygg inte batchactions, undo-stack eller avancerad modalhantering i denna story.
- Hall kvar kategorierna `water`, `food` och `other` som enda kategoriniva.

### Previous Story Intelligence

- Story 2.1 etablerade lokalt inventory-lager och quick-add-flode.
- Story 2.2 etablerade inventory overview-route och `InventoryCategoryGroup`.
- Inventory items finns redan i Dexie via `inventoryItems`.

### Arkitekturkrav Som Maste Foljas

- Fortsatt `local-first` via `Dexie`, ingen API-koppling.
- Route-filer ska komponera, inte innehalla lagringslogik.
- Ateranvand inventory-schema och service i stallet for att duplicera regler.
- Destruktiva handlingar ska ha tydlig bekraftelse enligt UX-kraven.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 2`, `Story 2.3`
- `_bmad-output/implementation-artifacts/2-2-view-inventory-in-clear-categories.md`
- `_bmad-output/planning-artifacts/prd.md` - `US-07 Redigera och ta bort lagerartikel`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - knapphierarki, lugn feedback

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 2.3 extracted from `epics.md`
- Existing inventory feature and overview reviewed as implementation baseline
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added item-level inventory edit and delete support on top of the existing Dexie-backed inventory flow.
- Introduced a dedicated edit route with prefilled values, shared schema validation, explicit delete confirmation, and navigation back to the overview.
- Added UI coverage for updating and deleting items; verification passed in web-only and workspace-wide test/build runs.

### File List

- `_bmad-output/implementation-artifacts/2-3-edit-and-delete-inventory-item.md`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/inventory-item-edit-route.tsx`
- `apps/web/src/features/inventory/components/edit-inventory-item-form.tsx`
- `apps/web/src/features/inventory/components/inventory-category-group.tsx`
- `apps/web/src/features/inventory/repository/inventory-repository.ts`
- `apps/web/src/features/inventory/services/inventory-service.ts`
- `apps/web/src/features/inventory/__tests__/edit-inventory-item-form.test.tsx`

### Change Log

- Implemented Story 2.3 edit/delete inventory flow and verified it with automated tests and builds.
