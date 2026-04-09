---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "out-001-ai-delivery-handoff.md"
---

# BePrepared - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for BePrepared, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Systemet ska lata anvandaren registrera hushallsprofil med minst antal vuxna samt valfria uppgifter om barn och husdjur.
FR2: Systemet ska lata anvandaren valja beredskapshorisont med minst alternativen `72 timmar` och `7 dagar`.
FR3: Systemet ska berakna och visa hushallets grundbehov av vatten utifran hushallsprofil och vald beredskapshorisont.
FR4: Systemet ska berakna och visa hushallets forenklade mal for matberedskap utifran hushallsprofil och vald beredskapshorisont.
FR5: Systemet ska lata anvandaren lagga till lagerartiklar manuellt med namn, kategori, antal, enhet och valfritt bast fore-datum.
FR6: Systemet ska visa lagret grupperat i begripliga kategorier med sammanfattningar och tydliga tomlagen.
FR7: Systemet ska lata anvandaren redigera och ta bort befintliga lagerartiklar med tydlig bekraftelse vid borttagning.
FR8: Systemet ska jamfora beraknat behov mot registrerat lager och visa gap per relevant kategori.
FR9: Systemet ska visa en lugn och tydlig beredskapsstatus med prioriterade nasta steg baserat pa tillgangliga data.
FR10: Systemet ska generera en inkopsoversikt over det som saknas baserat pa gap-analysen.
FR11: Systemet ska visa en kort, prioriterad guide for stromavbrott med kalla och granskningsdatum.
FR12: Systemet ska visa en guide for vattenbrist med praktiska atgarder, kalla och granskningsdatum.
FR13: Systemet ska visa en generell krisguide utan krav pa att anvandaren forst registrerar lagerdata.
FR14: Systemet ska erbjuda ett snabbhjalpslage fran startsidan sa att relevanta guider kan nas inom hogst tva interaktioner.
FR15: Systemet ska lata anvandaren skapa aterkommande paminnelser om lagergenomgang med fallback om notisbehorighet nekas.
FR16: Systemet ska stodja enkel rotation genom att markera artiklar som snart bor kontrolleras eller ersattas utifran bast fore-datum.
FR17: Systemet ska gora hushallsprofil, lageroversikt, beredskapsstatus, inkopsoversikt och guider tillgangliga offline nar de har laddats eller skapats lokalt.
FR18: Systemet ska spara hushallsdata, lagerdata, beredskapshorisont och lokalt tillgangliga guider robust mellan sessioner samt erbjuda aterstallningslage vid korrupt lokal data.
FR19: Systemet ska kunna anvandas utan obligatorisk inloggning for karnfloden samt stodja export och import av lokal data i ett validerat format.

### NonFunctional Requirements

NFR1: Karninnehall som hushallsprofil, lageroversikt, beredskapsstatus, inkopsoversikt och guider ska vara tillgangligt offline i MVP.
NFR2: Karnfloden ska kunna forstas och anvandas utan onboarding, utbildning eller obligatoriskt konto.
NFR3: Sprak, fargkodning och statusvisning ska vara tydliga, lugna och icke-alarmistiska.
NFR4: MVP:n ska anvanda robust lokal-forst lagring for karndata och inte gora backend till krav for grundfunktionalitet.
NFR5: Guider ska ha tydlig kalla, granskningsstatus och uppdateringsdatum och far inte framsta som officiella myndighetsbeslut utan korrekt grund.
NFR6: Losningen ska vara mobil-forst, ha tydliga touchytor, god kontrast och grundlaggande tillganglighetsstod.
NFR7: Karnvyer och offlinelagrade guider ska oppnas snabbt och kannas direkta under stress.
NFR8: Systemet ska minimera insamling och exponering av personrelaterad data och behandla hushallsdata som privat.
NFR9: Kritiska floden ska vara verifierbara med automatiserade tester, sarskilt hushallsprofil, lagerregistrering, gap-analys, offlineguider och lokal datalagring.
NFR10: Losningen ska folja projektkontextens teknikval: `React + TypeScript + Vite`, `Tailwind CSS`, `Node.js + Express`, `PostgreSQL`, `Supabase Auth` vid behov, `REST API`, feature-baserad struktur och tester for kritiska floden.

