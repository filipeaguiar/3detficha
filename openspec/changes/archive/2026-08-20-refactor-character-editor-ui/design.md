## Context

`CharacterEditor.tsx` currently mixes high-level tab orchestration, repeated card markup, tab-specific list rendering, and a large amount of inline styling in a single component. Recent cleanup improved visual consistency by introducing shared CSS classes, but the editor still has repeated structural patterns for cards, subcards, choice rows, metadata lines, action rows, and technique configuration blocks.

This refactor is intended to improve maintainability without changing gameplay behavior or saved data shape. The main stakeholders are future UI changes in the editor, because the current structure makes small visual adjustments expensive and increases the chance of inconsistent rendering across tabs.

## Goals / Non-Goals

**Goals:**
- Establish a reusable UI composition model for the editor.
- Reduce repeated inline structure and styling in `CharacterEditor.tsx`.
- Split repeated visual sections into reusable presentational units where it improves readability.
- Keep all current editor behaviors intact while making future changes easier.
- Align icon sizing, spacing, and tab presentation under one editor-specific visual system.

**Non-Goals:**
- Changing game rules, form data, or persistence behavior.
- Rewriting unrelated play-mode UI.
- Replacing the entire CSS strategy for the app.
- Introducing a new component library or styling dependency.

## Decisions

### 1. Introduce editor-specific presentational building blocks
The refactor will define a small set of editor UI primitives, implemented as CSS-backed markup patterns and, where useful, small React subcomponents.

This includes structures such as:
- editor cards
- choice cards
- grouped action rows
- subcards for nested option groups
- technique cards and metadata rows

**Why:** These patterns are already present, but duplicated. Naming and reusing them makes the editor easier to evolve.

**Alternative considered:** Keep everything in one file and only add more CSS classes. Rejected because it would improve styling consistency but not meaningfully reduce rendering complexity.

### 2. Separate tab orchestration from tab body rendering
The top-level editor component should remain responsible for shared state and tab switching, while larger tab bodies or repeated view sections can move into local subcomponents.

Examples include:
- concept tab sections
- advantages/disadvantages list sections
- skills grid section
- techniques acquisition section
- owned techniques list section

**Why:** This preserves current data flow while reducing cognitive load in the main file.

**Alternative considered:** Fully split every tab into independent containers with their own hooks. Rejected because it adds structural churn beyond what this maintenance refactor needs.

### 3. Preserve behavior first, then normalize styling through shared classes
Any extraction must preserve current click behavior, conditional states, and copy. Styling cleanup should use shared editor classes instead of introducing behavior changes at the same time.

**Why:** The editor already has many branching states. Keeping behavior stable reduces regression risk.

**Alternative considered:** Redesign the editor while refactoring. Rejected because it would combine UX redesign with structural cleanup and make review harder.

## Risks / Trade-offs

- [Risk] Extracting subcomponents could accidentally change event propagation or selection behavior. → Mitigation: preserve current handlers and keep components presentational where possible.
- [Risk] Moving inline styles into shared classes could slightly alter spacing or color emphasis in some tabs. → Mitigation: refactor in small visual slices and verify the existing editor flows after each slice.
- [Risk] Over-abstracting too early could create generic components that are harder to understand than the current code. → Mitigation: extract only repeated, editor-specific patterns rather than building a broad design system.
- [Trade-off] The refactor improves maintainability more than user-visible functionality. → Acceptable because the editor is already showing maintenance strain and current changes are becoming slower to implement.
