# Story 1.1: Initiera monorepo, appskal och health endpoint

Status: review

## Story

As a utvecklingsteam,
I want to initiera BePrepared som ett monorepo med ett minimalt webbskal och ett fungerande API-health endpoint,
so that kommande stories kan byggas pa en stabil och verifierbar grund.

## Acceptance Criteria

1. Givet att projektet initieras, nar repositorystrukturen skapas, sa finns `apps/web`, `apps/api` och `packages/shared`, och webben ar scaffoldad med `Vite React TypeScript` medan API:t ar scaffoldat med `Express` och `TypeScript`.
2. Givet att utvecklaren startar webbappen, nar appen oppnas i webblasaren, sa visas ett minimalt appskal med startvy och grundlaggande routing via `React Router`.
3. Givet att API:t ar igang, nar `/api/v1/health` anropas, sa returneras en halsorespons och begaran loggas strukturerat med `Pino` och `traceId`.

## Tasks / Subtasks

- [x] Etablera workspace och monorepo-grund
  - [x] Skapa root-setup for workspacepaket och delade scripts
  - [x] Skapa katalogerna `apps/web`, `apps/api` och `packages/shared`
  - [x] Lagga till grundlaggande `package.json`/`tsconfig`-struktur utan att forutsatta auth, databas eller offlinefunktioner i denna story
- [x] Scaffolda webbappen i `apps/web` med officiell Vite React TypeScript-starter
  - [x] Behall scaffolden minimal och undvik att ta pa full designsystem- eller featureimplementation i Story 1.1
  - [x] Satt upp en enkel app-entry och en minimal startsida
  - [x] Installera och konfigurera `React Router` for grundlaggande routing
- [x] Scaffolda API:t i `apps/api` som en separat Express TypeScript-baseline
  - [x] Skapa `src/app.ts` och `src/server.ts`
  - [x] Skapa en egen health-feature for tekniska endpoints
  - [x] Exponera `GET /api/v1/health`
- [x] Etablera backendloggning och request context
  - [x] Skapa en logger-konfiguration med `Pino`
  - [x] Generera eller propagara `traceId` per request via middleware
  - [x] Se till att health-anrop loggas strukturerat
- [x] Etablera minsta delade grund i `packages/shared`
  - [x] Skapa ett paket for delade typer/kontrakt som senare stories kan bygga vidare pa
  - [x] Undvik att overdesigna shared-lagret i denna story
- [x] Satt upp grundlaggande tester och verifiering
  - [x] Lagga till minst ett enkelt test for health-endpointen i API:t
  - [x] Verifiera att webben renderar det minimala appskalet utan featurelogik
  - [x] Dokumentera kommandon som behovs for att starta web och api lokalt

## Dev Notes

### Story Scope Guardrails

- Den godkanda course-correctionen smalnade av Story 1.1. Bygg endast grundplattformen: monorepo, minimalt webbskal, routing och health endpoint.
- Leverera inte full designsystemsefterlevnad, full responsiv verifiering eller komplett accessibility-implementation i denna story. Det ar tvargaende kvalitetskrav som fortsatter over flera stories.
- Leverera inte featurelogik for hushallsprofil, lager, status, guider, offline-sync eller export/import i denna story.

### Repo Reality

- Reporot innehaller just nu inga `apps/`- eller `packages/`-kataloger. Storyn ska alltsa skapa strukturen fran noll.
- Git-repot har inga commits an. Det finns inga tidigare implementationsmonster att ateranvanda i kodbasen.
- Det finns ingen tidigare storyfil i implementation-artifacts for Epic 1. Detta ar forsta dev-starten.

### Arkitekturkrav Som Maste Foljas

- Frontend ska byggas som `React + TypeScript + Vite`.
- Backend ska byggas som separat `Express 5`-tjanst med TypeScript.
- Routing i webben ska bygga pa `React Router`.
- Loggning ska bygga pa `Pino`.
- API-kontraktet ska redan fran start leva under `/api/v1`, och `health` ska hallas som en egen teknisk feature, inte blandas med affarslogik.
- Strukturen ska vara feature-baserad, inte lager-baserad.
- `apps/web` och `apps/api` ska vara separata appar, och `packages/shared` ska vara platsen for framtida delade kontrakt/scheman/typer.

