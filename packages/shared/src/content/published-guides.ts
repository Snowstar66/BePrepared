import type { PublishedGuide } from '../contracts/guide-contract.js'

export const publishedGuides: PublishedGuide[] = [
  {
    id: 'guide-stromavbrott',
    scenario: 'stromavbrott',
    title: 'Guide vid stromavbrott',
    summary:
      'Borja med ljus, varme, matlagning och information sa att hushallet far en lugn struktur direkt.',
    steps: [
      {
        title: 'Skapa lugn och orientering',
        body: 'Samla hushallet, kontrollera att alla mar bra och bestam en enkel plan for de kommande timmarna.',
      },
      {
        title: 'Sakra ljus och varme',
        body: 'Anvand ficklampor i forsta hand och spara batterier. Hall varme inom ett mindre omrade om avbrottet blir langvarigt.',
      },
      {
        title: 'Skydda mat och information',
        body: 'Oppna kyl och frys sa sallan som mojligt och folj lokala uppdateringar via radio eller annan tillforlitlig kanal.',
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
      'Prioritera dricksvatten, hygien och hushallets viktigaste anvandning utan att skapa onodig stress.',
    steps: [
      {
        title: 'Prioritera dricksvatten',
        body: 'Satt av tillgangligt vatten till dryck och enklare matlagning fore allt annat.',
      },
      {
        title: 'Minska forbrukningen direkt',
        body: 'Skjut upp sadant som kan vanta, som tvatt och onodig rengoring, tills laget ar klarare.',
      },
      {
        title: 'Folja lokala rekommendationer',
        body: 'Hall koll pa kommunal eller annan betrodd information om tappstallen, kokrekommendationer eller restriktioner.',
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
    title: 'Guide vid allman kris',
    summary:
      'Fa en lugn start nar du inte vet exakt vilket scenario som galler eller flera problem overlappar varandra.',
    steps: [
      {
        title: 'Borja med situationen',
        body: 'Skapa en snabb bild av vad som faktiskt har hant och vilka behov som ar mest akuta for hushallet.',
      },
      {
        title: 'Sakra det viktigaste',
        body: 'Prioritera information, vatten, varme, mat och kontakt med personer som kan behova stod.',
      },
      {
        title: 'Ta ett steg i taget',
        body: 'Anvand appens guider och statusvyer som stod, men folj alltid tillforlitliga kallsignaler om laget andras.',
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
