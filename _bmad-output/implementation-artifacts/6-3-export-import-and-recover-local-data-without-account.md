# Story 6.3: Exportera, importera och aterhamta lokal data utan konto

Status: review

## Story

As a anvandare,
I want to exportera, importera och vid behov aterhamta min lokala data utan att skapa konto,
so that jag behaller kontrollen over min information och kan skydda mig mot dataforlust.

## Acceptance Criteria

1. Givet att anvandaren oppnar datahanteringen, nar export startas, sa kan lokal data exporteras i ett validerat JSON-format utan konto.
2. Givet att anvandaren importerar en tidigare export, nar filen valideras, sa skrivs lokal data bara over efter lyckad strukturkontroll.
3. Givet att lokal data ar skadad eller ogiltig, nar appen identifierar problemet, sa visas recovery-lage med val att importera backup eller borja om kontrollerat.

## Tasks / Subtasks

- [x] Skapa validerat exportschema for lokal appdata
- [x] Bygg service for export, import, integritetskontroll och datarensning
- [x] Skapa datahanteringsyta och route for export/import
- [x] ateranvand recovery-panelen for korrupt data
- [x] Verifiera export/import med automatiserade tester

## Dev Agent Record

### Agent Model Used

GPT-5 Codex

### Debug Log References

- `pnpm --filter @beprepared/web test`
- `pnpm test`
- `pnpm build`

### Completion Notes List

- Added a data-management route where users can export validated local JSON and import backups without creating an account.
- Built a shared local-data service that validates structure before overwrite and powers both import and recovery paths.

### File List

- `_bmad-output/implementation-artifacts/6-3-export-import-and-recover-local-data-without-account.md`
- `apps/web/src/app/router.tsx`
- `apps/web/src/app/routes/data-management-route.tsx`
- `apps/web/src/app/routes/home-route.tsx`
- `apps/web/src/features/settings-export/schemas/local-data-export-schema.ts`
- `apps/web/src/features/settings-export/services/local-data-management-service.ts`
- `apps/web/src/features/settings-export/components/data-management-panel.tsx`
- `apps/web/src/features/settings-export/components/data-recovery-panel.tsx`
- `apps/web/src/features/settings-export/__tests__/local-data-management-service.test.ts`

### Change Log

- 2026-04-09: Implemented Story 6.3 with validated export/import flows and controlled recovery mode.
