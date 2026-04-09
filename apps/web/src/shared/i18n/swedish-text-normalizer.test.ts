import { describe, expect, it } from 'vitest'
import { normalizeSwedishCopy, translateUiCopy } from './swedish-text-normalizer'

describe('normalizeSwedishCopy', () => {
  it('restores Swedish characters in UI copy', () => {
    expect(
      normalizeSwedishCopy(
        'Hushallets lageroversikt visar nasta atgard i snabbhjalp och underhall.',
      ),
    ).toBe(
      'Hush\u00e5llets lager\u00f6versikt visar n\u00e4sta \u00e5tg\u00e4rd i snabbhj\u00e4lp och underh\u00e5ll.',
    )
  })
})

describe('translateUiCopy', () => {
  it('can render the same UI copy in English', () => {
    expect(
      translateUiCopy(
        'Hushallets beredskap i ett lugnt overblickslage',
        'en',
      ),
    ).toBe('Household preparedness in a calm overview')
  })
})
