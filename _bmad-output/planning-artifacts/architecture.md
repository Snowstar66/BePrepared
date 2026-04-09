---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/project-context.md"
  - "out-001-ai-delivery-handoff.md"
  - "docs/BePreparedUX.jpg"
workflowType: "architecture"
project_name: "BePrepared"
user_name: "Filijoxen"
date: "2026-04-08"
lastStep: 8
status: "complete"
completedAt: "2026-04-08"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
BePrepared omfattar sex huvudområden: hushållsprofil och behovsberäkning, lagerhantering, gap-analys och inköpsöversikt, krisguider, underhåll/påminnelser samt datatålighet med offline-stöd. Arkitektoniskt betyder det att lösningen behöver stödja både strukturerad användardata och redaktionellt guideinnehåll. Funktionerna spänner över lokal datainmatning, beräkningslogik, prioriteringslogik, notifieringsstöd, innehållsdistribution, återställning av tidigare sparad data och framtida möjlighet till synk. PRD:t innehåller 6 epics och 19 stories, vilket pekar mot en relativt liten produkt med flera tvärgående tekniska krav.

**Non-Functional Requirements:**
De mest styrande NFR:erna är offline-stöd för kärninnehåll, låg användningsfriktion, tydlig och icke-alarmistisk UX, robust lokal lagring, kvalitetssäkrat informationsinnehåll, mobil först, tillgänglighet, god prestanda under stress, dataminimering och testbarhet. För arkitekturen innebär det att kärnflöden inte får vara beroende av ständig uppkoppling, att lokal lagring måste vara förstklassig, att guider måste vara versions-, käll- och granskningshanterade, och att lösningen måste vara lätt att verifiera med automatiserade tester. Säkerhet ska dimensioneras för privat hushållsdata, export/import och framtida autentiserad synk, även om MVP:n inte kräver konto.

**Scale & Complexity:**
Projektet är inte stort i antal affärsdomäner, men det har ovanligt starka krav på robusthet, degraderat läge och kontrollerad felhantering för sin storlek. Det är därför bäst beskrivet som medelkomplext snarare än enkelt. Kombinationen av mobil-först UX, offlinekrav, notifieringar, innehållsgranskning, tillgänglighet, framtida synk och tydliga API-gränser driver upp den arkitektoniska ambitionsnivån.

- Primary domain: mobil-först full-stack webbapp för krisberedskap
- Complexity level: medium
- Estimated architectural components: 9-11

### Technical Constraints & Dependencies

Projektkontexten anger React + TypeScript + Vite i frontend, Tailwind CSS för UI, Node.js + Express i backend, PostgreSQL som databas, Supabase Auth för autentisering vid behov, REST API i stället för GraphQL, feature-baserad struktur och automatiserade tester för kritiska flöden. Det finns inget stöd för att göra lösningen beroende av inloggning i MVP, vilket gör lokal-först datahantering till en central arkitekturprincip. UX-specen är ännu inte fullt utbyggd, men PRD:t och användarens styrning indikerar höga krav på läsbarhet, robust navigation, tillgänglighet, snabb förståelse under stress och stöd för kritiska flöden även när vissa systemdelar faller bort.

En rimlig teknisk utgångspunkt är därför `local-first, sync-optional`, där klienten kan fungera självständigt och backend främst används för innehållsdistribution, framtida synk, notifieringsorkestrering och spårbar administration. API-kontrakt bör utformas så att de stöder framtida vidareutveckling även om MVP:n bara nyttjar en delmängd.

### Cross-Cutting Concerns Identified

Offline-stöd och degraderat läge påverkar frontend, datalagring, API-design, innehållsdistribution och notifieringsstrategi. Säkerhet och integritet påverkar datamodell, export/import, framtida synk och eventuell autentisering. Rollhantering påverkar främst separeringen mellan konsumentappen och intern innehållsförvaltning, särskilt för publicering och spårbarhet av guider. Loggning och spårbarhet påverkar backend, innehållspublicering, notifieringar, import/export, felhantering och supportbarhet. Tillgänglighet och låg kognitiv belastning påverkar komponentval, navigationsstruktur, statuskommunikation, formulärdesign och felmeddelanden i hela lösningen. Testbarhet kräver tydlig isolering mellan beräkningslogik, lagringsadapter, notifieringslager, synkgränssnitt och API-kontrakt.

Notifieringar ska behandlas som en stödjande kanal, inte som en kritisk beroendekedja. Innehållsmodellen för guider behöver stödja källa, version, granskningsstatus och revisionsspår. Kritiska riskzoner som offline-start, lokal datakorruption, nekade notisbehörigheter och import/export-fel behöver därför få tydliga tekniska gränssnitt och testbara adapters.

## Starter Template Evaluation

### Primary Technology Domain

Mobil-först full-stack webbapp med lokal-först beteende och framtida synk, baserad på React + TypeScript + Vite i frontend och Node.js + Express i backend.

### Starter Options Considered

**1. Officiell Vite React TypeScript-starter**  
Detta är det tydligaste valet för frontend eftersom det matchar projektkontexten exakt. Den ger en lättviktig och modern grund utan att låsa routing, state management, auth eller API-arkitektur för tidigt. Den fungerar väl med Tailwind CSS, Vitest och senare PWA-stöd.

