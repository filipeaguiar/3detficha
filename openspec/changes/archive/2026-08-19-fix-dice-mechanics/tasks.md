## 1. Fix Dice Count Calculation

- [x] 1.1 In `src/App.tsx`, locate the `handleRoll` function.
- [x] 1.2 Change `const diceCount = Math.max(1, Math.min(3, 1 + Math.abs(totalExtraDice)));` to `const diceCount = Math.max(1, Math.min(3, 1 + totalExtraDice));`.

## 2. Fix Dice Summation

- [x] 2.1 In `src/App.tsx`, locate the `diceSum` calculation block inside `handleRoll`.
- [x] 2.2 Remove the `if (totalExtraDice > 0)` and `Math.max`/`Math.min` logic.
- [x] 2.3 Replace it with a simple `.reduce` array summation: `let diceSum = rolls.reduce((sum, r) => sum + r, 0);`.
