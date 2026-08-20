## Context

`PlayMode.tsx` already renders known strikes under a “Golpes” heading and general roll bonuses under “Técnicas & Bônus”, but both groups live in the same large component and use the same generic card grid. The underlying sources are also different: known strikes are derived from permanent selections granted by Golpes, while techniques are driven by `visibleRollBonuses` and can include variants, assisted effects, and packages.

The separation should make that domain distinction explicit in the play UI and component structure so each group can evolve independently without changing gameplay rules.

## Goals / Non-Goals

**Goals:**
- Create an explicit play-mode boundary between attacks/strikes and non-attack techniques.
- Prevent a strike acquisition or strike-backed action from being duplicated in the general technique area.
- Give each section its own presentational component and CSS hooks.
- Preserve strike activation, combo tracking, technique activation, costs, context details, and special states.

**Non-Goals:**
- Changing how Golpes are acquired or stored.
- Reclassifying ordinary attribute rolls as attacks.
- Changing combat math, costs, combos, or technique effects.
- Completing a broader visual redesign beyond establishing the structural separation.

## Decisions

### 1. Derive two explicit play collections
The play screen will derive an attack collection from `getKnownStrikes(currentForm)` and a non-attack technique collection from `visibleRollBonuses`, excluding entries whose purpose is only to represent the Golpes acquisition or actions already represented by known strikes.

**Why:** The collections already come from different domain sources; making the distinction explicit avoids accidental duplication and simplifies rendering.

**Alternative considered:** Keep both arrays unchanged and only add stronger headings. Rejected because it does not establish a reliable boundary for future UI work.

### 2. Extract dedicated presentation sections
Attack cards and technique cards will be rendered by separate play-mode components or focused rendering units with distinct class names.

**Why:** Independent components allow attack-specific UI such as combo state and technique-specific UI such as variants and assisted effects to evolve without increasing the size of `PlayMode.tsx`.

**Alternative considered:** Continue rendering both blocks inline in `PlayMode.tsx`. Rejected because the requested separation is also intended to enable interface improvements.

### 3. Preserve event handlers and domain behavior
The extraction will pass existing activation and context-menu handlers through unchanged. It will not move state ownership for combo or active techniques unless needed for typed component contracts.

**Why:** This keeps the change focused on classification and presentation and limits regression risk.

## Risks / Trade-offs

- [Risk] Filtering the general technique collection could hide an entry that has both acquisition and active-effect meaning. → Mitigation: use explicit source/gameplay identifiers and verify all current Golpes-derived entries.
- [Risk] Extracting sections could disrupt combo or context-menu propagation. → Mitigation: preserve current handlers and test strike activation, combo locking, and details.
- [Trade-off] The first version may still share low-level card styling. → Acceptable as long as sections and class hooks are independent for future refinement.
