---
workflowType: "prd"
status: "draft-ready-for-solutioning"
project: "BePrepared"
date: "2026-04-08"
language: "Swedish"
inputDocuments:
  - "out-001-ai-delivery-handoff.md"
  - "_bmad-output/project-context.md"
  - "docs/BePreparedUX.jpg"
---

# PRD - BePrepared Krisapp MVP

**Author:** Codex  
**Date:** 2026-04-08  
**Primary source:** `out-001-ai-delivery-handoff.md`

## 1. Sammanfattning

BePrepared ska vara en mobil-först krisapp som hjälper privatpersoner att snabbt förstå sitt hushålls beredskapsbehov, registrera sitt hemmaförråd, se vad som saknas och få tydliga guider vid störningar som strömavbrott eller vattenbrist. Produkten ska fungera under stress, med låg friktion, lugn tonalitet och tillgång till kärninnehåll även utan internet.

Detta PRD behandlar handoff-dokumentets story ideas som råmaterial. Innehållet har förfinats till testbara user stories med acceptanskriterier, kompletterats med saknade stories och edge cases, och strukturerats för vidare solutioning i BMad.

## 2. Källor Och Hur De Har Tolkats

### 2.1 Använda källor

- `out-001-ai-delivery-handoff.md` är huvudkälla för problem, outcome, NFR-utkast, epics och story ideas.
- `_bmad-output/project-context.md` styr teknikpreferenser och kritiska regler.
- `docs/BePreparedUX.jpg` granskades som UX-referens men bedömdes vara en generisk enterprise-dashboard och inte en lämplig huvudinspiration för en krisapp.

### 2.2 Konflikter, dubbletter och beslut

1. Handoffen innehåller ett generiskt enterprise-UX-block som motsäger både krisappens användningssituation och projektets regel om mobil först.  
Beslut: PRD:t prioriterar mobil-först, snabbnavigerad kris-UX framför dashboard/ärendehantering.

2. Tidsangivelsen `2016 AprilIntern demo/POC MVP` är uppenbart korrupt eller ofullständig.  
Beslut: PRD:t antar att initiativet gäller en nutida MVP/POC och lämnar exakt leveransdatum öppet.

3. `STORY-003` och `STORY-004` refererar till beräkningar baserat på vald beredskapsperiod, men någon tydlig periodstory finns inte i källmaterialet.  
Beslut: En ny story för val av beredskapshorisont läggs till som förutsättning för testbara behovsberäkningar.

4. Epic 5 innehåller två uppenbara exportartefakter: `Story Idea SC-001: Story Ideas` och `Story Idea SC-002: CF-004 - Designredo stories saknas ännu`.  
Beslut: Dessa behandlas inte som riktiga stories och exkluderas från backloggen.

5. Handoffen beskriver låg datasensitivitet men appen lagrar ändå hushållsstorlek och beredskapsdata.  
Beslut: PRD:t utgår från dataminimering, lokal-först lagring och ingen obligatorisk inloggning i MVP.

6. Källmaterialet innehåller guider men förbjuder att innehåll presenteras som myndighetsbeslut utan källa och granskning.  
Beslut: Källhänvisning, granskningsdatum och tydlig innehållsstatus blir explicita krav.

### 2.3 Identifierade luckor som har fyllts

- Ingen tydlig förstaupplevelse eller snabb väg till värde.
- Ingen story för att redigera eller ta bort lagerartiklar.
- Ingen story för offlineåtkomst, lokal datalagring eller export/import trots att NFR:erna pekar dit.
- Ingen tydlig hantering av tomma tillstånd, nekade notisbehörigheter eller datakorruption.
- Ingen tydlig rollmodell för slutanvändare kontra intern innehållsförvaltning.

## 3. Produktvision

### 3.1 Problem

Privatpersoner saknar ofta ett enkelt, sammanhållet och praktiskt stöd för att:

- förstå vad hushållet behöver inför en kris,
- hålla koll på sitt hemmaförråd,
- omsätta beredskap till konkret handling,
- hitta tydliga instruktioner snabbt när något redan har hänt.

