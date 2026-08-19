## 1. Schema and Type Extensions

- [x] 1.1 In `src/types/character.ts`, add `maisAcao?: number;` to `CharacterForm`.
- [x] 1.2 In `src/utils/character.ts`, update character normalization and default initializers to include `maisAcao: parsed.maisAcao ?? 0`.

## 2. Calculation and Editor Updates

- [x] 2.1 In `src/App.tsx`, update `maxPV`, `maxPM`, and `maxPA` definitions to use `Math.max(1, ...)` and factor in `maisAcao * 2` for `maxPA`.
- [x] 2.2 In `src/utils/character.ts`, update `calculatePoints` to add `(currentForm.maisVida || 0) + (currentForm.maisMana || 0) + (currentForm.maisAcao || 0)` to the total point cost.
- [x] 2.3 In `src/components/editor/CharacterEditor.tsx`, add an input for `+Ação (Níveis)` in the secondary stats grid.
- [x] 2.4 In `src/App.tsx`, pass `maisAcao` down to `CharacterEditor`.

## 3. Rest Mechanics Alignment

- [x] 3.1 In `src/App.tsx`, update `handleQuickRest` to calculate `recoverPV = Math.max(1, resistencia)` and `recoverPM = Math.max(1, habilidade)`.
- [x] 3.2 In `src/components/modals/AppModals.tsx`, update the Quick Rest button subtitle to reflect recovery of `+R em PV e +H em PM` instead of `+50% dos PV e PM`.
