## 1. Catalog and data model

- [x] 1.1 Inventory the current editor tab flows for advantages, disadvantages, and techniques
- [x] 1.2 Define a structured technique catalog with XP cost, XP category, universal flag, and requirement metadata
- [x] 1.3 Implement helpers to evaluate technique eligibility from the current character state
- [x] 1.4 Preserve support for free custom techniques alongside the structured catalog flow

## 2. Editor tab UX improvements

- [x] 2.1 Separate advantages and disadvantages clearly in the editor UX
- [x] 2.2 Add dedicated filter/search controls to each relevant option tab
- [x] 2.3 Ensure filter state is scoped correctly and does not leak across unrelated tabs

## 3. Technique gating and guided selection

- [x] 3.1 Add a guided technique selection flow from the structured catalog
- [x] 3.2 Show universal/common-use techniques as broadly available
- [x] 3.3 Hide or clearly block techniques whose requirements are not met
- [x] 3.4 Surface unmet requirements in the UI when a technique is unavailable
- [x] 3.5 Auto-fill XP metadata when a technique is selected from the catalog

## 4. XP funding UX

- [x] 4.1 Integrate guided XP funding into structured technique selection
- [x] 4.2 Offer only compatible XP-credit sources for the selected technique
- [x] 4.3 Show available, spent, and remaining XP clearly during selection
- [x] 4.4 Block incompatible funding combinations such as Grimório funding legendary techniques
- [x] 4.5 Ensure total point calculation reflects guided XP funding correctly

## 5. Validation and release

- [x] 5.1 Validate kit-related flows remain compatible with the new tab UX
- [x] 5.2 Run lint and build
- [x] 5.3 Commit implementation
- [x] 5.4 Push to origin/master
- [x] 5.5 Deploy to gh-pages
