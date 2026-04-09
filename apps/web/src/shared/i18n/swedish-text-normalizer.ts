export type UiLanguage = 'sv' | 'en'

const UI_LANGUAGE_STORAGE_KEY = 'beprepared-ui-language'
const TRANSLATABLE_ATTRIBUTES = ['aria-label', 'placeholder', 'title'] as const

type ReplacementRule = readonly [RegExp, string]

const SWEDISH_REPLACEMENTS: ReadonlyArray<ReplacementRule> = [
  [/Lageroversikt/g, 'Lager\u00f6versikt'],
  [/lageroversikt/g, 'lager\u00f6versikt'],
  [/Inkopsoversikt/g, 'Ink\u00f6ps\u00f6versikt'],
  [/inkopsoversikt/g, 'ink\u00f6ps\u00f6versikt'],
  [/Snabbhjalp/g, 'Snabbhj\u00e4lp'],
  [/snabbhjalp/g, 'snabbhj\u00e4lp'],
  [/Hushallsprofil/g, 'Hush\u00e5llsprofil'],
  [/hushallsprofil/g, 'hush\u00e5llsprofil'],
  [/Hushallsdata/g, 'Hush\u00e5llsdata'],
  [/hushallsdata/g, 'hush\u00e5llsdata'],
  [/Planeringsniva/g, 'Planeringsniv\u00e5'],
  [/planeringsniva/g, 'planeringsniv\u00e5'],
  [/Grundniva/g, 'Grundniv\u00e5'],
  [/grundniva/g, 'grundniv\u00e5'],
  [/\bHushallets\b/g, 'Hush\u00e5llets'],
  [/\bhushallets\b/g, 'hush\u00e5llets'],
  [/\bHushalls\b/g, 'Hush\u00e5lls'],
  [/\bhushalls\b/g, 'hush\u00e5lls'],
  [/\bHushall\b/g, 'Hush\u00e5ll'],
  [/\bhushall\b/g, 'hush\u00e5ll'],
  [/\bForradet\b/g, 'F\u00f6rr\u00e5det'],
  [/\bforradet\b/g, 'f\u00f6rr\u00e5det'],
  [/\bForrad\b/g, 'F\u00f6rr\u00e5d'],
  [/\bforrad\b/g, 'f\u00f6rr\u00e5d'],
  [/\bOversikt\b/g, '\u00d6versikt'],
  [/\boversikt\b/g, '\u00f6versikt'],
  [/\bOverblickslage\b/g, '\u00d6verblicksl\u00e4ge'],
  [/\boverblickslage\b/g, '\u00f6verblicksl\u00e4ge'],
  [/\bAter\b/g, '\u00c5ter'],
  [/\bater\b/g, '\u00e5ter'],
  [/\bUnderhall\b/g, 'Underh\u00e5ll'],
  [/\bunderhall\b/g, 'underh\u00e5ll'],
  [/\bStrom\b/g, 'Str\u00f6m'],
  [/\bstrom\b/g, 'str\u00f6m'],
  [/\bJamfor\b/g, 'J\u00e4mf\u00f6r'],
  [/\bjamfor\b/g, 'j\u00e4mf\u00f6r'],
  [/\bOsaker\b/g, 'Os\u00e4ker'],
  [/\bosaker\b/g, 'os\u00e4ker'],
  [/\bNasta\b/g, 'N\u00e4sta'],
  [/\bnasta\b/g, 'n\u00e4sta'],
  [/\bLagg\b/g, 'L\u00e4gg'],
  [/\blagg\b/g, 'l\u00e4gg'],
  [/\bHjalp\b/g, 'Hj\u00e4lp'],
  [/\bhjalp\b/g, 'hj\u00e4lp'],
  [/\bManad\b/g, 'M\u00e5nad'],
  [/\bmanad\b/g, 'm\u00e5nad'],
  [/\bAnvandning\b/g, 'Anv\u00e4ndning'],
  [/\banvandning\b/g, 'anv\u00e4ndning'],
  [/\bAnvand\b/g, 'Anv\u00e4nd'],
  [/\banvand\b/g, 'anv\u00e4nd'],
  [/\bPalitlig\b/g, 'P\u00e5litlig'],
  [/\bpalitlig\b/g, 'p\u00e5litlig'],
  [/\bForbrukad\b/g, 'F\u00f6rbrukad'],
  [/\bforbrukad\b/g, 'f\u00f6rbrukad'],
  [/\bGrannssnittet\b/g, 'Gr\u00e4nssnittet'],
  [/\bgrannssnittet\b/g, 'gr\u00e4nssnittet'],
  [/\bOppna\b/g, '\u00d6ppna'],
  [/\boppna\b/g, '\u00f6ppna'],
  [/\bMojligt\b/g, 'M\u00f6jligt'],
  [/\bmojligt\b/g, 'm\u00f6jligt'],
  [/\bMojliga\b/g, 'M\u00f6jliga'],
  [/\bmojliga\b/g, 'm\u00f6jliga'],
  [/\bInraknade\b/g, 'Inr\u00e4knade'],
  [/\binraknade\b/g, 'inr\u00e4knade'],
  [/\bUtgar\b/g, 'Utg\u00e5r'],
  [/\butgar\b/g, 'utg\u00e5r'],
  [/\bBasta\b/g, 'B\u00e4sta'],
  [/\bbasta\b/g, 'b\u00e4sta'],
  [/\bBattre\b/g, 'B\u00e4ttre'],
  [/\bbattre\b/g, 'b\u00e4ttre'],
  [/\bGenomgang\b/g, 'Genomg\u00e5ng'],
  [/\bgenomgang\b/g, 'genomg\u00e5ng'],
  [/\bPaminnelse\b/g, 'P\u00e5minnelse'],
  [/\bpaminnelse\b/g, 'p\u00e5minnelse'],
  [/\bPaminnelsen\b/g, 'P\u00e5minnelsen'],
  [/\bpaminnelsen\b/g, 'p\u00e5minnelsen'],
  [/\bPaminnelser\b/g, 'P\u00e5minnelser'],
  [/\bpaminnelser\b/g, 'p\u00e5minnelser'],
  [/\bPaminnd\b/g, 'P\u00e5mind'],
  [/\bpaminnd\b/g, 'p\u00e5mind'],
  [/\bTillgangliga\b/g, 'Tillg\u00e4ngliga'],
  [/\btillgangliga\b/g, 'tillg\u00e4ngliga'],
  [/\bFa\b/g, 'F\u00e5'],
  [/\bfa\b/g, 'f\u00e5'],
  [/\bGa\b/g, 'G\u00e5'],
  [/\bga\b/g, 'g\u00e5'],
  [/\bHar\b/g, 'H\u00e4r'],
  [/\bhar\b/g, 'h\u00e4r'],
  [/\bMar\b/g, 'M\u00e5r'],
  [/\bmar\b/g, 'm\u00e5r'],
  [/\bSallan\b/g, 'S\u00e4llan'],
  [/\bsallan\b/g, 's\u00e4llan'],
  [/\bOnodig\b/g, 'On\u00f6dig'],
  [/\bonodig\b/g, 'on\u00f6dig'],
  [/\bVardagsnara\b/g, 'Vardagsn\u00e4ra'],
  [/\bvardagsnara\b/g, 'vardagsn\u00e4ra'],
  [/\bAtgard\b/g, '\u00c5tg\u00e4rd'],
  [/\batgard\b/g, '\u00e5tg\u00e4rd'],
  [/\bAtgarder\b/g, '\u00c5tg\u00e4rder'],
  [/\batgarder\b/g, '\u00e5tg\u00e4rder'],
  [/\bUtgangsdatum\b/g, 'Utg\u00e5ngsdatum'],
  [/\butgangsdatum\b/g, 'utg\u00e5ngsdatum'],
  [/\bSprakval\b/g, 'Spr\u00e5kval'],
  [/\bsprakval\b/g, 'spr\u00e5kval'],
  [/\bInstallningar\b/g, 'Inst\u00e4llningar'],
  [/\binstallningar\b/g, 'inst\u00e4llningar'],
  [/oversikt/g, '\u00f6versikt'],
  [/Oversikt/g, '\u00d6versikt'],
  [/hjalp/g, 'hj\u00e4lp'],
  [/Hjalp/g, 'Hj\u00e4lp'],
  [/hall/g, 'h\u00e5ll'],
  [/Hall/g, 'H\u00e5ll'],
  [/atgard/g, '\u00e5tg\u00e4rd'],
  [/Atgard/g, '\u00c5tg\u00e4rd'],
]