### 3.2 Produktmål

1. Göra hushållets beredskapsnivå begriplig på under en minut.
2. Göra det enkelt att registrera och underhålla ett hemmaförråd utan utbildning.
3. Visa konkreta nästa steg när något saknas.
4. Ge trygg, källmärkt vägledning under vanliga krisscenarier.
5. Fungera på mobil och med begränsad eller ingen uppkoppling för kärnflöden.

### 3.3 Icke-mål för MVP

- Realtidsvarningar eller myndighetsintegration.
- E-handel eller automatiska inköp.
- Avancerad nutrition, medicinska rekommendationer eller geospecifika riskmodeller.
- Streckkodsscanning och avancerad inventeringsautomation.
- Fleranvändarsamarbete eller komplex rollstyrning i appen.

## 4. Målgrupper Och Roller

### 4.1 Primära användarroller

- **Hushållsansvarig:** person som sätter upp hushållsprofil, lägger in lager och följer upp status.
- **Hushållsmedlem:** annan vuxen i hushållet som använder samma enhet eller samma lokala data för att se guider och status.

### 4.2 Intern produktroll

- **Innehållsredaktör:** intern roll som ansvarar för att guider är sakliga, granskade, källmärkta och uppdaterade. Rollen behöver inte exponeras i MVP-gränssnittet men måste finnas i solutioning.

### 4.3 Rollantagande för MVP

MVP ska inte kräva separata konton för hushållsmedlemmar. Om autentisering senare behövs för synk eller backup ska `Supabase Auth` användas enligt projektkontexten, men kärnflöden ska fungera utan obligatorisk inloggning.

## 5. Designprinciper För Krisapp

1. **Snabb under stress:** användaren ska kunna hitta rätt guide eller status med minimalt antal steg.
2. **Lugn och tydlig tonalitet:** appen ska uppmuntra handling utan alarmism.
3. **Mobil först:** layout, interaktioner och läsbarhet ska optimeras för telefon.
4. **Offline där det räknas:** guideinnehåll, hushållsprofil, lager och översikt ska fungera utan internet när de väl har laddats.
5. **Konkreta nästa steg:** varje viktig vy ska leda vidare till en begriplig handling.
6. **Dataminimering:** samla bara det som behövs för att ge värde.

## 6. Omfattning Och Epic-översikt

### 6.1 MVP-omfattning

MVP ska täcka:

- hushållsprofil och beredskapshorisont,
- behovsberäkning för vatten och mat,
- manuell lagerhantering,
- gap-analys och inköpsöversikt,
- guider för vanliga krisscenarier,
- påminnelser och enkel rotation,
- offlineåtkomst och robust lokal lagring.

### 6.2 Epic-översikt

| Epic | Namn | Typ |
|---|---|---|
| E1 | Hushållsprofil och behovsberäkning | Omformulerad från källmaterial |
| E2 | Lagerhantering för hemmaförråd | Omformulerad och kompletterad |
| E3 | Beredskapsöversikt, gap-analys och inköpslista | Omformulerad och kompletterad |
| E4 | Krisguider och snabb hjälp | Omformulerad och kompletterad |
| E5 | Underhåll, rotation och påminnelser | Omformulerad och kompletterad |
| E6 | Datatålighet, offline och åtkomst | Tillagd |

## 7. Spårbarhet Från Källmaterial Till Förfinade Stories

