## 1. Audit and data model

- [x] 1.1 Inventory current kit behaviors, powers, costs, usage patterns, and implicit text-parsed effects
- [x] 1.2 Classify each remaining kit effect as automatable, partially automatable, or manual-only
- [x] 1.3 Extend the kit data model with explicit metadata for passive package, choices, bounded effects, and unsupported/manual notes
- [x] 1.4 Extend character storage to persist kit-specific selections separately from free picks
- [x] 1.5 Add migration logic for new kit selection fields without breaking existing saves

## 2. Rules and calculation

- [x] 2.1 Validate and preserve support for characters without kit
- [x] 2.2 Refactor point calculation to keep kit cost applied exactly once
- [x] 2.3 Ensure explicit kit metadata takes precedence over text parsing when both exist
- [x] 2.4 Review coexistence rules between kit and archetype costs, grants, and active effects

## 3. Editor and detail UI

- [x] 3.1 Show structured selected-kit package clearly in the editor
- [x] 3.2 Implement editor UI for kit internal choices where applicable
- [x] 3.3 Show unsupported/manual kit effects clearly in editor UI
- [x] 3.4 Ensure changing kits removes stale kit-specific selections or grants while preserving unrelated character data

## 4. Play mode and gameplay engine

- [x] 4.1 Show kit passive package and activatable powers clearly in play/detail UI
- [x] 4.2 Implement bounded automatable kit effects through the existing bonus engine where possible
- [x] 4.3 Implement per-scene/per-session usage tracking consistently for structured kit effects
- [x] 4.4 Mark non-automatable target/state/context kit effects explicit as manual or bounded approximations
- [x] 4.5 Validate that structured kit effects coexist cleanly with archetype effects and manual roll modifiers

## 5. Validation and release

- [x] 5.1 Review the implemented kit catalog against the source material used by the app
- [x] 5.2 Run lint and build
- [x] 5.3 Commit implementation
- [x] 5.4 Push to origin/master
- [x] 5.5 Deploy to gh-pages
- [ ] 5.6 Sync the kits spec to openspec/specs/kits/spec.md during archive
- [ ] 5.7 Archive the completed finalize-kits change
