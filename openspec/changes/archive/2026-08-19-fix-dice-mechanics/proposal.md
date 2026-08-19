## Why

Currently, the application calculates dice rolls using a D&D 5e-style "Advantage/Disadvantage" mechanic (rolling extra dice and taking the highest or lowest single die). In the 3DeT Victory system, "Ganho" and "Perda" modify the total number of dice rolled (base 1d6, up to 3d6 max, minimum 1d6) and the final result is the **sum** of all rolled dice, not just the highest or lowest single die. The current implementation causes players to roll the wrong amount of dice on a "Perda" (because it uses `Math.abs`), and incorrectly discards dice results by using `Math.max` or `Math.min`.

## What Changes

- **BREAKING**: Modify the `diceCount` calculation in `handleRoll` to simply be `Math.max(1, Math.min(3, 1 + totalExtraDice))` instead of using `Math.abs`.
- **BREAKING**: Change the `diceSum` calculation to sum all values in the `rolls` array (`rolls.reduce((a, b) => a + b, 0)`), removing the `Math.max` and `Math.min` logic.
- Ensure that `isCriticalFail` logic remains correct (it already checks if `rolls.every(r => r === 1)`).
- Ensure critical success multiplication logic remains correct (it already counts dice `>= effectiveCritRange`).

## Capabilities

### New Capabilities
- (None)

### Modified Capabilities
- `core-mechanics`: Update how dice pool summation and modifier limits are calculated.

## Impact

- `src/App.tsx` (Specifically the `handleRoll` function logic)
- Result modal UI will now correctly reflect a standard sum of all rolled dice rather than a single filtered die.
