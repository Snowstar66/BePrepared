# Story 6.2: Lasa guider offline och forsta offline-laget

Status: review

## Story

As a anvandare,
I want to kunna lasa guider offline och forsta vad som fortfarande fungerar,
so that appen hjalper mig aven vid dalig eller saknad uppkoppling.

## Acceptance Criteria

1. Givet att guideinnehall tidigare har oppnats i appen, nar anvandaren ar offline, sa kan guider fortfarande visas med lokal cache som fallback.
2. Givet att anvandaren ar offline, nar appen visas, sa presenteras en tydlig `OfflineStateBanner` om vad som fungerar lokalt.
3. Givet att storyn verifieras, nar tester och build kors, sa finns service-worker-baserad offline-cache for app-shell och resurser.

## Tasks / Subtasks

- [x] Lagg till lokal guidecache i Dexie
- [x] Gor guidekatalogen tolerant sa att cache ar fallback och inte blockerar rendering
- [x] Bygg en global offlinebanner i appskalet
- [x] Registrera service worker for app-shell och resurser
- [x] Verifiera offlinebanner med test

## Dev Notes

- MVP-implementationen anvander en enkel service worker i `public/offline-sw.js`. Den uppfyller offlinebehovet utan att dra in mer PWA-ramverk i denna leverans.

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/web test`
- `pnpm build`

### Completion Notes List

- Added a calm offline banner and guide caching so previously accessed content remains available locally.
- Registered a simple service worker to cache the app shell and fetched resources for offline use.

### File List

- `_bmad-output/implementation-artifacts/6-2-read-guides-offline-and-understand-offline-state.md`
- `apps/web/src/shared/lib/dexie/app-db.ts`
- `apps/web/src/features/guides/repository/cached-guide-repository.ts`
- `apps/web/src/features/guides/services/guide-catalog-service.ts`
- `apps/web/src/features/offline-sync/components/offline-state-banner.tsx`
- `apps/web/src/features/offline-sync/__tests__/offline-state-banner.test.tsx`
- `apps/web/src/shared/offline/register-service-worker.ts`
- `apps/web/src/main.tsx`
- `apps/web/public/offline-sw.js`

### Change Log

- 2026-04-09: Implemented Story 6.2 with offline banner, guide cache and service-worker-based offline support.
