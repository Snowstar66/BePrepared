import { ReminderSettingsCard } from './reminder-settings-card'
import { RotationReviewList } from './rotation-review-list'

export function MaintenanceOverview() {
  return (
    <section style={{ display: 'grid', gap: '16px' }}>
      <ReminderSettingsCard />
      <RotationReviewList />
    </section>
  )
}