**2. Express application generator**  
Den officiella Express-generatorn finns fortfarande tillgänglig, men den producerar en äldre server-orienterad struktur med view engine, `public/` och klassiska route-filer. Det går att modifiera den, men den passar sämre för en TypeScript-baserad REST-backend med tydliga API-gränser och god testbarhet. Den väljs därför bort.

**3. Opinionerade full-stack starters**  
Alternativ som drar in eget full-stackramverk eller serverintegrerad React-modell bedöms som mindre lämpliga här, eftersom projektkontexten redan låser Vite + Express + REST. De skulle ge snabb scaffoldning, men till priset av fler tidiga ramverksbeslut och svagare kontroll över offline- och degraderat läge.

**4. PWA-först community-starter**  
För en krisapp är offline mycket viktigt, men ett community-starter för PWA bör inte bli huvudfundamentet. Det är bättre att börja med officiell Vite-starter och lägga till PWA/offline-stöd explicit, så att cache-, uppdaterings- och fallbackstrategier formas utifrån krisappens behov i stället för generiska standardval.

### Selected Starter: Officiell Vite React TypeScript-starter för frontend, med egen Express TypeScript-baseline för backend

**Rationale for Selection:**  
Detta val respekterar projektets dokumenterade teknikpreferenser, minimerar onödiga ramverksbeslut och gör det lättare att bygga en robust krisapp med tydliga API-gränssnitt. Vite ger snabb utvecklingsloop och enkel deploy till Vercel för frontend. En separat Express-tjänst ger bättre kontroll över REST-API, notifieringsorkestrering, loggning, rollhantering och framtida synk utan att göra klienten beroende av servern för grundfunktionalitet.

Det viktigaste motivet är att denna kombination stöder principen `local-first, sync-optional`, vilket är centralt för en krisapp där nätverk och backend ibland kan vara otillgängliga.

**Initialization Command:**

```bash
pnpm create vite@latest apps/web --template react-ts
```

_Backend scaffoldas i samma initieringsstory som en separat TypeScript-baserad Express-tjänst, men utan att använda `express-generator`._

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**  
TypeScript-baserad React-applikation ovanpå Vite. Officiella Vite-dokument visar att nuvarande setup utgår från modern Node-miljö och aktuell `create vite@latest`-scaffold.

**Styling Solution:**  
Vite-starter tvingar inte stylingmodell, vilket är positivt här. Tailwind kopplas på efter initiering via den aktuella officiella Vite-integrationen för Tailwind.

**Build Tooling:**  
Vite ger snabb lokal utveckling, enkel produktionsbuild och låg komplexitet i frontendlagret. Det passar väl för en mobil-först app där vi vill hålla klienten lätt och responsiv.

**Testing Framework:**  
Vitest passar naturligt in i Vite-miljön för enhetstester och komponentnära logik. Playwright läggs ovanpå för kritiska flöden.

**Code Organization:**  
Startermallen är relativt neutral och blockerar inte en feature-baserad struktur. Det är en fördel eftersom projektkontexten uttryckligen vill ha enkla komponenter och feature-baserad organisering.

**Development Experience:**  
Snabb HMR, låg initial komplexitet, enkel onboarding och god kompatibilitet med senare tillägg som PWA-plugin, delade typer och tydliga API-kontrakt.

**Note:** Projektinitiering med denna frontend-starter bör vara första implementationsstoryn. I samma story bör repository-strukturen etableras så att frontend, backend och eventuella delade typer separeras tydligt från början.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Frontend byggs som en `React + TypeScript + Vite`-app med `React Router` som routerlager.
- Klienten följer principen `local-first, sync-optional`.
- Användardata lagras primärt lokalt i `IndexedDB` via `Dexie`.
- Backend använder `Express 5` som REST-API och `PostgreSQL` som system of record för redaktionellt innehåll, framtida synk och revisionsspår.
- Gemensam validering och kontraktsmodell byggs med `Zod`.
- API-kontrakt dokumenteras som `OpenAPI 3.1`.
- Offline/PWA-stöd byggs in med `vite-plugin-pwa`.
- Strukturerad loggning införs från start med `Pino`.
- Notifieringar designas som en stödjande kanal med fallback, inte som kritisk beroendekedja.

**Important Decisions (Shape Architecture):**
- `Drizzle ORM` används för backendens datamodell och SQL-migrationer.
- `TanStack Query v5` används för serverdata och synkstatus i klienten.
- Formhantering sker med `react-hook-form` och `Zod`.
- Enkel rollmodell införs i backend: `public-reader`, `editor`, `admin`, samt framtida `household-user` vid synk.
- API-säkerhet skyddas med strikt inputvalidering, `express-rate-limit`, säker header-policy och JWT-verifiering när auth aktiveras.
- Guideinnehåll separeras från hushållsdata i både modell och API.

**Deferred Decisions (Post-MVP):**
- Full fleranvändarsynk mellan enheter.
- Serverdrivna push-notiser för drift- eller krisutsändningar.
- MFA för interna redaktörer och administratörer.
- Full SIEM-/observability-pipeline utanför applikationsnära loggning.

### Data Architecture

