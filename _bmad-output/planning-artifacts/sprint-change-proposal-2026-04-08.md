---
workflowType: "correct-course"
status: "approved"
date: "2026-04-08"
mode: "incremental"
changeScope: "moderate"
sourceAssessment: "_bmad-output/planning-artifacts/implementation-readiness-report-2026-04-08.md"
affectedArtifacts:
  - "_bmad-output/planning-artifacts/epics.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
skippedArtifacts:
  - "_bmad-output/planning-artifacts/prd.md"
approvedByUser: true
---

# Sprint Change Proposal

## 1. Issue Summary

Implementation readiness review identified that the project is strategically ready, but not yet fully shaped for low-risk implementation. The strongest issues are three overly broad stories in the current backlog:

- `Story 1.1` in Epic 1
- `Story 4.2` in Epic 4
- `Story 6.3` in Epic 6

These stories currently bundle too many concerns into single delivery objects, which increases implementation risk, weakens estimation quality, and creates avoidable ambiguity for sprint planning.

The review also identified two documentation alignment issues:

- `architecture.md` still states that the UX specification is not fully developed
- `ux-design-specification.md` contains one platform-strategy phrase that says `webb forst men mobiloptimerad`, while the rest of the planning set consistently treats the product as `mobil forst`

Evidence supporting this proposal:

- Readiness result: `NEEDS WORK`
- Full FR coverage already exists
- No epic-level structural failure was found
- Risk is concentrated in story scope and artifact consistency rather than missing product direction

## 2. Impact Analysis

### Epic Impact

No new epics are required.
No existing epics should be removed.
No major epic resequencing is required.

Affected epics:

- `Epic 1`: keep scope, narrow startup story to a realistic foundation slice
- `Epic 4`: keep scope, narrow guide-platform story to published-content modeling and exposure
- `Epic 6`: keep scope, keep export/import and recovery centered on user value rather than making the story carry all verification work

### Story Impact

The following stories should be adjusted:

- `Story 1.1`: reduce from broad platform + UI quality bundle to monorepo, minimal app shell, routing, and health endpoint
- `Story 4.2`: reduce from full editorial governance surface to published guide-content modeling and public exposure
- `Story 6.3`: keep export/import/recovery scope, but remove exclusive ownership of broad verification responsibilities

### Artifact Conflict Impact

Artifacts requiring updates in this proposal:

- `epics.md`
- `architecture.md`
- `ux-design-specification.md`

Artifact intentionally not changed in this round:

- `prd.md`

Reason for skipping PRD changes:

- The team chose to keep PRD wording unchanged for now
- Open product questions remain visible there and should be handled later if needed
- This proposal therefore focuses on backlog and planning-artifact harmonization rather than product-policy lock-in

### Technical / Process Impact

- No implementation rollback is required
- No architecture pivot is required
- Sprint planning should happen after backlog scope tightening is accepted
- Change scope is best classified as `Moderate` because it requires backlog reorganization and PO/SM coordination before implementation

## 3. Recommended Approach

### Selected Path

`Option 1: Direct Adjustment`

### Rationale

This is the smallest effective correction that resolves the real issue:

- it preserves momentum
- it keeps the existing epic structure intact
- it improves sprintability and estimation quality
- it reduces implementation risk without redefining the MVP

### Alternatives Considered

`Option 2: Potential Rollback`

- Rejected
- No completed implementation needs to be unwound
- Cost and disruption would be higher than the value gained

`Option 3: PRD MVP Review`

- Not selected as primary path
- The MVP is still achievable as defined
- Some PRD ambiguity remains, but it does not currently justify a full MVP reduction or redefinition

### Effort, Risk, Timeline

- Effort: `Low-Medium`
- Risk: `Low`
- Timeline impact: minor delay before sprint planning, in exchange for lower implementation churn later

## 4. Detailed Change Proposals

### 4.1 Stories / `epics.md`

#### Story 1.1

**Section:** `Epic 1 -> Story 1.1`

**OLD**

```md
### Story 1.1: Oppna appen och starta hushallsprofilen

As a forstagangsanvandare,
I want to open a tydlig och mobil-forst appstart for hushallsprofilen,
So that I can borja anvanda BePrepared utan onboarding eller teknisk friktion.

**Acceptance Criteria:**

**Given** att anvandaren oppnar appen for forsta gangen
**When** startvyn laddas
**Then** visas en mobil-forst appskal med tydlig primar vag till att skapa hushallsprofil
**And** grunden ar scaffoldad i ett monorepo med `apps/web`, `apps/api` och `packages/shared` baserat pa `Vite React TypeScript` och `Express` med TypeScript.

**Given** att anvandaren navigerar mellan start och profilflode
**When** vyer byts
**Then** sker navigation via `React Router`
**And** layout, fokusmarkeringar, typografi, fargtokens och touchytor stoder `WCAG AA`, breakpoint-strategin och ett themeable `Tailwind`-baserat designsystem.

**Given** att backend ar igang
**When** en klient eller test anropar `/api/v1/health`
**Then** returneras en halsorespons for API:t
**And** begaran loggas strukturerat med `Pino` och `traceId`.
```

