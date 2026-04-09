# Story 5.1: Skapa aterkommande paminnelser

Status: review

## Story

As a hushallsansvarig,
I want to fa enkla aterkommande paminnelser om lagergenomgang,
so that jag kommer ihag att halla min beredskap uppdaterad.

## Acceptance Criteria

1. Givet att anvandaren vill skapa en paminnelse, nar installningen sparas, sa kan minst manadsvis och kvartalsvis rytm valjas.
2. Givet att paminnelsen aktiveras, nar systemnotiser inte ar tillgangliga eller nekas, sa erbjuds begriplig in-app-fallback utan blockerande fel.
3. Givet att storyn verifieras, nar tester kors, sa finns tackning for sparad rytm och visning av nasta planerade tillfalle.

## Tasks / Subtasks

- [x] Lagg till lokalt reminder-schema och repository i Dexie
- [x] Bygg reminder service med val av manadsvis eller kvartalsvis rytm
- [x] Skapa underhallsvyns paminnelsekort med nasta planerade genomgang
- [x] Visa fallback-copy nar systemnotiser saknas eller inte ar tillgangliga
- [x] Verifiera flodet med route-test

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/web test`
- `pnpm test`

### Completion Notes List

- Added local recurring reminder settings with monthly and quarterly cadence.
- Surfaced a calm in-app fallback when system notifications are unavailable and show the next planned review directly in the UI.

### File List

- `_bmad-output/implementation-artifacts/5-1-create-recurring-reminders.md`
- `apps/web/src/shared/lib/dexie/app-db.ts`
- `apps/web/src/features/reminders/schemas/reminder-settings-schema.ts`
- `apps/web/src/features/reminders/repository/reminder-settings-repository.ts`
- `apps/web/src/features/reminders/services/reminder-settings-service.ts`
- `apps/web/src/features/reminders/components/reminder-settings-card.tsx`
- `apps/web/src/app/routes/maintenance-route.tsx`
- `apps/web/src/features/reminders/__tests__/maintenance-route.test.tsx`

### Change Log

- 2026-04-09: Implemented Story 5.1 with local reminder cadence, next-review timing and in-app fallback.