**Primär datamodell:**  
Arkitekturen delas i två datadomäner:
1. `Lokal hushållsdomän` i klienten för hushållsprofil, lagerartiklar, påminnelser, inköpsöversikt och senast tillgängliga guider.
2. `Serverdomän` i PostgreSQL för guideinnehåll, revisionsspår, publiceringsstatus, notifieringsmallar, framtida användarkonton och synkmetadata.

**Valt beslut:**
- Klientens primära lagring: `IndexedDB` via `Dexie`
- Serverns primära lagring: `PostgreSQL`
- ORM/migrationer: `Drizzle ORM` + SQL-migrationer
- Schema/validering: `Zod`

**Rationale:**  
Det här ger hög robusthet i krisläge eftersom användaren kan läsa och arbeta med kärnflöden utan nät. Samtidigt hålls servern ren för sådant som verkligen behöver central kontroll: innehåll, revision, rollhantering och framtida synk. `Dexie` är ett starkt val ovanpå IndexedDB för att hålla offline-lagret testbart och mindre felbenäget. `Drizzle` passar väl med TypeScript, PostgreSQL och behovet av tydliga scheman utan tung runtime.

**Trade-offs:**
- Lokal-först innebär mer komplex synkdesign senare.
- Dubbel datamodell kräver tydlig gränsdragning mellan lokal och serverägd data.
- IndexedDB ökar robustheten men kräver explicit hantering av schemauppgraderingar och korruptionsfall.

**Affects:**  
E1, E2, E3, E4, E5, E6

### Authentication & Security

**Valt beslut:**
- MVP kräver ingen obligatorisk inloggning för konsumentflöden.
- `Supabase Auth` används först när synk eller backend-skyddade användarflöden aktiveras.
- Interna roller för innehåll och administration skyddas med Supabase JWT + backendverifiering.
- Säkerhetsmodell för MVP bygger på dataminimering, TLS, säker header-policy, inputvalidering och separerade privilegier.
- Export/import behandlas som känslig funktion och valideras strikt innan data skrivs lokalt.

**Rollhantering:**
- `anonymous-local-user`: använder appen utan konto
- `editor`: kan skapa och uppdatera guider
- `admin`: kan publicera, återkalla, se revisionsspår och hantera notifieringspolicy
- `household-user`: reserverad för framtida synkade hushållskonton

**Rationale:**  
Detta matchar PRD:t: låg friktion först, men utan att stänga dörren för säker synk senare. En krisapp får inte förlora grundfunktionalitet på grund av authproblem. Därför hålls konsumentnyttan lokal och kontooberoende, medan privilegierade serverfunktioner skyddas från början.

**Säkerhetsåtgärder:**
- `Zod`-validering på alla externa in- och utdata
- `express-rate-limit` för auth-, import- och notifieringsnära endpoints
- säker CORS-konfiguration mellan frontend och API
- PII-minimering i lagring och loggar
- revisionsspår för guideändringar och publiceringar
- JWT-verifiering i Express när skyddade API:er används

**Trade-offs:**
- Ingen obligatorisk auth i MVP innebär att lokala data inte är återställbara utan export eller framtida synk.
- Enkel rollmodell minskar komplexitet nu men kräver utbyggnad vid samarbete eller fler interna aktörer.

### API & Communication Patterns

**Valt beslut:**
- API-stil: `REST`
- Kontraktsnivå: versionsstyrd `/api/v1`
- Dokumentation: `OpenAPI 3.1`
- Kommunikationsmönster: klienten fungerar autonomt och anropar API för innehåll, revision, notifieringsinställningar och framtida synk
- Felstandard: enhetligt felkontrakt med `code`, `message`, `details`, `traceId`

**Föreslagna resursgrupper:**
- `/api/v1/content/guides`
- `/api/v1/content/guide-revisions`
- `/api/v1/admin/publications`
- `/api/v1/notification-preferences`
- `/api/v1/sync/*`
- `/api/v1/health`

**Rationale:**  
REST är redan ett explicit krav i projektkontexten. För den här appen är tydliga resurser viktigare än flexibel querymodell. OpenAPI gör kontrakten tydliga för både utveckling, tester och framtida AI-assisted implementation. Enhetliga felobjekt och `traceId` hjälper felsökning när användaren är offline, delvis offline eller i ett degraderat läge.

**Notifieringsstrategi:**
- MVP: lokala påminnelser via `Notifications API` där plattformen stödjer det
- fallback: in-app påminnelsemarkering när systemnotiser saknas eller nekas
- framtida server-push: möjlig via `Push API` + service worker, men inte beroendekritisk i MVP

**Trade-offs:**
- Webbaserade notifieringar är plattformsberoende och får inte överskattas.
- OpenAPI kräver disciplin men ger bättre långsiktig stabilitet och testbarhet.

### Frontend Architecture

**Valt beslut:**
- Routing: `React Router` i data-router-läge
- Serverdata/cache: `TanStack Query v5`
- Formhantering: `react-hook-form`
- Validering: `Zod`
- Lokal domänåtkomst: feature-baserade repositories ovanpå `Dexie`
- Global state: undvik tung global store i MVP; använd route-nivå, query-cache och små feature-contexts där det behövs
- UI: tillgängliga, enkla, mobil-först komponenter med `Tailwind CSS`

