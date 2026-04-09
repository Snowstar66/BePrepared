import { InventoryService } from '../../inventory/services/inventory-service'
import { PreparednessNeedsService } from '../../preparedness-needs/services/preparedness-needs-service'
import {
  calculatePreparednessGapAnalysis,
  type PreparednessGapAnalysis,
} from '../calculators/preparedness-gap-calculator'

export class PreparednessGapService {
  private readonly preparednessNeedsService: PreparednessNeedsService
  private readonly inventoryService: InventoryService

  constructor(
    preparednessNeedsService: PreparednessNeedsService = new PreparednessNeedsService(),
    inventoryService: InventoryService = new InventoryService(),
  ) {
    this.preparednessNeedsService = preparednessNeedsService
    this.inventoryService = inventoryService
  }

  async loadAnalysis(): Promise<PreparednessGapAnalysis | null> {
    const [needs, inventoryItems] = await Promise.all([
      this.preparednessNeedsService.loadNeeds(),
      this.inventoryService.listItems(),
    ])

    if (needs === null) {
      return null
    }

    return calculatePreparednessGapAnalysis(needs, inventoryItems)
  }
}
