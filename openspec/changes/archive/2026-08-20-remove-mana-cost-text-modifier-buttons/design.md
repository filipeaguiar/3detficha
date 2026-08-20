## Context

The current UI for modifier buttons displays the mana cost as plain text and shows a variant cost indicator. This text-heavy approach clutters the interface, especially on smaller screens, and does not align with the visual style of the existing mana bar, which uses slanted rectangles to represent mana amounts.

## Goals / Non-Goals

**Goals:**
- Replace textual mana cost on modifier buttons with a slanted rectangular indicator matching the mana bar style.
- Remove the variant cost indicator from modifier buttons.
- Ensure the new visual indicator is clear, accessible, and integrates seamlessly with existing UI components.

**Non-Goals:**
- Changing the underlying gameplay mechanics or mana cost calculations.
- Overhauling the entire UI design beyond the modifier button changes.

## Decisions

- **Visual Indicator Choice:** Use slanted rectangles (same style as mana bar) to represent mana cost visually. This provides visual consistency and reduces textual clutter.
- **Accessibility:** Provide appropriate ARIA labels or tooltip text for screen readers to convey the mana cost that the visual indicator represents.
- **Asset Management:** Introduce new graphic assets for the slanted rectangles; reuse existing mana bar rendering logic where possible.
- **Component Refactor:** Update the `modifier-button` component to accept a mana cost value and render the new rectangle indicator instead of rendering text.

## Risks / Trade-offs

- **Risk:** Users relying on the textual cost may miss the visual cue.
  - **Mitigation:** Ensure tooltips and ARIA labels convey the same information for assistive technologies.
- **Risk:** Additional asset loading could marginally affect load times.
  - **Mitigation:** Optimize the rectangle graphics and cache them with existing UI assets.