**Rationale:**  
Frontendens viktigaste mål är att ge snabb förståelse under stress. Därför ska arkitekturen gynna tydliga features, låg komponentkomplexitet och liten mental overhead i koden. `TanStack Query` passar för serverstyrda resurser som guider och syncstatus, men lokal hushållsdata ska inte behandlas som om den vore servercache. Den ska ägas av klientdomänen.

**Featureindelning:**
- `household-profile`
- `inventory`
- `preparedness-overview`
- `guides`
- `reminders`
- `offline-sync`
- `settings-export`

**Offline- och feltålighet:**
- app-shell och guideindex cachas via service worker
- senaste lokala guider och hushållsdata kan visas utan nät
- tydlig offlineindikator
- återställningsläge vid korrupt lokal data
- inga blockerande loaders för snabbhjälpsläge

**Trade-offs:**
- Ingen stor global store gör systemet enklare, men kräver disciplin i featuregränser och repos.
- Service worker och lokal lagring ger robusthet men kräver noggrann uppdateringsstrategi för att undvika stale content.

### Infrastructure & Deployment

**Valt beslut:**
- Frontend hostas på `Vercel`
- Backend hostas på `Render`
- Databas: hanterad `PostgreSQL`
- Konfiguration via tydligt separerade miljövariabler per app
- Backendloggar struktureras med `Pino`
- Klientfel och viktiga driftshändelser skickas opportunistiskt till backend när nät finns
- Hälsokontroller och enkel audit-övervakning införs från start

**Loggning och spårbarhet:**
- backend: strukturerade JSON-loggar med `traceId`, route, roll, resultat, felkod
- admin/content: audit events för skapa, uppdatera, publicera, avpublicera guide
- klient: lokala tekniska events för import/export-fel, syncfel, offlineåterhämtning och nekade notiser
- public API: tydlig korrelation mellan felrespons och serverlogg via `traceId`

**Rationale:**  
Den här deploymentmodellen respekterar projektkontexten, håller front- och backend separerade och är enkel att vidareutveckla. En krisapp behöver inte i första hand hyperskala, men den måste vara supportbar och begriplig när något går fel. Därför prioriteras strukturerad loggning, auditbarhet och enkel miljöseparation.

**Trade-offs:**
- Separat frontend/backend ger renare ansvar men kräver tydligare CORS, observability och releasekoordination.
- Opportunistisk klientrapportering är mindre exakt än full telemetri, men bättre anpassad till offline- och integritetskrav.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initiera repo med Vite-frontend och separat Express-backend
2. Etablera delade schemas och API-kontrakt med Zod + OpenAPI
3. Sätt upp lokal lagringsmodell i klienten med Dexie
4. Bygg guideinnehållsdomän och revisionsmodell i backend med PostgreSQL + Drizzle
5. Implementera React Router, featurestruktur och kärnflöden
6. Lägg till service worker/PWA och offlinecache
7. Lägg till notifieringslager med fallback
8. Lägg till loggning, audit och health endpoints
9. Förbered Supabase Auth för skyddade backendflöden och framtida synk

**Cross-Component Dependencies:**
- Offlinearkitekturen påverkar routing, datamodell, notifieringar och felhantering
- Zod-scheman påverkar både frontendformulär, backendvalidering och OpenAPI
- Rollhantering påverkar admin/publicerings-API, auditloggar och framtida auth
- Guideinnehållets revisionsmodell påverkar offlinecache, publicering och spårbarhet
- Notifieringsstrategin påverkar service worker, klientbehörigheter och serverorkestrering

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**  
12 områden där AI-agenter annars riskerar att fatta olika beslut om namn, struktur, format, loggning, offlinehantering och felmönster.

### Naming Patterns

**Database Naming Conventions:**
- Databastabeller använder `snake_case` i plural, till exempel `guides`, `guide_revisions`, `notification_preferences`.
- Kolumner använder `snake_case`, till exempel `created_at`, `updated_at`, `published_at`.
- Primärnycklar heter `id`.
- Foreign keys skrivs som `<entity>_id`, till exempel `guide_id`, `editor_user_id`.
- Index namnges som `idx_<table>_<column>` eller `uq_<table>_<column>` för unika index.

**API Naming Conventions:**
- REST-resurser använder plural och kebab-case i URL-segment där fler ord krävs.
- API-bas är alltid `/api/v1`.
- Route-parametrar skrivs som `:id` i kod och exponeras semantiskt, till exempel `/api/v1/content/guides/:guideId`.
- Query-parametrar använder `camelCase`, till exempel `updatedAfter`, `includeDrafts`.
- Headers följer standardnamn först. Egna headers prefixas konsekvent, till exempel `X-Trace-Id`.

**Code Naming Conventions:**
- React-komponenter: `PascalCase`, till exempel `GuideCard.tsx`, `PreparednessSummary.tsx`.
- Hooks: `camelCase` med `use`-prefix, till exempel `useOfflineStatus.ts`.
- Utility-filer och repos: `kebab-case`, till exempel `guide-repository.ts`, `inventory-service.ts`.
- TypeScript-typer och interfaces: `PascalCase`.
- Konstanter: `SCREAMING_SNAKE_CASE` för globala värden, annars lokala `camelCase`.

