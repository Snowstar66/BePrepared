import { getAppDb } from '../../../shared/lib/dexie/app-db'
import {
  localDataExportSchema,
  type LocalDataExport,
} from '../schemas/local-data-export-schema'

export class LocalDataCorruptionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LocalDataCorruptionError'
  }
}

export class LocalDataManagementService {
  async buildExport(): Promise<LocalDataExport> {
    const appDb = getAppDb()
    const [
      householdProfile,
      preparednessHorizon,
      inventoryItems,
      shoppingOverview,
      reminderSettings,
      cachedGuides,
    ] = await Promise.all([
      appDb.householdProfiles.get('primary'),
      appDb.preparednessHorizons.get('primary'),
      appDb.inventoryItems.toArray(),
      appDb.shoppingOverviews.get('primary'),
      appDb.reminderSettings.get('primary'),
      appDb.cachedGuides.toArray(),
    ])

    return localDataExportSchema.parse({
      version: 1,
      exportedAt: new Date().toISOString(),
      householdProfile: householdProfile ?? null,
      preparednessHorizon: preparednessHorizon ?? null,
      inventoryItems,
      shoppingOverview: shoppingOverview ?? null,
      reminderSettings: reminderSettings ?? null,
      cachedGuides,
    })
  }

  async exportToJson() {
    return JSON.stringify(await this.buildExport(), null, 2)
  }

  async validateCurrentData() {
    try {
      await this.buildExport()
      return { isValid: true, message: '' as string }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Lokal data kunde inte valideras.'

      return { isValid: false, message }
    }
  }

  async importFromJson(json: string) {
    let parsedJson: unknown

    try {
      parsedJson = JSON.parse(json)
    } catch {
      throw new LocalDataCorruptionError(
        'Importfilen gick inte att lasa som JSON. Kontrollera att du valt en giltig exportfil.',
      )
    }

    const parsedExport = localDataExportSchema.safeParse(parsedJson)

    if (!parsedExport.success) {
      throw new LocalDataCorruptionError(
        'Importfilen matchar inte den forvantade strukturen for Buffertkoll-data.',
      )
    }

    const appDb = getAppDb()

    await appDb.transaction(
      'rw',
      [
        appDb.householdProfiles,
        appDb.preparednessHorizons,
        appDb.inventoryItems,
        appDb.shoppingOverviews,
        appDb.reminderSettings,
        appDb.cachedGuides,
      ],
      async () => {
        await Promise.all([
          appDb.householdProfiles.clear(),
          appDb.preparednessHorizons.clear(),
          appDb.inventoryItems.clear(),
          appDb.shoppingOverviews.clear(),
          appDb.reminderSettings.clear(),
          appDb.cachedGuides.clear(),
        ])

        if (parsedExport.data.householdProfile !== null) {
          await appDb.householdProfiles.put(parsedExport.data.householdProfile)
        }

        if (parsedExport.data.preparednessHorizon !== null) {
          await appDb.preparednessHorizons.put(parsedExport.data.preparednessHorizon)
        }

        if (parsedExport.data.inventoryItems.length > 0) {
          await appDb.inventoryItems.bulkPut(parsedExport.data.inventoryItems)
        }

        if (parsedExport.data.shoppingOverview !== null) {
          await appDb.shoppingOverviews.put(parsedExport.data.shoppingOverview)
        }

        if (parsedExport.data.reminderSettings !== null) {
          await appDb.reminderSettings.put(parsedExport.data.reminderSettings)
        }

        if (parsedExport.data.cachedGuides.length > 0) {
          await appDb.cachedGuides.bulkPut(parsedExport.data.cachedGuides)
        }
      },
    )

    return parsedExport.data
  }

  async clearAllData() {
    const appDb = getAppDb()

    await Promise.all([
      appDb.householdProfiles.clear(),
      appDb.preparednessHorizons.clear(),
      appDb.inventoryItems.clear(),
      appDb.shoppingOverviews.clear(),
      appDb.reminderSettings.clear(),
      appDb.cachedGuides.clear(),
    ])
  }
}