### Additional Requirements

- Epic 1 Story 1 ska etablera grundimplementationen som ett monorepo med `apps/web`, `apps/api` och `packages/shared`.
- Epic 1 Story 1 ska scaffolda frontend med officiell `Vite React TypeScript`-starter och backend med separat `Express`-baserad TypeScript-baseline.
- Klientarkitekturen ska folja principen `local-first, sync-optional`.
- Lokal anvandardata ska lagras primart i `IndexedDB` via `Dexie`.
- Serveragt redaktionellt innehall, revisionsdata och framtida synkmetadata ska lagras i `PostgreSQL` med `Drizzle ORM`.
- Delade scheman och validering ska byggas med `Zod`, och externa API-kontrakt ska dokumenteras med `OpenAPI 3.1`.
- API-stilen ska vara `REST` under versionsstyrd basvag `/api/v1`.
- Frontend ska anvanda `React Router`, `TanStack Query v5` och `react-hook-form` enligt arkitekturbeslutet.
- Offline/PWA-stod ska byggas med `vite-plugin-pwa`, inklusive service worker, cache for app-shell och guideindex samt tydlig offlineindikator.
- Guider ska modelleras som redaktionellt innehall med kalla, version, granskningsstatus, uppdateringsdatum och revisionsspar.
- Notifieringar ska implementeras som stodkanal med fallback till in-app-markering nar systemnotiser saknas eller nekas.
- Export och import ska behandlas som kansliga floden med strikt validering innan lokal data skrivs over.
- Backend ska fran start ha strukturerad loggning med `Pino`, enhetligt felkontrakt med `code`, `message`, `details`, `traceId` samt halsokontroller.
- Sakerhetslagret ska omfatta strikt inputvalidering, sakershetsheaders, rate limiting och JWT-verifiering nar skyddade API:er aktiveras.
- Arkitekturen ska halla features separerade for `household-profile`, `inventory`, `preparedness-overview`, `guides`, `reminders`, `offline-sync` och `settings-export`.
- Infrastruktur och deployment ska forbereda separat drift for frontend pa `Vercel` och backend pa `Render`.

### UX Design Requirements

