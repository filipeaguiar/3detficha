## Why

Several discrepancies between the character sheet implementation and the official 3DeT Victory rules exist:
1. Attributes set to 0 result in 0 max PV, PM, or PA instead of the official minimum of 1.
2. The `+Ação` advantage is present in catalogs but missing from character data and `maxPA` calculations.
3. Levels in `+Vida` and `+Mana` edited in the Attributes tab are omitted from total point calculations.
4. Quick Rest (Descanso Curto) erroneously restores 50% of max PV/PM instead of an amount equal to Resistance (R) and Ability (H).

This change aligns the sheet's derived statistics, rest mechanics, and point accountant with the official 3DeT Victory rules.

## What Changes

- **Resource Formulas**: Guarantee `maxPV`, `maxPM`, and `maxPA` have a minimum value of 1 even when their governing attribute is 0.
- **`+Ação` Support**: Add `maisAcao` to `CharacterForm` (with migration/defaults), wire it to `CharacterEditor` and include `maisAcao * 2` in `maxPA`.
- **Point Calculation**: Include `currentForm.maisVida`, `currentForm.maisMana`, and `currentForm.maisAcao` in `calculatePoints` (each level costs 1 point).
- **Short Rest Mechanic**: Update `handleQuickRest` to recover PV equal to `Math.max(1, resistencia)` and PM equal to `Math.max(1, habilidade)` (rather than 50% of maximum).

## Capabilities

### New Capabilities
- `character-resources`: Official 3DeT Victory resource calculations (minimum 1 PV/PM/PA, `+Ação` scaling, short/full rest recovery rates, and accurate point buying for derived resources).

### Modified Capabilities
- (None)

## Impact

- `src/types/character.ts` (`CharacterForm` type updated to include `maisAcao`)
- `src/utils/character.ts` (`calculatePoints`, character sheet initialization and migrations)
- `src/App.tsx` (`maxPV`, `maxPM`, `maxPA` formulas, `handleQuickRest`)
- `src/components/editor/CharacterEditor.tsx` (input for `+Ação` under the Attributes tab)