| Källa | Status i detta PRD | Kommentar |
|---|---|---|
| STORY-001 / SC-001 | Omformulerad till US-01 | Slås ihop med STORY-002 |
| STORY-002 / SC-002 | Omformulerad till US-01 | Särskilda hushållsfaktorer integreras i hushållsprofilen |
| STORY-003 / SC-003 | Omformulerad till US-03 | Kräver tillagd US-02 |
| STORY-004 / SC-004 | Omformulerad till US-04 | Kräver tillagd US-02 |
| STORY-005 / SC-005 | Omformulerad till US-05 | Kompletterad med edit/delete i US-07 |
| STORY-006 / SC-006 | Omformulerad till US-06 | Kategoristruktur breddad för krisbruk |
| STORY-007 / SC-007 | Omformulerad till US-08 | Förtydligad gaplogik |
| STORY-008 / SC-008 | Omformulerad till US-09 | Tonalitet och nästa steg förtydligade |
| STORY-009 / SC-009 | Omformulerad till US-11 | Kompletterad med källkrav |
| STORY-010 / SC-010 | Omformulerad till US-12 | Kompletterad med källkrav |
| STORY-011 / SC-011 | Omformulerad till US-13 | Kompletterad med källkrav |
| STORY-012 / SC-012 | Omformulerad till US-15 | Edge case för nekade notiser tillagt |
| STORY-013 / SC-013 | Omformulerad till US-10 | Kopplad till prioritering i US-09 |
| `SC-001: Story Ideas` | Exkluderad | Exportartefakt, inte en riktig story |
| `SC-002: CF-004 - Designredo stories saknas ännu` | Exkluderad | Metadata, inte en riktig story |
| Saknas i källan | Tillagda US-02, US-07, US-14, US-16, US-17, US-18, US-19 | Tillagda för testbarhet, robusthet och MVP-komplett scope |

## 8. Funktionella Krav Och User Stories

### E1. Hushållsprofil Och Behovsberäkning

**Mål:** användaren ska snabbt kunna beskriva sitt hushåll och få ett begripligt behovsmål för grundberedskap.

#### US-01 Registrera hushållsprofil

- **Ursprung:** Omformulerad från `STORY-001` och `STORY-002`
- **User story:** Som hushållsansvarig vill jag registrera antal vuxna, antal barn och om hushållet har husdjur så att appen kan räkna ut ett relevant grundbehov.
- **Acceptanskriterier:**
  1. Användaren kan ange minst antal vuxna och kan frivilligt ange antal barn och husdjur.
  2. Appen validerar att hushållet innehåller minst en person.
  3. Informationen sparas lokalt och finns kvar när appen öppnas igen.
  4. När hushållsprofilen ändras markeras behovsberäkningar och gap-analys som uppdaterade eller omräknade.

#### US-02 Välj beredskapshorisont

- **Ursprung:** Tillagd
- **Motivering:** Krävs för att göra behovsberäkningarna i källmaterialet testbara och konsekventa.
- **User story:** Som hushållsansvarig vill jag välja vilken beredskapsperiod hushållet planerar för så att appens mål och gap beräknas mot rätt nivå.
- **Acceptanskriterier:**
  1. Användaren kan välja minst mellan `72 timmar` och `7 dagar`.
  2. Appen visar vilken period som är vald i behovs- och översiktsvyer.
  3. Vald period sparas lokalt och används konsekvent i beräkningar och status.
  4. Om period saknas får användaren en tydlig uppmaning att välja period innan gap-analys visas.

#### US-03 Beräkna grundbehov av vatten

- **Ursprung:** Omformulerad från `STORY-003`
- **User story:** Som hushållsansvarig vill jag se hushållets rekommenderade vattenbehov så att jag vet hur mycket vatten som minst bör finnas hemma.
- **Acceptanskriterier:**
  1. Appen visar totalt vattenbehov baserat på hushållsprofil och vald beredskapshorisont.
  2. Resultatet visas i en begriplig enhet, exempelvis liter totalt och per dygn.
  3. Om husdjur ingår ska deras påverkan på behovet antingen räknas in eller redovisas som separat tillägg.
  4. Beräkningsvyn visar att resultatet är ett förenklat planeringsstöd och inte ett individuellt medicinskt råd.

#### US-04 Beräkna grundbehov av mat

- **Ursprung:** Omformulerad från `STORY-004`
- **User story:** Som hushållsansvarig vill jag se ett förenklat mål för hushållets matberedskap så att jag vet vilken nivå lagret behöver täcka.
- **Acceptanskriterier:**
  1. Appen visar ett förenklat matmål baserat på hushållsprofil och vald beredskapshorisont.
  2. Målet presenteras i tydliga kategorier eller portionsnivåer snarare än som otydliga fria texter.
  3. Beräkningen uppdateras när hushållsprofil eller beredskapshorisont ändras.
  4. Appen förklarar att särskilda medicinska eller dietrelaterade behov inte täcks fullt ut i MVP.

