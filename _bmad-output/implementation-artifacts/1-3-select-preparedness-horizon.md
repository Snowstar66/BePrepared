# Story 1.3: Valja beredskapshorisont

Status: review

## Story

As a hushallsansvarig,
I want to valja vilken beredskapsperiod hushallet planerar for,
so that behov och rekommendationer raknas mot ratt niva.

## Acceptance Criteria

1. Givet att anvandaren har oppnat hushallsprofilen, nar anvandaren valjer beredskapshorisont, sa kan minst `72 timmar` och `7 dagar` valjas, och vald period sparas lokalt och visas tydligt i profilens sammanfattning.
2. Givet att ingen beredskapshorisont ar vald, nar anvandaren forsoker ga vidare till behovs- eller oversiktsvyer, sa visas en tydlig uppmaning att valja period, och appen undviker att visa skenbart exakta behov utan fullstandig grunddata.
3. Givet att storyn verifieras, nar automatiserade tester kors, sa finns testtackning for lokal lagring, val av horisont och guard-beteende for behovsvyn.

## Tasks / Subtasks

- [x] Etablera featurestruktur for beredskapshorisont
  - [x] Skapa `apps/web/src/features/preparedness-horizon/` med minst `components/`, `schemas/`, `services/`, `repository/` och `__tests__/`
  - [x] Utoka routingen med en behovsvy som senare kan fyllas med berakningar
  - [x] Koppla profilflodet till behovsvyn med en tydlig nasta handling
- [x] Bygg val och lokal persistens for beredskapshorisont
  - [x] Definiera schema och valbara alternativ for minst `72 timmar` och `7 dagar`
  - [x] Lagga till Dexie-baserad lagring via repository/service
  - [x] Visa sparad horisont i profilens sammanfattning
- [x] Skydda behovsvyn mot ofullstandig grunddata
  - [x] Visa tydlig guard-nar hushallsprofil eller horisont saknas
  - [x] Undvik att visa exakta behovstal innan full grunddata finns
  - [x] Gor guarden lugn, vagledande och mobil-forst
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for schema och repository eller service
  - [x] Lagga till UI-test for att valja och spara horisont
  - [x] Lagga till test for behovsvyns guard-beteende

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 1.3 ar att valja och spara beredskapshorisont samt att skydda behovsvyn mot ofullstandig grunddata.
- Leverera inte de faktiska vatten- eller matberakningarna i denna story. Det hores till Story 1.4.
- Undvik att bygga generell settings-infrastruktur eller fler planeringsperioder an de som kravs nu.
- Behall implementationen `local-first` och klientfokuserad utan API-koppling.

### Previous Story Intelligence

- Story 1.2 etablerade hushallsprofilen i `apps/web/src/features/household-profile/` med `react-hook-form`, `zod` och `Dexie`.
- Dexie-bas finns redan i `apps/web/src/shared/lib/dexie/app-db.ts`.
- Profilflodet finns redan pa `/profil` och startvyns CTA leder dit.
- Formularet sparar lokalt och kan aterlasa data, vilket bor ateranvandas som monster.

### Arkitekturkrav Som Maste Foljas

- Klienten ska fortsatt folja `local-first, sync-optional`.
- Lokal anvandardata ska fortsatt lagras i `IndexedDB` via `Dexie`.
- Feature-baserad struktur galler ocksa for beredskapshorisonten.
- Route-filer ska komponera, inte hysa affarslogik.
- Validering ska ske med `Zod`.
- UI:t ska vara mobil-forst och tillgangligt med tydliga touchytor och semantisk struktur.

### Rekommenderad Filstruktur For Denna Story

- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/profile-route.tsx`
- `apps/web/src/app/routes/needs-route.tsx`
- `apps/web/src/features/preparedness-horizon/components/preparedness-horizon-selector.tsx`
- `apps/web/src/features/preparedness-horizon/components/preparedness-horizon-summary.tsx`
- `apps/web/src/features/preparedness-horizon/components/needs-prerequisite-guard.tsx`
- `apps/web/src/features/preparedness-horizon/schemas/preparedness-horizon-schema.ts`
- `apps/web/src/features/preparedness-horizon/repository/preparedness-horizon-repository.ts`
- `apps/web/src/features/preparedness-horizon/services/preparedness-horizon-service.ts`
- `apps/web/src/features/preparedness-horizon/__tests__/...`
- `apps/web/src/shared/lib/dexie/app-db.ts`

### Data Model Notes

- Horisonten kan modelleras som ett litet lokalt record med:
  - `id: 'primary'`
  - `horizon: '72-hours' | '7-days'`
  - `label: string`
  - `updatedAt: string`
- Hall modellen enkel och framtidssaker utan att overabstrahera.

### UX Notes

- Valet ska vara enkelt att forsta och snabbt att trycka pa pa mobil.
- Sammanfattningen ska tydligt visa vilken period som ar vald.
- Guarden i behovsvyn ska vaga anvandaren vidare till profilflodet i stallet for att blockera med tekniskt sprak.
- Behall lugn ton och undvik alarmistiska ordval.

### Testing Requirements

- Testa att horisonten kan valjas och sparas lokalt.
- Testa att sparad horisont aterlasas i profilen.
- Testa att behovsvyn visar guard nar horisonten saknas.
- Testa att guarden forsvinner nar grunddata finns.

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 1`, `Story 1.3`
- `_bmad-output/implementation-artifacts/1-2-register-household-profile.md`
- `_bmad-output/planning-artifacts/architecture.md`
- `_bmad-output/planning-artifacts/prd.md`
- `_bmad-output/planning-artifacts/ux-design-specification.md`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 1.3 extracted from `epics.md`
- Existing profile flow and Dexie setup reviewed from Story 1.2 implementation
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a dedicated preparedness-horizon feature with local schema, Dexie persistence and reusable UI components
- Extended the profile route with saved horizon summary, selectable planning periods and a next-step link to the needs view
- Added a guarded `/behov` route that blocks exact needs output until both household profile and planning period exist
- Verified the story with focused web checks plus full workspace regression runs

### File List

- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/1-3-select-preparedness-horizon.md`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/needs-route.tsx`
- `apps/web/src/app/routes/profile-route.tsx`
- `apps/web/src/features/household-profile/services/household-profile-service.ts`
- `apps/web/src/features/preparedness-horizon/components/needs-prerequisite-guard.tsx`
- `apps/web/src/features/preparedness-horizon/components/preparedness-horizon-selector.tsx`
- `apps/web/src/features/preparedness-horizon/components/preparedness-horizon-summary.tsx`
- `apps/web/src/features/preparedness-horizon/repository/preparedness-horizon-repository.ts`
- `apps/web/src/features/preparedness-horizon/schemas/preparedness-horizon-schema.ts`
- `apps/web/src/features/preparedness-horizon/services/preparedness-horizon-service.ts`
- `apps/web/src/features/preparedness-horizon/__tests__/needs-route.test.tsx`
- `apps/web/src/features/preparedness-horizon/__tests__/preparedness-horizon-profile-route.test.tsx`
- `apps/web/src/features/preparedness-horizon/__tests__/preparedness-horizon-repository.test.ts`
- `apps/web/src/features/preparedness-horizon/__tests__/preparedness-horizon-schema.test.ts`
- `apps/web/src/shared/lib/dexie/app-db.ts`

### Change Log

- 2026-04-08: Implemented Story 1.3 with local preparedness-horizon selection, profile summary integration and needs-view guarding.
