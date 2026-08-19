## Context

3DeT Victory utilizes a dice pool mechanic where players roll between 1 and 3 six-sided dice (d6). The rules dictate that the result of a test is the sum of all dice rolled plus the relevant attribute. The terms "Ganho" and "Perda" add or subtract dice from this pool, respectively. The current code misinterprets this as D&D 5e's Advantage/Disadvantage system, rolling extra dice but picking only the highest or lowest die result, and calculating the pool size incorrectly using `Math.abs` for negative modifiers.

## Goals / Non-Goals

**Goals:**
- Correct the `diceCount` formula to `Math.max(1, Math.min(3, 1 + totalExtraDice))`.
- Correct the `diceSum` calculation to accurately sum all dice in the `rolls` array.
- Maintain existing critical success and failure detection (which already works correctly on the `rolls` array).

**Non-Goals:**
- Restructuring the entire `handleRoll` function or rewriting the `DiceBox` integration.
- Changing how `totalExtraDice` is aggregated from UI components before the roll.

## Decisions

1. **Summation vs Selection**: We will replace the `if/else` block that selects `Math.max` or `Math.min` with a simple `.reduce((sum, r) => sum + r, 0)`.
2. **Dice Pool Calculation**: The formula for `diceCount` will drop `Math.abs`. A "Perda" (e.g. `totalExtraDice = -1`) will result in `1 - 1 = 0`, which is clamped to `1` by `Math.max(1, ...)`. A "Ganho" (e.g. `totalExtraDice = +2`) will result in `3`, clamped to `3` by `Math.min(3, ...)`.

## Risks / Trade-offs

- [Risk] Players might be used to the current (incorrect) behavior and find the sum surprisingly high.
  → Mitigation: This is a strict adherence to the official 3DeT Victory rules. The math expects the sum, and the previous implementation made tests significantly harder than intended.
