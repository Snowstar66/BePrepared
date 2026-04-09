# Story 3.1: Jamfor behov mot lager

Status: review

## Story

As a hushallsansvarig,
I want to jamfora mitt registrerade lager mot hushallets beraknade behov,
so that I can se vilka gap som finns.

## Acceptance Criteria

1. Givet att hushallsprofil, beredskapshorisont och lagerdata finns, nar anvandaren oppnar gap-analysen, sa visas behov, registrerat lager och gap per relevant kategori.
2. Givet att hushallsprofil eller lager andras, nar gap-analysen visas pa nytt, sa uppdateras jamforelsen automatiskt.
3. Givet att lagerdata ar ofullstandig eller inte gar att omsatta exakt, nar gap-analysen presenteras, sa markeras osakerhet tydligt i stallet for falsk precision.
4. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for centrala berakningsfall och gap-analysens UI.

## Tasks / Subtasks

- [x] Etablera gap-analysens featurestruktur
  - [x] Skapa `apps/web/src/features/preparedness-gap/` med minst `calculators/`, `components/`, `services/` och `__tests__/`
  - [x] Skapa en dedikerad route for gap-analysen och koppla den till befintlig router
  - [x] Lank in till gap-analysen fran befintliga behovs- eller lagerfloden utan att vanta pa Story 3.2
- [x] Implementera behov-vs-lager-jamforelsen
  - [x] Ateranvand hushallsprofil, beredskapshorisont, baseline needs och inventory-data i stallet for att duplicera logik
  - [x] Visa jamforelse for minst vatten och mat som relevanta kategorier
  - [x] Markera osaker enhetsdata som osakerhet i stallet for att rakna om allt till exakta siffror
- [x] Bygg lugn och begriplig gap-analysvy
  - [x] Visa behov, registrerat lager och gap i tydliga kort eller sektioner
  - [x] Visa vad som maste kompletteras om profil eller planeringshorisont saknas
  - [x] Peka vidare till lageroversikt eller quick-add nar gap finns
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for exakta och osakra gap-fall
  - [x] Lagga till UI-test for gap-analysen
  - [x] Bekrafta att uppdaterad lagerdata slar igenom nar vyn laddas om

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 3.1 ar jamforelsen mellan behov och registrerat lager.
- Bygg inte full statusoverblick, delta-feedback eller inkopslista har. Det hores till Story 3.2 och 3.3.
- Visa hellre en lower-bound eller osakerhetsnotis an att hitta pa exakta omrakningar for vatten- eller matenheter.

### Previous Story Intelligence

- Story 1.4 levererar redan basbehov for vatten och mat via `PreparednessNeedsService`.
- Story 2.1-2.3 levererar lokalt inventorylager, oversikt och edit/delete.
- `NeedsPrerequisiteGuard` finns redan och kan ateranvandas om det hjalper.

### Arkitekturkrav Som Maste Foljas

- Fortsatt `local-first` via `Dexie`, ingen API-koppling.
- Route-filer ska komponera, inte innehalla berakningslogik.
- Ateranvand existerande services och schema innan nya modeller introduceras.
- UI ska vara lugnt, begripligt och mobil-forst enligt UX-specen.

### Gapanalys-Regler For MVP

- Relevanta kategorier i denna story ar minst `water` och `food`.
- Vatten far raknas exakt bara nar enheten gar att tolka som liter.
- Mat far raknas exakt bara nar enheten uttryckligen motsvarar maltider eller portioner.
- Vid andra enheter ska vyn visa vad som ar kant och vad som ar osakert, i stallet for att ge sken av precision.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 3`, `Story 3.1`
- `_bmad-output/planning-artifacts/prd.md` - `US-08 Jamfor behov mot lager`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - lugn status, gap och nasta steg
- `_bmad-output/implementation-artifacts/1-4-show-household-baseline-water-and-food-needs.md`
- `_bmad-output/implementation-artifacts/2-3-edit-and-delete-inventory-item.md`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 3.1 extracted from `epics.md`
- Existing needs and inventory implementations reviewed as baseline
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a dedicated preparedness-gap feature with calculator, service and routed gap-analysis UI.
- Implemented truth-preserving water and food comparisons that only use exact numbers when units support them and otherwise surface uncertainty explicitly.
- Linked the new gap analysis into existing needs and inventory flows and verified the story with focused and workspace-wide regression runs.

### File List

- `_bmad-output/implementation-artifacts/3-1-compare-needs-against-inventory.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/gap-analysis-route.tsx`
- `apps/web/src/features/inventory/components/inventory-overview.tsx`
- `apps/web/src/features/preparedness-gap/calculators/preparedness-gap-calculator.ts`
- `apps/web/src/features/preparedness-gap/components/preparedness-gap-analysis.tsx`
- `apps/web/src/features/preparedness-gap/services/preparedness-gap-service.ts`
- `apps/web/src/features/preparedness-gap/__tests__/preparedness-gap-calculator.test.ts`
- `apps/web/src/features/preparedness-gap/__tests__/preparedness-gap-analysis.test.tsx`
- `apps/web/src/features/preparedness-needs/components/preparedness-needs-overview.tsx`

### Change Log

- 2026-04-08: Implemented Story 3.1 with routed gap analysis, uncertainty-aware category comparisons and automated verification.