const ENGLISH_REPLACEMENTS: ReadonlyArray<ReplacementRule> = [
  [/Hush\u00e5llets beredskap i ett lugnt \u00f6verblicksl\u00e4ge/g, 'Household preparedness in a calm overview'],
  [/H\u00e4r ser du hush\u00e5llets status, de viktigaste gapen och vilket n\u00e4sta steg som g\u00f6r mest nytta just nu\./g, 'Here you can see your household status, the most important gaps, and the next step that helps most right now.'],
  [/Validerar lokal data\.\.\./g, 'Validating local data...'],
  [/Offline-l\u00e4ge aktivt\./g, 'Offline mode active.'],
  [/Spr\u00e5kval/g, 'Language switch'],
  [/Inst\u00e4llningar/g, 'Settings'],
  [/Snabbhj\u00e4lp/g, 'Quick help'],
  [/Snabb hj\u00e4lp/g, 'Quick help'],
  [/Hush\u00e5llsprofil/g, 'Household profile'],
  [/Hush\u00e5llsdata/g, 'Household data'],
  [/Lager\u00f6versikt/g, 'Inventory overview'],
  [/Ink\u00f6ps\u00f6versikt/g, 'Shopping overview'],
  [/Gap-analys/g, 'Gap analysis'],
  [/Datahantering/g, 'Data management'],
  [/Underh\u00e5ll och rotation/g, 'Maintenance and rotation'],
  [/Underh\u00e5ll/g, 'Maintenance'],
  [/P\u00e5minnelser/g, 'Reminders'],
  [/P\u00e5minnelse/g, 'Reminder'],
  [/P\u00e5minnelsen/g, 'The reminder'],
  [/\u00d6verblicksl\u00e4ge/g, 'overview'],
  [/Registrera ditt hush\u00e5ll/g, 'Register your household'],
  [/Se f\u00f6rr\u00e5d/g, 'View inventory'],
  [/Se f\u00f6rr\u00e5det/g, 'View inventory'],
  [/L\u00e4gg till vara/g, 'Add item'],
  [/Spara hush\u00e5llsprofil/g, 'Save household profile'],
  [/Data \u00e4r sparad lokalt/g, 'Data is saved locally'],
  [/Data \u00e4r sparad/g, 'Data is saved'],
  [/sparad lokalt/g, 'saved locally'],
  [/sparad/g, 'saved'],
  [/sparar/g, 'saving'],
  [/Spara/g, 'Save'],
  [/Laddar/g, 'Loading'],
  [/R\u00e4knar/g, 'Calculating'],
  [/Bygger/g, 'Building'],
  [/F\u00f6rr\u00e5det/g, 'the inventory'],
  [/F\u00f6rr\u00e5d/g, 'inventory'],
  [/hush\u00e5ll/g, 'household'],
  [/beredskap/g, 'preparedness'],
  [/\u00f6versikt/g, 'overview'],
  [/n\u00e4sta steg/g, 'next step'],
  [/N\u00e4sta steg/g, 'Next step'],
  [/B\u00e4sta n\u00e4sta steg/g, 'Best next step'],
  [/viktigaste/g, 'most important'],
  [/status/g, 'status'],
  [/vatten/g, 'water'],
  [/mat/g, 'food'],
  [/behov/g, 'needs'],
  [/lager/g, 'inventory'],
  [/vara\b/g, 'item'],
  [/varan/g, 'the item'],
  [/varor/g, 'items'],
  [/guide/g, 'guide'],
  [/guider/g, 'guides'],
  [/snabbhj\u00e4lp/g, 'quick help'],
  [/p\u00e5minnelse/g, 'reminder'],
  [/p\u00e5minnelser/g, 'reminders'],
  [/lokal data/g, 'local data'],
  [/lokalt/g, 'locally'],
  [/lokal/g, 'local'],
  [/Se /g, 'View '],
  [/L\u00e4gg till /g, 'Add '],
  [/Tillbaka/g, 'Back'],
]

