# Story 1.4: Visa hushallets grundbehov for vatten och mat

Status: review

## Story

As a hushallsansvarig,
I want to se hushallets beraknade vatten- och matbehov,
so that I understand vilken grundniva hushallet bor sikta mot.

## Acceptance Criteria

1. Givet att hushallsprofil och beredskapshorisont finns sparade, nar anvandaren oppnar behovsvyn, sa visas beraknat vattenbehov och ett forenklat mal for matberedskap, och resultatet presenteras i begripliga enheter och kategorier.
2. Givet att hushallsprofilen eller beredskapshorisonten andras, nar behovsvyn laddas om eller oppdateras, sa raknas behoven om automatiskt.
3. Givet att behovsvyn visas, nar anvandaren laser resultaten, sa framgar att detta ar planeringsstod och inte medicinskt personligt rad, och eventuell husdjurspaverkan hanteras som tydligt tillagg eller separat notering.
4. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for berakningslogik och behovsvyns presentation.

## Tasks / Subtasks

- [x] Etablera featurestruktur for grundbehovsberakning
  - [x] Skapa `apps/web/src/features/preparedness-needs/` med minst `calculators/`, `components/`, `services/` och `__tests__/`
  - [x] Flytta behovsvyn fran placeholder till faktisk beraknad presentation
  - [x] Halla route-filen komponerande och lagga berakningslogik i featurelagret
- [x] Implementera vatten- och matberakning for MVP
  - [x] Definiera tydlig och enkel MVP-regel for vattenbehov baserat pa hushallsprofil och vald horisont
  - [x] Definiera ett forenklat mal for matberedskap i begripliga enheter
  - [x] Hantera barn och husdjur pa ett tydligt satt utan att ge sken av falsk precision
- [x] Presentera behovsvyn med lugn och begriplig informationshierarki
  - [x] Visa vattenbehov i minst totalt och per dygn
  - [x] Visa matmal i tydliga kategorier eller malnivaer
  - [x] Visa en tydlig planeringsdisclaimer och nasta steg utan alarmistisk ton
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for berakningslogiken
  - [x] Lagga till UI-test for behovsvyn med sparad profil och horisont
  - [x] Bekrafta att guard-beteendet fran Story 1.3 fortfarande fungerar

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 1.4 ar att visa hushallets grundbehov for vatten och mat med enkel MVP-logik.
- Bygg inte gap-analys, shoppinglista eller lagerjamforelse har. Det hores till Epic 3.
- Undvik avancerade nutritions- eller kaloriberakningar.
- Hall reglerna forklarbara och tydligt markerade som planeringsstod.

### Previous Story Intelligence

- Story 1.2 etablerade hushallsprofilen lokalt.
- Story 1.3 etablerade vald beredskapshorisont och guardad behovsvy pa `/behov`.
- Dexie-lagret har redan `householdProfiles` och `preparednessHorizons`.
- Behovsvyn har redan ett guard-lager som endast ska kompletteras, inte ersattas.

### MVP Calculation Notes

- PRD:n sager att vattenbehov ska visas i begriplig enhet, exempelvis totalt och per dygn.
- PRD:n sager att matmalet ska vara forenklat och uttryckligen inte tacka medicinska eller dietrelaterade specialbehov fullt ut.
- PRD:n lamnar den exakta regeln for barns och husdjurs paverkan oppen. I den har implementationen ska vald regel goras tydlig i UI och kodkommentarer for att undvika dold logik.

### UX Notes

- Status fore detaljer.
- Visa bara den information som behovs for nasta beslut.
- Lugna kort eller sektioner ar battre an tatt packad tabell.
- Nasta steg bor hjalpa anvandaren vidare mot kommande lagerarbete utan att simulera senare stories.

### Testing Requirements

- Testa berakningsreglerna som ren funktionalitet.
- Testa att behovsvyn visar ratt resultat nar hushallsprofil och horisont finns.
- Testa att planeringsdisclaimer visas tillsammans med resultaten.
- Behall guard-beteendet intakt.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 1`, `Story 1.4`
- `_bmad-output/planning-artifacts/prd.md` - `US-03`, `US-04`
- `_bmad-output/implementation-artifacts/1-3-select-preparedness-horizon.md`
- `_bmad-output/planning-artifacts/ux-design-specification.md`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 1.4 extracted from `epics.md`
- PRD requirements reviewed for water and food presentation rules
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a dedicated preparedness-needs feature with calculator, service and needs overview UI
- Replaced the needs placeholder with actual water and food planning output based on saved household profile and preparedness horizon
- Made MVP assumptions explicit in the UI by showing the child-handling rule and a separate pets note instead of hidden precision
- Verified the story with focused web checks and full workspace regression runs

### File List

- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/1-4-show-household-baseline-water-and-food-needs.md`
- `apps/web/src/app/routes/needs-route.tsx`
- `apps/web/src/features/preparedness-horizon/schemas/preparedness-horizon-schema.ts`
- `apps/web/src/features/preparedness-horizon/__tests__/needs-route.test.tsx`
- `apps/web/src/features/preparedness-horizon/__tests__/preparedness-horizon-profile-route.test.tsx`
- `apps/web/src/features/preparedness-needs/calculators/baseline-needs-calculator.ts`
- `apps/web/src/features/preparedness-needs/components/preparedness-needs-overview.tsx`
- `apps/web/src/features/preparedness-needs/services/preparedness-needs-service.ts`
- `apps/web/src/features/preparedness-needs/__tests__/baseline-needs-calculator.test.ts`

### Change Log

- 2026-04-08: Implemented Story 1.4 with baseline water and food needs, explicit MVP assumptions and updated needs-view tests.