UX-DR1: Losningen ska implementera ett themeable designsystem med `Tailwind` som grund och ett ateranvandbart komponentlager i stallet for sida-for-sida-styling.
UX-DR2: Designsystemet ska definiera fargtokens med kalla bla/grona neutrala ytor och dampade semantiska statusfarger for att skapa kontroll utan alarmism.
UX-DR3: Designsystemet ska definiera typografiska tokens och en tydlig hierarki for rubriker, underrubriker, brodtext, etiketter och statustext med fokus pa snabb skanning.
UX-DR4: Designsystemet ska definiera spacing- och layouttokens som skapar lugn gruppering pa mobil utan att forsamma touchvanlig densitet.
UX-DR5: Startupplevelsen ska ge tva primara ingangar: hushallets beredskapsstatus och snabb hjalp vid kris.
UX-DR6: Informationshierarkin ska konsekvent visa status fore detaljer, daremellan gap och darest nasta steg.
UX-DR7: Statusflodet ska hantera tre tillstand: komplett data, partiell data med kompletteringsuppmaning och tomt startlage med tydlig forsta handling.
UX-DR8: Lagerflodet ska erbjuda en lightweight quick-add-yta med minimalt antal obligatoriska falt: namn, kategori och antal.
UX-DR9: Validering i snabbregistrering och profilformular ska bevara inmatad data och visa falt-nara fel utan att radera tidigare input.
UX-DR10: Efter att anvandaren lagt till, uppdaterat eller tagit bort en vara ska UI:t omedelbart bekrafta handlingen och visa effekt pa status eller gap.
UX-DR11: Snabbhjalp ska kunna nas fran startskarmen utan att hushallsprofil eller lagerregistrering forst ar komplett.
UX-DR12: Snabbhjalpsytan ska presentera tydliga scenariokort for minst stromavbrott, vattenbrist och allman kris.
UX-DR13: Komponenten `PreparednessStatusCard` ska implementeras for hushallets primara statusoversikt och maste fungera utan att farg ensam bar viktig information.
UX-DR14: Komponenten `GapSummaryCard` ska implementeras for att sammanfatta saknade beredskapsomraden med textbaserad prioritet och rekommenderad atgard.
UX-DR15: Komponenten `QuickAddItemSheet` ska implementeras for snabb mobil-forst inmatning av lagerartiklar.
UX-DR16: Komponenten `InventoryCategoryGroup` ska implementeras for att visa lagret i begripliga kategorier med tomlagen och expanderbara grupper.
UX-DR17: Komponenten `NextStepPrompt` ska implementeras for att visa den mest relevanta nasta handlingen pa startsida, statusvy och efter genomford aktion.
UX-DR18: Komponenten `GuideScenarioCard` ska implementeras som tydlig ingang till guider pa startsida, snabbhjalp och guideindex.
UX-DR19: Komponenten `PreparednessDeltaFeedback` ska implementeras for att forklara hur en ny lagerandring paverkade beredskapen.
UX-DR20: Komponenten `OfflineStateBanner` ska implementeras for att kommunicera offline- eller begransad synkstatus lugnt och tydligt.
UX-DR21: Knapphierarkin ska standardiseras sa att varje huvudvy har en tydlig primar handling, medan destruktiva handlingar kraver uttrycklig bekraftelse.
UX-DR22: Feedbackmonster ska standardiseras for lugna success states, losningsfokuserade fel, icke-blockerande loading states och vagledande empty states.
UX-DR23: Navigationen ska fokusera toppnivan pa status, forrad och guider, med mobil-forst navigation som stoder snabb orientering.
UX-DR24: Responsivt beteende ska folja breakpoint-strategin `320px-767px`, `768px-1023px` och `1024px+` utan att byta ut grundfloden.
UX-DR25: Tillganglighet ska uppfylla `WCAG AA`, inklusive tydliga fokusmarkeringar, semantisk struktur, skarmlasarstod, tangentbordsstod dar relevant och touchytor pa minst `44x44px`.
UX-DR26: Responsivitet och tillganglighet ska verifieras med bade automatiserade kontroller och manuell testning pa mobil och desktop.

### FR Coverage Map

FR1: Epic 1 - registrera hushallsprofil
FR2: Epic 1 - valja beredskapshorisont
FR3: Epic 1 - berakna vattenbehov
FR4: Epic 1 - berakna matbehov
FR5: Epic 2 - lagga till lagerartikel
FR6: Epic 2 - visa lagret i kategorier
FR7: Epic 2 - redigera och ta bort lagerartikel
FR8: Epic 3 - jamfora behov mot lager
FR9: Epic 3 - visa beredskapsstatus
FR10: Epic 3 - skapa inkopsoversikt
FR11: Epic 4 - guide for stromavbrott
FR12: Epic 4 - guide for vattenbrist
FR13: Epic 4 - generell krisguide
FR14: Epic 4 - snabbhjalpslage
FR15: Epic 5 - aterkommande paminnelser
FR16: Epic 5 - rotation och utgangsdatum
FR17: Epic 6 - offline for karnfloden
FR18: Epic 6 - robust lokal lagring
FR19: Epic 6 - ingen obligatorisk inloggning samt export/import

## Epic List

### Epic 1: Hushallsprofil och grundbehov
Anvandaren kan beskriva sitt hushall och direkt fa en begriplig grundniva for vatten- och matberedskap.
**FRs covered:** FR1, FR2, FR3, FR4

