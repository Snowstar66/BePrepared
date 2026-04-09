# Story 2.2: Visa lagret i tydliga kategorier

Status: review

## Story

As a anvandare,
I want to se mitt lager grupperat i begripliga kategorier,
so that I quickly can forsta vad hushallet redan har hemma.

## Acceptance Criteria

1. Givet att lagret innehaller artiklar, nar anvandaren oppnar lageroversikten, sa visas artiklarna grupperade i minst vatten, mat och ovrigt via `InventoryCategoryGroup`, och varje kategori visar antal artiklar och relevant sammanfattning dar det ar mojligt.
2. Givet att en kategori saknar artiklar eller att hela lagret ar tomt, nar oversikten visas, sa presenteras ett vagledande tomlage med nasta rekommenderade steg, och informationshierarkin ar enkel att skanna pa mobil och desktop.
3. Givet att utvecklingsteamet verifierar storyn, nar automatiserade tester kors, sa finns testtackning for gruppering, sammanfattningar och tomlagen.

## Tasks / Subtasks

- [x] Etablera inventory overview-sparet ovanpa befintlig inventory-feature
  - [x] Skapa `apps/web/src/app/routes/inventory-overview-route.tsx` och koppla routen till befintlig router
  - [x] Skapa komponenten `InventoryCategoryGroup` i `apps/web/src/features/inventory/components/`
  - [x] Ateranvand `InventoryService` och lokalt lagrade `inventoryItems` i stallet for att skapa ny datavag
- [x] Bygg kategorigrupperingen for minst vatten, mat och ovrigt
  - [x] Skapa en tunn grouping/summarizing-funktion i `apps/web/src/features/inventory/`
  - [x] Visa artiklar grupperade i minst `water`, `food` och `other`
  - [x] Visa antal artiklar per kategori och enkel sammanfattande mangd nar det ar rimligt
- [x] Hantera tomlagen och nasta steg
  - [x] Visa ett tydligt tomlage nar hela lagret ar tomt
  - [x] Visa tydligt tomt tillstand for en enskild kategori utan att det ser ut som fel
  - [x] Lank eller peka vidare till quick-add-flodet i stallet for att bygga edit/delete i denna story
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for gruppering och sammanfattningslogik
  - [x] Lagga till UI-test for oversikt med sparade artiklar i flera kategorier
  - [x] Lagga till UI-test for tomt lager och/eller tom kategori

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 2.2 ar att visa lagret, inte att andra artiklar. Redigera och ta bort hores till Story 2.3.
- Hall kategorierna till minst `water`, `food` och `other`. Bygg inte en stor taxonomi i denna story.
- Sammanfattningar ska vara enkla och forklarbara. Undvik avancerad normalisering mellan olika enheter.
- Om en kategori har blandade enheter ar det battre att visa antal artiklar an att hitta pa precisionssiffror.

### Previous Story Intelligence

- Story 2.1 etablerade `apps/web/src/features/inventory/` med:
  - `components/quick-add-item-sheet.tsx`
  - `schemas/inventory-item-schema.ts`
  - `repository/inventory-repository.ts`
  - `services/inventory-service.ts`
  - lokalt Dexie-bord `inventoryItems`
- Routes som redan finns:
  - `apps/web/src/app/routes/inventory-quick-add-route.tsx`
  - `apps/web/src/app/routes/home-route.tsx`
  - `apps/web/src/app/routes/needs-route.tsx`
- Home- och needs-vyerna pekar redan in mot inventoryflodet med `Lagg till vara`, vilket bor ateranvandas som nasta steg fran tomlagen ocksa.

### Arkitekturkrav Som Maste Foljas

- Fortsatt `local-first` via `Dexie`; ingen API-koppling i denna story.
- Feature-baserad struktur galler fortsatt for inventory.
- Route-filer ska komponera, inte innehalla grupplogik.
- Ateranvand existerande schema/service/repository innan ny abstraktion introduceras.
- Behall semantisk HTML, tillgangliga rubriker, listor och touchvanliga handlingar.

### Rekommenderad Filstruktur For Denna Story

