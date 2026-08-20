## 1. Finish remaining editor visual standardization

- [x] 1.1 Replace remaining legacy-looking technique-owned rows and special technique controls with the shared editor card system
- [x] 1.2 Standardize remaining concept, archetype, and kit metadata rows that still depend on one-off inline presentation
- [x] 1.3 Review attributes and intentionally document or preserve any visual exceptions that should remain distinct from the card-based sections

## 2. Reduce remaining inline presentation logic

- [x] 2.1 Extract reusable CSS classes for repeated editor spacing, metadata, title, and action layouts still embedded inline
- [x] 2.2 Introduce small presentational helpers where remaining repeated editor structures are still difficult to maintain in `CharacterEditor.tsx`

## 3. Verify consistency and behavior

- [x] 3.1 Verify all editor tabs now follow the same visual system where equivalent content types are shown
- [x] 3.2 Verify technique-owned controls, strike selection, and special package/configuration interactions still behave correctly after cleanup
- [x] 3.3 Run the configured build and fix any regressions introduced by the final standardization pass
