# Design: Finalize Archetypes

## Goals
- Make archetypes a first-class rules layer in the character model.
- Preserve current saves safely.
- Separate three archetype concerns:
  1. static granted content (advantages/disadvantages/skills)
  2. player choice within archetypes
  3. executable gameplay effects

## Non-Goals
- Full automation of effects that require entirely new subsystems unless clearly scoped.
- Inventing missing rules not present in the source material.

## Current Gaps
1. Some archetypes are represented only as notes.
2. Many archetype internal choices are not selectable/stored.
3. Granted items are only partially integrated into gameplay.
4. Several effects are not modeled in the roll engine.
5. Some disadvantages/immunities are descriptive only.
6. No explicit UI shows what is automatic vs chosen vs unsupported.

## Data Model
Add/extend archetype metadata with:
- grantedAdvantages
- grantedDisadvantages
- grantedSkills
- grantedEffects
- choiceGroups
- unsupportedNotes

Each choiceGroup should support:
- id
- label
- kind: advantage | disadvantage | skill | variant | effect
- min/max selections
- options[]

Character storage should include persisted archetype selections, separate from free selections, so point calculation remains correct and UI can lock archetype-granted items.

## Behavior Rules
- Archetype-granted items do not add extra point cost beyond archetype cost.
- Archetype-granted disadvantages do not consume the normal disadvantage cap.
- Locked archetype items cannot be manually removed unless the archetype changes.
- Changing archetype re-evaluates granted packages and archetype-specific selections.
- Unsupported effects must be visible to the user as manual/narrator-handled.

## Gameplay Effect Categories
### Fully support in current engine
- bonus attribute modifiers
- flat modifiers
- extra die gain/loss
- crit range changes
- auto crit
- resource costs
- passive granted skills/advantages/disadvantages

### Support with bounded extensions
- per-scene activated effects
- target-side penalty markers represented as roll modifiers
- predefined temporary attack/defense style effects

### Display-only/manual handling for now unless subsystem is added
- incorporeal state switching
- complex immunity matrices
- social/narrative obligations
- environmental dependency state detection
- custom death/recovery overrides
- half-cost restricted to a chosen subset without a dedicated cost-reduction rules layer

## UI
Editor should show:
- selected archetype
- locked granted items
- required archetype choices still missing
- unsupported/manual archetype effects

Play mode should show:
- executable archetype effects as activatable bonuses where applicable
- passive archetype tags/details in the detail modal

## Migration
- Default legacy characters to current stored archetype or humano default if absent.
- Preserve existing user-picked advantages/disadvantages/skills untouched.
- Add archetype choice state without rewriting unrelated form data.

## Risks
- Double-counting granted content in points.
- Duplicate ids between free and granted content.
- Archetype changes invalidating stale selections.
- Over-automating effects that should remain descriptive/manual.
