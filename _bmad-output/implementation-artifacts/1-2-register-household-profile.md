# Story 1.2: Registrera hushallsprofil

Status: review

## Story

As a hushallsansvarig,
I want to registrera antal vuxna samt valfria uppgifter om barn och husdjur,
so that the app can berakna ett relevant grundbehov for mitt hushall.

## Acceptance Criteria

1. Givet att anvandaren ar i profilflodet, nar hushallsprofilen fylls i och sparas, sa kan anvandaren ange minst antal vuxna samt valfria uppgifter om barn och husdjur, och formularet valideras med tydliga fel nara faltet utan att tidigare input raderas.
2. Givet att hushallsprofilen sparas korrekt, nar anvandaren oppnar appen igen, sa finns profiluppgifterna kvar lokalt, och datat lagras enligt `local-first`-principen i klientens lokala lagringslager.
3. Givet att utvecklingsteamet verifierar storyn, nar automatiserade tester kors, sa finns testtackning for att skapa och validera hushallsprofilen, och centrala formular ar semantiskt uppmarkta och skarmlasarvanliga.

## Tasks / Subtasks

- [x] Etablera featurestrukturen for hushallsprofil i webben
  - [x] Skapa `apps/web/src/features/household-profile/` med minst `components/`, `schemas/`, `services/`, `repository/` och `__tests__/`
  - [x] Skapa `apps/web/src/app/routes/profile-route.tsx` och koppla routen till befintlig router
  - [x] Koppla befintlig startvy till profilflodet sa att `Kom igang` faktiskt leder till formularet
- [x] Infors formular- och valideringsgrunden for hushallsprofil
  - [x] Installera och konfigurera `react-hook-form`, `zod` och vid behov `@hookform/resolvers`
  - [x] Definiera ett tydligt schema for hushallsprofil med krav pa minst en vuxen
  - [x] Sakerstall att valideringsfel visas falt-nara utan att rensa tidigare input
- [x] Infors lokal lagringsmodell for hushallsprofil
  - [x] Installera och konfigurera `Dexie` for lokal klientlagring
  - [x] Skapa en liten lokal databasadapter eller repository for hushallsprofilen
  - [x] Spara och aterlas hushallsprofilen sa att data finns kvar efter appomstart
- [x] Bygg ett tillgangligt profilformular
  - [x] Anvand semantisk HTML med label-koppling, field grouping och tydliga beskrivningar
  - [x] Gor `antal vuxna` obligatoriskt och `antal barn` samt `husdjur` valfria
  - [x] Hall upplevelsen mobil-forst och enkel, utan att overbygga designsystem i denna story
- [x] Verifiera storyn med tester
  - [x] Lagga till tester for schemas/validering
  - [x] Lagga till tester for repository/lokal lagring eller motsvarande servicegrans
  - [x] Lagga till UI-test som verifierar att formularet renderas, valideras och kan sparas utan att rensa input

## Dev Notes

### Story Scope Guardrails

- Fokus i Story 1.2 ar registrering, validering och lokal persistens av hushallsprofilen.
- Leverera inte berakning av behov, beredskapshorisont eller statusfeedback i denna story. Det hores till Story 1.3 och 1.4.
- Leverera inte serverpersistens eller API-koppling for hushallsprofilen i denna story. Arkitekturen ar `local-first`.
- Bygg inte ett helt designsystem eller generisk formularkomponentplattform har. Halla implementationen tunn och feature-fokuserad.

### Previous Story Intelligence

- Story 1.1 etablerade redan workspace, `apps/web`, `apps/api` och `packages/shared`.
- Webben har idag:
  - `apps/web/src/app/router.tsx`
  - `apps/web/src/app/routes/home-route.tsx`
  - ett minimalt appskal med CTA-knappen `Kom igang`
- API:t har redan en separat baseline med `Pino`, `traceId` och `GET /api/v1/health`, men hushallsprofilen ska inte anvanda API:t i denna story.
- Shared-paketet finns och innehaller idag bara ett health-kontrakt. Anvand inte `packages/shared` i onodan om datat inte ar ett externt kontrakt an.

### Arkitekturkrav Som Maste Foljas

- Klienten ska folja `local-first, sync-optional`.
- Anvandardata ska lagras primart lokalt i `IndexedDB` via `Dexie`.
- Formhantering ska ske med `react-hook-form`.
- Validering ska ske med `Zod`.
- Feature-baserad struktur galler: hushallsprofilen ska bo i `apps/web/src/features/household-profile/`.
- Route-filer ska komponera, inte innehalla featurelogik.
- Feature-komponenter ska inte prata direkt med lagring om ett repository eller en service redan finns.

### Rekommenderad Filstruktur For Denna Story

- `apps/web/src/app/router.tsx` uppdateras med profilroute
- `apps/web/src/app/routes/home-route.tsx` uppdateras sa att CTA leder vidare
- `apps/web/src/app/routes/profile-route.tsx`
- `apps/web/src/features/household-profile/components/household-profile-form.tsx`
- `apps/web/src/features/household-profile/schemas/household-profile-schema.ts`
- `apps/web/src/features/household-profile/services/household-profile-service.ts`
- `apps/web/src/features/household-profile/repository/household-profile-repository.ts`
- `apps/web/src/features/household-profile/__tests__/...`
- `apps/web/src/shared/lib/dexie/` kan introduceras nu om det behovs for att undvika feature-lokal db-duplicering

