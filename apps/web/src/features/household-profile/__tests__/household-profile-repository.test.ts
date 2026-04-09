import { createAppDb } from '../../../shared/lib/dexie/app-db'
import { HouseholdProfileRepository } from '../repository/household-profile-repository'

describe('HouseholdProfileRepository', () => {
  it('saves and loads the local household profile', async () => {
    const db = createAppDb(`household-profile-test-${crypto.randomUUID()}`)
    const repository = new HouseholdProfileRepository(db)

    await repository.saveProfile({
      id: 'primary',
      adults: 2,
      children: 1,
      hasPets: true,
      updatedAt: '2026-04-08T00:00:00.000Z',
    })

    await expect(repository.getProfile()).resolves.toEqual({
      id: 'primary',
      adults: 2,
      children: 1,
      hasPets: true,
      updatedAt: '2026-04-08T00:00:00.000Z',
    })

    db.close()
    await db.delete()
  })
})