### Structure Patterns

**Project Organization:**
- Strukturen är feature-baserad, inte lager-baserad, i både frontend och backend där det är rimligt.
- Varje feature ska samla UI, domänlogik, validering, tester och adapters så nära varandra som möjligt.
- Delade typer/scheman placeras i ett separat delat paket eller `shared/`-yta.
- Backend skiljer tydligt mellan `routes`, `services`, `repositories`, `schemas`, `middleware`.
- Offline- och synklogik hålls i en egen feature, inte utspridd i hela appen.

**File Structure Patterns:**
- Tester co-loceras med koden som `*.test.ts`, `*.test.tsx` när det är enhetligt och nära implementationen.
- E2E-tester ligger separat i en dedikerad testyta.
- Miljöfiler namnges per app och miljö, till exempel `.env`, `.env.local`, `.env.test`.
- Statiska tillgångar för PWA och ikoner hålls i dedikerad assets-struktur, inte bland featurefiler.
- API-dokumentation genereras från scheman, inte som handskriven frikopplad YAML i första hand.

### Format Patterns

**API Response Formats:**
- Läsande endpoints returnerar normalt data direkt eller paginerad struktur när det behövs.
- Skrivande endpoints returnerar resurs eller åtgärdsresultat med tydligt statusfält när det finns affärsvärde.
- Fel följer alltid samma struktur:

```json
{
  "error": {
    "code": "GUIDE_NOT_FOUND",
    "message": "Guiden kunde inte hittas.",
    "details": {},
    "traceId": "trc_123"
  }
}
```

- Hälsokontroller och tekniska endpoints får ha enklare format men ska fortfarande kunna korreleras med loggar.

**Data Exchange Formats:**
- JSON-fält i API använder `camelCase`.
- Databas använder `snake_case`.
- Datum/tid utbyts som ISO 8601-strängar i UTC.
- Booleska värden är alltid `true`/`false`.
- `null` används explicit när värde saknas och det är viktigt att skilja från “ej skickat”.
- En enskild resurs returneras som objekt, inte en array med ett element.

### Communication Patterns

**Event System Patterns:**
- Interna domänhändelser namnges i dåtid och `dot.case`, till exempel `guide.published`, `inventory.itemAdded`, `sync.importFailed`.
- Event payloads ska alltid innehålla `type`, `occurredAt`, `entityId` när relevant, samt domänspecifik payload.
- Eventversionering sker med explicit `version` om event används över processgränser.
- Inga “magiska” string events utan central typdefinition.

**State Management Patterns:**
- Lokal hushållsdata ägs av klientens domänlager, inte av query-cache.
- Serverdata hämtas och cachas via TanStack Query.
- UI-tillstånd hålls lokalt så långt som möjligt.
- Mutationer går via tydliga use-case/service-funktioner, inte direkt från komponent till adapter.
- Inga dolda sidoeffekter i presentational components.

### Process Patterns

**Error Handling Patterns:**
- Alla async-flöden returnerar eller kastar standardiserade feltyper.
- Tekniska fel loggas separat från användarvänliga meddelanden.
- Offlinefel ska aldrig presenteras som generiska serverfel.
- Felmeddelanden till användaren ska vara lugna, tydliga och handlingsbara.
- Import/export, synk och notifieringar måste ha egna felkoder och återställningsmönster.

**Loading State Patterns:**
- Kritiska vyer använder skeletton eller tydlig progress, inte blockerande spinners som låser hela appen.
- Snabbhjälpsläge får aldrig vänta på nät för att bli användbart.
- Loading-namn ska vara semantiskt tydliga, till exempel `isLoadingGuideIndex`, `isSavingInventoryItem`.
- Background refetch ska inte trigga fullskärmsloading om lokal data redan finns.
- Offlineåterhämtning ska särskiljas från initial laddning.

### Enforcement Guidelines

**All AI Agents MUST:**
- använda feature-baserad struktur och inte skapa parallella organisationsmönster,
- använda Zod som enda källa för externa kontrakt där det är relevant,
- följa fastställd felstruktur, datumformat och naming conventions,
- hålla lokal hushållsdata separat från servercache,
- lägga till tester för kritiska flöden i samma feature som de förändrar,
- logga med spårbar `traceId` i backendnära flöden.

**Pattern Enforcement:**
- Arkitekturdokumentet är källan för dessa regler.
- PR/story-review ska flagga avvikelser från namn-, format- och strukturmönster.
- Om ett nytt mönster behövs ska det dokumenteras här innan det blir standard.
- Tillfälliga avvikelser ska motiveras i kodreview eller ADR-notering.

### Pattern Examples

**Good Examples:**
- `apps/web/src/features/guides/components/GuideCard.tsx`
- `apps/web/src/features/offline-sync/hooks/useOfflineStatus.ts`
- `apps/api/src/features/content/routes/guides-routes.ts`
- `apps/api/src/features/content/schemas/guide-schema.ts`
- `packages/shared/src/contracts/guide-contract.ts`
- `GET /api/v1/content/guides?updatedAfter=2026-04-08T10:00:00Z`

