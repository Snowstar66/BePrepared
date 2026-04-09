# Story 3.2: Visa beredskapsstatus och nasta steg

Status: review

## Story

As a anvandare,
I want to fa en lugn statusoversikt med tydliga rekommenderade nasta steg,
so that I quickly understand min beredskapsniva utan att bli overvaldigad.

## Acceptance Criteria

1. Givet att anvandaren oppnar hem- eller oversiktsvyn, nar statusen visas, sa presenteras en `PreparednessStatusCard`, `GapSummaryCard` och `NextStepPrompt`.
2. Givet att anvandaren har komplett, partiell eller ingen data, nar oversikten laddas, sa hanteras alla tre tillstanden med begriplig feedback och ratt nasta handling.
3. Givet att anvandaren nyss har laggt till, andrat eller tagit bort en vara, nar oversikten visas efter andringen, sa visas `PreparednessDeltaFeedback` som forklarar hur beredskapen paverkades utan att farg ensam bar budskapet.
4. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for statusutrakning, tillstand och delta-feedback.

## Tasks / Subtasks

- [x] Etablera featurestruktur for statusoversikten
  - [x] Skapa `apps/web/src/features/preparedness-status/` med komponenter, service och tester
  - [x] Ateranvand gap-analysen i stallet for att duplicera kategori- och statuslogik
  - [x] Flytta hemvyn fran statisk starttext till faktisk beredskapsoversikt
- [x] Implementera status och nasta steg
  - [x] Bygg `PreparednessStatusCard`, `GapSummaryCard` och `NextStepPrompt`
  - [x] Hantera tillstand for ingen data, partiell data och komplett grundniva
  - [x] Lank vidare till profil, gap-analys eller lager beroende pa vad som saknas
- [x] Implementera delta-feedback efter lagerandringar
  - [x] Spara en liten lokal feedbackpayload efter add/edit/delete
  - [x] Visa `PreparednessDeltaFeedback` pa hemvyn efter andringen
  - [x] Hall budskapet lugnt och begripligt aven nar delta inte kan raknas exakt
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for statusservice
  - [x] Lagga till UI-test for hemvyns tillstand
  - [x] Lagga till test for delta-feedback efter lagerandring

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 3.2 ar en lugn oversikt och nasta steg, inte full inkopslista eller guideyta.
- Hemvyn far utvecklas, men ska inte bli dashboard-tung eller stressig.
- Delta-feedback far vara enkel och sanningsenlig; osaker data ska kommuniceras som osaker.

### Previous Story Intelligence

- Story 3.1 levererar redan routed gap-analys och ateranvandbar jamforelselogik.
- Story 2.1-2.3 levererar alla lagerandringar som kan trigga feedback.
- Nuvarande hemvy ar fortfarande en tillfallig shell och ar mogen att ersattas.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 3`, `Story 3.2`
- `_bmad-output/planning-artifacts/prd.md` - `US-09 Visa enkel beredskapsstatus med prioritering`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `PreparednessStatusCard`, `GapSummaryCard`, `NextStepPrompt`, `PreparednessDeltaFeedback`
- `_bmad-output/implementation-artifacts/3-1-compare-needs-against-inventory.md`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 3.2 extracted from `epics.md`
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Replaced the static home shell with a calm preparedness overview driven by reusable gap-analysis logic.
- Added `PreparednessStatusCard`, `GapSummaryCard`, `NextStepPrompt` and `PreparednessDeltaFeedback` as dedicated status components.
- Wired local delta feedback into inventory add, edit and delete flows and verified the story with focused and workspace-wide regression runs.

### File List

- `_bmad-output/implementation-artifacts/3-2-show-preparedness-status-and-next-steps.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `apps/web/src/app/app-shell.test.tsx`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/features/inventory/components/edit-inventory-item-form.tsx`
- `apps/web/src/features/inventory/components/quick-add-item-sheet.tsx`
- `apps/web/src/features/preparedness-status/lib/preparedness-delta-feedback.ts`
- `apps/web/src/features/preparedness-status/services/preparedness-status-service.ts`
- `apps/web/src/features/preparedness-status/components/preparedness-overview.tsx`
- `apps/web/src/features/preparedness-status/components/preparedness-status-card.tsx`
- `apps/web/src/features/preparedness-status/components/gap-summary-card.tsx`
- `apps/web/src/features/preparedness-status/components/next-step-prompt.tsx`
- `apps/web/src/features/preparedness-status/components/preparedness-delta-feedback.tsx`
- `apps/web/src/features/preparedness-status/__tests__/preparedness-status-service.test.ts`
- `apps/web/src/features/preparedness-status/__tests__/preparedness-overview.test.tsx`

### Change Log

- 2026-04-08: Implemented Story 3.2 with dynamic home status overview, next-step guidance and inventory delta feedback.
