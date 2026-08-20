## Context

The editor refactor introduced reusable structures and improved consistency, but a review of the current implementation shows that multiple sections still rely on ad hoc inline styling and older visual patterns. The most noticeable inconsistencies remain in concept details, archetype and kit metadata blocks, attribute presentation, and owned technique control areas.

This follow-up should complete the standardization work without reopening gameplay or persistence concerns. The goal is to finish the editor visual language rather than start a new redesign.

## Goals / Non-Goals

**Goals:**
- Remove or reduce the remaining visually inconsistent editor sections.
- Finish aligning the techniques tab and owned technique controls with the shared editor system.
- Replace more repeated inline presentation with reusable CSS classes or small presentational editor components.
- Preserve all current interaction behavior.

**Non-Goals:**
- Changing game mechanics or character data.
- Reworking play mode.
- Introducing a new styling framework.
- Redesigning the entire editor beyond consistency and maintainability improvements.

## Decisions

### 1. Continue the editor-specific primitive approach
The remaining cleanup should reuse the existing editor primitives and extend them only where the current visual language still has gaps.

**Why:** This keeps the editor converging toward one consistent system instead of creating a second refactor style.

**Alternative considered:** Patch the remaining mismatches with a few more inline styles. Rejected because it would preserve the same maintenance problem.

### 2. Target owned techniques and metadata-heavy sections explicitly
Owned technique cards, special technique controls, and metadata rows should be treated as first-class editor patterns instead of exceptions.

**Why:** These are the sections still reading as legacy UI even after the first refactor pass.

**Alternative considered:** Only clean the top-level tabs and leave technique controls as-is. Rejected because that would leave the most visibly inconsistent area unfinished.

### 3. Prefer small presentational helpers over broad abstraction
Where repetition is still obvious, introduce focused helpers for section headers, metadata rows, or owned technique card composition rather than building overly generic UI infrastructure.

**Why:** The editor needs readability and consistency more than a generalized design system.

## Risks / Trade-offs

- [Risk] A deeper cleanup of the techniques area could affect special interaction flows. → Mitigation: preserve existing callbacks and verify strike/package/configuration behavior after each extraction.
- [Risk] Finishing standardization may still leave a few intentional exceptions, especially in attribute stat boxes. → Mitigation: treat intentionally unique patterns as explicit exceptions rather than accidental leftovers.
- [Trade-off] This follow-up is incremental rather than transformational. → Acceptable because the editor already improved significantly and now benefits most from a focused completion pass.