### Kallor Med Styrande Auktoritet

- Den aktuella storyformuleringen i `epics.md` ar den styrande kallen for Story 1.1.
- Den godkanda `sprint-change-proposal-2026-04-08.md` overstyr aldre scopeformuleringar i planeringsunderlaget for just denna story.
- `architecture.md` innehaller fortfarande en aldre formulering om att UX-specen inte ar fullt utbyggd. For denna story ar det inte blockerande, men nar scopekonflikt uppstar ska change proposalen ga fore den aldre formuleringen.
- `ux-design-specification.md` innehaller fortfarande en tidig fras om `webb forst men mobiloptimerad`. For implementation ska mobil-forst galla, i linje med PRD, epics, project-context och godkand change proposal.

### Konkret Fil- Och Mappstruktur Att Skapa

- Root:
  - `package.json`
  - workspace-konfiguration for monorepo
  - gemensam `tsconfig`-bas om det behovs
- Webb:
  - `apps/web/package.json`
  - `apps/web/src/main.tsx`
  - `apps/web/src/app/`
  - `apps/web/src/app/routes/`
  - `apps/web/src/shared/`
- API:
  - `apps/api/package.json`
  - `apps/api/src/app.ts`
  - `apps/api/src/server.ts`
  - `apps/api/src/config/logger.ts`
  - `apps/api/src/middleware/request-context-middleware.ts`
  - `apps/api/src/features/health/`
- Shared:
  - `packages/shared/package.json`
  - `packages/shared/src/`

### Rekommenderad Minsta Webbstruktur For Storyn