**NEW**

```md
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
```

**Rationale**

This narrows the setup story to a realistic foundation slice and avoids making the first implementation item carry full design-system, accessibility, and responsive-verification scope.

#### Story 4.2

**Section:** `Epic 4 -> Story 4.2`

**OLD**

```md
### Story 4.2: Hantera guideinnehall med kallor och revisionsspar

As a innehallsredaktor,
I want to skapa och publicera guideinnehall med kalla, granskningsstatus och revisionshistorik,
So that hushallen kan lita pa att guiderna ar sakliga och sparbara.

**Acceptance Criteria:**

**Given** att en redaktor arbetar med guideinnehall
**When** en guide skapas eller uppdateras
**Then** lagras guideinnehall, kalla, granskningsstatus, uppdateringsdatum och revision i `PostgreSQL` via `Drizzle ORM`
**And** datamodellen ar separerad fran hushallsdata.

**Given** att publicerat guideinnehall ska exponeras till klienten
**When** API-kontraktet definieras
**Then** tillhandahalls versionsstyrda `REST`-endpoints under `/api/v1/content/guides`
**And** kontrakt, validering och dokumentation hanteras med `Zod` och `OpenAPI 3.1`.

**Given** att skyddade publiceringsfunktioner anvands
**When** en publicerings- eller administrationsbegaran goras
**Then** loggas handlingen med `Pino` och `traceId`
**And** endpointen ar forberedd for rollskydd med `editor` eller `admin` nar JWT-verifiering aktiveras.
```

**NEW**

```md
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
```

**Rationale**

This keeps Epic 4 user value intact while removing the high-risk bundling of admin, publication control, audit, and authorization from one story.

#### Story 6.3

**Section:** `Epic 6 -> Story 6.3`

**OLD**

```md
### Story 6.3: Exportera, importera och aterhamta lokal data utan konto

As a anvandare,
I want to exportera, importera och vid behov aterhamta min lokala data utan att skapa konto,
So that jag behaller kontrollen over min information och kan skydda mig mot dataforlust.

**Acceptance Criteria:**

**Given** att anvandaren oppnar installningar for datahantering
**When** en export startas
**Then** kan hushalls- och lagerdata exporteras i ett enkelt validerat format
**And** karnfloden fungerar utan obligatorisk inloggning eller konto.

**Given** att anvandaren importerar en tidigare export
**When** filen valideras
**Then** kontrolleras struktur och innehall innan lokal data skrivs over
**And** ogiltiga filer stoppas med tydlig och losningsfokuserad feedback.

**Given** att lokal data ar skadad eller ofullstandig
**When** appen identifierar korruption vid start eller import
**Then** visas ett begripligt aterstallningslage i stallet for krasch
**And** anvandaren kan valja att importera backup eller borja om kontrollerat.

**Given** att kvaliteten pa offline- och datafloden verifieras
**When** automatiserade och manuella tester genomfors
**Then** omfattas export/import, offlineguider och lokal aterlasning av testfall
**And** responsivitet och tillganglighet kontrolleras pa mobil och desktop.
```

**NEW**

```md
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
```

**Rationale**

This preserves the product outcome while removing broad cross-cutting verification scope from a single story.

### 4.2 PRD / `prd.md`

No PRD edits are included in this proposal.

**Status:** `Skipped by user`

**Impact note:**

Open product questions in the PRD remain visible and unresolved in the source document. This proposal therefore does not claim that those decisions are closed; it only corrects scope and artifact consistency elsewhere.

### 4.3 Architecture / `architecture.md`

#### Update 1: UX maturity statement

**Section:** `Technical Constraints & Dependencies`

**OLD**

```md
UX-specen är ännu inte fullt utbyggd, men PRD:t och användarens styrning indikerar höga krav på läsbarhet, robust navigation, tillgänglighet, snabb förståelse under stress och stöd för kritiska flöden även när vissa systemdelar faller bort.
```

**NEW**

```md
UX-specen ar nu fullt etablerad som planeringsunderlag och specificerar bland annat mobil-forst informationshierarki, tydliga primara ingangar, komponentkrav, tillganglighet och responsiv strategi. Arkitekturen ska darfor stodja dessa UX-krav explicit i struktur, routing, offlinebeteende och komponentgranser.
```

