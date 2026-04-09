const PHRASE_REPLACEMENTS: ReadonlyArray<[RegExp, string]> = [
  [/Lageroversikt/g, 'Lageröversikt'],
  [/lageroversikt/g, 'lageröversikt'],
  [/Inkopsoversikt/g, 'Inköpsöversikt'],
  [/inkopsoversikt/g, 'inköpsöversikt'],
  [/Snabbhjalp/g, 'Snabbhjälp'],
  [/snabbhjalp/g, 'snabbhjälp'],
  [/Hushallsprofil/g, 'Hushållsprofil'],
  [/hushallsprofil/g, 'hushållsprofil'],
  [/Hushallsdata/g, 'Hushållsdata'],
  [/hushallsdata/g, 'hushållsdata'],
  [/Planeringsniva/g, 'Planeringsnivå'],
  [/planeringsniva/g, 'planeringsnivå'],
  [/Grundniva/g, 'Grundnivå'],
  [/grundniva/g, 'grundnivå'],
  [/Sparad/g, 'Sparad'],
  [/sparad/g, 'sparad'],
  [/Spara/g, 'Spara'],
  [/spara/g, 'spara'],
  [/Sparar/g, 'Sparar'],
  [/sparar/g, 'sparar'],
  [/\bHushallets\b/g, 'Hushållets'],
  [/\bhushallets\b/g, 'hushållets'],
  [/\bHushalls\b/g, 'Hushålls'],
  [/\bhushalls\b/g, 'hushålls'],
  [/\bHushall\b/g, 'Hushåll'],
  [/\bhushall\b/g, 'hushåll'],
  [/\bForradet\b/g, 'Förrådet'],
  [/\bforradet\b/g, 'förrådet'],
  [/\bForrad\b/g, 'Förråd'],
  [/\bforrad\b/g, 'förråd'],
  [/\bOversikt\b/g, 'Översikt'],
  [/\boversikt\b/g, 'översikt'],
  [/\bOverblickslage\b/g, 'Överblicksläge'],
  [/\boverblickslage\b/g, 'överblicksläge'],
  [/\bAter\b/g, 'Åter'],
  [/\bater\b/g, 'åter'],
  [/\bUnderhall\b/g, 'Underhåll'],
  [/\bunderhall\b/g, 'underhåll'],
  [/\bStrom\b/g, 'Ström'],
  [/\bstrom\b/g, 'ström'],
  [/\bJamfor\b/g, 'Jämför'],
  [/\bjamfor\b/g, 'jämför'],
  [/\bOsaker\b/g, 'Osäker'],
  [/\bosaker\b/g, 'osäker'],
  [/\bNasta\b/g, 'Nästa'],
  [/\bnasta\b/g, 'nästa'],
  [/\bLagg\b/g, 'Lägg'],
  [/\blagg\b/g, 'lägg'],
  [/\bHjalp\b/g, 'Hjälp'],
  [/\bhjalp\b/g, 'hjälp'],
  [/\bManad\b/g, 'Månad'],
  [/\bmanad\b/g, 'månad'],
  [/\bAnvandning\b/g, 'Användning'],
  [/\banvandning\b/g, 'användning'],
  [/\bAnvand\b/g, 'Använd'],
  [/\banvand\b/g, 'använd'],
  [/\bPalitlig\b/g, 'Pålitlig'],
  [/\bpalitlig\b/g, 'pålitlig'],
  [/\bForbrukad\b/g, 'Förbrukad'],
  [/\bforbrukad\b/g, 'förbrukad'],
  [/\bGrannssnittet\b/g, 'Gränssnittet'],
  [/\bgrannssnittet\b/g, 'gränssnittet'],
  [/\bOppna\b/g, 'Öppna'],
  [/\boppna\b/g, 'öppna'],
  [/\bMojligt\b/g, 'Möjligt'],
  [/\bmojligt\b/g, 'möjligt'],
  [/\bMojliga\b/g, 'Möjliga'],
  [/\bmojliga\b/g, 'möjliga'],
  [/\bInraknade\b/g, 'Inräknade'],
  [/\binraknade\b/g, 'inräknade'],
  [/\bUtgar\b/g, 'Utgår'],
  [/\butgar\b/g, 'utgår'],
  [/\bBasta\b/g, 'Bästa'],
  [/\bbasta\b/g, 'bästa'],
  [/\bBattre\b/g, 'Bättre'],
  [/\bbattre\b/g, 'bättre'],
  [/\bGenomgang\b/g, 'Genomgång'],
  [/\bgenomgang\b/g, 'genomgång'],
  [/\bPaminnelse\b/g, 'Påminnelse'],
  [/\bpaminnelse\b/g, 'påminnelse'],
  [/\bPaminnelsen\b/g, 'Påminnelsen'],
  [/\bpaminnelsen\b/g, 'påminnelsen'],
  [/\bPaminnelser\b/g, 'Påminnelser'],
  [/\bpaminnelser\b/g, 'påminnelser'],
  [/\bPaminnd\b/g, 'Påmind'],
  [/\bpaminnd\b/g, 'påmind'],
  [/\bTillgangliga\b/g, 'Tillgängliga'],
  [/\btillgangliga\b/g, 'tillgängliga'],
  [/\bFa\b/g, 'Få'],
  [/\bfa\b/g, 'få'],
  [/\bGa\b/g, 'Gå'],
  [/\bga\b/g, 'gå'],
  [/\bHar\b/g, 'Här'],
  [/\bhar\b/g, 'här'],
  [/\bMar\b/g, 'Mår'],
  [/\bmar\b/g, 'mår'],
  [/\bSallan\b/g, 'Sällan'],
  [/\bsallan\b/g, 'sällan'],
  [/\bOnodig\b/g, 'Onödig'],
  [/\bonodig\b/g, 'onödig'],
  [/\bAkuta\b/g, 'Akuta'],
  [/\bakuta\b/g, 'akuta'],
  [/\bVardagsnara\b/g, 'Vardagsnära'],
  [/\bvardagsnara\b/g, 'vardagsnära'],
  [/\bAtgard\b/g, 'Åtgärd'],
  [/\batgard\b/g, 'åtgärd'],
  [/\bAtgarder\b/g, 'Åtgärder'],
  [/\batgarder\b/g, 'åtgärder'],
  [/\bUtgangsdatum\b/g, 'Utgångsdatum'],
  [/\butgangsdatum\b/g, 'utgångsdatum'],
  [/oversikt/g, 'översikt'],
  [/Oversikt/g, 'Översikt'],
  [/hjalp/g, 'hjälp'],
  [/Hjalp/g, 'Hjälp'],
  [/hall/g, 'håll'],
  [/Hall/g, 'Håll'],
  [/atgard/g, 'åtgärd'],
  [/Atgard/g, 'Åtgärd'],
]

