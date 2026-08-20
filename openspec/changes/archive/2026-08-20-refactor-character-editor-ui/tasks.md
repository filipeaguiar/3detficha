## 1. Extract editor UI structure

- [x] 1.1 Identify repeated rendering patterns in `src/components/editor/CharacterEditor.tsx` and map them to editor-specific building blocks
- [x] 1.2 Create reusable rendering units and/or subcomponents for shared editor cards, section headers, action rows, and selectable list entries
- [x] 1.3 Keep `CharacterEditor.tsx` responsible for orchestration while moving larger tab body sections out of the monolithic JSX where it improves readability

## 2. Standardize editor visual patterns

- [x] 2.1 Consolidate repeated inline editor styling into shared CSS classes for cards, subcards, field groups, selectable states, and technique rows
- [x] 2.2 Normalize form controls across tabs so text inputs, search fields, selects, and numeric inputs share spacing, borders, typography, and focus behavior
- [x] 2.3 Normalize editor icon sizing and spacing for tab triggers and related editor action areas

## 3. Preserve behavior while refactoring

- [x] 3.1 Verify advantages, disadvantages, skills, nested option groups, and technique acquisition still preserve their current selection and disabled-state behavior
- [x] 3.2 Verify owned technique editing controls, strike selection flows, and package configuration controls still preserve current interactions after extraction
- [x] 3.3 Run the configured build and fix any regressions introduced by the refactor
