## 1. Storage Migration and Data Model Cleanup

- [x] 1.1 In `src/types/character.ts`, remove `CharacterLinkGroup`, `CharacterLinkRelation`, `linkGroupId`, `relationType`, and `relationLabel` from `CharacterSheet`.
- [x] 1.2 In `src/utils/character.ts`, update `loadInitialSheets()` to migrate legacy `linkGroups` into primary sheet `forms` array and clear `3det_character_link_groups`.
- [x] 1.3 In `src/hooks/useCharacterSheets.ts`, remove `linkGroups`, `linkedSheets`, `createLinkedSheet`, and `unlinkSheet`, retaining straightforward sheet/form state management.

## 2. App State and Resource Synchronization

- [x] 2.1 In `src/App.tsx`, remove `linkedSheets` bridging logic and use `activeSheet.forms` and `activeSheet.forms[activeFormIndex]` directly.
- [x] 2.2 In `src/App.tsx`, rewrite `addTransformationForm` to append a new `CharacterForm` directly to `activeSheet.forms` and select it.
- [x] 2.3 In `src/App.tsx`, rewrite `removeCurrentForm` to filter out the target form index from `activeSheet.forms`.
- [x] 2.4 In `src/App.tsx`, separate character switching from form transformation so changing forms in Play Mode preserves current damage/resources instead of resetting to 100%.

## 3. UI Updates and Polish

- [x] 3.1 In `src/components/editor/CharacterEditor.tsx`, remove `usingLinkedForms` prop and obsolete linked form warnings.
- [x] 3.2 In `src/components/modals/AppModals.tsx`, clean up the character sheet cards in the switcher modal to display clear form counts without ghost entries.