### Epic 2: Hemmaforrad och lagerkontroll
Anvandaren kan registrera, se och korrigera sitt hemmaforrad pa ett enkelt och palitligt satt.
**FRs covered:** FR5, FR6, FR7

### Epic 3: Beredskapsoversikt och inkopsunderlag
Anvandaren kan forsta vad som saknas, se sin beredskapsstatus och fa ett konkret underlag for nasta inkop eller atgard.
**FRs covered:** FR8, FR9, FR10

### Epic 4: Krisguider och snabbhjalp
Anvandaren kan snabbt hitta lugna, kallmarkta och anvandbara guider i pressade situationer.
**FRs covered:** FR11, FR12, FR13, FR14

### Epic 5: Underhall och rotation over tid
Anvandaren kan halla sin beredskap levande genom paminnelser och enkel kontroll av rotation och utgangsdatum.
**FRs covered:** FR15, FR16

### Epic 6: Offline, datatillit och egen kontroll
Anvandaren kan lita pa att appen fungerar utan internet, bevarar data mellan sessioner och later dem exportera eller aterstalla sin information.
**FRs covered:** FR17, FR18, FR19

## Epic 1: Hushallsprofil och grundbehov

Anvandaren kan beskriva sitt hushall och direkt fa en begriplig grundniva for vatten- och matberedskap.

### Story 1.1: Initiera monorepo, appskal och health endpoint

As a utvecklingsteam,
I want to initiera BePrepared som ett monorepo med ett minimalt webbskal och ett fungerande API-health endpoint,
So that kommande stories kan byggas pa en stabil och verifierbar grund.

**Acceptance Criteria:**

**Given** att projektet initieras
**When** repositorystrukturen skapas
**Then** finns `apps/web`, `apps/api` och `packages/shared`
**And** webben ar scaffoldad med `Vite React TypeScript` och API:t med `Express` och `TypeScript`.

**Given** att utvecklaren startar webbappen
**When** appen oppnas i webblasaren
**Then** visas ett minimalt appskal med startvy och grundlaggande routing via `React Router`.

**Given** att API:t ar igang
**When** `/api/v1/health` anropas
**Then** returneras en halsorespons
**And** begaran loggas strukturerat med `Pino` och `traceId`.

### Story 1.2: Registrera hushallsprofil

As a hushallsansvarig,
I want to registrera antal vuxna samt valfria uppgifter om barn och husdjur,
So that the app can berakna ett relevant grundbehov for mitt hushall.

**Acceptance Criteria:**

**Given** att anvandaren ar i profilflodet
**When** hushallsprofilen fylls i och sparas
**Then** kan anvandaren ange minst antal vuxna samt valfria uppgifter om barn och husdjur
**And** formularet valideras med tydliga fel nara faltet utan att tidigare input raderas.

**Given** att hushallsprofilen sparas korrekt
**When** anvandaren oppnar appen igen
**Then** finns profiluppgifterna kvar lokalt
**And** datat lagras enligt `local-first`-principen i klientens lokala lagringslager.

**Given** att utvecklingsteamet verifierar storyn
**When** automatiserade tester kors
**Then** finns testtackning for att skapa och validera hushallsprofilen
**And** centrala formular ar semantiskt uppmarkta och skarmlasarvanliga.

### Story 1.3: Valja beredskapshorisont

As a hushallsansvarig,
I want to valja vilken beredskapsperiod hushallet planerar for,
So that behov och rekommendationer raknas mot ratt niva.

**Acceptance Criteria:**

**Given** att anvandaren har oppnat hushallsprofilen
**When** anvandaren valjer beredskapshorisont
**Then** kan minst `72 timmar` och `7 dagar` valjas
**And** vald period sparas lokalt och visas tydligt i profilens sammanfattning.

**Given** att ingen beredskapshorisont ar vald
**When** anvandaren forsoker ga vidare till behovs- eller oversiktsvyer
**Then** visas en tydlig uppmaning att valja period
**And** appen undviker att visa skenbart exakta behov utan fullstandig grunddata.

