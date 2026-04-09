import { describe, expect, it } from 'vitest'
import { normalizeSwedishCopy } from './swedish-text-normalizer'

describe('normalizeSwedishCopy', () => {
  it('restores Swedish characters in UI copy', () => {
    expect(
      normalizeSwedishCopy(
        'Hushallets lageroversikt visar nasta atgard i snabbhjalp och underhall.',
      ),
    ).toBe(
      'Hushållets lageröversikt visar nästa åtgärd i snabbhjälp och underhåll.',
    )
  })
})
