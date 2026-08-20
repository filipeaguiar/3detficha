## Why

The editor UI is much more consistent than before, but `CharacterEditor.tsx` still contains several visually divergent sections and many one-off inline styles. This leaves the editor in a partially standardized state, especially in concept, kit/archetype details, attributes, and technique-specific controls.

## What Changes

- Finish standardizing the remaining editor sections that still rely on legacy inline styling.
- Bring the techniques tab fully into the same visual system as the other tabs.
- Reduce remaining repeated inline layout and presentation rules in `CharacterEditor.tsx`.
- Extract or reuse editor-specific primitives for repeated metadata rows, headers, buttons, owned technique cards, and special technique configuration controls.
- Preserve all current editing behavior while making the remaining editor UI visually and structurally coherent.

## Capabilities

### New Capabilities
- `editor-ui-standardization-completion`: Covers the final pass that aligns remaining editor sections and technique-specific controls with the shared editor visual system.

### Modified Capabilities
- `character-editor-ui-refactor`: Extend the refactor requirements so the remaining legacy-looking editor areas and technique-owned controls are standardized as part of the same editor composition system.

## Impact

- Affected code:
  - `src/components/editor/CharacterEditor.tsx`
  - `src/components/editor/*.tsx`
  - `src/index.css`
- No gameplay logic, persistence format, or public API changes expected.
- Main impact is UI consistency, maintainability, and reduced future cleanup work in the editor.