**Anti-Patterns:**
- en blandning av `snake_case`, `camelCase` och `PascalCase` i samma API-svar
- lokal hushållsdata lagrad i global query-cache som om den vore serverdata
- routes som `/getGuides` eller `/guide/list`
- komponenter som både renderar UI, gör fetch, skriver till IndexedDB och hanterar fel direkt
- ostrukturerade fel som bara returnerar `{ message: "Something went wrong" }`
- notifieringslogik hårdkodad i UI-komponenter utan adapter eller fallbackstrategi

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
be-prepared/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── .gitignore
├── .editorconfig
├── .env.example
├── docs/
│   ├── architecture/
│   │   ├── adr/
│   │   └── api/
│   └── ux/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── web-preview.yml
│       └── api-deploy.yml
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── vitest.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   ├── index.html
│   │   ├── public/
│   │   │   ├── manifest.webmanifest
│   │   │   ├── icons/
│   │   │   └── offline/
│   │   ├── src/
│   │   │   ├── main.tsx
│   │   │   ├── app/
│   │   │   │   ├── router.tsx
│   │   │   │   ├── providers/
│   │   │   │   │   ├── app-providers.tsx
│   │   │   │   │   ├── query-provider.tsx
│   │   │   │   │   └── theme-provider.tsx
│   │   │   │   ├── layout/
│   │   │   │   │   ├── app-shell.tsx
│   │   │   │   │   ├── bottom-nav.tsx
│   │   │   │   │   └── offline-banner.tsx
│   │   │   │   └── routes/
│   │   │   │       ├── home-route.tsx
│   │   │   │       ├── help-now-route.tsx
│   │   │   │       ├── inventory-route.tsx
│   │   │   │       ├── profile-route.tsx
│   │   │   │       ├── reminders-route.tsx
│   │   │   │       └── settings-route.tsx
│   │   │   ├── features/
│   │   │   │   ├── household-profile/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   ├── schemas/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── repository/
│   │   │   │   │   └── __tests__/
│   │   │   │   ├── inventory/
│   │   │   │   ├── preparedness-overview/
│   │   │   │   ├── guides/
│   │   │   │   ├── reminders/
│   │   │   │   ├── offline-sync/
│   │   │   │   └── settings-export/
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ui/
│   │   │   │   │   ├── feedback/
│   │   │   │   │   └── forms/
│   │   │   │   ├── hooks/
│   │   │   │   ├── lib/
│   │   │   │   │   ├── dexie/
│   │   │   │   │   ├── notifications/
│   │   │   │   │   ├── pwa/
│   │   │   │   │   ├── errors/
│   │   │   │   │   └── analytics/
│   │   │   │   └── styles/
│   │   │   ├── service-worker/
│   │   │   │   ├── sw.ts
│   │   │   │   ├── caching-rules.ts
│   │   │   │   └── update-prompts.ts
│   │   │   └── test/
│   │   │       ├── fixtures/
│   │   │       ├── mocks/
│   │   │       └── setup/
│   │   └── playwright/
│   │       ├── e2e/
│   │       ├── fixtures/
│   │       └── playwright.config.ts
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       ├── drizzle.config.ts
│       ├── src/
│       │   ├── server.ts
│       │   ├── app.ts
│       │   ├── config/
│       │   │   ├── env.ts
│       │   │   ├── logger.ts
│       │   │   └── security.ts
│       │   ├── middleware/
│       │   │   ├── auth-middleware.ts
│       │   │   ├── error-middleware.ts
│       │   │   ├── rate-limit-middleware.ts
│       │   │   ├── request-context-middleware.ts
│       │   │   └── validation-middleware.ts
│       │   ├── features/
│       │   │   ├── content/
│       │   │   │   ├── routes/
│       │   │   │   ├── services/
│       │   │   │   ├── repositories/
│       │   │   │   ├── schemas/
│       │   │   │   └── __tests__/
│       │   │   ├── publications/
│       │   │   ├── notifications/
│       │   │   ├── sync/
│       │   │   ├── auth/
│       │   │   └── health/
│       │   ├── shared/
│       │   │   ├── db/
│       │   │   ├── errors/
│       │   │   ├── openapi/
│       │   │   └── audit/
│       │   └── test/
│       │       ├── fixtures/
│       │       ├── helpers/
│       │       └── setup/
│       └── drizzle/
│           ├── schema/
│           ├── migrations/
│           └── seeds/
├── packages/
│   ├── shared/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── contracts/
│   │       ├── schemas/
│   │       ├── types/
│   │       ├── constants/
│   │       └── utils/
│   └── config/
│       ├── eslint/
│       ├── typescript/
│       └── vitest/
└── scripts/
    ├── generate-openapi.ts
    ├── verify-env.ts
    └── seed-content.ts