### Story 1.4: Visa hushallets grundbehov for vatten och mat

As a hushallsansvarig,
I want to se hushallets beraknade vatten- och matbehov,
So that I understand vilken grundniva hushallet bor sikta mot.

**Acceptance Criteria:**

**Given** att hushallsprofil och beredskapshorisont finns sparade
**When** anvandaren oppnar behovsvyn
**Then** visas beraknat vattenbehov och ett forenklat mal for matberedskap
**And** resultatet presenteras i begripliga enheter och kategorier.

**Given** att hushallsprofilen eller beredskapshorisonten andras
**When** behovsvyn laddas om eller uppdateras
**Then** raknas behoven om automatiskt
**And** anvandaren ser att resultatet ar ett planeringsstod och inte ett medicinskt personligt rad.

## Epic 2: Hemmaforrad och lagerkontroll

Anvandaren kan registrera, se och korrigera sitt hemmaforrad pa ett enkelt och palitligt satt.

### Story 2.1: Lagg till lagerartikel med snabbformular

As a hushallsansvarig,
I want to lagga till en lagerartikel via en snabb och enkel inmatningsyta,
So that I can registrera mitt hemmaforrad pa nagra sekunder.

**Acceptance Criteria:**

**Given** att anvandaren valjer att lagga till en vara
**When** snabbformularen oppnas
**Then** presenteras en `QuickAddItemSheet` med falt for namn, kategori och antal som obligatoriska uppgifter
**And** enhet och bast fore-datum ar valfria falt.

**Given** att anvandaren fyller i formularen ofullstandigt
**When** sparning forsoks
**Then** visas tydlig validering utan att redan ifyllda varden raderas
**And** formularet ar mobil-forst, tangentbords- och skarmlasarvanligt.

**Given** att artikeln sparas korrekt
**When** sparningen ar klar
**Then** visas en lugn bekraftelse att varan har lagts till
**And** den lokala lagerdatan uppdateras direkt.

### Story 2.2: Visa lagret i tydliga kategorier

As a anvandare,
I want to se mitt lager grupperat i begripliga kategorier,
So that I quickly can forsta vad hushallet redan har hemma.

**Acceptance Criteria:**

**Given** att lagret innehaller artiklar
**When** anvandaren oppnar lageroversikten
**Then** visas artiklarna grupperade i minst vatten, mat och ovrigt via `InventoryCategoryGroup`
**And** varje kategori visar antal artiklar och relevant sammanfattning dar det ar mojligt.

**Given** att en kategori saknar artiklar eller att hela lagret ar tomt
**When** oversikten visas
**Then** presenteras ett vagledande tomlage med nasta rekommenderade steg
**And** informationshierarkin ar enkel att skanna pa mobil och desktop.

### Story 2.3: Redigera och ta bort lagerartikel

As a hushallsansvarig,
I want to kunna korrigera eller ta bort en registrerad lagerartikel,
So that min lageroversikt forblir korrekt och palitlig.

**Acceptance Criteria:**

**Given** att en lagerartikel finns i oversikten
**When** anvandaren valjer att redigera den
**Then** kan namn, kategori, antal, enhet och bast fore-datum andras
**And** andringen slar igenom direkt i lageroversikten efter sparning.

**Given** att anvandaren valjer att ta bort en artikel
**When** borttagningen bekraftas
**Then** tas artikeln bort fran lagret
**And** destruktiv handling kraver tydlig bekraftelse enligt knapphierarkin.

## Epic 3: Beredskapsoversikt och inkopsunderlag

Anvandaren kan forsta vad som saknas, se sin beredskapsstatus och fa ett konkret underlag for nasta inkop eller atgard.

### Story 3.1: Jamfor behov mot lager

As a hushallsansvarig,
I want to jamfora mitt registrerade lager mot hushallets beraknade behov,
So that I can se vilka gap som finns.