const TRANSLATABLE_ATTRIBUTES = ['aria-label', 'placeholder', 'title'] as const

function normalizeText(value: string) {
  return PHRASE_REPLACEMENTS.reduce(
    (currentValue, [pattern, replacement]) =>
      currentValue.replace(pattern, replacement),
    value,
  )
}

function normalizeTextNode(node: Text) {
  const normalizedValue = normalizeText(node.data)

  if (normalizedValue !== node.data) {
    node.data = normalizedValue
  }
}

function normalizeElementAttributes(element: Element) {
  for (const attributeName of TRANSLATABLE_ATTRIBUTES) {
    const attributeValue = element.getAttribute(attributeName)

    if (attributeValue === null) {
      continue
    }

    const normalizedValue = normalizeText(attributeValue)

    if (normalizedValue !== attributeValue) {
      element.setAttribute(attributeName, normalizedValue)
    }
  }
}

function normalizeTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    normalizeTextNode(root as Text)
    return
  }

  if (!(root instanceof Element) && !(root instanceof DocumentFragment)) {
    return
  }

  if (root instanceof Element) {
    normalizeElementAttributes(root)
  }

  const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let currentTextNode = textWalker.nextNode()

  while (currentTextNode !== null) {
    normalizeTextNode(currentTextNode as Text)
    currentTextNode = textWalker.nextNode()
  }

  if (root instanceof Element) {
    for (const element of root.querySelectorAll('*')) {
      normalizeElementAttributes(element)
    }
  }
}

export function startSwedishTextNormalizer(root: HTMLElement) {
  normalizeTree(root)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        normalizeTree(mutation.target)
        continue
      }

      if (mutation.type === 'attributes' && mutation.target instanceof Element) {
        normalizeElementAttributes(mutation.target)
        continue
      }

      for (const addedNode of mutation.addedNodes) {
        normalizeTree(addedNode)
      }
    }
  })

  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...TRANSLATABLE_ATTRIBUTES],
  })

  return () => observer.disconnect()
}

export function normalizeSwedishCopy(value: string) {
  return normalizeText(value)
}
