## Why

The application currently has two competing and conflicting implementations for multiple forms:
1. An embedded form array (`CharacterSheet.forms: CharacterForm[]`).
2. An external linked sheets table (`CharacterLinkGroup` + `linkedSheets`) that spawns separate ghost sheets in `localStorage`.

This hybrid model causes severe issues:
- **Combat Full-Heal Bug**: Changing forms in Play Mode triggers a React `useEffect` that resets current PV, PM, and PA to maximum, erasing battle damage.
- **Character List Pollution**: The character switcher lists all auxiliary forms as standalone sheets, causing confusion and hierarchy inversions.
- **Data Fragmentation**: Editing forms branches into multiple code paths depending on whether `linkedSheets.length > 1`.

Unifying into a single embedded model will simplify the codebase, prevent unintended healing during transformations, and cleanly present characters.

## What Changes

- **Single Source of Truth**: Standardize all forms directly within `CharacterSheet.forms: CharacterForm[]`.
- **Remove `CharacterLinkGroup`**: Eliminate `linkGroups`, `linkGroupId`, `linkedSheets`, and associated ghost sheet creation.
- **Data Migration**: Automatically merge any existing linked sheets from `linkGroups` into the primary character's `forms` array upon startup.
- **Health/Resource Preservation**: When changing forms (`activeFormIndex`), retain current damage/expenditure proportionally or cap by the new form's maximums instead of restoring to full.
- **Clean Character Switcher**: The character selection modal will only display root character sheets, with a badge showing the number of forms.

## Capabilities

### New Capabilities
- `multiple-forms`: Unified form management within a character sheet, ensuring accurate form switching, resource state preservation, and clean character management.

### Modified Capabilities
- (None)

## Impact

- `src/types/character.ts` (Remove `CharacterLinkGroup`, `linkGroupId`, `relationType`, `relationLabel`)
- `src/hooks/useCharacterSheets.ts` (Simplify hook to manage `characterSheets` and `forms` without group linking)
- `src/utils/character.ts` (Migrate legacy grouped sheets into `forms` array on load)
- `src/App.tsx` (Remove `linkedSheets` bridging, fix `activeFormIndex` resource reset effect, simplify `addTransformationForm` and `removeCurrentForm`)
- `src/components/editor/CharacterEditor.tsx` (Clean form tab management)
- `src/components/play/PlayMode.tsx` (Smooth form transition preserving combat resources)
- `src/components/modals/AppModals.tsx` (Remove linked group noise in character switcher)