**Acceptance Criteria:**

**Given** att hushallsprofil, beredskapshorisont och lagerdata finns
**When** anvandaren oppnar gap-analysen
**Then** visas behov, registrerat lager och gap per relevant kategori
**And** osaker eller ofullstandig data markeras som osakerhet i stallet for exakt precision.

**Given** att hushallsprofil eller lager andras
**When** gap-analysen visas pa nytt
**Then** uppdateras jamforelsen automatiskt
**And** logiken ar testbar med automatiserade tester for centrala berakningsfall.

### Story 3.2: Visa beredskapsstatus och nasta steg

As a anvandare,
I want to fa en lugn statusoversikt med tydliga rekommenderade nasta steg,
So that I quickly understand min beredskapsniva utan att bli overvaldigad.

**Acceptance Criteria:**

**Given** att anvandaren oppnar hem- eller oversiktsvyn
**When** statusen visas
**Then** presenteras en `PreparednessStatusCard`, `GapSummaryCard` och `NextStepPrompt`
**And** sprak, farg och informationsordning ar lugna, icke-alarmistiska och prioriterar status fore detaljer.

**Given** att anvandaren har komplett, partiell eller ingen data
**When** oversikten laddas
**Then** hanteras alla tre tillstanden med begriplig feedback
**And** partial eller saknad data leder anvandaren vidare till ratt nasta handling.

**Given** att anvandaren nyss har laggt till, andrat eller tagit bort en vara
**When** oversikten visas efter andringen
**Then** visas `PreparednessDeltaFeedback` som forklarar hur beredskapen paverkades
**And** viktig information kan forstas utan att farg ensam bar budskapet.

### Story 3.3: Skapa inkopsoversikt fran identifierade gap

As a hushallsansvarig,
I want to fa en inkopsoversikt over det som saknas,
So that I can agera direkt pa mina viktigaste brister.

**Acceptance Criteria:**

**Given** att gap-analysen innehaller brister
**When** anvandaren skapar en inkopsoversikt
**Then** genereras en lista over saknade artiklar eller kategorier med prioritet
**And** listan kan sparas lokalt for fortsatt anvandning.

**Given** att lagret uppdateras efter ett inkop
**When** inkopsoversikten oppnas igen
**Then** visas en uppdaterad sammanstallning baserat pa aktuella gap
**And** anvandaren far tydlig feedback om vad som inte langre saknas.

## Epic 4: Krisguider och snabbhjalp

Anvandaren kan snabbt hitta lugna, kallmarkta och anvandbara guider i pressade situationer.

### Story 4.1: Oppna snabbhjalp fran startskarmen

As a anvandare,
I want to na snabbhjalp direkt fran startskarmen,
So that I can hitta ratt guide inom hogst tva interaktioner nar jag ar stressad.

**Acceptance Criteria:**

**Given** att anvandaren oppnar startskarmen
**When** hemvyn visas
**Then** finns tva tydliga primara ingangar for hushallets status och snabb hjalp
**And** snabbhjalpen ar tillganglig aven om hushallsprofil eller lager inte ar komplett.

**Given** att anvandaren oppnar snabbhjalpsytan
**When** scenarier presenteras
**Then** visas minst `stromavbrott`, `vattenbrist` och `allman kris` som `GuideScenarioCard`
**And** navigationen ar tydlig, mobil-forst och tillganglig.

### Story 4.2: Modellera och exponera publicerat guideinnehall

As a innehallsredaktor,
I want att publicerat guideinnehall har tydlig metadata och kan hamtas konsekvent av klienten,
So that hushallen kan lita pa att guiderna ar begripliga, kallmarkta och uppdaterade.

**Acceptance Criteria:**

**Given** att guideinnehall skapas eller uppdateras
**When** en publicerbar guide sparas
**Then** lagras guideinnehall med kalla, granskningsstatus, uppdateringsdatum och versionsinformation i `PostgreSQL` via `Drizzle ORM`
**And** datamodellen ar separerad fran hushallsdata.