- `apps/web/src/main.tsx`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/home-route.tsx`

Webbskalet ska vara medvetet tunt:
- en root-router
- en enkel startsida
- inga feature-specifika komponenter annu

### Rekommenderad Minsta API-struktur For Storyn

- `apps/api/src/app.ts`
- `apps/api/src/server.ts`
- `apps/api/src/config/logger.ts`
- `apps/api/src/middleware/request-context-middleware.ts`
- `apps/api/src/features/health/routes/health-routes.ts`

Health-featuren ska vara teknisk:
- `GET /api/v1/health`
- enkel svarspayload, exempelvis status + timestamp
- request logging med `traceId`

### Loggningskrav

- Backend ska producera strukturerade JSON-loggar.
- Varje request ska ha ett `traceId`.
- Health-anrop ska loggas genom samma logging-path som andra API-anrop kommer att anvanda senare.
- Undvik att lagga logging direkt inline i varje route om samma sak kan kapslas via logger + middleware.

### Routingkrav I Webben

- Anvand `React Router` som routerlager redan i denna story.
- Hall routingen minimal: en root och en startvy racker.
- Lag inte in featuregranslogik i routefilerna; routefiler ska bara komponera.

### Testkrav

- Kritiska floden ska vara testbara enligt projektkontext och arkitektur.
- Minst ett API-test for `GET /api/v1/health` ska finnas.
- Webbens minsta appskal ska kunna renderas utan crash.
- Undvik att overinvestera i E2E i denna story; grundlaggande enhet/integration ar tillrackligt har.

### Latest Tech Information

- Officiella Vite-guiden visar `create vite@latest` som scaffoldvag och anger att Vite kraver Node.js `20.19+` eller `22.12+`. Valj en Node-version som uppfyller detta golv for att undvika verktygsproblem. [Source: https://vite.dev/guide/]
- Express officiella installationsguide anger att `Express 5.x` kraver Node.js `18+`. Eftersom Vite har hogre Node-krav bor projektet standardiseras pa en Node-version som uppfyller bada, praktiskt `20.19+` eller nyare. [Source: https://expressjs.com/ja/starter/installing.html]
- React Routers officiella dokumentation for `createBrowserRouter` visar att data-router-laget ar den etablerade modellen for routeobjekt och nested routes. Hall routerinstallationen kompatibel med den modellen redan fran start. [Source: https://reactrouter.com/6.30.3/routers/create-browser-router]

### Projektstrukturanteckningar

- `project-context.md` har stale metadata i frontmatter (`project_name: min-app`, `user_name: Pontus`), men teknikstacken och de kritiska reglerna ar fortfarande i linje med den ovriga planeringen. Folj teknikreglerna, inte den stale metadata-raden.
- `sprint-plan.md` ar skriven innan epics blev helt uppdaterade. For denna story ar den fortfarande nyttig som riktning for att setup ska komma forst, men `epics.md` och den godkanda change proposalen ar mer auktoritativa.

### Definition Of Done For Dev

- Monorepo-strukturen finns pa disk
- Webben startar och visar ett minimalt appskal
- Grundlaggande routing via `React Router` fungerar
- API:t startar separat
- `GET /api/v1/health` svarar korrekt
- Request logging med `Pino` + `traceId` fungerar
- Minst enkel testverifiering finns for health-endpointen
- Inget scope fran senare stories har smugit in

### References

- `_bmad-output/planning-artifacts/epics.md` - `Epic 1`, `Story 1.1`
- `_bmad-output/planning-artifacts/architecture.md` - `Starter Template Evaluation`, `Core Architectural Decisions`, `API & Communication Patterns`, `Frontend Architecture`, `Unified Project Structure`, `Architectural Boundaries`, `Requirements to Structure Mapping`
- `_bmad-output/planning-artifacts/prd.md` - `3.2 Produktmal`, `5. Designprinciper For Krisapp`, `6.1 MVP-omfattning`
- `_bmad-output/planning-artifacts/ux-design-specification.md` - `Project Vision`, `Key Design Challenges`, `Responsive Strategy`, `Accessibility Strategy`, `Implementation Guidelines`
- `_bmad-output/project-context.md` - `Technology Stack`, `Critical Rules`
- `_bmad-output/planning-artifacts/sprint-change-proposal-2026-04-08.md` - `4.1 Stories / epics.md`, `4.3 Architecture / architecture.md`, `4.4 UX / ux-design-specification.md`
- `https://vite.dev/guide/` - officiell scaffolding och Node-krav
- `https://expressjs.com/ja/starter/installing.html` - officiellt Node-krav for Express 5
- `https://reactrouter.com/6.30.3/routers/create-browser-router` - officiell routermodell

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- Ingen tidigare story i Epic 1
- Inga tidigare git commits i repot
- `pnpm install`
- `pnpm --filter @beprepared/web lint`
- `pnpm --filter @beprepared/api test`
- `pnpm --filter @beprepared/web test`
- `pnpm --filter @beprepared/api build`
- `pnpm --filter @beprepared/web build`
- `pnpm --filter @beprepared/shared build`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created
- Story scope is narrowed according to approved course correction
- Story prepared for first implementation slice in a repo without existing app code
- Implemented pnpm workspace root with `apps/web`, `apps/api` and `packages/shared`
- Scaffolded `apps/web` with official Vite React TypeScript starter and replaced demo UI with a minimal routed app shell
- Added `React Router` root routing with a startup view for the household profile entry point
- Implemented separate Express TypeScript API baseline with `/api/v1/health`
- Added structured `Pino` logging with per-request `traceId` middleware and response logging
- Added shared `HealthResponse` contract in `packages/shared`
- Verified API health route with integration tests and verified web app shell with render tests
- Verified workspace with `pnpm test`, `pnpm build`, and web linting
- Local start commands: `pnpm dev:web` and `pnpm dev:api`

### File List

- `.gitignore`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `apps/web/package.json`
- `apps/web/tsconfig.app.json`
- `apps/web/vite.config.ts`
- `apps/web/vitest.config.ts`
- `apps/web/src/App.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/index.css`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/app/app-shell.test.tsx`
- `apps/web/src/test/setup.ts`
- `apps/web/src/App.css` (deleted)
- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/vitest.config.ts`
- `apps/api/src/app.ts`
- `apps/api/src/server.ts`
- `apps/api/src/config/logger.ts`
- `apps/api/src/middleware/request-context-middleware.ts`
- `apps/api/src/features/health/routes/health-routes.ts`
- `apps/api/src/features/health/routes/health-routes.test.ts`
- `packages/shared/package.json`
- `packages/shared/tsconfig.json`
- `packages/shared/src/contracts/health-contract.ts`
- `packages/shared/src/index.ts`
- `_bmad-output/implementation-artifacts/1-1-initialize-monorepo-app-shell-and-health-endpoint.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-04-08: Implemented Story 1.1 monorepo baseline with Vite web app, Express API, shared contract package, health endpoint, structured logging, and baseline tests.