### E2. Lagerhantering För Hemmaförråd

**Mål:** användaren ska kunna registrera, överblicka och korrigera sitt hemmaförråd utan hög administrativ belastning.

#### US-05 Lägg till lagerartikel manuellt

- **Ursprung:** Omformulerad från `STORY-005`
- **User story:** Som hushållsansvarig vill jag snabbt lägga till en lagerartikel manuellt så att jag kan registrera vad som redan finns hemma.
- **Acceptanskriterier:**
  1. Användaren kan ange namn, kategori, antal och enhet för en lagerartikel.
  2. Användaren kan frivilligt ange bäst före-datum när det är relevant.
  3. Efter sparande syns artikeln direkt i lagret och påverkar gap-analysen.
  4. Om obligatoriska fält saknas visar appen tydliga felmeddelanden utan att radera redan ifyllda värden.

#### US-06 Visa lagret i relevanta kategorier

- **Ursprung:** Omformulerad från `STORY-006`
- **User story:** Som användare vill jag se mitt lager grupperat i tydliga kategorier så att jag snabbt förstår vad hushållet har och saknar.
- **Acceptanskriterier:**
  1. Lagret visas grupperat i enkla kategorier som minst täcker vatten, mat och övrigt.
  2. Kategorierna ska vara begripliga även under stress och kunna utökas till exempelvis hygien, värme och belysning i UI/modell.
  3. Varje kategori visar antal artiklar och sammanfattande mängd där det är möjligt.
  4. Om lagret är tomt visas en tydlig tomvy med nästa rekommenderade steg.

#### US-07 Redigera och ta bort lagerartikel

- **Ursprung:** Tillagd
- **User story:** Som hushållsansvarig vill jag kunna rätta eller ta bort felaktiga lagerposter så att min översikt förblir pålitlig.
- **Acceptanskriterier:**
  1. Användaren kan ändra namn, kategori, antal, enhet och bäst före-datum för en befintlig artikel.
  2. Användaren kan ta bort en artikel efter tydlig bekräftelse.
  3. Ändringar slår igenom direkt i lageröversikt, gap-analys och status.
  4. Om en artikel tas bort och därmed skapar ett nytt gap ska detta synas utan manuell omladdning.

### E3. Beredskapsöversikt, Gap-analys Och Inköpslista

**Mål:** användaren ska förstå sin nuvarande nivå, vad som saknas och vad som bör prioriteras härnäst.

#### US-08 Jämför behov mot lager

- **Ursprung:** Omformulerad från `STORY-007`
- **User story:** Som hushållsansvarig vill jag se skillnaden mellan rekommenderat behov och registrerat lager så att jag vet vilka brister som finns.
- **Acceptanskriterier:**
  1. Appen visar behov, registrerat lager och gap per relevant kategori.
  2. Om användaren saknar hushållsprofil eller beredskapshorisont visas det tydligt vad som måste fyllas i först.
  3. Om lagerdata är ofullständig ska appen hellre markera osäkerhet än ge sken av exakt precision.
  4. Gap-analysen uppdateras automatiskt när hushållsprofil eller lager ändras.

#### US-09 Visa enkel beredskapsstatus med prioritering

- **Ursprung:** Omformulerad från `STORY-008`, kompletterad
- **User story:** Som användare vill jag få en enkel och lugn statusöversikt så att jag snabbt förstår min beredskapsnivå och vad som är viktigast att åtgärda.
- **Acceptanskriterier:**
  1. Hem- eller översiktsvyn visar en sammanfattad beredskapsstatus för hushållet.
  2. Statusen presenteras med lugnt språk och fokus på nästa steg, inte alarmistiska varningar.
  3. De mest kritiska bristerna prioriteras högst i översikten.
  4. Om användaren saknar tillräcklig data för status ska appen visa detta tydligt och länka till rätt nästa steg.

