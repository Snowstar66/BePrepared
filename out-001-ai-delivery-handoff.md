# Framing Brief

This package is intended as input to the next controlled AI-assisted step, for example BMAD-based design or structured refinement.

## Customer Handshake
Outcome key: OUT-001
Outcome title: Förbättrad hushållsberedskap för privatpersoner genom en enkel prepper-app
Timeframe: 2016 AprilIntern demo/POC MVP. Needs human review för exakt tidshorisont.
Value owner: Anne Hathaway

### Problem Statement
Privatpersoner saknar ofta en samlad och enkel lösning för att förstå vad som behövs inför en kris, hålla koll på sitt hemmaförråd och få praktiska instruktioner om vad de ska göra och vart de kan vända sig. Detta gör att beredskapen blir ojämn, svår att underhålla och svår att omsätta i faktisk handling.

### Outcome Statement
Möjliggöra att en privatperson med hjälp av en MVP-app kan förstå sitt beredskapsbehov, registrera sitt prepplager, se vad som saknas och få grundläggande krisinstruktioner för hushållet.

### Solution Context & Constraints
Solution context: Not captured yet
Constraints: ## General constraints
Imported constraints
- Architecture Intent: ## Architecture Intent

## UX principles
Design an internal enterprise web application focused on workflows, efficiency, and clarity.
Layout:
* Sidebar navigation with multiple sections (Tasks, Cases, Reports, Admin)
* Dashboard overview with status and tasks
* Detailed views for workflows and processes
UI components:
* Data tables with bulk actions
* Forms with validation and step-by-step flows
* Status indicators (pending, approved, rejected)
* Task lists and activity feeds
* Notifications and alerts
Design style:
* Functional, clear, and structured
* Less emphasis on visual flair, more on usability
* Neutral colors with semantic highlights (green, red, yellow)
* Consistent spacing and layout
UX principles:
* Reduce user errors and confusion
* Support complex workflows
* Make status and next actions clear
* Role-based interface considerations
Inspiration:
SAP Fiori, ServiceNow, internal admin systems
Imported UX input
- NFR-003 - Tydlig och icke-alarmistisk UX: ### NFR-003 - Tydlig och icke-alarmistisk UX - Appen ska skapa känsla av trygghet och handlingskraft, inte förstärka oro.

## Non-functional requirements
Imported non-functional requirements
- Non-Functional Requirements: ## Non-Functional Requirements
- NFR-001 - Offline-stöd för kärninnehåll: ### NFR-001 - Offline-stöd för kärninnehåll - Kärninnehåll som lageröversikt och guider bör vara tillgängligt utan internet i MVP eller så tidigt som möjligt, eftersom användningssituationen kan sammanfalla med störni...
- NFR-002 - Låg användningsfriktion: ### NFR-002 - Låg användningsfriktion - Centrala flöden ska vara enkla nog att förstå och använda utan onboarding eller utbildning.
- NFR-004 - Lokal datalagring eller robust enkel lagring: ### NFR-004 - Lokal datalagring eller robust enkel lagring - Lagerdata och centrala användaruppgifter bör hanteras på ett sätt som stödjer enkelhet och tillgänglighet även i demo/POC.
- NFR-005 - Kvalitetssäkrat informationsinnehåll: ### NFR-005 - Kvalitetssäkrat informationsinnehåll - Guider och rekommendationer får inte presenteras som myndighetsbeslut eller officiella instruktioner utan källa och granskning. Needs human review.
Data sensitivity: Not captured yet
Delivery type: AD
Application Development: frame a new application, service or meaningful functional expansion. Keep focus on outcome, scope and why the capability should exist.

## Baseline
Readiness: Ready
Definition: Needs human review. Ingen verifierad nulägesmätning finns ännu för användarnas nuvarande beredskapsnivå, lagertäckning eller kunskapsnivå.
Source: För intern demo/POC föreslås mätning via:
andel av rekommenderad checklista som är uppfylld
antal registrerade lagerartiklar
beräknad täckning i dagar för vatten och mat
genomförande av centrala användarflöden i demo utan stöd