function applyReplacements(
  value: string,
  replacements: ReadonlyArray<ReplacementRule>,
) {
  return replacements.reduce(
    (currentValue, [pattern, replacement]) =>
      currentValue.replace(pattern, replacement),
    value,
  )
}

export function normalizeSwedishCopy(value: string) {
  return applyReplacements(value, SWEDISH_REPLACEMENTS)
}

export function translateUiCopy(value: string, language: UiLanguage) {
  const swedishValue = normalizeSwedishCopy(value)

  if (language === 'sv') {
    return swedishValue
  }

  return applyReplacements(swedishValue, ENGLISH_REPLACEMENTS)
}

export function readStoredUiLanguage(): UiLanguage {
  if (typeof window === 'undefined') {
    return 'sv'
  }

  const storedValue = window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY)

  return storedValue === 'en' ? 'en' : 'sv'
}

export function storeUiLanguage(language: UiLanguage) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, language)
}

function setDocumentLanguage(language: UiLanguage) {
  document.documentElement.lang = language
}

function getOriginalTextNodeValue(
  node: Text,
  originalTextNodes: WeakMap<Text, string>,
) {
  const existingValue = originalTextNodes.get(node)

  if (existingValue !== undefined) {
    return existingValue
  }

  originalTextNodes.set(node, node.data)
  return node.data
}