#### US-10 Skapa inköpsöversikt över det som saknas

- **Ursprung:** Omformulerad från `STORY-013`
- **User story:** Som hushållsansvarig vill jag få en enkel inköpsöversikt baserad på mina gap så att jag kan agera direkt på det som saknas.
- **Acceptanskriterier:**
  1. Appen kan generera en lista över saknade artiklar eller kategorier baserat på gap-analysen.
  2. Inköpsöversikten visar prioritet eller kritikalitet för varje rad.
  3. Listan går att läsa även offline när den väl har genererats eller sparats lokalt.
  4. När användaren uppdaterar sitt lager ska inköpsöversikten uppdateras därefter.

### E4. Krisguider Och Snabb Hjälp

**Mål:** användaren ska kunna öppna appen i en pressad situation och få konkret, sakligt och snabbt tillgängligt stöd.

#### US-11 Visa guide för strömavbrott

- **Ursprung:** Omformulerad från `STORY-009`
- **User story:** Som användare vill jag kunna öppna en kort guide för strömavbrott så att jag vet vad hushållet bör göra direkt.
- **Acceptanskriterier:**
  1. Guiden innehåller korta steg i prioriterad ordning.
  2. Guiden går att läsa offline efter att appens innehåll har laddats.
  3. Guiden visar källa och senast granskad eller uppdaterad tidpunkt.
  4. Guiden använder tydligt språk och undviker att framstå som officiellt myndighetsbeslut om så inte är fallet.

#### US-12 Visa guide för vattenbrist

- **Ursprung:** Omformulerad från `STORY-010`
- **User story:** Som användare vill jag kunna öppna en guide för vattenbrist så att jag snabbt vet vilka åtgärder som är viktigast för hushållet.
- **Acceptanskriterier:**
  1. Guiden fokuserar på första praktiska åtgärder och hushållets prioriteringar.
  2. Guiden fungerar offline när innehållet finns lagrat lokalt.
  3. Guiden visar källa och senast granskad eller uppdaterad tidpunkt.
  4. Guiden är lätt att hitta från appens startsida eller snabbhjälpsläge.

#### US-13 Visa guide för allmän samhällskris

- **Ursprung:** Omformulerad från `STORY-011`
- **User story:** Som användare vill jag kunna hitta en generell krisguide så att jag får en lugn och sammanställd översikt när läget är oklart.
- **Acceptanskriterier:**
  1. Guiden sammanfattar generella råd i ett lättläst format.
  2. Innehållet går att nå utan att användaren först behöver registrera lagerdata.
  3. Guiden visar källa och senast granskad eller uppdaterad tidpunkt.
  4. Guiden ska inte innehålla ogrundade råd eller otydliga avsändare.

#### US-14 Snabbhjälpsläge från startsidan

- **Ursprung:** Tillagd
- **User story:** Som användare vill jag ha en omedelbar väg till krisguider från startsidan så att jag kan använda appen direkt under stress utan att navigera genom flera nivåer.
- **Acceptanskriterier:**
  1. Startsidan innehåller en tydlig primär väg till snabbhjälp eller guider.
  2. Snabbhjälpsläget fungerar även om användaren inte har slutfört hushållsprofil eller lagerregistrering.
  3. De vanligaste scenarierna presenteras som tydliga val, exempelvis strömavbrott och vattenbrist.
  4. Det ska gå att nå relevant guide inom högst två interaktioner från appens startvy.

### E5. Underhåll, Rotation Och Påminnelser

**Mål:** användaren ska kunna hålla beredskapen levande över tid utan att appen blir tung eller påträngande.

#### US-15 Skapa återkommande påminnelse om lagergenomgång