**Given** att klienten behover publicerat guideinnehall
**When** API-kontraktet definieras
**Then** finns versionsstyrda `REST`-endpoints under `/api/v1/content/guides`
**And** kontrakt och validering hanteras med delade scheman.

**Given** att anvandaren oppnar en guide i appen
**When** publicerat innehall hamtas
**Then** kan klienten lasa guideinnehall och tillhorande kallmetadata pa ett konsekvent satt.

### Story 4.3: Visa guide for stromavbrott

As a anvandare,
I want to oppna en kort guide for stromavbrott,
So that I know vilka atgarder hushallet bor ta direkt.

**Acceptance Criteria:**

**Given** att anvandaren valjer scenariot `stromavbrott`
**When** guiden oppnas
**Then** visas korta prioriterade steg i begriplig ordning
**And** guiden visar kalla och senast granskad eller uppdaterad tidpunkt.

**Given** att guideinnehall laddas i klienten
**When** datat hamtas
**Then** anvands typed klientkontrakt och serverdatahantering som passar publicerat innehall
**And** guiden presenteras utan att ge sken av officiellt myndighetsbeslut om det saknar sadan grund.

### Story 4.4: Visa guide for vattenbrist

As a anvandare,
I want to oppna en guide for vattenbrist,
So that I quickly understand vilka atgarder som ar viktigast for hushallet.

**Acceptance Criteria:**

**Given** att anvandaren valjer scenariot `vattenbrist`
**When** guiden visas
**Then** fokuserar innehallet pa forsta praktiska atgarder och hushallets prioriteringar
**And** kalla och granskningsdatum visas tydligt.

**Given** att anvandaren kommer till guiden fran startsidan
**When** flodet genomfors
**Then** kan guiden nas inom hogst tva interaktioner
**And** layouten ar lasbar och touchvanlig pa mobil.

### Story 4.5: Visa guide for allman kris

As a anvandare,
I want to oppna en generell krisguide,
So that I can fa en lugn oversikt nar jag inte vet exakt vilket scenario som galler.

**Acceptance Criteria:**

**Given** att anvandaren valjer scenariot `allman kris`
**When** guiden visas
**Then** presenteras generella rad i lattlast format
**And** guiden kan oppnas utan att anvandaren forst har registrerat hushalls- eller lagerdata.

**Given** att guiden ar publicerad
**When** anvandaren laser den
**Then** framgar kalla, granskningsdatum och avsandare
**And** innehallet undviker ogrundade eller otydligt attribuerade rad.

## Epic 5: Underhall och rotation over tid

Anvandaren kan halla sin beredskap levande genom paminnelser och enkel kontroll av rotation och utgangsdatum.

### Story 5.1: Skapa aterkommande paminnelser

As a hushallsansvarig,
I want to fa enkla aterkommande paminnelser om lagergenomgang,
So that jag kommer ihag att hallla min beredskap uppdaterad.

**Acceptance Criteria:**

**Given** att anvandaren vill skapa en paminnelse
**When** paminnelseinstallningen sparas
**Then** kan minst manadsvis och kvartalsvis rytm valjas
**And** nasta planerade tillfalle visas tydligt i granssnittet.

**Given** att systemnotiser inte ar tillgangliga eller nekas
**When** paminnelsen aktiveras
**Then** erbjuds en begriplig fallback via in-app-markering eller tydlig instruktion
**And** resten av appen fortsatter fungera utan blockerande fel.

### Story 5.2: Visa rotationslista for varor som bor kontrolleras

As a hushallsansvarig,
I want to se vilka artiklar som snart bor anvandas eller ersattas,
So that mitt lager inte forlorar varde over tid.

**Acceptance Criteria:**

**Given** att lagerartiklar har bast fore-datum
**When** rotationsvyn eller paminnelseoversikten oppnas
**Then** markeras artiklar som snart utgaende enligt en enkel regel
**And** artiklar utan datum markeras inte felaktigt som problem.