## AI and Risk
Execution pattern: step by step
AI level: LEVEL 2
Level 2 means structured acceleration: AI produces artifacts step-by-step and humans review between each step.
Expected AI use across lifecycle: BMAD kommer hjälpa till att förfina user stories och göra design klar för build med Codex. 
Risk profile: medium
Business impact: medium: Jag riskerar sakna saker i min beredskap
Data sensitivity: low: Inga personuppgifter. Bara saker. Möjligen antal personer i hushållet.
Blast radius: low: Det är en standalone app så låg risk
Decision impact: low: Assisterar bara tillsvidare.
Level 3 justification: Not captured yet

## Framing Warnings
- No warnings were visible at export time.

## Epics and Story Ideas
### EPIC-001 - EPC-001 - Hushållsprofil och behovsberäkning
Scope boundary: Inkluderar hushållsstorlek och grundläggande behovsberäkning för vatten och mat. Exkluderar avancerade medicinska, geografiska eller myndighetsspecifika behov.
- Story Idea STORY-001: SC-001 - Registrera hushållets storlek
  Value intent: Användaren ska kunna ange hur många personer hushållet omfattar.
  Expected behavior: Appen sparar hushållsstorlek och använder den som grund för senare behovsberäkningar.
  UX sketches: None attached
- Story Idea STORY-002: SC-002 - Ange särskilda hushållsfaktorer
  Value intent: Användaren ska kunna markera enkla behovsdrivare som barn eller husdjur.
  Expected behavior: Appen justerar eller kompletterar rekommendationer utifrån dessa val. Needs human review för exakt regelverk i MVP.
  UX sketches: None attached
- Story Idea STORY-003: SC-003 - Beräkna grundbehov av vatten
  Value intent: Användaren ska förstå hur mycket vatten hushållet minst bör ha hemma.
  Expected behavior: Appen visar ett beräknat vattenbehov baserat på hushållsprofil och vald beredskapsperiod.
  UX sketches: None attached
- Story Idea STORY-004: SC-004 - Beräkna grundbehov av mat
  Value intent: Användaren ska förstå hur mycket mat hushållet behöver för grundläggande beredskap.
  Expected behavior: Appen visar ett förenklat behovsmål för mat för hushållet.
  UX sketches: None attached

### EPIC-002 - EPC-002 - Lagerhantering för hemmaförråd
Scope boundary: Inkluderar manuell registrering av varor, kategorier och antal. Exkluderar streckkodsscanning och avancerad inventeringslogik i MVP
- Story Idea STORY-005: SC-005 - Lägg till lagerartikel manuellt
  Value intent: Användaren ska snabbt kunna registrera vad som redan finns hemma.
  Expected behavior: Appen låter användaren ange namn, kategori och antal för en vara.
  UX sketches: None attached
- Story Idea STORY-006: SC-006 - Visa lagret i kategorier
  Value intent: Användaren ska få överblick över sitt prepplager.
  Expected behavior: Appen visar registrerade artiklar grupperade i enkla kategorier som vatten, mat och övrigt.
  UX sketches: None attached

### EPIC-003 - EPC-003 - Gap-analys och beredskapsöversikt
Scope boundary: Inkluderar enkel jämförelse mellan beräknat behov och registrerat lager. Exkluderar avancerad scoringmodell och externa datakällor i MVP
- Story Idea STORY-007: SC-007 - Jämför behov mot lager
  Value intent: Användaren ska se skillnaden mellan rekommenderat behov och nuvarande lager.
  Expected behavior: Appen visar vad som saknas inom centrala kategorier.
  UX sketches: None attached
- Story Idea STORY-008: SC-008 - Visa enkel beredskapsstatus
  Value intent: Användaren ska snabbt förstå sin nuvarande beredskapsnivå.
  Expected behavior: Appen visar en förenklad statusöversikt baserad på registrerat lager och definierade behov.
  UX sketches: None attached