```

### Architectural Boundaries

**API Boundaries:**
- `apps/web` får endast prata med backend via typed API-klienter som bygger på kontrakt i `packages/shared/src/contracts/`.
- Alla externa HTTP-endpoints ägs av `apps/api/src/features/*/routes/`.
- Auth- och adminrelaterade gränser hålls separata från publika content-endpoints.
- `health` och tekniska endpoints hålls i en egen feature för att inte blandas med affärslogik.

**Component Boundaries:**
- Route-filer komponerar features men innehåller inte affärslogik.
- Feature-komponenter får använda egna hooks/services, men inte direkt prata med IndexedDB eller fetch om en repository/service redan finns.
- `shared/components/ui` innehåller generiska byggblock, aldrig feature-specifika beslut.
- Snabbhjälp, lager, profil och guider hålls som separata featuregränser även om de delar UI-komponenter.

**Service Boundaries:**
- Frontendens lokala repositories äger hushållsdata och offline-cache.
- Frontendens API-klienter äger serverkommunikation.
- Backendens services innehåller use-case-logik.
- Backendens repositories äger databasaccess.
- Audit/loggning kopplas via shared middleware/helpers, inte duplicerat i varje route.

**Data Boundaries:**
- Lokal användardata stannar i `apps/web/src/features/*/repository/` och `shared/lib/dexie/`.
- Redaktionellt innehåll och revisionsdata stannar i backend + PostgreSQL.
- Delade scheman mellan frontend och backend definieras i `packages/shared/src/schemas/`.
- Ingen feature får definiera eget externt API-format utan att det finns i shared contracts.

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
- `E1 Hushållsprofil och behovsberäkning` → `apps/web/src/features/household-profile/`
- `E2 Lagerhantering` → `apps/web/src/features/inventory/`
- `E3 Beredskapsöversikt och gap-analys` → `apps/web/src/features/preparedness-overview/`
- `E4 Krisguider och snabb hjälp` → `apps/web/src/features/guides/` + `apps/api/src/features/content/`
- `E5 Underhåll, rotation och påminnelser` → `apps/web/src/features/reminders/` + `apps/web/src/shared/lib/notifications/`
- `E6 Datatålighet, offline och åtkomst` → `apps/web/src/features/offline-sync/`, `apps/web/src/service-worker/`, `apps/api/src/features/sync/`

**Cross-Cutting Concerns:**
- Auth och rollhantering → `apps/api/src/features/auth/` + `apps/api/src/middleware/auth-middleware.ts`
- Loggning och spårbarhet → `apps/api/src/config/logger.ts`, `apps/api/src/shared/audit/`, `apps/api/src/middleware/request-context-middleware.ts`
- Export/import → `apps/web/src/features/settings-export/`
- OpenAPI och kontrakt → `apps/api/src/shared/openapi/` + `packages/shared/src/contracts/`
- Offlineindikering och fallback → `apps/web/src/app/layout/offline-banner.tsx` + `apps/web/src/features/offline-sync/`

### Integration Points

**Internal Communication:**
- Web features kommunicerar via hooks, repositories och shared contracts.
- API features kommunicerar via services och shared domain schemas, inte genom att anropa varandras routes.
- Eventliknande interna signaler hålls i typed helpers eller feature-lokala events, inte lösa strings.

**External Integrations:**
- Supabase Auth integreras i `apps/api/src/features/auth/` när auth aktiveras.
- PostgreSQL nås bara via backend repositories.
- Web Notifications / Push API integreras via `apps/web/src/shared/lib/notifications/`.
- Hostingplattformar påverkar konfigurationslager, inte affärsfeatures.

**Data Flow:**
- Lokal användarinteraktion → feature service → local repository (`Dexie`) → UI uppdateras direkt
- Serverstyrt innehåll → API client → TanStack Query cache → feature components
- Publicerat guideinnehåll → backend content service → PostgreSQL → OpenAPI-kontrakt → klientcache/service worker
- Import/export → settings-export feature → schema validation → local repository

### File Organization Patterns

**Configuration Files:**
- Rotnivån innehåller workspace- och CI-konfig.
- Appspecifik config ligger i respektive app.
- Delade lint/test/TS-regler ligger i `packages/config/`.

**Source Organization:**
- Features först, shared därefter.
- Routes nära app-shell i frontend.
- Middleware/config/shared nära entrypoint i backend.
- Kontrakt och typer i separat shared package.

**Test Organization:**
- Enhetstester nära implementationen.
- API-integrations- och route-tester i backendfeature eller `src/test/`.
- E2E separat under `apps/web/playwright/e2e/`.
- Testfixtures hålls per app för att undvika kopplingar.

**Asset Organization:**
- PWA-manifest, ikoner och offline-assets i `apps/web/public/`.
- Feature-specifika illustrationer kan ligga lokalt i feature om de inte delas.
- Guideinnehåll lagras inte som statiska frontendfiler utan hämtas/publiceras via backendflöde.

### Development Workflow Integration

**Development Server Structure:**
- `apps/web` och `apps/api` körs separat men delar kontrakt via workspace.
- Ändringar i `packages/shared` ska kunna slå igenom i båda apparna utan manuell kopiering.

**Build Process Structure:**
- Frontend buildar statiska assets för Vercel.
- Backend buildar separat Node/Express-output för Render.
- OpenAPI kan genereras som build- eller verify-steg från shared schemas.

**Deployment Structure:**
- Frontend och backend deployas oberoende.
- Miljövariabler sätts per app.
- Databas- och migrationssteg hör hemma i backend-pipelinen.
- Innehållsseedning och adminrelaterade scripts hålls utanför frontenddeploy.

## Architecture Validation Results

### Coherence Validation

**Decision Compatibility:**  
Arkitekturens teknikval är kompatibla med varandra och med projektkontexten. React + TypeScript + Vite fungerar väl tillsammans med Tailwind CSS, Vitest, React Router och PWA-lager i frontend. Express 5, PostgreSQL, Drizzle ORM, Zod, OpenAPI och Pino bildar en konsekvent backendstack. Valet `local-first, sync-optional` harmonierar med både krisappens användningsfall och beslutet att inte kräva obligatorisk inloggning i MVP.

**Pattern Consistency:**  
Implementation patterns stöder de arkitektoniska besluten väl. Naming conventions, error contracts, strukturregler och state patterns är konsekventa med både teknikstacken och projektets krav på testbarhet, låg kognitiv belastning och tydliga gränssnitt. Särskilt viktigt är att lokal hushållsdata och serverstyrt innehåll har separerats tydligt både i arkitektur och mönster.

**Structure Alignment:**  
Projektstrukturen stöder arkitekturen på ett tydligt sätt. Feature-baserad organisering, separat `apps/web` och `apps/api`, samt delade kontrakt i `packages/shared` ligger i linje med både teknikval och regler för agentkonsistens. Boundaries mellan klient, lokal lagring, API och backenddomäner är tillräckligt tydliga för att minska risken för implementationskonflikter.

### Requirements Coverage Validation

**Epic/Feature Coverage:**  
Alla sex epics i PRD:t har tydlig arkitektonisk hemvist. Hushållsprofil, lager, gap-analys, guider, påminnelser och offline/synk har alla mappats till konkreta features, lagringsmönster och integrationspunkter. Tvärgående beroenden, särskilt mellan guider, offlinecache och notifieringar, är också hanterade.

**Functional Requirements Coverage:**  
Samtliga funktionella krav är implementerbara inom den föreslagna arkitekturen. Arkitekturen stöder både lokal datainmatning, beräkningar, guidevisning, statusöversikt, inköpsöversikt, export/import och påminnelseflöden. Det finns inga uppenbara funktionskrav i PRD:t som saknar tekniskt stöd.

**Non-Functional Requirements Coverage:**  
Offline-stöd, låg användningsfriktion, mobil först, tillgänglighet, robust lokal lagring, kvalitetssäkrat informationsinnehåll, säkerhet, loggning/spårbarhet och testbarhet är alla adresserade i arkitekturen. Särskilt stark täckning finns för degraderat läge, dataminimering och auditbarhet för guideinnehåll.

### Implementation Readiness Validation

**Decision Completeness:**  
Kritiska beslut är dokumenterade med tillräcklig precision för implementation. Versioner har verifierats där workflowen krävde det, och tekniska vägval är motiverade utifrån produktens behov snarare än generiska preferenser.

**Structure Completeness:**  
Projektstrukturen är tillräckligt konkret för att implementation ska kunna starta utan större tolkningsutrymme. App-gränser, feature-mappar, shared contracts, testytor, service worker-lager och backendfeatures är specificerade.

**Pattern Completeness:**  
Patterns täcker de viktigaste konfliktpunkterna för AI-agenter: naming, struktur, felhantering, state, dataformat, eventnamn, loggning och offlineprocesser. Det ger goda förutsättningar för konsekvent implementation i flera parallella arbetsströmmar.

### Gap Analysis Results

**Critical Gaps:**  
Inga blockerande gap identifierade.

**Important Gaps:**  
- UX-specen är ännu inte fullständigt utvecklad, vilket kan kräva komplettering innan detaljerad UI-implementation.
- Exakt synkmodell för framtida fleranvändarstöd är avsiktligt uppskjuten.
- Exakt policy för server-push och notisorkestrering är uppskjuten till efter MVP.

**Nice-to-Have Gaps:**  
- Mer detaljerade ADR:er för offlineuppdateringsstrategi och konfliktlösning vid framtida synk.
- Tydligare adminflödesdokumentation när innehållsredaktörsgränssnitt ska byggas.
- Kompletterande observability-strategi utöver grundloggning.

### Validation Issues Addressed

Arkitekturen hade inga direkta motsägelser, men flera potentiella riskzoner har medvetet avgränsats:
- notifieringar behandlas som stödkanal och inte beroendekritisk funktion,
- auth skjuts bakom grundnyttan i MVP,
- lokal datalagring och serverägt innehåll separeras tydligt,
- framtida synk hålls möjlig utan att försvåra första implementationen.

### Architecture Completeness Checklist

**Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**
- Stark anpassning till krisappens behov av robusthet och degraderat läge
- Tydlig separation mellan lokal användardata och serverägt innehåll
- Bra stöd för spårbarhet, revisionshistorik och framtida vidareutveckling
- Konsekvent projektstruktur för både människor och AI-agenter

**Areas for Future Enhancement:**
- Full UX-specifikation
- Synkstrategi för fler enheter/användare
- Fördjupad push- och observability-strategi

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**  
Initiera monorepo-strukturen med `apps/web`, `apps/api` och `packages/shared`, med frontend scaffoldad via:

```bash
pnpm create vite@latest apps/web --template react-ts
```