- **Ursprung:** Omformulerad från `STORY-012`
- **User story:** Som hushållsansvarig vill jag kunna få en enkel återkommande påminnelse om att se över mitt lager så att beredskapen hålls uppdaterad över tid.
- **Acceptanskriterier:**
  1. Användaren kan välja minst en återkommande rytm, exempelvis månadsvis eller kvartalsvis.
  2. Appen bekräftar att påminnelsen är sparad och visar nästa planerade tillfälle.
  3. Om notisbehörighet nekas ska appen erbjuda ett begripligt alternativ, till exempel en intern påminnelsemarkering eller instruktion.
  4. Påminnelselogiken får inte blockera användaren från att använda resten av appen.

#### US-16 Stöd för enkel rotation och utgångsdatum

- **Ursprung:** Tillagd
- **User story:** Som hushållsansvarig vill jag kunna se vilka varor som bör användas eller ersättas snart så att lagret inte förlorar värde över tid.
- **Acceptanskriterier:**
  1. Artiklar med registrerat bäst före-datum kan markeras som snart utgående enligt en enkel regel.
  2. Användaren kan se en sammanställning över artiklar som bör kontrolleras eller roteras.
  3. Artiklar utan datum ska inte felaktigt markeras som problematiska.
  4. När en artikel markeras som förbrukad eller ersatt uppdateras lagret och relevanta gap automatiskt.

### E6. Datatålighet, Offline Och Åtkomst

**Mål:** kärnnyttan ska finnas kvar även vid dålig uppkoppling, appomstart eller låg användningströskel.

#### US-17 Använd kärnflöden offline

- **Ursprung:** Tillagd från NFR-001
- **User story:** Som användare vill jag kunna nå mina viktigaste uppgifter och guider även utan internet så att appen fortfarande hjälper mig när nätet inte fungerar.
- **Acceptanskriterier:**
  1. Hushållsprofil, lageröversikt, beredskapsstatus, inköpsöversikt och guider ska vara tillgängliga offline när de har laddats eller skapats lokalt.
  2. Appen visar tydligt när användaren är offline utan att skapa onödig stress.
  3. Funktioner som kräver nätverk ska degradera graciöst och inte blockera offlinefunktioner.
  4. Ingen kritisk kärnvy får visa en tom felvy enbart för att nät saknas.

#### US-18 Spara data robust lokalt

- **Ursprung:** Tillagd från NFR-004
- **User story:** Som hushållsansvarig vill jag att min data finns kvar mellan sessioner så att jag kan lita på appen även om jag bara använder den ibland.
- **Acceptanskriterier:**
  1. Hushållsprofil, lagerdata, beredskapshorisont och lokalt tillgängliga guider finns kvar efter appomstart.
  2. Appen ska återställa senast sparade lokala data utan att användaren behöver logga in.
  3. Om lokal data är skadad eller ofullständig ska appen visa ett begripligt återställningsläge istället för att krascha.
  4. Datahanteringen ska vara designad så att normala användarflöden inte leder till tyst dataförlust.

#### US-19 Starta utan obligatorisk inloggning och kunna exportera data

- **Ursprung:** Tillagd
- **User story:** Som användare vill jag kunna börja använda appen direkt och vid behov kunna exportera min data så att tröskeln blir låg men jag ändå kan ta ansvar för min information.
- **Acceptanskriterier:**
  1. Första användning av kärnflöden kräver inte konto eller inloggning.
  2. Appen kan exportera lokal hushålls- och lagerdata i ett enkelt format för backup eller flytt.
  3. Appen kan importera en tidigare export och validera att filen har rätt struktur innan data skrivs över.
  4. Om autentiserad synk införs senare ska den designas som tilläggsfunktion och använda projektets föredragna stack.

## 9. Tvärgående Edge Cases

1. Användaren öppnar appen första gången under pågående störning och har ännu inget lager registrerat.
2. Användaren saknar internet men förväntar sig att kunna läsa guider och se tidigare sparad status.
3. Hushållets storlek ändras efter att lager redan har registrerats.
4. Användaren anger ofullständiga eller ungefärliga lageruppgifter.
5. Notisbehörighet nekas på enheten.
6. Lokal data blir korrupt eller delvis bortskriven.
7. Innehållsredaktören behöver dra tillbaka eller uppdatera guideinnehåll som tidigare funnits offline.
8. Användaren har artiklar utan bäst före-datum och ska inte få falska varningar.

