import { createAppDb } from '../../../shared/lib/dexie/app-db'
import { PreparednessHorizonRepository } from '../repository/preparedness-horizon-repository'

describe('PreparednessHorizonRepository', () => {
  it('saves and loads the selected preparedness horizon', async () => {
    const db = createAppDb(`preparedness-horizon-test-${crypto.randomUUID()}`)
    const repository = new PreparednessHorizonRepository(db)

    await repository.saveSelection({
      id: 'primary',
      horizon: '7-days',
      label: '7 dagar',
      updatedAt: '2026-04-08T00:00:00.000Z',
    })

    await expect(repository.getSelection()).resolves.toEqual({
      id: 'primary',
      horizon: '7-days',
      label: '7 dagar',
      updatedAt: '2026-04-08T00:00:00.000Z',
    })

    db.close()
    await db.delete()
  })
})