- `apps/web/src/app/router.tsx` uppdateras med inventory overview-route
- `apps/web/src/app/routes/inventory-overview-route.tsx`
- `apps/web/src/features/inventory/components/inventory-category-group.tsx`
- `apps/web/src/features/inventory/components/inventory-overview.tsx`
- `apps/web/src/features/inventory/services/inventory-service.ts` kan utokas for listing/summary om det behovs
- `apps/web/src/features/inventory/utils/group-inventory-items.ts` eller liknande tunn helper
- `apps/web/src/features/inventory/__tests__/...`

### Datamodell Och Sammanfattningsregler

- Utga fran befintligt `InventoryItemRecord` i `apps/web/src/features/inventory/schemas/inventory-item-schema.ts`.
- Minsta grupperingsnyckel ar `category`.
- Minsta sammanfattning per kategori:
  - antal artiklar
  - om alla artiklar delar samma enhet kan total mangd visas
  - om enheter ar blandade, visa bara antal artiklar och undvik falsk precision

### UX- Och Komponentkrav

- `InventoryCategoryGroup` ar uttryckligen namngiven i UX-specen och ska implementeras nu.
- Minst dessa tillstand ska stojas:
  - kategori med artiklar
  - tom kategori
  - helt tomt lager
- Oversikten ska vara latt att skanna pa mobil med tydlig rubrikhierarki och lag visuell belastning.
- Tomlagen ska vara vagledande och peka vidare till `QuickAddItemSheet`, inte bara konstatera att nagot saknas.

### Testing Requirements

- Testa gruppering som ren funktionalitet separat fran UI.
- Testa att oversikten visar minst vatten, mat och ovrigt korrekt nar data finns.
- Testa att tomt lager visar vagledande empty state.
- Testa att sammanfattningar inte overdriver precision nar enheter ar blandade.

### Current Repo Reality

- `apps/web` ar buildbar och har nu stories 1.1-1.4 samt 2.1 implementerade.
- `apps/web/src/shared/lib/dexie/app-db.ts` innehaller nu `householdProfiles`, `preparednessHorizons` och `inventoryItems`.
- `InventoryRepository.listItems()` returnerar redan lokalt sparade artiklar i stabil ordning, vilket bor anvandas som input till overviewn.
- Inga git-commits finns som tillforlitlig historik, sa filerna pa disk ar source of truth.

### Definition Of Done For Dev

- Lageroversikten ar routad och navigerbar
- Artiklar visas grupperade i minst vatten, mat och ovrigt
- Varje kategori visar enkel men sanningsenlig sammanfattning
- Tomt lager och tom kategori har tydliga och vagledande tillstand
- Testtackning finns for grouping-logik och overview-UI
- Ingen edit/delete-funktionalitet har smugit in

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 2`, `Story 2.2`
- `_bmad-output/implementation-artifacts/2-1-add-inventory-item-with-quick-form.md` - inventory feature, Dexie table, quick-add route och entry points
- `_bmad-output/planning-artifacts/prd.md` - `US-06 Visa lagret i relevanta kategorier`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `InventoryCategoryGroup`, inventory/list-driven language, empty states
- `_bmad-output/project-context.md` - mobil forst, feature-baserad struktur, tester for kritiska floden

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 2.2 extracted from `epics.md`
- PRD and UX requirements reviewed for category grouping and empty-state behavior
- Story 2.1 implementation reviewed for current inventory feature structure and storage model
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a routed inventory overview with `InventoryCategoryGroup` and a reusable grouping helper
- Implemented truth-preserving category summaries that show totals only when units match and fall back to article counts otherwise
- Added guided empty states for both an empty inventory and empty categories, all pointing back to the quick-add flow
- Verified the story with focused web checks and full workspace regression runs

### File List

- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/2-2-view-inventory-in-clear-categories.md`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/app/routes/inventory-overview-route.tsx`
- `apps/web/src/app/routes/inventory-quick-add-route.tsx`
- `apps/web/src/features/inventory/components/inventory-category-group.tsx`
- `apps/web/src/features/inventory/components/inventory-overview.tsx`
- `apps/web/src/features/inventory/utils/group-inventory-items.ts`
- `apps/web/src/features/inventory/__tests__/group-inventory-items.test.ts`
- `apps/web/src/features/inventory/__tests__/inventory-overview.test.tsx`

### Change Log

- 2026-04-08: Implemented Story 2.2 with grouped inventory overview, guided empty states and summary logic that avoids false precision.