**Given** att anvandaren granskar rotationslistan
**When** listan visas
**Then** presenteras en sammanstallning over varor som bor kontrolleras eller roteras
**And** informationen ar enkel att skanna och prioritera.

### Story 5.3: Markera vara som roterad eller forbrukad

As a hushallsansvarig,
I want to markera en artikel som forbrukad eller ersatt,
So that lager, rotation och framtida gap forblir korrekta.

**Acceptance Criteria:**

**Given** att en artikel finns i rotationslistan eller lageroversikten
**When** anvandaren markerar den som forbrukad eller ersatt
**Then** uppdateras artikelns status eller mangd i lagret
**And** relevanta sammanstallningar for rotation och framtida beredskapsoversikt uppdateras.

**Given** att handlingen genomfors
**When** uppdateringen ar sparad
**Then** far anvandaren lugn och tydlig feedback om vad som har andrats
**And** destruktiva eller oaterkalleliga steg kraver tydlig bekraftelse.

## Epic 6: Offline, datatillit och egen kontroll

Anvandaren kan lita pa att appen fungerar utan internet, bevarar data mellan sessioner och later dem exportera eller aterstalla sin information.

### Story 6.1: Bevara karnfloden lokalt mellan sessioner

As a anvandare,
I want to att min hushallsdata och mina centrala vyer finns kvar mellan sessioner,
So that jag kan lita pa appen aven om jag bara anvander den ibland.

**Acceptance Criteria:**

**Given** att anvandaren har skapat hushallsprofil, lager eller inkopsoversikt
**When** appen stangs och oppnas igen
**Then** aterlasas den senaste lokala datan utan krav pa inloggning
**And** klientens lokala lagring bygger pa `IndexedDB` via `Dexie`.

**Given** att appen startas utan natverk
**When** tidigare sparad lokal data finns
**Then** kan hushallsprofil, lageroversikt och sparad oversiktsdata fortfarande visas
**And** karnfloden blockereras inte av att servern ar otillganglig.

### Story 6.2: Lasa guider offline och forsta offline-laget

As a anvandare,
I want to kunna lasa guider offline och forsta vad som fortfarande fungerar,
So that appen hjalper mig aven vid dalig eller saknad uppkoppling.

**Acceptance Criteria:**

**Given** att guideinnehall tidigare har laddats i appen
**When** anvandaren tappar natverk och oppnar en guide
**Then** visas senast cachad guide lokalt
**And** app-shell, guideindex och relevanta resurser cachas via service worker och `vite-plugin-pwa`.

**Given** att anvandaren ar offline eller har begransad synkstatus
**When** appen visas
**Then** presenteras en `OfflineStateBanner` med lugn och tydlig information om vad som fortfarande fungerar
**And** laddning och felhantering degraderar graciost utan blockerande fullskarmsfel.

### Story 6.3: Exportera, importera och aterhamta lokal data utan konto

As a anvandare,
I want to exportera, importera och vid behov aterhamta min lokala data utan att skapa konto,
So that jag behaller kontrollen over min information och kan skydda mig mot dataforlust.

**Acceptance Criteria:**

**Given** att anvandaren oppnar installningar for datahantering
**When** en export startas
**Then** kan hushalls- och lagerdata exporteras i ett validerat format
**And** karnfloden fungerar utan obligatorisk inloggning eller konto.

**Given** att anvandaren importerar en tidigare export
**When** filen valideras
**Then** kontrolleras struktur och innehall innan lokal data skrivs over
**And** ogiltiga filer stoppas med tydlig och losningsfokuserad feedback.

**Given** att lokal data ar skadad eller ofullstandig
**When** appen identifierar korruption vid start eller import
**Then** visas ett begripligt aterstallningslage i stallet for krasch
**And** anvandaren kan valja att importera backup eller borja om kontrollerat.
