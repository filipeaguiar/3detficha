## Why

Users find the mana cost text on modifier buttons cluttered and hard to read, especially on smaller screens. Replacing the textual cost with a visual slanted rectangle, matching the mana bar style, simplifies the UI and aligns with existing design language.

## What Changes

- Remove the mana cost text from all modifier button UI elements.
- Introduce slanted rectangular mana cost indicators, styled like the existing mana bar, to display costs visually.
- Eliminate the variant cost indicator that previously displayed alternative costs.
- Update related UI assets and components to use the new rectangle graphics.

## Capabilities

### New Capabilities
- `modifier-button-mana-indicator`: Visual representation of mana cost using slanted rectangles.

### Modified Capabilities
- `modifier-button-ui`: Updated to remove textual mana cost and variant indicators; now depends on the new `modifier-button-mana-indicator` capability.

## Impact

- UI rendering code for modifier buttons will be modified.
- Assets for slanted rectangle graphics need to be added.
- No functional gameplay changes; only visual updates.
- Potential impact on accessibility tools that read button labels; need to ensure alternative text is provided.
