# Sprintplan - BePrepared

**Datum:** 2026-04-08  
**Källa:** PRD, arkitektur, UX-spec och nuvarande epic/story-underlag  
**Viktig not:** Denna plan är en arbetsbar sprintplanering baserad på PRD:ns epics och stories eftersom [`epics.md`](C:\Users\hellgrenpo\BePrepared\_bmad-output\planning-artifacts\epics.md) ännu inte är färdigbruten.

## Planeringsprinciper

Prioriteringsordningen i denna plan är:

1. Kritiska användarflöden
2. Stabil grundarkitektur
3. Säkerhet och robusthet
4. UX för högstress-scenarier

För BePrepared betyder det i praktiken:

- Vi bygger först en stabil lokal-först grund som inte låser appen till backend eller inloggning.
- Vi prioriterar sedan det akuta användningsläget: snabb hjälp, lugn guideåtkomst och offline-fungerande kärnflöden.
- Därefter bygger vi vardagsvärdet: hushållsprofil, lager och status.
- Avancerade eller mindre tidskritiska funktioner kommer sist.

## Rekommenderad genomförandeordning

### Sprint 0 - Grundplattform och säker grund

**Mål:** Etablera det som alla senare stories behöver för att vara robusta, testbara och mobilanpassade.

**Tekniska grundblock:**

- Scaffolda `apps/web` med `React + TypeScript + Vite`
- Scaffolda separat `apps/api` med `Node.js + Express`
- Etablera feature-baserad struktur enligt arkitekturen
- Lägg in `Tailwind`, `React Router`, `Zod`, `react-hook-form`, `TanStack Query`
- Sätt upp lokal lagringsmodell med `Dexie`
- Lägg in PWA-grund med `vite-plugin-pwa`
- Sätt upp backend med `Pino`, health endpoint och enhetligt felkontrakt
- Etablera testsetup med `Vitest` och `Playwright`
- Säkerställ att appen kan starta utan konto

**Varför först:** Utan detta blir senare stories antingen ombyggnadsarbete eller riskerar att bryta mot lokal-först, mobil-först och robusthetskraven.

### Sprint 1 - Högstressläge och snabbhjälp

**Primära stories:**

- `US-14` Snabbhjälpsläge från startsidan
- `US-11` Guide för strömavbrott
- `US-12` Guide för vattenbrist
- `US-13` Generell krisguide
- Delmängd av `US-17` för att guider och app-shell fungerar offline
- Delmängd av `US-19` för att kärnflöden fungerar utan inloggning

**Mål:** Appen ska snabbt kunna hjälpa användaren i ett pressat läge, även om resten av setupen inte är klar.

**Varför så tidigt:** Det här är den mest tidskritiska användarsituationen och den mest tydliga stress-UXen i produkten.

### Sprint 2 - Hushållsprofil och inventariegrunden

**Primära stories:**

- `US-01` Registrera hushållsprofil
- `US-02` Välj beredskapshorisont
- `US-05` Lägg till lagerartikel manuellt
- `US-06` Visa lagret i relevanta kategorier
- `US-18` Robust lokal lagring mellan sessioner

**Mål:** Skapa den första hållbara vardagsloopen: användaren lägger in sitt hushåll, börjar registrera sitt förråd och kan lita på att data finns kvar.

**Varför här:** Dessa stories är grunden för nästan all senare status- och gaplogik.

### Sprint 3 - Status, gap och nästa steg

**Primära stories:**

- `US-03` Beräkna grundbehov av vatten
- `US-04` Beräkna grundbehov av mat
- `US-08` Jämför behov mot lager
- `US-09` Visa enkel beredskapsstatus med prioritering
- `US-10` Skapa inköpsöversikt

**Mål:** Leverera appens centrala orienteringsvärde: användaren ska se hur hushållet ligger till och vad som saknas.

**Varför efter Sprint 2:** Beräkningar och status är först meningsfulla när hushålls- och lagerdata redan fungerar pålitligt.

### Sprint 4 - Förvaltning, korrigering och fördjupad robusthet

**Primära stories:**

- `US-07` Redigera och ta bort lagerartikel
- Full `US-17` offline för kärnflöden
- `US-15` Återkommande påminnelser
- `US-16` Enkel rotation och utgångsdatum
- `US-19` Export/import av lokal data

**Mål:** Göra appen hållbar över tid, mer tillförlitlig och enklare att leva med i vardagen.

**Varför sist:** Det här är viktigt för kvalitet och långsiktig nytta, men inte nödvändigt för att få första kritiska användarvärdet i drift.

## Stories som bör implementeras först

Det här är de viktigaste förstastoriesarna, i rekommenderad ordning:

1. Arkitektur- och repo-setup enligt Sprint 0
2. `US-14` Snabbhjälpsläge från startsidan
3. `US-11` Guide för strömavbrott
4. `US-12` Guide för vattenbrist
5. `US-01` Registrera hushållsprofil
6. `US-02` Välj beredskapshorisont
7. `US-05` Lägg till lagerartikel manuellt
8. `US-06` Visa lagret i kategorier
9. `US-18` Robust lokal lagring
10. `US-09` Visa beredskapsstatus

Detta ger både:

- ett akut användningsläge tidigt
- en stabil datagrund
- en snabb väg till produktens kärnvärde

## Beroenden

### Kritiska beroenden

- `US-02` måste finnas före `US-03`, `US-04`, `US-08`, `US-09` och `US-10`
- `US-01` måste finnas före `US-03`, `US-04`, `US-08` och `US-09`
- `US-05` och `US-06` måste finnas före `US-08`, `US-09`, `US-10`, `US-15` och `US-16`
- `US-18` bör finnas innan större delar av `US-17`, `US-15`, `US-16` och `US-19`
- `US-14` bör finnas före full guideupplevelse i `US-11`, `US-12` och `US-13`

### Tekniska beroenden

- Offline/PWA-grund behövs innan full `US-17`
- Gemensam validering med `Zod` behövs innan export/import i `US-19`
- Strukturerat felkontrakt och loggning bör finnas innan backendberoende innehållsflöden hårdnar
- Testsetup bör finnas innan status- och offlineflöden byggs ut, eftersom dessa är regressionskänsliga

## Risker att bevaka

- Om status och gap byggs innan lokal lagring och inventariegrunden är stabil riskerar vi falsk precision och ombyggnad.
- Om guider byggs utan offline- och källmodell riskerar vi att missa både robusthet och trovärdighet.
- Om export/import kommer för tidigt utan strikt validering riskerar vi datakorruption.
- Om vi bygger för mycket backend tidigt riskerar vi att bryta principen `local-first, sync-optional`.

## Rekommenderad implementationstakt

**Första leverabla MVP-slice:**

- Sprint 0 + den viktigaste delen av Sprint 1

Det betyder att teamet tidigt kan visa:

- appen startar utan konto
- användaren når snabbhjälp direkt
- guider fungerar lugnt och tydligt
- grunden finns för offline och vidare funktioner

**Första kompletta produktloop:**

- Sprint 0 + Sprint 1 + Sprint 2 + Sprint 3

Det är först där BePrepared fullt ut levererar:

- snabbhjälp i kris
- hushållssetup
- inventarie
- beredskapsstatus
- gap och inköpsöversikt

## Rekommenderade nästa BMAD-steg

1. Slutför `bmad-create-epics-and-stories` så att denna plan kan förankras i färdig backlog.
2. Använd denna sprintplan som riktning för nästa version av epic/story-dokumentet.
3. Kör sedan `bmad-sprint-planning` igen när `epics.md` är färdigt, så att sprintstatusen kan regenereras utan antaganden.
