import type { PublishedGuide } from '../contracts/guide-contract.js'

export const publishedGuides: PublishedGuide[] = [
  {
    id: 'guide-stromavbrott',
    scenario: 'stromavbrott',
    title: 'Guide vid strömavbrott',
    summary:
      'Börja med ljus, värme, matlagning och information så att hushållet snabbt får struktur och lugn.',
    steps: [
      {
        title: 'Skapa lugn och orientering',
        body: 'Samla hushållet, kontrollera att alla mår bra och bestäm en enkel plan för de kommande timmarna.',
      },
      {
        title: 'Säkra ljus och värme',
        body: 'Använd ficklampor i första hand och spara batterier. Håll värmen inom ett mindre område om avbrottet blir långvarigt.',
      },
      {
        title: 'Skydda mat och information',
        body: 'Öppna kyl och frys så sällan som möjligt och följ lokala uppdateringar via radio eller annan tillförlitlig kanal.',
      },
    ],
    sourceName: 'MSB - Om krisen eller kriget kommer',
    sourceUrl: 'https://www.msb.se/',
    publisher: 'BePrepared redaktion',
    reviewStatus: 'reviewed',
    reviewedAt: '2026-04-08T18:00:00.000Z',
    updatedAt: '2026-04-08T18:00:00.000Z',
    version: 1,
  },
  {
    id: 'guide-vattenbrist',
    scenario: 'vattenbrist',
    title: 'Guide vid vattenbrist',
    summary:
      'Prioritera dricksvatten, hygien och hushållets viktigaste behov utan att skapa onödig stress.',
    steps: [
      {
        title: 'Prioritera dricksvatten',
        body: 'Sätt av tillgängligt vatten till dryck och enklare matlagning före allt annat.',
      },
      {
        title: 'Minska förbrukningen direkt',
        body: 'Skjut upp sådant som kan vänta, som tvätt och onödig rengöring, tills läget är klarare.',
      },
      {
        title: 'Följ lokala rekommendationer',
        body: 'Håll koll på kommunal eller annan betrodd information om tappställen, kokrekommendationer eller restriktioner.',
      },
    ],
    sourceName: 'Livsmedelsverket och kommunal krisinformation',
    sourceUrl: 'https://www.livsmedelsverket.se/',
    publisher: 'BePrepared redaktion',
    reviewStatus: 'reviewed',
    reviewedAt: '2026-04-08T18:10:00.000Z',
    updatedAt: '2026-04-08T18:10:00.000Z',
    version: 1,
  },
  {
    id: 'guide-allman-kris',
    scenario: 'allman-kris',
    title: 'Guide vid allmän kris',
    summary:
      'Få en lugn start när du inte vet exakt vilket scenario som gäller eller när flera problem överlappar varandra.',
    steps: [
      {
        title: 'Börja med läget',
        body: 'Skapa en snabb bild av vad som faktiskt har hänt och vilka behov som är mest akuta för hushållet.',
      },
      {
        title: 'Säkra det viktigaste',
        body: 'Prioritera information, vatten, värme, mat och kontakt med personer som kan behöva stöd.',
      },
      {
        title: 'Ta ett steg i taget',
        body: 'Använd appens guider och statusvyer som stöd, men följ alltid tillförlitlig information om läget förändras.',
      },
    ],
    sourceName: 'MSB - Krisberedskap i hemmet',
    sourceUrl: 'https://www.msb.se/',
    publisher: 'BePrepared redaktion',
    reviewStatus: 'updated',
    reviewedAt: '2026-04-08T18:20:00.000Z',
    updatedAt: '2026-04-08T18:20:00.000Z',
    version: 1,
  },
]
