## Context

In `CharacterEditor.tsx`, Advantages and Disadvantages currently render inside a single view under `activeTab === 'advantages'`. Users must scroll past the entire Advantages list to reach Disadvantages, and searching filters both lists simultaneously.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated tab for Advantages (`'advantages'`) and a dedicated tab for Disadvantages (`'disadvantages'`).
- Independent search bars for Advantages and Disadvantages.
- Add a visually distinct icon for the Disadvantages tab in `Icons.tsx`.

**Non-Goals:**
- Changing point calculations, advantage/disadvantage definitions, or selection state structure in `CharacterForm`.

## Decisions

1. **Tab Structure**:
   Update `EDITOR_TABS` to:
   - Conceito (`concept`)
   - Atributos (`attributes`)
   - Vantagens (`advantages`)
   - Desvantagens (`disadvantages`)
   - Perícias (`skills`)
   - Técnicas (`techniques`)

2. **Search State Separation**:
   - `advantageSearch` string state for filtering advantages.
   - `disadvantageSearch` string state for filtering disadvantages.

3. **Icon**:
   - Add `TabDisadvantagesIcon` to `Icons.tsx` (using an impactful shield/skull/flaw SVG motif).

## Risks / Trade-offs

- [Risk] Existing active tab state in `App.tsx` could encounter a type mismatch if not typed with `'disadvantages'`.
  → Mitigation: Update `EditorTab` in `CharacterEditor.tsx` and the corresponding `useState` in `App.tsx`.
