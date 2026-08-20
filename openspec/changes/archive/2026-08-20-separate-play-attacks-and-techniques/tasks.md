## 1. Classify play actions

- [x] 1.1 Derive an explicit attacks collection from the character's known strike selections
- [x] 1.2 Derive a non-attack techniques collection that excludes strike actions and avoids duplicate Golpes presentation
- [x] 1.3 Add typed classification helpers if needed so the section boundary is not encoded only in JSX

## 2. Separate play-mode presentation

- [x] 2.1 Extract a dedicated attacks section component with strike cost, note, combo, disabled, and context-detail presentation
- [x] 2.2 Extract a dedicated techniques section component that preserves variants, mana indicators, assisted states, packages, and context details
- [x] 2.3 Add independent CSS hooks and visual hierarchy for attacks and techniques so each section can be improved separately

## 3. Preserve interactions and validate

- [x] 3.1 Verify known strikes appear once in the attacks section and do not duplicate in techniques
- [x] 3.2 Verify strike activation, combo behavior, technique activation, variants, costs, and assisted controls remain unchanged
- [x] 3.3 Run the configured build and fix any regressions introduced by the separation