## 10. Icke-funktionella Krav

### NFR-001 Offline-stöd för kärninnehåll

Kärninnehåll som hushållsprofil, lageröversikt, beredskapsstatus, inköpsöversikt och guider ska vara tillgängligt offline i MVP.

### NFR-002 Låg användningsfriktion

Kärnflöden ska kunna förstås utan onboarding eller utbildning. Första värde ska nås snabbt och appen ska inte kräva konto för grundnytta.

### NFR-003 Tydlig och icke-alarmistisk UX

Språk, färgkodning och statusvisning ska skapa handlingskraft utan att förstärka oro. Kritiska brister ska presenteras tydligt men lugnt.

### NFR-004 Robust lokal lagring

MVP ska använda lokal-först lagring för användarens kärndata. Om backend används ska det vara för innehållsdistribution och framtida synk, inte som krav för att appen ska fungera.

### NFR-005 Kvalitetssäkrat informationsinnehåll

Alla guider ska ha tydlig källa, granskningsstatus och uppdateringsdatum. Innehåll får inte presenteras som officiell myndighetsinstruktion utan korrekt grund.

### NFR-006 Mobil först och tillgänglighet

Appen ska optimeras för mobil användning, ha tydliga klickytor, god kontrast, enkel typografi och stöd för vanlig tillgänglighetsnivå för konsumentappar.

### NFR-007 Prestanda under stress

Kärnvyer ska öppnas snabbt på normala mobilenheter. Offlinelagrade guider ska kunna öppnas nästan omedelbart och centrala interaktioner ska kännas direkta.

### NFR-008 Dataminimering och integritet

Systemet ska samla minsta möjliga mängd personrelaterad data för att leverera värdet. Hushållsdata ska behandlas som privat även om den inte är högkänslig.

### NFR-009 Testbarhet

Kritiska flöden ska kunna verifieras med automatiserade tester enligt projektkontexten, särskilt:

- skapa hushållsprofil,
- lägga till lagerartikel,
- visa gap-analys,
- öppna guider offline,
- spara och återläsa lokal data.

### NFR-010 Teknikanpassning till projektkontext

Lösningen ska respektera följande där relevant:

- frontend i `React + TypeScript + Vite`,
- UI med `Tailwind CSS`,
- eventuell backend i `Node.js + Express`,
- `REST API` i stället för GraphQL,
- `PostgreSQL` och `Supabase Auth` när datasync eller autentisering faktiskt behövs,
- feature-baserad struktur och tester för kritiska flöden.

## 11. Mått På Framgång

MVP:n bör mätas mot följande utfall:

1. Andel av rekommenderad checklista som användaren uppfyller före och efter användning.
2. Antal registrerade lagerartiklar per aktivt hushåll.
3. Beräknad täckning i dagar för vatten och mat.
4. Andel testanvändare som kan genomföra kärnflöden utan stöd.
5. Tid till relevant guide från startvy i ett stress-testat scenario.

## 12. Solutioning-noteringar För BMad

1. Prioritera informationsarkitektur för mobil startvy med två primära ingångar: `Mitt förråd` och `Jag behöver hjälp nu`.
2. Modellera lagret så att enkel rotation blir möjlig redan i datamodellen även om UI:t hålls lättviktigt.
3. Behandla guideinnehåll som redaktionellt innehåll med källmetadata och offline-cachestrategi.
4. Håll backend optional i MVP-arkitekturen om lokal-först räcker för första releasen.
5. Designa kritiska flöden så att de går att testa med `Vitest` och `Playwright`.

## 13. Öppna Frågor Att Bekräfta Senare

1. Ska rekommenderad standardhorisont vara `72 timmar`, `7 dagar` eller båda med en tydlig rekommendation?
2. Vilken exakt regel ska gälla för barns och husdjurs påverkan på behovsberäkningar i MVP?
3. Vilken organisation eller person ska äga redaktionell granskning av guider?
4. Ska export/import ingå i första MVP-releasen eller första efterföljande iteration?
