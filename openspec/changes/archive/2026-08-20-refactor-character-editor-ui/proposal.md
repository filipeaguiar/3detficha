## Why

`CharacterEditor.tsx` has accumulated UI structure, styling decisions, and tab-specific rendering in a single large component. Recent visual cleanup improved consistency, but the editor still relies heavily on inline styles and repeated layout patterns, which makes future UI changes slow, error-prone, and hard to keep visually aligned.

## What Changes

- Refactor the editor UI into reusable visual building blocks for cards, section headers, choice rows, and action groups.
- Replace repeated inline editor styling with shared CSS classes and/or small presentational subcomponents.
- Standardize the rendering structure across concept, attributes, advantages, disadvantages, skills, and techniques tabs.
- Preserve current editor behavior while improving maintainability and visual consistency.
- Keep the recently updated tab icon language and align any remaining editor icon sizing/spacing to the same visual system.

## Capabilities

### New Capabilities
- `character-editor-ui-refactor`: Defines the reusable structural and styling patterns for the character editor so all editor tabs follow a consistent UI composition model.

### Modified Capabilities
- `app-component-modularity`: The editor UI implementation will be further modularized so tab content and repeated view patterns are separated into more maintainable units.

## Impact

- Affected code:
  - `src/components/editor/CharacterEditor.tsx`
  - potential new editor subcomponents under `src/components/editor/`
  - `src/index.css`
  - `src/components/common/Icons.tsx` (minor alignment if needed)
- No gameplay rules, storage model, or public API changes expected.
- Main impact is maintainability, consistency, and lower risk for future editor UI work.
