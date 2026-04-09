# Story 6.1: Bevara karnfloden lokalt mellan sessioner

Status: review

## Story

As a anvandare,
I want to att min hushallsdata och mina centrala vyer finns kvar mellan sessioner,
so that jag kan lita pa appen aven om jag bara anvander den ibland.

## Acceptance Criteria

1. Givet att anvandaren har sparad hushallsprofil, lager eller inkopsoversikt, nar appen stangs och oppnas igen, sa aterlasas den senaste lokala datan utan konto.
2. Givet att lokal data ar skadad, nar appen startar, sa visas ett begripligt aterstallningslage i stallet for krasch.
3. Givet att storyn verifieras, nar tester kors, sa fungerar local-first-floden fortsatt med Dexie som primart lagringslager.

## Tasks / Subtasks

- [x] Behall och verifiera Dexie-baserad persistens for karnfloden
- [x] Lagg till validering av lokal data vid appstart
- [x] Visa recovery-panel i stallet for krasch vid korrupt lokal data
- [x] Hall appen fortsatt kontofri och local-first

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm test`
- `pnpm build`

### Completion Notes List

- Preserved local-first startup across household data, inventory, shopping overview and reminder data.
- Added a startup integrity gate and a recovery surface so corrupted local data does not crash the app shell.

### File List

- `_bmad-output/implementation-artifacts/6-1-preserve-core-flows-locally-between-sessions.md`
- `apps/web/src/App.tsx`
- `apps/web/src/shared/lib/dexie/app-db.ts`
- `apps/web/src/features/settings-export/services/local-data-management-service.ts`
- `apps/web/src/features/settings-export/components/data-recovery-panel.tsx`

### Change Log

- 2026-04-09: Implemented Story 6.1 with startup validation and recovery handling around the existing Dexie-backed local flows.