#### Update 2: Gap analysis note

**Section:** `Gap Analysis Results -> Important Gaps`

**OLD**

```md
- UX-specen är ännu inte fullständigt utvecklad, vilket kan kräva komplettering innan detaljerad UI-implementation.
```

**NEW**

```md
- UX-specen ar tillrackligt utvecklad for implementation, men backloggen behover fortsatt halla vissa stories snavt scoped sa att UX-, innehalts- och plattformsansvar inte blandas i samma leveransobjekt.
```

#### Update 3: Added implementation note

**NEW SECTION**

```md
### Implementation Note: Story Scope Alignment

Forsta implementationsstoryn ska etablera monorepo, minimalt webbskal, grundlaggande routing och health endpoint, men inte forsoka leverera full designsystemsefterlevnad, full tillganglighetsefterlevnad och komplett responsiv verifiering i samma story. Dessa kvalitetskrav kvarstar som tvargaende krav over flera stories.

Guideplattformen ska i MVP i forsta hand fokusera pa modellering och exponering av publicerat guideinnehall. Fullt redaktorsflode, publiceringsstyrning och utokat adminstod kan delas upp i separata backloggobjekt om teamet behover lagre leveransrisk.

Export/import-storyn ska fokusera pa kontooberoende backup, validerad import och begripligt aterstallningslage. Tvargaende verifiering av tillganglighet, responsivitet och offlinekvalitet ska fortsatt planeras pa feature- och sprintniva, inte som exklusivt ansvar for en enda story.
```

**Rationale**

These updates remove outdated UX readiness assumptions and make architecture-to-backlog expectations explicit.

### 4.4 UX / `ux-design-specification.md`

#### Update 1: Platform Strategy

**Section:** `Platform Strategy`

**OLD**

```md
BePrepared ska vara webb forst men mobiloptimerad. Upplevelsen ska darfor designas for sma skarmar, touchinteraktion och korta sessioner, samtidigt som losningen fortfarande fungerar val i vanlig weblasare pa storre skarmar. Plattformen ska stodja offlinekritiska delar av upplevelsen och kunna utvecklas mot PWA-beteende dar det starker tillganglighet och robusthet.
```

**NEW**

```md
BePrepared ska vara mobil forst och webbkompatibel. Upplevelsen ska darfor designas med sma skarmar, touchinteraktion och korta sessioner som primar referens, samtidigt som losningen fortsatt ska fungera val i vanlig weblasare pa storre skarmar. Plattformen ska stodja offlinekritiska delar av upplevelsen och kunna utvecklas mot PWA-beteende dar det starker tillganglighet och robusthet.
```

#### Update 2: Optional supporting clarification

**NEW LINE**

```md
Mobilversionen ar dimensionerande for informationshierarki, navigation och karninteraktioner, medan tablet och desktop ar progressiva anpassningar av samma grundfloden.
```

**Rationale**

This removes the only clear semantic conflict in the UX document and aligns it with the rest of the planning set.

## 5. Implementation Handoff

### Scope Classification

`Moderate`

### Why Moderate

The proposal does not require a fundamental product replan, but it does require coordinated backlog and planning-artifact updates before implementation should begin.

### Handoff Recipients and Responsibilities

`Scrum Master / Product Owner`

- update `epics.md` with the approved story-scope refinements
- ensure sprint planning uses the narrowed stories rather than the previous versions

`Architect`

- update `architecture.md` with the approved UX-maturity and story-scope-alignment changes
- verify architecture notes remain consistent with the implementation sequence

`UX / Product Design`

- update `ux-design-specification.md` to state the platform strategy explicitly as `mobil forst`

`Product Manager / Product Owner`

- decide later whether unresolved PRD questions should remain open or be converted into explicit MVP assumptions
- confirm whether a separate PRD correction round is needed before later release planning

`Development Team`

- do not start implementation from the old broad versions of `Story 1.1`, `Story 4.2`, or `Story 6.3`
- implement only after the approved backlog refinements have been applied

### Success Criteria

- the three high-risk stories are narrowed in the source backlog
- architecture no longer describes the UX spec as incomplete
- UX platform strategy is consistently described as mobile-first
- sprint planning can estimate and sequence the adjusted work without hidden scope inflation

## 6. Approval Status

Current approval state from incremental review:

- `epics.md` proposal: `approved`
- `prd.md` proposal: `skipped`
- `architecture.md` proposal: `approved`
- `ux-design-specification.md` proposal: `approved`

Next action:

- review this full proposal as one document
- if approved, proceed to apply the accepted source-artifact changes and then continue to sprint planning