### Datamodell For Storyn

Minsta hushallsprofil i denna story bor innehalla:
- `adults: number`
- `children?: number`
- `hasPets: boolean`
- eventuellt metadata som `updatedAt`

Viktiga regler:
- minst en vuxen maste anges
- barn ar valfritt och far vara `0`
- husdjur ska i denna story registreras som enkel boolesk eller enkel flagga, inte som avancerad artspecifik modell

### Formular- Och UX-krav

- Formularet ska vara semantiskt uppmarkt och skarmlasarvanligt.
- Fel ska visas nara faltet, inte bara globalt.
- Tidigare inmatad data far inte forsvinna vid valideringsfel.
- Upplevelsen ska kannas mobil-forst och lagfriktionsbaserad.
- Undvik formulartunga monster med onodiga steg eller administrativa begrepp.
- Tomlaget ska vara vagledande: anvandaren ska forsta att detta ar forsta vettiga steget i appen.

### Lagringskrav

- Lokal lagring ska ske med `Dexie` ovanpa `IndexedDB`.
- Implementationen ska vara robust nog for att Story 1.3 och 1.4 senare kan lasa samma hushallsprofil.
- Datalagret ska exponeras via repository/service, inte bindas direkt in i routekomponenten.
- Data ska aterlasas nar appen oppnas igen.

### Testing Requirements

- Valideringslogiken ska ha egna tester.
- Lokal lagring eller repositorygransen ska testas explicit.
- UI-test ska verifiera:
  - att formularet renderas
  - att minst antal vuxna kravvalideras
  - att valfria falt kan fyllas i
  - att inmatad data inte rensas vid fel
  - att sparning leder till kvarvarande data i formularet eller vid aterrendering

### Dependency Expectations

Denna story kommer sannolikt behova dessa nya beroenden i webben:
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `dexie`

Det ligger i linje med arkitekturdokumentet och ska inte betraktas som scope-glidning om de installeras for att uppfylla storyn.

### Current Repo Reality

- `apps/web` ar redan scaffoldad och buildbar.
- `apps/api` ar redan scaffoldad och testad.
- Inga tidigare commits finns i git, sa lita pa filerna pa disk snarare an git-historik.
- `dist/` och `node_modules/` finns redan efter Story 1.1 och ska inte redigeras manuellt.

### Definition Of Done For Dev

- Profilrouten finns och ar navigerbar fran startvyn
- Ett formulär for hushallsprofil finns i featurestrukturen
- Validering fungerar enligt AC utan att rensa tidigare input
- Hushallsprofilen sparas lokalt via `Dexie`-baserat lagringslager
- Sparad profil kan aterlasas efter appomstart eller ny rendercykel
- Testtackning finns for validering, lokal lagring och UI-beteende
- Inget behovsberaknings- eller statusscope har dragits in for tidigt

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 1`, `Story 1.2`
- `_bmad-output/implementation-artifacts/1-1-initialize-monorepo-app-shell-and-health-endpoint.md` - tidigare implementation, filstruktur, verifieringslogg
- `_bmad-output/planning-artifacts/architecture.md` - `Core Architectural Decisions`, `Data Architecture`, `Frontend Architecture`, `Architectural Boundaries`, `Requirements to Structure Mapping`
- `_bmad-output/planning-artifacts/prd.md` - `US-01 Registrera hushallsprofil`, `Designprinciper For Krisapp`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `Project Vision`, `Formmonster`, `Responsive Strategy`, `Accessibility Strategy`, `Implementation Guidelines`
- `_bmad-output/project-context.md` - `Technology Stack`, `Critical Rules`

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Story 1.1 implementation reviewed for actual repo state
- Sprint status confirms `1-2-register-household-profile` was next backlog item
- No git commit history available; source of truth is current workspace
- `pnpm install`
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/web build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a dedicated household-profile feature with schema, repository, service and accessible form UI
- Wired the home CTA to a new `/profil` route and kept route files focused on composition
- Persisted the household profile locally with Dexie so saved values reload on a new render
- Added schema, repository and UI tests, plus IndexedDB test setup for Dexie-backed persistence
- Verified the story with `pnpm --filter @beprepared/web test`, `pnpm --filter @beprepared/web lint`, `pnpm --filter @beprepared/web build`, `pnpm test` and `pnpm build`

### File List

- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/1-2-register-household-profile.md`
- `apps/web/package.json`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/app/routes/profile-route.tsx`
- `apps/web/src/features/household-profile/components/household-profile-form.tsx`
- `apps/web/src/features/household-profile/repository/household-profile-repository.ts`
- `apps/web/src/features/household-profile/schemas/household-profile-schema.ts`
- `apps/web/src/features/household-profile/services/household-profile-service.ts`
- `apps/web/src/features/household-profile/__tests__/household-profile-form.test.tsx`
- `apps/web/src/features/household-profile/__tests__/household-profile-repository.test.ts`
- `apps/web/src/features/household-profile/__tests__/household-profile-schema.test.ts`
- `apps/web/src/shared/lib/dexie/app-db.ts`
- `apps/web/src/test/setup.ts`
- `pnpm-lock.yaml`

### Change Log

- 2026-04-08: Implemented Story 1.2 with local-first household profile capture, Dexie persistence, routing updates and automated tests.
