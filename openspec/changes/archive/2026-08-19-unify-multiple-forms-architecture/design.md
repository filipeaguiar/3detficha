## Context

The codebase currently contains two parallel ways to handle multiple forms:
1. Embedded: `CharacterSheet.forms: CharacterForm[]`
2. Linked: `CharacterLinkGroup` stored in `3det_character_link_groups` linking multiple `CharacterSheet` entities.

This bifurcation causes synchronization bugs, unlinked state mutation, ghost sheets in the character switcher, and an unintentional full heal of PV/PM/PA during combat transformations.

## Goals / Non-Goals

**Goals:**
- Unify multiple forms exclusively as elements inside `CharacterSheet.forms`.
- Deprecate and remove `CharacterLinkGroup`, `linkGroupId`, `linkedSheets`, and related helper functions (`createLinkedSheet`, `unlinkSheet`).
- Provide an automatic migration in `loadInitialSheets` to collapse existing linked sheets into their parent sheet's `forms` array and clean up legacy localStorage keys.
- Preserve combat resource state (current damage to PV/PM/PA) when transforming between forms in Play Mode.
- Clean the "Meus Personagens" drawer/modal to list only distinct character sheets.

**Non-Goals:**
- Changing how individual form attributes, advantages, or roll bonuses are customized.
- Removing the ability of characters (e.g. Druids) to have distinct forms with unique avatars, stats, and advantages.

## Decisions

1. **Embedded Form Model as Sole Source of Truth**:
   - `CharacterSheet` holds `forms: CharacterForm[]`.
   - `activeFormIndex` directly indexes into `activeSheet.forms`.
   - `updateCurrentForm(index, updates)` directly updates `activeSheet.forms[index]`.
   - `addTransformationForm()` appends a new `CharacterForm` directly to `activeSheet.forms` without creating external sheets.
   - `removeCurrentForm(index)` removes the form from `activeSheet.forms`.

2. **Storage Migration Strategy**:
   - In `loadInitialSheets()`, if `3det_character_link_groups` is found in `localStorage`, merge each linked auxiliary sheet's `forms` into the primary sheet's `forms` array.
   - Remove auxiliary sheets from the returned sheet list.
   - Delete or clear `3det_character_link_groups`.

3. **Resource State Management on Transformation**:
   - Split character initialization from form switching:
     - When `activeCharacterId` changes: reset `currentPV`, `currentPM`, `currentPA` to the new character's maximums.
     - When `activeFormIndex` changes: clamp `currentPV = Math.min(newMaxPV, prevPV)`, `currentPM = Math.min(newMaxPM, prevPM)`, and `currentPA = Math.min(newMaxPA, prevPA)`. This preserves damage and spent resources across forms.

4. **UI Simplification**:
   - Remove `usingLinkedForms` branches and notices from `CharacterEditor.tsx`.
   - In `AppModals.tsx`, display clean character cards showing the active archetype, kit, and a count of available forms (e.g., `2 Formas`).

## Risks / Trade-offs

- [Risk] User has legacy linked sheets in `localStorage`.
  → Mitigation: The automatic migration combines them safely into the primary sheet's `forms` array on startup without data loss.
