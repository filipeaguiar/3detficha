## Why

The play screen currently presents strikes and other techniques in adjacent sections that share much of the same visual treatment. Separating attacks as a distinct play-mode concept from non-attack techniques creates room to improve navigation, hierarchy, and interaction design for both groups independently.

## What Changes

- Classify play-mode actions into attack/strike entries and non-attack technique entries.
- Render attacks in a dedicated play section with attack-oriented labeling and presentation.
- Render techniques and bonuses in a separate section that excludes entries already represented as attacks.
- Preserve activation, costs, combo behavior, variants, assisted states, and context-detail interactions.
- Establish a cleaner structural boundary so future UI improvements can target attacks and techniques independently.

## Capabilities

### New Capabilities
- `play-action-separation`: Defines how the play screen separates attacks from non-attack techniques and avoids duplicate presentation between the two groups.

### Modified Capabilities
- `structured-strikes`: The play-mode presentation requirement changes so known strikes are rendered as a dedicated attack group rather than being visually mixed with general techniques.

## Impact

- Affected code:
  - `src/components/play/PlayMode.tsx`
  - possibly new play-mode presentation components under `src/components/play/`
  - `src/utils/character.ts` if a reusable classification helper is needed
  - `src/index.css`
- No character data migration or gameplay rule changes expected.
- Strike acquisition, combo state, technique activation, and resource costs must remain compatible.