### EPIC-004 - EPC-004 - Guider och instruktioner vid kris
Scope boundary: Inkluderar grundläggande guider för exempelvis strömavbrott, vattenbrist och allmän samhällskris. Exkluderar realtidsinformation och myndighetsintegration i MVP.
- Story Idea STORY-009: SC-009 - Visa guide för strömavbrott
  Value intent: Användaren ska få enkel och direkt vägledning vid strömavbrott.
  Expected behavior: Appen visar en kort steg-för-steg-guide med rekommenderade åtgärder.
  UX sketches: None attached
- Story Idea STORY-010: SC-010 - Visa guide för vattenbrist
  Value intent: Användaren ska veta vad som är viktigast att göra om vattenförsörjningen störs.
  Expected behavior: Appen visar grundläggande instruktioner för hushållet.
  UX sketches: None attached
- Story Idea STORY-011: SC-011 - Visa guide för allmän kris
  Value intent: Användaren ska kunna hitta grundläggande råd om hur hushållet bör agera vid samhällsstörning.
  Expected behavior: Appen visar sammanställda råd och vägledning i ett lättläst format.
  UX sketches: None attached

### EPIC-005 - EPC-005 - Underhåll, rotation och påminnelser
Scope boundary: Inkluderar enkla påminnelser och stöd för att följa upp lagret. Exkluderar avancerad bäst före-optimering och automatiska inköpsflöden i MVP.
- Story Idea SC-001: Story Ideas
  Value intent: ## Story Ideas
  Expected behavior: Not captured yet
  UX sketches: None attached
- Story Idea STORY-012: SC-012 - Skapa enkel påminnelse om att följa upp lagret
  Value intent: Användaren ska komma ihåg att återvända till appen och kontrollera sitt lager.
  Expected behavior: Appen stödjer en enkel återkommande påminnelsefunktion.
  UX sketches: None attached
- Story Idea STORY-013: SC-013 - Skapa enkel inköpsöversikt över vad som saknas
  Value intent: Användaren ska lätt kunna agera på gap-analysen.
  Expected behavior: Appen visar en enkel sammanställning av saknade artiklar eller kategorier.
  UX sketches: None attached
- Story Idea SC-002: CF-004 - Designredo stories saknas ännu
  Value intent: ### CF-004 - Designredo stories saknas ännu - Reason kept outside core structure: Underlaget räcker för Framing och Story Ideas men inte fullt ut för Delivery Stories med testba...
  Expected behavior: Reason kept outside core structure: Underlaget räcker för Framing och Story Ideas men inte fullt ut för Delivery Stories med testbara acceptanskriterier.; source summary: AAS kr...
  UX sketches: None attached

## Tollgate 1 Approval Context
Approval status: Approved
Approved version: 30
Approved at: 2026-04-08T14:56:14.315Z
- architect (supplier)
  Person: Benedict Cumberbatch
  Role title: Solution Architect
  Approved at: 2026-04-08T14:56:12.215Z
  Motivation: AI är förberedd och under kontroll. Level 2.
- value owner (customer)
  Person: Anne Hathaway
  Role title: Value Owner
  Approved at: 2026-04-08T14:55:36.290Z
  Motivation: Jag tycker appen är tillräckligt specad för en MVP.

## Recommended Use In The Next Step
Use this Framing package as input for BMAD or another controlled AI tool when you move into design, story refinement or structured delivery planning.
- Treat the customer handshake, baseline and AI/risk posture as the framing source of truth.
- Treat Epics and Story Ideas as directional input for design and delivery refinement, not as fixed implementation steps.
- Use the approval section to understand whether this Framing version is already signed off for Tollgate 1.
- Use the UX sketch references where they exist to preserve visual intent in the next step.

## Export Metadata
Lifecycle state: active
Origin type: imported
Exported at: 2026-04-08T14:56:18.858Z