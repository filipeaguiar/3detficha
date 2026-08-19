## Context

In 3DeT Victory, derived resource values (PV, PM, PA) and resting recovery rates follow specific formulas:
- Minimum derived resource pool is 1 point (even if Power, Ability, or Resistance is 0).
- `+Ação` provides +2 PA per point invested (analogous to `+Vida` giving +10 PV and `+Mana` giving +10 PM).
- Character build point totals must account for points spent on additional resource ranks (`maisVida`, `maisMana`, `maisAcao`).
- Short Rest (Descanso Curto) restores an amount of PV equal to Resistance (R) and PM equal to Ability (H) (minimum 1 each), rather than 50% of the maximum pools.

## Goals / Non-Goals

**Goals:**
- Update `maxPV`, `maxPM`, `maxPA` calculations to enforce `Math.max(1, ...)`.
- Add `maisAcao` attribute rank to `CharacterForm` and `CharacterEditor`, factoring `maisAcao * 2` into `maxPA`.
- Update `calculatePoints` to include `currentForm.maisVida + currentForm.maisMana + currentForm.maisAcao`.
- Correct `handleQuickRest` to restore `Math.max(1, resistencia)` PV and `Math.max(1, habilidade)` PM.
- Ensure backwards compatibility for existing saved sheets by defaulting `maisAcao` to `0`.

**Non-Goals:**
- Reworking the entire rest interface or adding location-condition modifiers (e.g. wild/uncomfortable rest penalties) at this stage.
- Overhauling the advantage selection modal for `+Ação` (users can configure ranks directly via the Attributes editor grid like `+Vida` and `+Mana`).

## Decisions

1. **`CharacterForm` Schema Extension**:
   - Add `maisAcao?: number;` to `CharacterForm`.
   - In `utils/character.ts` normalization and migrations, default `maisAcao: parsed.maisAcao ?? 0`.

2. **Editor Grid Integration**:
   - Add a `+Ação (Níveis)` number input in the second `stats-grid` in `CharacterEditor.tsx`, styled with Power's color (`#FF9E00`).

3. **Formula Adjustments**:
   - `maxPV = Math.max(1, (resistencia * 5) + (maisVida * 10));`
   - `maxPM = Math.max(1, (habilidade * 5) + (maisMana * 10));`
   - `maxPA = Math.max(1, (poder * 1) + (maisAcao * 2));`

4. **Point Total Calculation**:
   - In `calculatePoints`: `total += (currentForm.maisVida || 0) + (currentForm.maisMana || 0) + (currentForm.maisAcao || 0);`

5. **Rest Calculation**:
   - `recoverPV = Math.max(1, resistencia);`
   - `recoverPM = Math.max(1, habilidade);`

## Risks / Trade-offs

- [Risk] Characters previously built with 0 in an attribute will see their resources increase from 0 to 1.
  → Mitigation: This is strictly rules-as-written (RAW) in 3DeT Victory and prevents invalid unplayable states.
- [Risk] Total point counts on existing characters might increase if they had `maisVida` or `maisMana` set.
  → Mitigation: Point counts will now accurately reflect the real character point cost under 3DeT Victory rules.
