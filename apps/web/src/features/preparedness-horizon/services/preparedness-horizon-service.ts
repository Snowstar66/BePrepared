import { PreparednessHorizonRepository } from '../repository/preparedness-horizon-repository'
import {
  defaultPreparednessHorizonFormValues,
  preparednessHorizonFormSchema,
  toPreparednessHorizonFormValues,
  toPreparednessHorizonRecord,
  type PreparednessHorizonFormValues,
} from '../schemas/preparedness-horizon-schema'

export class PreparednessHorizonService {
  private readonly repository: PreparednessHorizonRepository

  constructor(
    repository: PreparednessHorizonRepository = new PreparednessHorizonRepository(),
  ) {
    this.repository = repository
  }

  async loadFormValues() {
    const record = await this.repository.getSelection()

    if (record === null) {
      return defaultPreparednessHorizonFormValues
    }

    return toPreparednessHorizonFormValues(record)
  }

  async loadSelection() {
    return this.repository.getSelection()
  }

  async save(values: PreparednessHorizonFormValues) {
    const parsedValues = preparednessHorizonFormSchema.parse(values)
    const record = toPreparednessHorizonRecord(parsedValues)

    await this.repository.saveSelection(record)

    return record
  }
}