function getOriginalAttributeValue(
  element: Element,
  attributeName: (typeof TRANSLATABLE_ATTRIBUTES)[number],
  originalAttributes: WeakMap<Element, Map<string, string>>,
) {
  let elementAttributes = originalAttributes.get(element)

  if (elementAttributes === undefined) {
    elementAttributes = new Map<string, string>()
    originalAttributes.set(element, elementAttributes)
  }

  const existingValue = elementAttributes.get(attributeName)

  if (existingValue !== undefined) {
    return existingValue
  }

  const currentValue = element.getAttribute(attributeName)

  if (currentValue === null) {
    return null
  }

  elementAttributes.set(attributeName, currentValue)
  return currentValue
}

function applyTextNodeLanguage(
  node: Text,
  language: UiLanguage,
  originalTextNodes: WeakMap<Text, string>,
) {
  const originalValue = getOriginalTextNodeValue(node, originalTextNodes)
  const translatedValue = translateUiCopy(originalValue, language)

  if (node.data !== translatedValue) {
    node.data = translatedValue
  }
}

function applyAttributeLanguage(
  element: Element,
  language: UiLanguage,
  originalAttributes: WeakMap<Element, Map<string, string>>,
) {
  for (const attributeName of TRANSLATABLE_ATTRIBUTES) {
    const originalValue = getOriginalAttributeValue(
      element,
      attributeName,
      originalAttributes,
    )

    if (originalValue === null) {
      continue
    }

    const translatedValue = translateUiCopy(originalValue, language)

    if (element.getAttribute(attributeName) !== translatedValue) {
      element.setAttribute(attributeName, translatedValue)
    }
  }
}

function applyTreeLanguage(
  root: Node,
  language: UiLanguage,
  originalTextNodes: WeakMap<Text, string>,
  originalAttributes: WeakMap<Element, Map<string, string>>,
) {
  if (root.nodeType === Node.TEXT_NODE) {
    applyTextNodeLanguage(root as Text, language, originalTextNodes)
    return
  }

  if (!(root instanceof Element) && !(root instanceof DocumentFragment)) {
    return
  }

  if (root instanceof Element) {
    applyAttributeLanguage(root, language, originalAttributes)
  }

  const textWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let currentTextNode = textWalker.nextNode()

  while (currentTextNode !== null) {
    applyTextNodeLanguage(
      currentTextNode as Text,
      language,
      originalTextNodes,
    )
    currentTextNode = textWalker.nextNode()
  }

  if (root instanceof Element) {
    for (const element of root.querySelectorAll('*')) {
      applyAttributeLanguage(element, language, originalAttributes)
    }
  }
}

export function createUiLanguageController(
  root: HTMLElement,
  initialLanguage: UiLanguage,
) {
  const originalTextNodes = new WeakMap<Text, string>()
  const originalAttributes = new WeakMap<Element, Map<string, string>>()
  let currentLanguage = initialLanguage

  const applyCurrentLanguage = (target: Node) => {
    applyTreeLanguage(
      target,
      currentLanguage,
      originalTextNodes,
      originalAttributes,
    )
  }

  setDocumentLanguage(currentLanguage)
  applyCurrentLanguage(root)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        applyCurrentLanguage(mutation.target)
        continue
      }

      if (mutation.type === 'attributes' && mutation.target instanceof Element) {
        applyAttributeLanguage(
          mutation.target,
          currentLanguage,
          originalAttributes,
        )
        continue
      }

      for (const addedNode of mutation.addedNodes) {
        applyCurrentLanguage(addedNode)
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

  return {
    setLanguage(language: UiLanguage) {
      currentLanguage = language
      setDocumentLanguage(language)
      applyCurrentLanguage(root)
    },
    disconnect() {
      observer.disconnect()
    },
  }
}

export function startSwedishTextNormalizer(root: HTMLElement) {
  const controller = createUiLanguageController(root, 'sv')

  return () => controller.disconnect()
}
